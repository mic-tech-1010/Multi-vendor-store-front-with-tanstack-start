import { createHeadlessEditor } from "@lexical/headless";
import { $generateHtmlFromNodes } from "@lexical/html";

// import { nodes } from "@/components/editor/nodes";

export function lexicalToHtml(editorStateJSON: any): string {
  if (!editorStateJSON) return "";

  try {
    const editor = createHeadlessEditor({
      namespace: "viewer",
      // nodes,
      onError: (error) => {
        console.error("Lexical error:", error);
      },
    });

    let html = "";

    editor.update(
      () => {
        const editorState =
          editor.parseEditorState(editorStateJSON);

        editor.setEditorState(editorState);

        html = $generateHtmlFromNodes(editor, null);
      },
      {
        discrete: true,
      }
    );

    return html;
  } catch (error) {
    console.error(
      "Error converting Lexical to HTML:",
      error
    );

    return "";
  }
}