"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import FloatingToolbar from "./floating-toolbar";
import Toolbar from "./toolbar";
import React, { useEffect, useState } from "react";
import { Blockquote } from "@tiptap/extension-blockquote";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Heading } from "@tiptap/extension-heading";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Underline } from "@tiptap/extension-underline";

export default function Tiptap({
  description,
  onChange,
}: {
  description: string;
  onChange: (richText: string) => void;
}) {
  const [isToolbarVisible, setIsToolbarVisible] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: {
          HTMLAttributes: {
            class: "list-disc list-outside pl-5",
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: "list-decimal list-outside pl-5",
          },
        },
        codeBlock: {
          HTMLAttributes: {
            class: "bg-gray-100 p-2 rounded-md font-mono",
          },
        },
        blockquote: {
          HTMLAttributes: {
            class: "border-l-4 border-gray-300 pl-4 italic",
          },
        },
      }),
      Heading.configure({
        levels: [1, 2],
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        linkOnPaste: true,
      }),
      Image,
      Blockquote,
      CodeBlock,
      Underline,
    ],
    content: description,
    editorProps: {
      attributes: {
        class:
          "rounded-md border min-h-[400px] border-input bg-transparent p-2 text-white w-full focus:outline-none",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onSelectionUpdate: ({ editor }) => {
      const { from, to } = editor.state.selection;
      if (from !== to) {
        // Show the floating toolbar when text is selected
        const { top, left } = editor.view.coordsAtPos(from);
        setToolbarPosition({
          top: top + window.scrollY - 50, // Adjust to appear closer to the cursor
          left: left - 10, // Adjust to appear closer to the cursor
        });
        setIsToolbarVisible(true);
      } else {
        setIsToolbarVisible(false);
      }
    },
  });

  useEffect(() => {
    if (editor && description !== editor.getHTML()) {
      editor.commands.setContent(description);
    }
  }, [description, editor]);

  return (
    <div className="flex flex-col gap-0 relative">
      {/* Static Toolbar for Mobile */}
      <div className="lg:hidden">{editor && <Toolbar editor={editor} />}</div>

      {/* Floating Toolbar for Desktop */}
      <div className="hidden lg:block">
        {isToolbarVisible && editor && (
          <FloatingToolbar
            editor={editor}
            position={toolbarPosition}
            onClose={() => setIsToolbarVisible(false)}
          />
        )}
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
