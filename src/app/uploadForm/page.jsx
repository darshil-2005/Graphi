'use client'

import { useState } from "react";

export default function UploadForm() {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Store the selected file
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();
        formData.append("file", file); // Attach the file to FormData

        setUploading(true);
        setMessage("");

        try {
            const response = await fetch("/api/fileUploader", {
                method: "POST",
                body: formData, // Send FormData to the backend
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("File uploaded successfully!");
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            setMessage("Upload failed");
        }

        setUploading(false);
    };

    return (
        <form onSubmit={handleUpload} encType="multipart/form-data"  className="h-20 w-20">

            <label htmlFor="formupload">Upload</label>
            <input type="file" onChange={handleFileChange} name="formupload" id='formupload' required />
            <button type="submit" disabled={uploading}>
                {uploading ? "Uploading..." : "Upload"}
            </button>
            {message && <p>{message}</p>}
        </form>
    );
}
