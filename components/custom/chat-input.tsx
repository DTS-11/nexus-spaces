"use client";
import { useChatContext } from "@/contexts/chat";
import { Send, File, CircleStop } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useEffect } from "react";

export function ChatInput() {
  const {
    textareaRef,
    message,
    setMessage,
    files,
    setFiles,
    streaming,
    setStreaming,
    abortControllerRef,
    stopControllerRef,
    handleKeyDown,
    handleSubmit,
  } = useChatContext();

  useEffect(() => {
    if (window.innerWidth >= 768) textareaRef.current?.focus();
  }, []);

  return (
    <div
      className="flex flex-col w-full h-fit gap-2 border-t-2 border-neutral-800 p-4 bg-neutral-950"
    >
      <div className="flex flex-row items-center gap-2">
        <Input
          ref={textareaRef}
          name="prompt"
          placeholder="Ask me anything..."
          className="flex-1 bg-transparent border border-neutral-700 rounded-xl focus:border-neutral-500 transition-colors"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={streaming}
        />
        {!streaming ? (
          <Button
          className="w-fit flex gap-2 rounded-md"
          title="Send"
          onClick={handleSubmit}
          >
            <Send className="h-4 w-4" />

          </Button>
        ) : (
          <Button
            className="w-fit flex gap-2 rounded-md"
            title="Stop"
            onClick={() => {
              abortControllerRef.current?.abort();
              stopControllerRef.current?.abort();
              toast.error("Stopped streaming");
              setStreaming(false);
            }}
          >
            <CircleStop className="h-4 w-4" />
          </Button>
        )}

      </div>
      <div className="flex items-center gap-2 text-sm text-neutral-400">
        <label htmlFor="file-upload" className="flex items-center gap-2 cursor-pointer hover:text-neutral-300 mx-2 my-1">
          <File className="h-4 w-4" />
          {files.length > 0 ? `${files.length} files selected` : 'Attach files'}
        </label>
        <Input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={(e) => setFiles(e.target?.files ? Array.from(e.target.files) : [])}
          multiple
        />
      </div>
    </div >
  );
}