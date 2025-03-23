"use client";

import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import Tiptap from "./tiptap-dynamic";

export default function TextEditor() {
  const { data: session } = useSession();
  const { toast } = useToast();

  if (!session) {
    redirect("/signin");
  }

  const router = useRouter();

  const formSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    content: z.string().min(1, { message: "Content is required" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      content: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (newPost: z.infer<typeof formSchema>) => {
      return axios.post("/api/posts", newPost);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Your post has been published.",
        variant: "default",
      });
      setTimeout(() => {
        router.push("/posts");
      }, 1500);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to publish post. Please try again.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    mutation.mutate(data);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm">Title</FormLabel>
                  <FormControl>
                    <input
                      {...field}
                      className="bg-transparent text-white w-full p-2 sm:p-3 border border-gray-300 rounded-md text-base sm:text-lg"
                      placeholder="Enter post title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Content Field */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-2">
                  <FormLabel className="text-sm">Content</FormLabel>
                  <FormControl>
                    <div className="min-h-[300px] sm:min-h-[400px] w-full">
                      <Tiptap
                        description={field.value}
                        onChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Publish Button */}
            <div className="bottom-4 left-0 right-0 mt-6">
              <div className="bg-black/80 backdrop-blur-sm rounded-lg shadow-lg p-4 flex flex-col gap-3 items-center">
                <button
                  type="submit"
                  disabled={mutation.isPending}
                  className="bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors md:w-40"
                >
                  {mutation.isPending ? "Publishing..." : "Publish Post"}
                </button>
                <button
                  type="button"
                  onClick={() => router.push("/posts")}
                  className="bg-transparent text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md text-sm sm:text-base font-medium border border-dashed hover:bg-white hover:text-black transition-colors md:w-40"
                >
                  View Posts
                </button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
