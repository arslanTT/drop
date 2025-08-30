import { Card, CardContent } from "@/components/ui/card";
import {
  Download,
  FileIcon,
  ImageIcon,
  Star,
  StarOff,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FileCard({ file }: any) {
  const isImage = file.thumbnailUrl;
  const [isStarred, setIsStarred] = useState(false);
  const handleDelete = () => {
    alert(`Delete file: ${file.name}`);
  };

  const handleStar = () => {
    setIsStarred((prev) => !prev);
    alert(`${!isStarred ? "Starred" : "Unstarred"} file: ${file.name}`);
  };

  const handleDownload = () => {
    alert(`Download file: ${file.name}`);
    // 🔹 Later: use fetch or file.fileUrl to trigger download
  };
  return (
    <Card className="p-4">
      <CardContent className="flex flex-col items-center">
        {isImage ? (
          <Image
            src={file.thumbnailUrl || file.fileUrl}
            alt={file.name}
            width={64} // ✅ required
            height={64} // ✅ required
            className="h-16 w-16 object-cover rounded"
          />
        ) : (
          <FileIcon className="h-10 w-10 text-gray-600" />
        )}
        <p className="mt-2 text-sm w-full truncate text-center">{file.name}</p>
        <p className="text-xs text-gray-500">
          {(file.size / 1024).toFixed(1)} KB
        </p>
        {/* 🔹 Action Buttons */}
        <div className="flex gap-2 mt-3">
          <Button variant="ghost" size="sm" onClick={handleStar}>
            {isStarred ? (
              <Star className="h-4 w-4 text-yellow-500" />
            ) : (
              <StarOff className="h-4 w-4 text-gray-500" />
            )}
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDownload}>
            <Download className="h-4 w-4 text-blue-500" />
          </Button>
          <Button variant="ghost" size="sm" onClick={handleDelete}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
