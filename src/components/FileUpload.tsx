/** @format */

"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";
import { STORAGE } from "../../firebase.config"; // Adjust the import according to your setup
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const FileUpload: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // State to store the PDF URL

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const storageRef = ref(STORAGE, `uploads/${file.name}`);

      try {
        // Upload the file
        await uploadBytes(storageRef, file);
        console.log("File uploaded!");

        // Get the download URL
        const downloadURL: string = await getDownloadURL(storageRef);
        setPdfUrl(downloadURL); // Update the state with the PDF URL
        console.log("File available at", downloadURL);

        // Send the file data to the API
        const response = await fetch("/api/create-chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file_key: storageRef.fullPath, // Use the full path as file key
            file_name: file.name,
          }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Chat created with ID:", data.chat_id);
        } else {
          console.error("Error creating chat:", data.error);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}>
        <input {...getInputProps()} />
        <Inbox className="w-10 h-10 text-blue-500" />
        <p className="mt-2 text-sm text-slate-400">Drop PDF Here</p>
      </div>

      {/* Display the uploaded PDF if available */}
      {pdfUrl && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Uploaded PDF:</h3>
          <iframe
            src={pdfUrl}
            width="100%"
            height="500"
            title="Uploaded PDF"
            style={{ border: "none" }}
          />
        </div>
      )}
    </div>
  );
};

export default FileUpload;
