// components/dashboard/DashboardHeader.tsx
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { LogOut } from "lucide-react";

export default function DashboardHeader({ userName }: { userName: string }) {
  return (
    <header className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Welcome, {userName}</h1>
        <p className="text-sm text-gray-500">Your personal cloud storage</p>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="outline" className="flex items-center gap-2">
          <LogOut className="w-4 h-4" />
          Logout
        </Button>
        {/* Clerk User Profile button */}
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
