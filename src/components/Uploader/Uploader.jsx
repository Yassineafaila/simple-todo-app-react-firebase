import React, { useState } from "react";
import "./Uploader.css";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";

function Uploader() {
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("No selected file");
  return (
    <>
      <form
        onClick={() => document.querySelector(".input-field").click()}
        className="upload-container d-flex justify-content-center align-items-center mx-auto"
      >
        <input
          type="file"
          accept="image/*"
          className="input-field"
          hidden
          onChange={({ target: { files } }) => {
            files[0] && setFileName(files[0].name);
            if (files) {
              setImage(URL.createObjectURL(files[0]));
            }
          }}
        />
        {image ? (
          <img src={image} width={290} height={290} alt={fileName} />
        ) : (
          <>
            <MdCloudUpload color="#1475cf" size={60} />
            <p>Browse Files to upload</p>
          </>
        )}
      </form>
      <section className="upload-row my-2 d-flex justify-content-between align-items-center py-3 px-4">
        <AiFillFileImage color="#1475cf" />
        <span className="upload-content d-flex align-items-center">
          
          {fileName}-
          <MdDelete
            onClick={() => {
              setFileName("No selected file");
              setImage(null);
            }}
          />
        </span>
      </section>
    </>
  );
}

export default Uploader;
