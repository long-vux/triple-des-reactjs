import React, { useState, useEffect } from "react";
import CryptoJS from "crypto-js";

function FileEncryption({ fileType }) {
  const [file, setFile] = useState(null);
  const [encryptKey, setEncryptKey] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [encryptError, setEncryptError] = useState("");
  const [decryptError, setDecryptError] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  useEffect(() => {
    setEncryptKey('');
    setDecryptKey('');
    setEncryptError('');
    setDecryptError('');
    setImageUrl(null);
    setVideoUrl(null);
    setFile(null);
  }, [fileType]);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setEncryptError("");
    setDecryptError("");
  };

  const encryptFile = () => {
    if (!file) {
      setEncryptError("Please select a file!");
      return;
    } else if (!encryptKey) {
      setEncryptError("Please provide a key!");
      return;
    } 

    function getMimeType(base64String) {
      const match = base64String.match(/^data:(.+?);base64,/);
      return match ? match[1] : null; // Return the MIME type or null if not found
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileData = e.target.result; // Base64 string of the file
      console.log('fileData', e.target);
      if (fileType === "Image") {
        if (getMimeType(fileData) !== "image/jpeg" && getMimeType(fileData) !== "image/png" && getMimeType(fileData) !== "image/jpg") {
          setEncryptError("File type not supported!");
          return;
        }
      } else if (fileType === "Video") {
        if (getMimeType(fileData) !== "video/mp4" && getMimeType(fileData) !== "video/avi" && getMimeType(fileData) !== "video/mov") {
          setEncryptError("File type not supported!");
          return;
        }
      }
      const encrypted = CryptoJS.TripleDES.encrypt(fileData, encryptKey).toString();

      if (!encrypted) {
        setEncryptError("Encryption failed! Check your key or file.");
        return;
      }

      const blob = new Blob([encrypted], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${file.name}.enc`;
      link.click();
    };
    reader.readAsDataURL(file); // Read file as Base64
  };

  const decryptFile = () => {
    if (imageUrl || videoUrl) {
      URL.revokeObjectURL(imageUrl);
      URL.revokeObjectURL(videoUrl);
    }
    if (!file) {
      setDecryptError("Please select a file!");
      return;
    } else if (!decryptKey) {
      setDecryptError("Please provide a key!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const encryptedData = e.target.result; // Read encrypted text
        const decrypted = CryptoJS.TripleDES.decrypt(encryptedData, decryptKey).toString(
          CryptoJS.enc.Utf8
        );

        if (!decrypted) {
          setDecryptError("Decryption failed! Check your key or file.");
          return;
        }

        const decodedData = decrypted.split(",")[1]; // Remove Base64 metadata if present
        const binaryArray = Uint8Array.from(atob(decodedData), (char) => char.charCodeAt(0));
        const blob = new Blob([binaryArray], { type: file.type });

        const url = URL.createObjectURL(blob);
        if (fileType === "Image") {
          setImageUrl(url);
        } else if (fileType === "Video") {
          setVideoUrl(url);
        }
        // const link = document.createElement("a");
        // link.href = url;
        // link.download = file.name.replace(".enc", "");
        // link.click();
      } catch (error) {
        console.error(error);
        setDecryptError("Decryption failed! Check your key or file.");
      }
    };
    reader.readAsText(file); // Read file as text
  };

  function generateKey() {
    const array = new Uint8Array(21); // 7 bytes = 56 bits => 21 bytes = 168 bits
    window.crypto.getRandomValues(array);
    return Array.from(array).map(byte => byte.toString(16).padStart(2, '0')).join('');
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-8 mb-8">
        {/* Encryption Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{fileType} Encryption</h2>
          <input type="file" onChange={handleFileChange} />
          <div className="flex flex-row gap-2 mt-4 ">
            <input
              type="text"
              className={`w-full p-2 border ${encryptError ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 ${encryptError ? "focus:ring-red-400" : "focus:ring-blue-400"
                }`}
              placeholder="Enter encryption key"
              value={encryptKey}
              onChange={(e) => {
                const key = e.target.value;
                setEncryptKey(key);
              }}
            />
            <button
              className="bg-green-500 text-white text-sm font-medium py-1 rounded-md hover:bg-green-600 w-[100px]"
              onClick={() => {
                const randomKey = generateKey()
                setEncryptKey(randomKey);
                setEncryptError("");
              }}
            >
              Random
            </button>
          </div>
          {encryptError && <p className="text-red-500 mt-2">{encryptError}</p>}
          <button
            className="w-full bg-green-500 text-white px-6 py-2 rounded-md mt-4 hover:bg-green-600"
            onClick={encryptFile}
          >
            Encrypt
          </button>
        </div>

        {/* Decryption Section */}
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{fileType} Decryption</h2>
          <input type="file" onChange={handleFileChange} />
          <input
            type="text"
            placeholder="Enter decryption key"
            value={decryptKey}
            onChange={(e) => {
              setDecryptKey(e.target.value);
              setDecryptError("");
            }}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mt-4"
          />
          {decryptError && <p className="text-red-500 mt-2">{decryptError}</p>}
          <button
            className="w-full bg-red-500 text-white px-6 py-2 rounded-md mt-4 hover:bg-red-600"
            onClick={decryptFile}
          >
            Decrypt
          </button>
        </div>
      </div>
      {imageUrl && <img src={imageUrl} alt="Preview" className="w-full h-auto" />}
      {videoUrl && <video src={videoUrl} controls autoPlay loop muted playsInline className="w-full h-auto" alt="Preview" />}
    </div>
  );
}

export default FileEncryption;
