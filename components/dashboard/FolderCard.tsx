import { Card, CardContent } from "@/components/ui/card";
import { FolderIcon } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FolderCard({ folder, onClick }: any) {
  return (
    <Card onClick={onClick} className="cursor-pointer hover:bg-gray-100">
      <CardContent className="flex flex-col items-center p-4">
        <FolderIcon className="h-10 w-10 text-blue-500" />
        <p className="mt-2 text-sm font-medium">{folder.name}</p>
      </CardContent>
    </Card>
  );
}
