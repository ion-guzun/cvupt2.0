'use client'

import { useRouter } from "next/navigation";
import { Button } from "./ui/button"

export const CompleteProfileButton = () => {
  const router = useRouter();
  const handleRouting = () => router.push("/student/complete-profile");

  return (
    <Button onClick={handleRouting}>
        Complete profile
    </Button>
  )
}

