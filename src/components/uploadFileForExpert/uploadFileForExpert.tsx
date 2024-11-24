"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CheckIcon, FolderUp, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import certificateApiRequest from "@/apiRequests/expert";
import { CertificateSchemaType } from "@/schemaValidations/expert.schema";
import DialogExpertInfo from "@/components/expertInfo/dialog-expert-info";

export default function UploadFileForExpert() {
  const [filesByType, setFilesByType] = useState<{ [key: string]: File[] }>({});
  const [progressByType, setProgressByType] = useState<{
    [key: string]: {
      [fileName: string]: { progress: number; paused: boolean };
    };
  }>({});
  const [open, setOpen] = useState(false);
  const [documentType, setDocumentType] = useState("");
  const [dragging, setDragging] = useState(false);
  const [documentTypes, setDocumentTypes] = useState<
    { value: string; label: string }[]
  >([]); // State to hold document types

  useEffect(() => {
    const fetchCertificateTypes = async () => {
      try {
        const response = await certificateApiRequest.getCertificateTypes();
        const types = response.payload.data.map(
          (cert: CertificateSchemaType) => ({
            value: cert.certificateTypeId,
            label: cert.name,
          })
        );
        setDocumentTypes(types);
      } catch (error) {
        console.error("Failed to fetch certificate types", error);
      }
    };

    fetchCertificateTypes();
  }, []);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (uploadedFiles && documentType) {
      const fileArray = Array.from(uploadedFiles);
      setFilesByType((prev) => ({
        ...prev,
        [documentType]: [...(prev[documentType] || []), ...fileArray],
      }));

      fileArray.forEach((file) => {
        setProgressByType((prev) => ({
          ...prev,
          [documentType]: {
            ...(prev[documentType] || {}),
            [file.name]: { progress: 0, paused: false },
          },
        }));
        simulateUploadProgress(file.name, documentType);
      });
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const droppedFiles = event.dataTransfer.files;
    const fileArray = Array.from(droppedFiles);
    if (documentType) {
      setFilesByType((prev) => ({
        ...prev,
        [documentType]: [...(prev[documentType] || []), ...fileArray],
      }));
      fileArray.forEach((file) => {
        setProgressByType((prev) => ({
          ...prev,
          [documentType]: {
            ...(prev[documentType] || {}),
            [file.name]: { progress: 0, paused: false },
          },
        }));
        simulateUploadProgress(file.name, documentType);
      });
    }
  };

  const simulateUploadProgress = (fileName: string, docType: string) => {
    const interval = setInterval(() => {
      setProgressByType((prev) => {
        const fileProgress = prev[docType]?.[fileName];
        if (!fileProgress || fileProgress.paused) return prev;

        const updatedProgress = fileProgress.progress + 5;
        if (updatedProgress >= 100) {
          clearInterval(interval);
          return {
            ...prev,
            [docType]: {
              ...prev[docType],
              [fileName]: { ...fileProgress, progress: 100 },
            },
          };
        }
        return {
          ...prev,
          [docType]: {
            ...prev[docType],
            [fileName]: { ...fileProgress, progress: updatedProgress },
          },
        };
      });
    }, 500);
  };

  const handlePause = (fileName: string, docType: string) => {
    setProgressByType((prev) => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        [fileName]: { ...prev[docType][fileName], paused: true },
      },
    }));
  };

  const handleResume = (fileName: string, docType: string) => {
    setProgressByType((prev) => ({
      ...prev,
      [docType]: {
        ...prev[docType],
        [fileName]: { ...prev[docType][fileName], paused: false },
      },
    }));
    simulateUploadProgress(fileName, docType);
  };

  const handleDelete = (fileName: string, docType: string) => {
    setFilesByType((prev) => ({
      ...prev,
      [docType]: prev[docType].filter((file) => file.name !== fileName),
    }));
    setProgressByType((prev) => {
      const { [fileName]: _, ...rest } = prev[docType];
      return { ...prev, [docType]: rest };
    });
  };

  const handleSave = () => {
    // Implement save functionality here
    console.log("Saving files:", filesByType);
  };

  return (
    <div className="w-full bg-background h-auto p-4 max-w-7xl overflow-hidden mx-auto rounded-lg shadow-lg border">
      <div className="flex items-center justify-between">
        <h2 className="mb-2 text-2xl font-bold text-muted-foreground">
          Tải lên tài liệu
        </h2>
        <DialogExpertInfo />
      </div>

      <p className="text-muted-foreground">Tải lên tài liệu bạn muốn chia sẻ</p>

      <div className="my-4">
        <h4 className="text-lg font-semibold mb-2 text-muted-foreground">
          Chọn loại tài liệu
        </h4>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="headerIcon"
              role="combobox"
              aria-expanded={open}
              className="w-[210px] justify-between border-gray-500 whitespace-normal"
            >
              {documentType
                ? documentTypes.find((type) => type.value === documentType)
                    ?.label
                : "Chọn loại tệp"}
              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search document..." className="h-9" />
              <CommandList>
                <CommandEmpty>No document type found.</CommandEmpty>
                <CommandGroup>
                  {documentTypes.map((type) => (
                    <CommandItem
                      key={type.value}
                      value={type.value}
                      onSelect={(currentValue) => {
                        setDocumentType(
                          currentValue === documentType ? "" : currentValue
                        );
                        setOpen(false);
                      }}
                    >
                      {type.label}
                      <CheckIcon
                        className={cn(
                          "ml-auto h-4 w-4",
                          documentType === type.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div
        className={`border-dashed border-2 p-4 mb-4 rounded-lg ${
          dragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <FolderUp color="gray" />
          <span className="text-gray-600 ">Kéo và thả tệp ở đây</span>
          <span className="text-gray-600">Hoặc</span>

          <label htmlFor="file-upload">
            <Input
              type="file"
              multiple
              className="hidden"
              id="file-upload"
              onChange={handleFileUpload}
            />
            <Button
              onClick={() => document.getElementById("file-upload")?.click()}
              variant="default"
            >
              Chọn tệp
            </Button>
          </label>
        </div>
      </div>

      <div className="b p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-muted-foreground">
          Tệp đã đăng
        </h3>
        <ul>
          {Object.entries(filesByType).flatMap(([docType, files]) =>
            files.map((file) => (
              <li
                key={`${docType}-${file.name}`}
                className="mb-2 flex flex-col justify-start items-start border-2 p-4 rounded-lg"
              >
                <span className="text-muted-foreground mb-1">
                  {documentTypes.find((type) => type.value === docType)
                    ?.label || "Chưa chọn"}
                </span>
                <span className="text-muted-foreground">{file.name}</span>
                <div className="flex items-center w-full">
                  <div className="flex-grow">
                    <Progress
                      value={
                        progressByType[docType]?.[file.name]?.progress || 0
                      }
                    />
                  </div>
                  <div className="flex items-center ml-4">
                    {progressByType[docType]?.[file.name]?.progress === 100 ? (
                      <>
                        <span className="text-green-600 font-semibold mr-2">
                          Thành công
                        </span>
                        <Button
                          onClick={() => handleDelete(file.name, docType)}
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </>
                    ) : progressByType[docType]?.[file.name]?.paused ? (
                      <div>
                        <Button
                          onClick={() => handleResume(file.name, docType)}
                          variant="default"
                          className="ml-2 mr-2"
                        >
                          Tiếp tục
                        </Button>

                        <Button
                          onClick={() => handleDelete(file.name, docType)}
                          variant="destructive"
                          size="icon"
                          className="h-6 w-6"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <Button
                        onClick={() => handlePause(file.name, docType)}
                        variant="default"
                        className="ml-2"
                      >
                        Dừng
                      </Button>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="mt-4 flex justify-end">
        <Button onClick={handleSave} variant="default">
          Lưu
        </Button>
      </div>
    </div>
  );
}
