import { useState, useRef } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { $getRoot, $getSelection, $insertNodes, LexicalEditor } from "lexical";
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

function hi(d) {
  console.log("hi", d);
  const root = document.getElementById("root");
  root.innerHTML = `${d}`;
}

function onChange(editorState: any) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();
    console.log("htmlstring", root.exportJSON());

    const editor2 = createEditor();
    console.log("editor2", editor2._editorState);
    const htmlString = $generateHtmlFromNodes(editor2, null);

    // console.log("htmlstr", htmlString);

    // hi(htmlString);
  });
}

function MyCustomAutoFocusPlugin(props: any) {
  const { setEditor } = props;
  const [editor] = useLexicalComposerContext();

  const stringifiedEditorState = JSON.stringify(
    editor.getEditorState().toJSON()
  );

  console.log("editor string", stringifiedEditorState);
  useEffect(() => {
    // const contentEditableElement = document.getElementById("editor");
    // editor.setRootElement(contentEditableElement);
    setEditor(stringifiedEditorState);
  }, [editor, setEditor, stringifiedEditorState]);

  return null;
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

export default function Editor() {
  const [name, setName] = useState("");
  const [editor, setEditor] = useState("");

  const x = {
    root: {
      children: [
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Welcome to the Markdown example",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "heading",
          version: 1,
          tag: "h1",
        },
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Here are some text formats: ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 16,
              mode: "normal",
              style: "",
              text: "code",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: ", ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: "bold",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: ", ",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 2,
              mode: "normal",
              style: "",
              text: "italic",
              type: "text",
              version: 1,
            },
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: " and so on.",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
        {
          children: [
            {
              detail: 0,
              format: 0,
              mode: "normal",
              style: "",
              text: "Here is a list example:",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
        {
          children: [],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
        {
          children: [],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
        {
          children: [
            {
              detail: 0,
              format: 1,
              mode: "normal",
              style: "",
              text: "Fucking Example is thislkhkkjk",
              type: "text",
              version: 1,
            },
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "paragraph",
          version: 1,
        },
      ],
      direction: "ltr",
      format: "",
      indent: 0,
      type: "root",
      version: 1,
    },
  };

  const y = x.root.children[0];
  console.log("y", y);

  console.log("fuck", editor);
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
            {/* <OnChangePlugin onChange={onChange} /> */}
            <AutoFocusPlugin />
            <ListPlugin />   
            <LinkPlugin />
            <MyCustomAutoFocusPlugin setEditor={setEditor} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <CodeHighlightPlugin />
          </div>
          <ActionsPlugin />
        </div>
      </LexicalComposer>

      <div id="editor">ff </div>
      <div id="root"></div>
      <div><input value={name}  onChange={(e)=>setName(e.target.value)}/></div>
    </div>
  );
}
