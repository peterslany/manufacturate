import { useColorModeValue } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import * as React from "react";

const MDEditor = () => {
  const [fg, bg] = useColorModeValue(["black", "white"], ["white", "black"]);

  const color = { fg, bg, middle: "#999999" };
  const dark = `
  .CodeMirror  {
    color: ${color.fg};
    caret-color: ${color.fg};
    background-color: ${color.bg};
},
.CodeMirror-cursor {
    border-color: ${color.fg};
    background-color: ${color.bg};
},
.editor-toolbar.fullscreen{
    background-color: ${color.bg};
}
.editor-toolbar > * {
    color: ${color.fg};
    background-color: ${color.bg};
},
.editor-toolbar > .active, .editor-toolbar > button:hover, .editor-preview pre, .cm-s-easymde .cm-comment {
    color: ${color.bg} !important;
    background-color: ${color.middle} !important;
},
.CodeMirror-fullscreen, .editor-preview {
    color: ${color.fg} !important;
    background-color: ${color.bg} !important;
}
  `;

  const styles = useColorModeValue("", dark);
  return <Global styles={styles} />;
};
export default MDEditor;
