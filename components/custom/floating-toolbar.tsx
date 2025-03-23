/* eslint-disable jsx-a11y/alt-text */
"use client";

import type { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Heading1,
  Heading2,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Quote,
  Underline as UnderlineIcon,
  X,
} from "lucide-react";
import { useEffect, useRef } from "react";

export default function FloatingToolbar({
  editor,
  position,
  onClose,
}: {
  editor: Editor;
  position: { top: number; left: number };
  onClose: () => void;
}) {
  const toolbarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!editor) return null;

  return (
    <div
      ref={toolbarRef}
      className="absolute bg-white text-black rounded-md shadow-lg p-2 flex gap-2 z-50"
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
        transform: "translateY(-100%)", // Adjust to appear above the cursor
      }}
    >
      {/* Text Formatting */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded-lg hover:bg-gray-200 ${
          editor.isActive("bold") ? "bg-gray-300" : ""
        }`}
      >
        <Bold size={18} className="text-black" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded-lg hover:bg-gray-200 ${
          editor.isActive("italic") ? "bg-gray-300" : ""
        }`}
      >
        <Italic size={18} className="text-black" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`p-2 rounded-lg hover:bg-gray-200 ${
          editor.isActive("underline") ? "bg-gray-300" : ""
        }`}
      >
        <UnderlineIcon size={18} className="text-black" />
      </button>

      {/* Headings */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded-lg hover:bg-gray-200 ${
          editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""
        }`}
      >
        <Heading1 size={18} className="text-black" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded-lg hover:bg-gray-200 ${
          editor.isActive("heading", { level: 2 }) ? "bg-gray-300" : ""
        }`}
      >
        <Heading2 size={18} className="text-black" />
      </button>

      {/* Lists */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded-lg hover:bg-gray-200 ${
          editor.isActive("bulletList") ? "bg-gray-300" : ""
        }`}
      >
        <List size={18} className="text-black" />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded-lg hover:bg-gray-200 ${
          editor.isActive("orderedList") ? "bg-gray-300" : ""
        }`}
      >
        <ListOrdered size={18} className="text-black" />
      </button>

      {/* Link */}
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Enter link URL");
          if (url) {
            editor.chain().focus().setLink({ href: url }).run();
          }
        }}
        className="p-2 rounded-lg hover:bg-gray-200"
      >
        <Link size={18} className="text-black" />
      </button>

      {/* Image */}
      <button
        type="button"
        onClick={() => {
          const url = window.prompt("Enter image URL");
          if (url) {
            editor.chain().focus().setImage({ src: url }).run();
          }
        }}
        className="p-2 rounded-lg hover:bg-gray-200"
      >
        <Image size={18} className="text-black" />
      </button>

      {/* Quote */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded-lg hover:bg-gray-200 ${
          editor.isActive("blockquote") ? "bg-gray-300" : ""
        }`}
      >
        <Quote size={18} className="text-black" />
      </button>

      {/* Code Block */}
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded-lg hover:bg-gray-200 ${
          editor.isActive("codeBlock") ? "bg-gray-300" : ""
        }`}
      >
        <Code size={18} className="text-black" />
      </button>

      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="p-2 rounded-lg hover:bg-gray-200 ml-1"
        aria-label="Close toolbar"
      >
        <X size={18} className="text-black" />
      </button>
    </div>
  );
}
