import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React, { useState } from 'react';
import {
  FaBold, FaItalic, FaStrikethrough, FaRegFileCode, FaListUl,
  FaListOl, FaQuoteLeft, FaUndo, FaRedo, FaUnderline
} from 'react-icons/fa';
import { MdHorizontalRule, MdOutlineTextFormat } from 'react-icons/md';
import { AiOutlineClear } from 'react-icons/ai';
import { BiParagraph } from 'react-icons/bi';
import { VscSymbolColor } from 'react-icons/vsc';
import { GoCode } from 'react-icons/go';
import { Tooltip } from 'react-tooltip';

const MenuBar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="control-group">
      <div className="button-group">
        <button onClick={() => editor.chain().focus().toggleBold().run()} disabled={!editor.can().chain().focus().toggleBold().run()}>
          <FaBold />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} disabled={!editor.can().chain().focus().toggleItalic().run()}>
          <FaItalic />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} disabled={!editor.can().chain().focus().toggleUnderline().run()}>
          <FaUnderline />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} disabled={!editor.can().chain().focus().toggleStrike().run()}>
          <FaStrikethrough />
        </button>
        <button onClick={() => editor.chain().focus().toggleCode().run()} disabled={!editor.can().chain().focus().toggleCode().run()}>
          <FaRegFileCode />
        </button>
        <button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
          <AiOutlineClear />
        </button>
        <button onClick={() => editor.chain().focus().setParagraph().run()}>
          <BiParagraph />
        </button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          <FaListUl />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
          <FaListOl />
        </button>
        <button onClick={() => editor.chain().focus().toggleCodeBlock().run()}>
          <GoCode />
        </button>
        <button onClick={() => editor.chain().focus().toggleBlockquote().run()}>
          <FaQuoteLeft />
        </button>
        <button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
          <MdHorizontalRule />
        </button>
        <button onClick={() => editor.chain().focus().setHardBreak().run()}>
          <MdOutlineTextFormat />
        </button>
        <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().chain().focus().undo().run()}>
          <FaUndo />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().chain().focus().redo().run()}>
          <FaRedo />
        </button>
        <button onClick={() => editor.chain().focus().setColor('#958DF1').run()}>
          <VscSymbolColor />
        </button>
      </div>
      <Tooltip id="tooltip" place="top" effect="solid" />
    </div>
  );
};



const Tiptap = () => {
  const editor = useEditor({
    extensions: [
      Color.configure({ types: [TextStyle.name, ListItem.name] }),
      TextStyle.configure({ types: [ListItem.name] }),
      StarterKit.configure({
        bulletList: { keepMarks: true, keepAttributes: false },
        orderedList: { keepMarks: true, keepAttributes: false },
      }),
      Underline,
    ],
    content: '<p>Nhập nội dung ở đây...</p>',
  })

  if (!editor) return null

  return (
    <div className="rounded-lg border border-gray-500">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default Tiptap;
