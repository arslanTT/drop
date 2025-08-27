"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { DropdownMenu } from "./ui/dropdown-menu";
import FileOperations from "./FileOperations";
import { FolderIcon } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ViewFileAndFolder = ({
  userId,
  dummyData,
}: {
  userId: string;
  dummyData: any;
}) => {
  const [showOptions, setshowOptions] = useState<boolean>(false);
  return (
    <div className="grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-4">
      {dummyData.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-red-500 flex justify-between items-center  px-3 py-4 "
          >
            <div className="flex flex-col">
              {item.isFolder ? (
                <div className="flex items-center gap-3">
                  <FolderIcon /> <h1>{item.name}</h1>
                </div>
              ) : (
                <h1>{item.name}</h1>
              )}
            </div>
            <FileOperations userId={userId} />
          </div>
        );
      })}
    </div>
  );
};

export default ViewFileAndFolder;
