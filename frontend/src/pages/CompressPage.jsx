import { useState } from "react";
import axios from "axios";

function CompressPage() {

  const [file, setFile] = useState(null);

  const compress = async () => {

    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post(
      "https://pdf-tools-app-knwd.onrender.com/api/pdf/compress",
      formData,
      { responseType: "blob" }
    );

    const url = window.URL.createObjectURL(res.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = "compressed.pdf";
    link.click();
  };

  return (

    <div className="p-10">

      <h1 className="text-3xl mb-5">Compress PDF</h1>

      <input
        type="file"
        onChange={(e)=>setFile(e.target.files[0])}
        className="mb-4"
      />

      <br/>

      <button
        onClick={compress}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Compress & Download
      </button>

    </div>
  );
}

export default CompressPage;