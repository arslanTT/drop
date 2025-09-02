"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import UploadDialog from "./UploadDialog";
import CreateFolderDialog from "./CreateFolderDialog";
import FolderCard from "./FolderCard";
import FileCard from "./FileCard";
import { Loader, Loader2Icon, LoaderPinwheel, Rotate3D } from "lucide-react";

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

  const [breadcrumbs, setBreadcrumbs] = useState<
    { id: string | null; name: string }[]
  >([{ id: null, name: "Home" }]);

  const fetchFiles = async (parentId: string | null) => {
    setLoading(true);
    const res = await fetch(
      `/api/files?userId=${userId}&parentId=${parentId || ""}`
    );
    const data = await res.json();
    console.log("Fetched files:", data);
    console.log(data);
    setFiles(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => {
    fetchFiles(currentParentId);
  }, [currentParentId]);

  const handleEnterFolder = (folder: FileItem) => {
    setCurrentParentId(folder.id);
    setBreadcrumbs((prev) => [...prev, { id: folder.id, name: folder.name }]);
  };

  const handleBreadcrumbClick = (id: string | null, index: number) => {
    setCurrentParentId(id);
    setBreadcrumbs((prev) => prev.slice(0, index + 1));
  };

  const folders = files.filter((f) => f.isFolder);
  const fileItems = files.filter((f) => !f.isFolder);

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <UploadDialog
          userId={userId}
          parentId={currentParentId}
          refreshFiles={() => fetchFiles(currentParentId)}
        />
        <CreateFolderDialog userId={userId} parentId={currentParentId} />
      </div>

      <div className="flex   py-1 px-2  text-[16px] bg-gray-600 rounded-md w-fit items-center gap-2 mb-4">
        {breadcrumbs.map((bc, idx) => (
          <span
            key={bc.id || "root"}
            className={`cursor-pointer b hover:underline hover:text-green-500 ${
              idx === breadcrumbs.length - 1 ? "font-semibold text-white" : ""
            }`}
            onClick={() => handleBreadcrumbClick(bc.id, idx)}
          >
            {bc.name}
            {idx < breadcrumbs.length - 1 && " / "}
          </span>
        ))}
      </div>

      {loading && (
        <span className="flex items-center w-fit p-3 rounded-2xl gap-3 text-white bg-gray-500">
          {" "}
          <LoaderPinwheel /> Loading Please Wait!
        </span>
      )}

      <div className="grid grid-cols-4 gap-4">
        {folders.map((folder) => (
          <FolderCard
            key={folder.id}
            folder={folder}
            onClick={() => handleEnterFolder(folder)}
          />
        ))}
        {fileItems.length ? (
          fileItems.map((file) => <FileCard key={file.id} file={file} />)
        ) : (
          <div>
            <span>Upload a new file.</span>
          </div>
        )}
      </div>
    </div>
  );
}
