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
  root.innerHTML=`${d}`
}

function onChange(editorState: any) {
  editorState.read(() => {
    // Read the contents of the EditorState here.
    const root = $getRoot();
    const selection = $getSelection();
    console.log("htmlstring", root.exportJSON());

    const editor2 = createEditor();
    console.log("editor2", editor2);
    const htmlString = $generateHtmlFromNodes(editor2, null);

    console.log("htmlstr", htmlString);

    hi(htmlString);
  });

  // const editor2 = createEditor();

  // const eds = editor2.getEditorState();
  // const json = eds.toJSON();
  // console.log("editorstates to json", json);
  // const jsonString = JSON.stringify(eds);
  // console.log("editorstates to stinggyfy", jsonString);
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
  // const { setEditor } = props;
  // const [editor] = useLexicalComposerContext();

  // const stringifiedEditorState = JSON.stringify(
  //   editor.getEditorState().toJSON()
  // );

  // console.log("editor string", stringifiedEditorState);

  // const newEditorState = editor.parseEditorState(stringifiedEditorState);

  // console.log("editor normal", newEditorState);

  // const contentEditableElement = document.getElementById("editor");

  // editor.setRootElement(contentEditableElement);

  // useEffect(() => {
  //   // const contentEditableElement = document.getElementById("editor");

  //   // editor.setRootElement(contentEditableElement);

  //   // Focus the editor when the effect fires!

  //   editor.focus();

  //   setEditor(editor);
  // }, [editor, setEditor]);

  return null;
}

export default function Editor() {
  const [name, setName] = useState("");
  // const [data, setData] = useState("");
  // const [editor, setEditor] = useState("");

  // // console.log(editor);

  // // const editorr = createEditor(editorConfig);

  // const editor2 = createEditor();

  // const eds = editor2.getEditorState();
  // const json = eds.toJSON();
  // console.log("editorstates to json", json);
  // const jsonString = JSON.stringify(eds);
  // console.log("editorstates to stinggyfy", jsonString);

  // editor2.update(() => {
  //   // In the browser you can use the native DOMParser API to parse the HTML string.

  //   const htmlString = $generateHtmlFromNodes(editor2, null);
  //   const parser = new DOMParser();
  //   const dom = parser.parseFromString(htmlString, "text/html");

  //   // Once you have the DOM instance it's easy to generate LexicalNodes.
  //   const nodes = $generateNodesFromDOM(editor2, dom);

  //   console.log("nodes", nodes);
  //   // Select the root
  //   $getRoot().select();

  //   // Insert them at a selection.
  //   // $insertNodes(nodes);
  //   $getRoot().select();
  //   $insertNodes(nodes);

  // });



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
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <MyCustomAutoFocusPlugin  />
            <CodeHighlightPlugin />
          </div>
          <ActionsPlugin />
        </div>
      </LexicalComposer>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <div id="editor">ff </div>
      <div id="root"></div>
    </div>
  );
}
