// components/dashboard/FileExplorer.tsx
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import UploadDialog from "./UploadDialog";
import CreateFolderDialog from "./CreateFolderDialog";
import FolderCard from "./FolderCard";
import FileCard from "./FileCard";

type FileItem = {
  id: string;
  name: string;
  size: number;
  isFolder: boolean;
  fileUrl: string;
  thumbnailUrl: string | null;
  createdAt: string;
};

export default function FileExplorer({ userId }: { userId: string }) {
  const [files, setFiles] = useState<FileItem[] | []>([]);
  const [currentParentId, setCurrentParentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFiles = async (parentId: string | null) => {
    setLoading(true);
    const res = await fetch(
      `/api/files?userId=${userId}&parentId=${parentId || ""}`
    );
    const data = await res.json();
    console.log("Fetched files:", data);
    setFiles(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles(currentParentId);
  }, [currentParentId]);

  const folders = files.filter((f) => f.isFolder);
  const fileItems = files.filter((f) => !f.isFolder);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <UploadDialog userId={userId} parentId={currentParentId} />
        <CreateFolderDialog userId={userId} parentId={currentParentId} />
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-4 gap-4">
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onClick={() => setCurrentParentId(folder.id)}
          />
        ))}
        {fileItems.map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
      </div>
    </div>
  );
}
