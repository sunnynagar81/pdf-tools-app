import { useState } from "react";
import axios from "axios";

function MergePage() {

  const [files, setFiles] = useState([]);

  const merge = async () => {

    const formData = new FormData();

    for (let file of files) {
      formData.append("files", file);
    }

    const res = await axios.post(
      "https://pdf-tools-app-knwd.onrender.com/api/pdf/merge",
      formData,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(res.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = "merged.pdf";
    link.click();
  };

  return (

    <div className="p-10">

      <h1 className="text-3xl mb-5">Merge PDF</h1>

      <input
        type="file"
        multiple
        onChange={(e)=>setFiles(e.target.files)}
        className="mb-4"
      />

      <br/>

      <button
        onClick={merge}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Merge & Download
      </button>

    </div>
  );
}

export default MergePage;