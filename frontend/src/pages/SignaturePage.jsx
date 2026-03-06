import { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import axios from "axios";

function SignaturePage() {

  const sigRef = useRef();
  const [file, setFile] = useState(null);

  const signPdf = async () => {

    if (!file) {
      alert("Upload a PDF first");
      return;
    }

    const signature = sigRef.current.toDataURL();

    const formData = new FormData();

    formData.append("file", file);
    formData.append("signature", signature);

    const res = await axios.post(
      "http://localhost:5000/api/pdf/sign",
      formData,
      {
        responseType: "blob"
      }
    );

    const url = window.URL.createObjectURL(res.data);

    const link = document.createElement("a");
    link.href = url;
    link.download = "signed.pdf";
    link.click();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">Sign PDF</h1>

      <div className="bg-white p-6 rounded shadow w-fit">

        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <h3 className="mb-2">Draw Signature</h3>

        <SignatureCanvas
          ref={sigRef}
          canvasProps={{
            width: 400,
            height: 200,
            className: "border"
          }}
        />

        <div className="flex gap-3 mt-4">

          <button
            onClick={() => sigRef.current.clear()}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Clear
          </button>

          <button
            onClick={signPdf}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Sign & Download
          </button>

        </div>

      </div>

    </div>
  );
}

export default SignaturePage;