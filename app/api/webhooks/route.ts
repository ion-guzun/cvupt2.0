import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { redirect } from 'next/navigation'
import { createStudent } from '@/lib/actions/student.actions'
import { createTeacher } from '@/lib/actions/teacher.actions'

export async function POST(req: Request) {

  // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }

  // Do something with the payload
  // For this guide, you simply log the payload to the console
  const { id } = evt.data;
  const eventType = evt.type;

  async function updateUserMetadata(userId: string, userType: string, userObjectId: string) {
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        userId: userObjectId,
        userType: userType,
      }
    });
  }
  
  if(eventType === 'user.created') {
    const {id, email_addresses, image_url, first_name, last_name, } = evt.data;


    const user = {
        clerkId: id,
        firstName: first_name!,
        lastName: last_name!,
        email: email_addresses[0].email_address,
        photo: image_url,
    }
    
    switch (true) {
        case user.email.endsWith('@student.upt.ro'):
          const newStudent = await createStudent(user);
          if (newStudent) {
            console.log(newStudent);
            await updateUserMetadata(id, 'student', newStudent._id);
            return NextResponse.json({ message: 'OK', student: newStudent });
          }
        break;

        case user.email.endsWith('github@gmail.com'):
          const newTeacher = await createTeacher(user);
          if (newTeacher) {
            await updateUserMetadata(id, 'teacher', newTeacher._id);
            return NextResponse.json({ message: 'OK', teacher: newTeacher });
          }
        break;

        default:
          console.warn(`User with email ${user.email} has an unrecognized domain.`);
          return new Response('Unrecognized email domain.', { status: 400 });
    }
    
  }

  return new Response('', { status: 200 })
}