"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useEffect } from "react";
import styles from "@/styles/Admin/TipTapEditor.module.css";

interface TipTapEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const TipTapEditor = ({ content, onChange }: TipTapEditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    immediatelyRender: true,
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: styles.editorContent,
      },
    },
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return <div className={styles.loading}>Loading editor...</div>;
  }

  return (
    <div className={styles.editorContainer}>
      <div className={styles.toolbar}>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={
            editor.isActive("bold")
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          title="Bold"
        >
          <strong>B</strong>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={
            editor.isActive("italic")
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          title="Italic"
        >
          <em>I</em>
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={
            editor.isActive("strike")
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          title="Strikethrough"
        >
          <s>S</s>
        </button>
        <div className={styles.separator} />
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 })
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          title="Heading 1"
        >
          H1
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 })
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          title="Heading 2"
        >
          H2
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 })
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          title="Heading 3"
        >
          H3
        </button>
        <div className={styles.separator} />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={
            editor.isActive("bulletList")
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          title="Bullet List"
        >
          •
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={
            editor.isActive("orderedList")
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          title="Numbered List"
        >
          1.
        </button>
        <div className={styles.separator} />
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={
            editor.isActive("blockquote")
              ? styles.toolbarButtonActive
              : styles.toolbarButton
          }
          title="Quote"
        ></button>
        <button
          type="button"
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={styles.toolbarButton}
          title="Horizontal Rule"
        >
          ─
        </button>
        <div className={styles.separator} />
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className={styles.toolbarButton}
          title="Undo"
        >
          ↶
        </button>
        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className={styles.toolbarButton}
          title="Redo"
        >
          ↷
        </button>
      </div>
      <EditorContent editor={editor} className={styles.editorWrapper} />
    </div>
  );
};

export default TipTapEditor;
