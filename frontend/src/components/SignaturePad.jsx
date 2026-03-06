import SignatureCanvas from "react-signature-canvas";
import { useRef } from "react";

function SignaturePad({ setSignature }) {

  const sigRef = useRef();

  const save = () => {
    const data = sigRef.current.toDataURL();
    setSignature(data);
  };

  const clear = () => {
    sigRef.current.clear();
  };

  return (
    <div>

      <SignatureCanvas
        ref={sigRef}
        canvasProps={{
          width: 400,
          height: 200,
          className: "border"
        }}
      />

      <div className="mt-3 flex gap-3">

        <button
          onClick={save}
          className="bg-green-500 text-white px-3 py-1 rounded"
        >
          Save Signature
        </button>

        <button
          onClick={clear}
          className="bg-red-500 text-white px-3 py-1 rounded"
        >
          Clear
        </button>

      </div>

    </div>
  );
}

export default SignaturePad;