/** @format */

"use client";

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";
import { STORAGE } from "../../firebase.config"; // Adjust the import according to your setup
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

const FileUpload: React.FC = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null); // State to store the PDF URL

  // Define the mutation for uploading the file
  const { mutate } = useMutation({
    mutationFn: async ({
      fileKey,
      fileName,
    }: {
      fileKey: string;
      fileName: string;
    }) => {
      const response = await axios.post("/api/create-chat", {
        file_key: fileKey,
        file_name: fileName,
      });
      return response.data; // Return the response data
    },
    onSuccess: (data) => {
      console.log("Chat created with ID:", data.chat_id);
    },
    onError: (error) => {
      console.error("Error creating chat:", error);
    },
  });

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];

      // Check file size (5 MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size exceeds 5 MB limit!");
        return;
      }

      const storageRef = ref(STORAGE, `uploads/${file.name}`);

      try {
        // Upload the file
        await uploadBytes(storageRef, file);
        toast.success("File uploaded successfully!");

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);
        setPdfUrl(downloadURL); // Update the state with the PDF URL
        console.log("File available at", downloadURL);

        // Call the mutate function with fileKey and fileName
        mutate({
          fileKey: storageRef.fullPath, // Use the full path as file key
          fileName: file.name,
        });
      } catch (error) {
        console.error("Error uploading file or sending data to API:", error);
        toast.error("Error uploading file. Please try again.");
      }
    },
  });

  // Function to open the PDF in a new tab
  const openPdfInNewTab = () => {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank"); // Open the PDF URL in a new tab
    }
  };

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
          <button
            onClick={openPdfInNewTab}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
            View PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
