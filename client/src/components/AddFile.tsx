import axios from "axios";
import React, { useState, useEffect } from "react";

type Props = {};

function AddFile({}: Props) {
  const [file, setFile] = useState<File>();
  const [response, setResponse] = useState<any>();

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setFile(files[0]);
  };
  const onFileUpload = () => {
    const form = new FormData();
    if (file) {
      form.append("my-file", file);
      axios
        .post("http://localhost:4000/files/api/upload", form)
        .then((res) => {
          setResponse(res.data);
          console.log(res.data.error);
        })
        .catch((e) => setResponse(e));
    }
  };

  return (
    <div className='form-container'>
      <div className='input-container'>
        <input
          type='file'
          placeholder='upload file Here'
          onChange={(e) => onFileChange(e)}
        />
        <button onClick={onFileUpload}>Upload</button>
      </div>
      <span
        className={`notification ${
          response && (response.error ? " error" : " success")
        }`}
      >
        {response && response.message}
      </span>
    </div>
  );
}

export default AddFile;
