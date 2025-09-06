import { Card, CardContent } from "@/components/ui/card";
import { Download, FolderIcon, Star, StarOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FolderCard({ folder, onClick }: any) {
  const [isStarred, setIsStarred] = useState(folder.isStarred); // initialize from prop

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const response = await fetch(`/api/item/${folder.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      toast.success("Folder deleted");
    } else {
      toast.error("Failed to delete");
    }
  };

  const handleStar = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const response = await fetch(`/api/item/${folder.id}`, { method: "PATCH" });
    if (response.ok) {
      setIsStarred(!isStarred);
      toast.success("Star toggled");
    } else {
      toast.error("Failed to toggle star");
    }
  };

  return (
    <Card onClick={onClick} className="cursor-pointer hover:bg-gray-100">
      <CardContent className="flex flex-col items-center p-4">
        <FolderIcon className="h-10 w-10 text-blue-500" />
        <p className="mt-2 text-sm font-medium">{folder.name}</p>
        <div className="flex gap-2 mt-3">
          <Button variant="ghost" size="sm" onClick={handleStar}>
            {isStarred ? (
              <Star className="h-4 w-4 text-yellow-500" />
            ) : (
              <StarOff className="h-4 w-4 text-gray-500" />
            )}
          </Button>

          <Button variant="ghost" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
