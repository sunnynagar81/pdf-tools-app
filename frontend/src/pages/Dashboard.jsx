import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleUpload = async () => {
    if (!file) return alert("Select file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("https://pdf-tools-app-knwd.onrender.com/api/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("File uploaded");
      setFile(null);
      getFiles();
    } catch (error) {
      console.log(error);
    }
  };

  const getFiles = async () => {
    try {
      const res = await axios.get("https://pdf-tools-app-knwd.onrender.com/api/files", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setFiles(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFile = async (id) => {
    try {
      await axios.delete(`https://pdf-tools-app-knwd.onrender.com/api/files/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      getFiles();
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">PDF Dashboard</h1>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Upload Section */}

      <div className="bg-white p-6 rounded shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Upload PDF</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-3"
        />

        <br />

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </div>

      {/* Tools */}

      <div className="grid grid-cols-3 gap-6 mb-10">

<div
onClick={()=>navigate("/signature")}
className="bg-red-500 text-white p-10 rounded-xl text-center cursor-pointer hover:scale-105">
✍️ Sign PDF
</div>

<div
onClick={()=>navigate("/merge")}
className="bg-blue-500 text-white p-10 rounded-xl text-center cursor-pointer hover:scale-105">
📄 Merge PDF
</div>

<div
onClick={()=>navigate("/compress")}
className="bg-green-500 text-white p-10 rounded-xl text-center cursor-pointer hover:scale-105">
📦 Compress PDF
</div>

</div>

      {/* Files */}

      <div className="bg-white p-6 shadow rounded">

        <h2 className="text-xl font-semibold mb-4">Your Files</h2>

        {files.length === 0 ? (
          <p>No files uploaded</p>
        ) : (
          files.map((f) => (
            <div
              key={f._id}
              className="flex justify-between border-b py-2"
            >
              <p>{f.filename}</p>

              <div className="flex gap-3">

                <a
                  href={`https://pdf-tools-app-knwd.onrender.com/uploads/${f.filename}`}
                  target="_blank"
                  className="text-blue-500"
                >
                  Download
                </a>

                <button
                  onClick={() => deleteFile(f._id)}
                  className="text-red-500"
                >
                  Delete
                </button>

              </div>
            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default Dashboard;