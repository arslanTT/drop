// // app/dashboard/page.tsx
import { currentUser } from "@clerk/nextjs/server";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import FileExplorer from "@/components/dashboard/FileExplorer";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) return null;
  // console.log(user);

  return (
    <div className="p-6">
      <DashboardHeader
        userName={user.emailAddresses[0].emailAddress || "User"}
      />
      <FileExplorer userId={user.id} />
    </div>
  );
}
