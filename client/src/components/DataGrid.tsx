import React, { useState, useEffect } from "react";
import fileData from "../data";
import { MdDelete } from "react-icons/md";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import axios from "axios";

type file = {
  id: string;
  name: string;
  size: string;
  uploadedAt: string;
  path: string;
};

const DataGrid = () => {
  const [files, setFiles] = useState<file[] | []>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filesPerPage, setFilesPerPage] = useState(2);

  const onNextPage = () => {
    if (Math.ceil(files.length / filesPerPage) > currentPage)
      setCurrentPage((prev) => prev + 1);
  };

  const onPrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleDelete = (id: string, name: string) => {
    const filtered = files.filter((file) => file.id !== id);
    setFiles(() => filtered);
    axios.delete("http://localhost:4000/files/api/delete/" + id, {
      data: { name },
    });
  };

  const fetchData = async () => {
    axios
      .get("http://localhost:4000/files/api/all")
      .then((res) => setFiles(res.data))
      .catch((err) => console.log("error"));
  };

  useEffect(() => {
    fetchData();
  }, []);
  const lastIndex = currentPage * filesPerPage;
  const firstIndex = lastIndex - filesPerPage;
  const filtred = files.slice(firstIndex, lastIndex);

  return (
    <div className='table-container'>
      <h2>Files</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Size</th>
            <th>Uploaded At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtred.map((file) => (
            <tr key={file.id}>
              <td>{file.name}</td>
              <td>{(parseInt(file.size) / 1000000).toFixed(2)}MB</td>
              <td>{file.uploadedAt.slice(0, 16)}</td>
              <td onClick={() => handleDelete(file.id, file.name)}>
                <span className='delete-btn'>
                  <MdDelete />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='pagination'>
        <p className='indexs'>
          <span>
            {firstIndex + 1} - {lastIndex}{" "}
          </span>{" "}
          of {files.length}
        </p>
        <button className='btn-container'>
          <span
            className={`btn prev ${currentPage === 1 ? " hidden" : "show"}`}
            onClick={onPrevPage}
          >
            <GrFormPrevious />
          </span>
          <span
            className={`btn next ${
              currentPage >= Math.ceil(files.length / filesPerPage)
                ? " hidden"
                : " show"
            }`}
            onClick={onNextPage}
          >
            <GrFormNext />
          </span>
        </button>
      </div>
    </div>
  );
};

export default DataGrid;
