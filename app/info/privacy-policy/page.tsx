import { Button } from "@/components/ui/button";
import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="p-6 max-w-3xl mx-auto mt-16 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-gray-700 text-lg mb-6">
        This app uses local storage to enhance your user experience.
      </p>
      <div className="text-center">
        <Link href='/'>
          <Button>
            Back to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default PrivacyPolicy;
