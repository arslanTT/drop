export type BaseFileType = {
  id: string;
  name: string;
  path: string;
  size: number;
  type: string;
  fileUrl: string;
  thumbnailUrl?: string | null;
  userId: string;
  parentId?: string | null;
  isFolder: boolean;
  isStarred: boolean;
  isTrash: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
};
export type FolderType = BaseFileType & {
  isFolder: true;
  children?: Array<FolderType | FileType>;
};

export type FileType = BaseFileType & {
  isFolder: false;
};
