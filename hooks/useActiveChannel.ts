import { useEffect } from "react";
import { Channel, Members } from "pusher-js";
import { pusherClient } from "@/pusher";
import useActiveList from "./useActiveList";


const useActiveChannel = () => {
  const { set, add, remove } = useActiveList();

  useEffect(() => {
    const channel: Channel = pusherClient.subscribe("presence-messanger");

    const handleSubscriptionSucceeded = (members: Members) => {
      const initialMembers: string[] = [];
      members.each((member: Record<string, any>) => initialMembers.push(member.id));
      set(initialMembers);
    };

    const handleMemberAdded = (member: Record<string, any>) => {
      add(member.id);
    };

    const handleMemberRemoved = (member: Record<string, any>) => {
      remove(member.id);
    };

    channel.bind("pusher:subscription_succeeded", handleSubscriptionSucceeded);
    channel.bind("pusher:member_added", handleMemberAdded);
    channel.bind("pusher:member_removed", handleMemberRemoved);

    return () => {
      channel.unbind("pusher:subscription_succeeded", handleSubscriptionSucceeded);
      channel.unbind("pusher:member_added", handleMemberAdded);
      channel.unbind("pusher:member_removed", handleMemberRemoved);
      pusherClient.unsubscribe("presence-messanger");
    };
  }, [set, add, remove]);

  return null;
};

export default useActiveChannel;