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
} from "lucide-react";

export default function Toolbar({ editor }: { editor: Editor | null }) {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("Enter image URL");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter link URL", previousUrl || "");

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    if (!editor.state.selection.empty) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    } else {
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${url}" target="_blank">${url}</a>`)
        .run();
    }
  };

  return (
    <div className="relative w-full bg-white text-black rounded-t-md border-b border-gray-200">
      <div className="overflow-x-auto scrollbar-hide">
        <div className="flex gap-2 p-2 min-w-max">
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
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 rounded-lg hover:bg-gray-200 ${
              editor.isActive("heading", { level: 1 }) ? "bg-gray-300" : ""
            }`}
          >
            <Heading1 size={18} className="text-black" />
          </button>
          <button
            type="button"
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
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
            onClick={addLink}
            className="p-2 rounded-lg hover:bg-gray-200"
          >
            <Link size={18} className="text-black" />
          </button>

          {/* Image */}
          <button
            type="button"
            onClick={addImage}
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
        </div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 pointer-events-none w-8 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}
