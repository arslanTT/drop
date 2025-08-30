// // app/dashboard/page.tsx
import { auth, currentUser } from "@clerk/nextjs/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FileExplorer from "@/components/dashboard/FileExplorer";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = await auth();
  const user = await currentUser();
  if (!user) return null;
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="p-6">
      <DashboardHeader
        userName={user.emailAddresses[0].emailAddress || "User"}
      />
      <FileExplorer userId={user.id} />
    </div>
  );
}
