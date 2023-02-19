import { useState, useRef } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { $getRoot, $getSelection, LexicalEditor } from "lexical";
import { createEditor } from "lexical";
import { useEffect } from "react";

import { $generateNodesFromDOM } from "@lexical/html";

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import ExampleTheme from "./themes/ExampleTheme";
import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import { AutoFocusPlugin } from "@lexical/react/LexicalAutoFocusPlugin";
import ToolbarPlugin from "./plugins/ToolbarPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";
import { TableCellNode, TableNode, TableRowNode } from "@lexical/table";
import { ListItemNode, ListNode } from "@lexical/list";
import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { TRANSFORMERS } from "@lexical/markdown";

import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin";

import prepopulatedText from "./SampleText.jsx";

import ActionsPlugin from "./plugins/ActionPlugin";
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";

function onChange(editorState: any) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();
    console.log("htmlstring", root.exportJSON());
  });
}

const editorConfig = {
  editorState: prepopulatedText,

  theme: ExampleTheme,
  // Handling of errors during update
  onError(error: any) {
    throw error;
  },
  // Any custom nodes go here
  nodes: [
    HeadingNode,
    ListNode,
    ListItemNode,
    QuoteNode,
    CodeNode,
    CodeHighlightNode,
    TableNode,
    TableCellNode,
    TableRowNode,
    AutoLinkNode,
    LinkNode,
  ],
};

function MyCustomAutoFocusPlugin(props: any) {
  const { setEditor } = props;
  const [editor] = useLexicalComposerContext();

  // const stringifiedEditorState = JSON.stringify(
  //   editor.getEditorState().toJSON()
  // );

  // console.log("editor string", stringifiedEditorState);
  useEffect(() => {
    const contentEditableElement = document.getElementById("editor");
    editor.setRootElement(contentEditableElement);

  }, [editor, setEditor]);

  return null;
}

export default function Editor() {
  const [name, setName] = useState("");
  const [editor, setEditor] = useState("");

  return (
    <div>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<div>Jpt Placeholder</div>}
            />

            <OnChangePlugin onChange={onChange} />

            <AutoFocusPlugin />
            <ListPlugin />
            <LinkPlugin />
            {/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
            <MyCustomAutoFocusPlugin setEditor={setEditor} />
            {/* <CodeHighlightPlugin /> */}
          </div>
          <ActionsPlugin />
        </div>
      </LexicalComposer>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div id="editor"> </div>
    </div>
  );
}
