import React, { useState } from "react";
import axios from "axios";
import "./ImgInput.css";

const ImgInput = () => {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // store the actual file
      setPreview(URL.createObjectURL(selectedFile)); // preview image
    }
  };

  const handleUpload = async () => {
    if (!file) return alert("Please select an image first!");

    const formData = new FormData();
    formData.append("image", file); // send file to backend

    try {
      const response = await axios.post(
        "http://localhost:5000/api/img/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log("Upload success:", response.data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  return (
    <div className="img-input">
      {/* hidden file input */}
      <input
        onChange={handleFileChange}
        id="file-input"
        type="file"
        accept="image/*"
        style={{ display: "none" }}
      />

      {/* clickable + icon */}
      <label htmlFor="file-input" className="upload-btn">
        <span>+</span>
      </label>

      {/* preview */}
      <div className="preview">
        {preview ? (
          <img src={preview} alt="Preview" />
        ) : (
          <p>No image selected</p>
        )}
      </div>
    </div>
  );
};

export default ImgInput;
