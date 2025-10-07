import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function TripsPage() {
  const session = auth();

  if (!session) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-xl ">
        Please Sign In
      </div>
    );
  }

  return (
    <div className="space-y-6 container mx-auto px-4 py-8">
      <div>Dashboard</div>
      <Link href={"/trips/new"}>
        <Button>New Trip</Button>
      </Link>
    </div>
  );
}
