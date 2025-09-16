"use client";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  FileText,
  Upload,
  X,
  Loader2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

import { useMediaUpload } from "@/modules/media/hooks/useMediaUpload";
import { MediaUploadPaths } from "@/modules/media/types";

interface CvUploaderProps {
  value?: string; // Current CV URL
  onChange: (url: string | null) => void;
  disabled?: boolean;
}

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB for PDF
const ACCEPTED_FILE_TYPES = {
  "application/pdf": [".pdf"]
};

export function CvUploader({
  value,
  onChange,
  disabled = false
}: CvUploaderProps) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const { upload, loading } = useMediaUpload();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];

      // Validate file type
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file only.");
        return;
      }

      // Validate file size
      if (file.size > MAX_SIZE) {
        toast.error("File size must be less than 5MB.");
        return;
      }

      setCurrentFile(file);
      setUploadStatus("uploading");
      setUploadProgress(0);

      try {
        const uploadedMedia = await upload({
          file,
          path: `${MediaUploadPaths.GALLERY}/cv`, // Store CV files in a separate folder
          onProgress: (progress) => {
            setUploadProgress(progress.percentage);
          }
        });

        if (uploadedMedia) {
          setUploadStatus("success");
          onChange(uploadedMedia.url);
          toast.success("CV uploaded successfully!");
        } else {
          throw new Error("Upload failed");
        }
      } catch {
        setUploadStatus("error");
        setUploadProgress(0);
        toast.error("Failed to upload CV. Please try again.");
      }
    },
    [upload, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize: MAX_SIZE,
    multiple: false,
    disabled: disabled || loading,
    accept: ACCEPTED_FILE_TYPES,
    onDragEnter: undefined,
    onDragOver: undefined,
    onDragLeave: undefined
  });

  const handleRemoveCv = () => {
    onChange(null);
    setCurrentFile(null);
    setUploadStatus("idle");
    setUploadProgress(0);
  };

  const getFileName = () => {
    if (currentFile) return currentFile.name;
    if (value) {
      // Extract filename from URL
      const urlParts = value.split("/");
      return urlParts[urlParts.length - 1] || "cv.pdf";
    }
    return null;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // If there's an uploaded file or existing value, show the file card
  if (value || currentFile) {
    return (
      <Card className="p-4 shadow-none border-dashed">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <FileText className="h-8 w-8 text-red-500" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium text-gray-900 truncate">
                {getFileName()}
              </p>

              {uploadStatus === "uploading" && (
                <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
              )}
              {uploadStatus === "success" && (
                <CheckCircle2 className="h-4 w-4 text-green-500" />
              )}
              {uploadStatus === "error" && (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
            </div>

            {currentFile && (
              <p className="text-xs text-gray-500">
                {formatFileSize(currentFile.size)}
              </p>
            )}

            {uploadStatus === "uploading" && (
              <div className="mt-2">
                <Progress value={uploadProgress} className="h-1" />
                <p className="text-xs text-gray-500 mt-1">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </div>

          <div className="flex-shrink-0">
            {value && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => window.open(value, "_blank")}
                disabled={disabled || uploadStatus === "uploading"}
                className="mr-2"
              >
                View
              </Button>
            )}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleRemoveCv}
              disabled={disabled || uploadStatus === "uploading"}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  // Show upload dropzone
  return (
    <div
      className={`w-full h-32 rounded-lg border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors duration-200 flex items-center justify-center cursor-pointer ${
        isDragActive ? "border-primary bg-primary/5" : ""
      } ${disabled || loading ? "opacity-50 cursor-not-allowed" : ""}`}
      {...getRootProps()}
    >
      <input {...getInputProps()} disabled={disabled || loading} />

      <div className="text-center">
        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
        <div className="space-y-1">
          <p className="text-sm text-gray-600">
            {isDragActive ? "Drop your CV here" : "Upload your CV (PDF)"}
          </p>
          <div className="flex items-center justify-center space-x-2">
            <Badge variant="outline" className="text-xs">
              PDF only
            </Badge>
            <Badge variant="outline" className="text-xs">
              Max 5MB
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
}
