import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import React from "react";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreatePlaylistBody,
  CreatePlaylistBodyType,
} from "@/schemaValidations/music.schema";

export default function DialogCreatePlaylist() {
  const form = useForm<CreatePlaylistBodyType>({
    resolver: zodResolver(CreatePlaylistBody),
    defaultValues: {
      playlistName: "",
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CirclePlus className="w-6 h-6 text-muted-foreground" />
      </DialogTrigger>
      <DialogContent className="max-w-md ">
        <DialogTitle className="sr-only">Edit profile</DialogTitle>
        <DialogDescription className="sr-only">
          Make changes to your profile here. Click save when done.
        </DialogDescription>
        <Form {...form}>
          <form
            className="space-y-4 max-w-[600px] flex-shrink-0 w-full"
            noValidate
          >
            <div className="grid gap-4">
              <h1 className="text-2xl font-semibold text-muted-foreground text-center">
                Tạo playlist mới
              </h1>
              <FormField
                control={form.control}
                name="playlistName"
                render={({ field }) => (
                  <FormItem>
                    <div className="grid gap-2">
                      <Input
                        id="playlist-name"
                        type="text"
                        placeholder="Nhập tên playlist"
                        required
                        {...field}
                        autoComplete="off"
                        className="placeholder:text-[#919BA4] border-[0.5px] border-[#666]"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#d4fc79] to-[#96e6a1] hover:bg-gray-200 rounded-[20px] text-black mt-2"
              >
                TẠO MỚI
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
