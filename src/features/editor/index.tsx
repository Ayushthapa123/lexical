import { useState, useRef } from "react";
import { $generateHtmlFromNodes } from "@lexical/html";
import { $getRoot, $getSelection, $insertNodes, LexicalEditor } from "lexical";
import { createEditor } from "lexical";
import { useEffect } from "react";



import { ErrorBoundaryType } from "@lexical/react/shared/useDecorators";


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
import TreeViewPlugin from './plugins/TreeViewPlugin'
import CodeHighlightPlugin from "./plugins/CodeHighlightPlugin";


function MyCustomAutoFocusPlugin(props: any) {
  const { setEditor } = props;
  const [editor] = useLexicalComposerContext();

  const stringifiedEditorState = JSON.stringify(
    editor.getEditorState().toJSON()
  );

  // console.log("editor string", stringifiedEditorState);
  useEffect(() => {
    // const contentEditableElement = document.getElementById("editor");
    // editor.setRootElement(contentEditableElement);
    setEditor(stringifiedEditorState);
  }, [editor, setEditor, stringifiedEditorState]);

  return null;
}

const editorConfig = {
  editorState: `{"root":{"children":[{"children":[{"detail":0,"format":1,"mode":"normal","style":"","text":"what the hell is this man??","type":"text","version":1}],"direction":"ltr","format":"","indent":0,"type":"paragraph","version":1}],"direction":"ltr","format":"","indent":0,"type":"root","version":1}}`,
  theme: ExampleTheme,
  // // Handling of errors during update
  onError(error: any) {
    throw error;
  },
  namespace:"Ayush",
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

interface Iprops {
  editorRef:any
}

export default function Editor(props:Iprops) {

  const {editorRef}=props

  const [name, setName] = useState("");
  const [editor, setEditor] = useState("");
  const editorStateRef:any = useRef();

console.log("editor config.editor state",editorConfig.editorState)



  return (
    <div style={{backgroundColor:'red'}}>
      <LexicalComposer initialConfig={editorConfig}>
        <div className="editor-container">
          <ToolbarPlugin />
          <div className="editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="editor-input" />}
              placeholder={<div>Jpt Placeholder</div>}
              
              
            />
            {/* <OnChangePlugin onChange={onChange} /> */}

            <OnChangePlugin onChange={editorState => editorRef.current = editorState} />
            <AutoFocusPlugin />
            <ListPlugin />   
            <LinkPlugin />
            <MyCustomAutoFocusPlugin setEditor={setEditor} />
            <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
            <CodeHighlightPlugin />

            <TreeViewPlugin/>
          </div>
        
        </div>
        <button  onClick={() => {
    if (editorRef.current) {
      console.log("what the hell??",JSON.stringify(editorRef.current))
    }
  }} >Click Me</button>
      </LexicalComposer>
{/* 
      <div id="editor">ff </div>
      <div id="root"></div>
      <div><input value={name}  onChange={(e)=>setName(e.target.value)}/></div> */}
    </div>
  );
}
