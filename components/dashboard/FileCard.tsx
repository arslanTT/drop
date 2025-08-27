import { Card, CardContent } from "@/components/ui/card";
import { FileIcon, ImageIcon } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function FileCard({ file }: any) {
  const isImage = file.thumbnailUrl;
  return (
    <Card className="p-4">
      <CardContent className="flex flex-col items-center">
        {isImage ? (
          <img
            src={file.thumbnailUrl || file.fileUrl}
            alt={file.name}
            className="h-16 w-16 object-cover rounded"
          />
        ) : (
          <FileIcon className="h-10 w-10 text-gray-600" />
        )}
        <p className="mt-2 text-sm">{file.name}</p>
        <p className="text-xs text-gray-500">
          {(file.size / 1024).toFixed(1)} KB
        </p>
      </CardContent>
    </Card>
  );
}
