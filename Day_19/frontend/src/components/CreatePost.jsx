// src/pages/CreatePost.jsx
import React, { useState } from "react";
import axios from "../api/axiosConfig"; // import axios instance
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await axios.post("/post", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setCaption(res.data.post.caption);
      alert("Post created!");
    } catch (err) {
      console.error(err);
      alert("Error creating post");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <button type="submit">Create Post</button>
      </form>

      {caption && (
        <div>
          <h3>Generated Caption:</h3>
          <p>{caption}</p>
        </div>
      )}
    </div>
  );
};

export default CreatePost;
