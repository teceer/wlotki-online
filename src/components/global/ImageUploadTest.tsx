"use client";
import React from "react";
import { UploadDropzone } from "~/lib/uploadthing";

export default function ImageUploadTest() {
  return (
    <UploadDropzone
      config={{
        mode: "auto",
      }}
      content={{
        label: "Label",
        button({ ready, isUploading, uploadProgress }) {
          if (isUploading) return <div>Wysyłanie...</div>;
          if (uploadProgress) return <div>Wysyłanie...</div>;
          if (ready) return <div>Wyślij zdjęcie</div>;

          return "Ładowanie...";
        },
      }}
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        if (res && res.length > 0 && res[0]?.url) {
          alert(`SUCCESS! ${res[0].url}`);
        }
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
