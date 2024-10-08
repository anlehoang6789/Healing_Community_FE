"use client";

import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/js/plugins/image.min.js";
import "froala-editor/js/plugins/font_family.min.js";
import "froala-editor/js/plugins/font_size.min.js";
import "froala-editor/js/plugins/colors.min.js";
import "froala-editor/js/plugins/video.min.js";
import "froala-editor/js/plugins/paragraph_format.min.js";
import "froala-editor/js/plugins/line_height.min.js";
import "froala-editor/js/plugins/align.min.js";
import "froala-editor/js/plugins/lists.min.js";
import "froala-editor/js/plugins/quote.min.js";
import "froala-editor/js/plugins/special_characters.min.js";
import "froala-editor/js/plugins/link.min.js";
import "froala-editor/js/plugins/word_counter.min.js";
import "froala-editor/js/plugins/word_paste.min.js";
import "froala-editor/js/plugins/save.min.js";
import "froala-editor/js/languages/vi";
import { useState } from "react";

export default function RichTextEditor({ id }: { id: string }) {
  const [model, setModel] = useState<string>("");
  return (
    <div>
      <FroalaEditor
        model={model}
        onModelChange={(e: string) => setModel(e)}
        config={{
          placeholderText: "Nhập nội dung bài viết của bạn...",
          key: "INSERT-YOUR-FROALA-KEY-HERE",
          saveInterval: 2000, //save sau 2s

          events: {
            "save.before": function (html: string) {
              console.log("Saving HTML:", html);
              localStorage.setItem("savedHtml", html);
            },
          },
          imageDefaultWidth: 600,
          // imageResize: false,
          paragraphFormat: {
            N: "Normal",
            H1: "Heading 1",
            H2: "Heading 2",
            H3: "Heading 3",
          },
          toolbarButtons: {
            moreText: {
              buttons: [
                "bold",
                "italic",
                "underline",
                "fontFamily",
                "fontSize",
                "textColor",
                "clearFormatting",
              ],
              buttonsVisible: 3,
              align: "left",
            },
            moreParagraph: {
              buttons: [
                "alignLeft",
                "alignCenter",
                "formatOL",
                "formatUL",
                "alignRight",
                "alignJustify",
                "paragraphFormat",
                "lineHeight",
                "outdent",
                "indent",
                "quote",
              ],
              buttonsVisible: 3,
              align: "left",
            },
            moreRich: {
              buttons: [
                "insertLink",
                "insertImage",
                "insertVideo",
                "specialCharacters",
                "insertHR",
              ],
              buttonsVisible: 2,
              align: "left",
            },
            moreMisc: {
              buttons: [
                "undo",
                "redo",
                "fullscreen",
                "print",
                "getPDF",
                "selectAll",
                "html",
                "help",
              ],
              buttonsVisible: 2,
              align: "right",
            },
            showMoreButtons: true,
          },
          language: "vi",
        }}
        tag="textarea"
      />
    </div>
  );
}
