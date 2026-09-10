import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";

// Shared extensions matching the commands exposed in
// rich-text-editor-control.tsx (FontFamily, Subscript, Superscript,
// TextAlign, Highlight). Importing these here also augments TipTap's
// ChainedCommands type so `tsc` accepts those commands.
export const defaultEditorExtensions = [
    StarterKit,
    TextStyle,
    FontFamily,
    Subscript,
    Superscript,
    TextAlign.configure({ types: ["heading", "paragraph"] }),
    Highlight.configure({ multicolor: true }),
];
