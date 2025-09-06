"use client";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export default function CreateFolderDialog({
  userId,
  parentId,
}: {
  userId: string;
  parentId: string | null;
}) {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const handleCreate = async () => {
    if (!folderName) return alert("Folder name is required");
    await fetch("/api/folders/create", {
      method: "POST",
      body: JSON.stringify({ userId, parentId, name: folderName }),
    });
    toast.success(`Folder ${folderName} created`);
    setOpen(false);
    setFolderName("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Folder</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Folder Name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
        />
        <Button onClick={handleCreate}>Create</Button>
      </DialogContent>
    </Dialog>
  );
}
