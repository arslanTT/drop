"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Schema for file validation (optional)
const formSchema = z.object({
  file: z.any().refine((file) => file instanceof FileList && file.length > 0, {
    message: "File is required",
  }),
});

export default function FileUploadCom({ userId }: { userId: string }) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const file = data.file[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    // formData.append("parentId", undefined); // Assuming parentId is optional or can be empty
    // console.log(userId);
    formData.append("userId", userId as string);
    const res = await fetch("/api/files/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.log("Error is here>>>>");
    }
    const result = await res.json();
    console.log("Upload success:", result);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="file"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Upload File</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    onChange={(e) => field.onChange(e.target.files)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  );
}
