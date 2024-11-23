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
import { useUploadAvatarCoverFromFileMutation } from "@/queries/usePost";

interface RichTextEditorProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
}

interface FroalaEditorInstance {
  $el: HTMLElement[];
  image: {
    insert: (
      url: string,
      showLoader: boolean | null,
      dimensions: any | null,
      callback?: (url: string) => Promise<string>
    ) => void;
  };
  html: {
    get: () => string;
    set: (html: string) => void;
  };
}

export default function RichTextEditor({
  id,
  value,
  onChange,
}: RichTextEditorProps) {
  const uploadImage = useUploadAvatarCoverFromFileMutation();

  return (
    <div>
      <FroalaEditor
        model={value}
        onModelChange={onChange}
        config={{
          placeholderText: "Nhập nội dung bài viết của bạn...",
          key: "INSERT-YOUR-FROALA-KEY-HERE",
          saveInterval: 2000, //save sau 2s

          events: {
            "image.beforeUpload": async function (
              this: FroalaEditorInstance,
              images: File[]
            ) {
              try {
                const editor = this;

                for (const imageFile of images) {
                  const formData = new FormData();
                  formData.append("file", imageFile);

                  const uploadResult = await uploadImage.mutateAsync(formData);

                  const uploadedImageUrl = uploadResult.payload.url;
                  console.log(
                    "trả về cái đường dẫn url từ firebase:",
                    uploadedImageUrl
                  );
                  const imagesInEditor = editor.$el[0].querySelectorAll("img");
                  const lastImage = imagesInEditor[imagesInEditor.length - 1];
                  if (lastImage && lastImage.src.startsWith("blob:")) {
                    lastImage.src = uploadedImageUrl; // Cập nhật URL
                  }
                }
              } catch (error) {
                console.error("Error uploading image:", error);
              }
              return false;
            },
            "save.before": function (html: string) {
              localStorage.setItem("savedHtml", html);
            },
          },
          imageDefaultWidth: 600,
          imageResize: false,
          imageMaxWidth: 600,
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
