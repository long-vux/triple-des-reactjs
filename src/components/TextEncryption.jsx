import React, { useState } from "react";
import CryptoJS from "crypto-js";

function TextEncryption() {
  const [encryptPlaintext, setEncryptPlaintext] = useState("");
  const [encryptCiphertext, setEncryptCiphertext] = useState("");
  const [encryptKey, setEncryptKey] = useState("");
  const [decryptPlaintext, setDecryptPlaintext] = useState("");
  const [decryptCiphertext, setDecryptCiphertext] = useState("");
  const [decryptKey, setDecryptKey] = useState("");
  const [encryptError, setEncryptError] = useState("");
  const [decryptError, setDecryptError] = useState("");

  const encryptText = () => {
    if (!encryptKey) {
      setEncryptError("Please provide a key!");
      return; 
    } else if (!encryptPlaintext) {
      setEncryptError("Please provide plaintext!");
      return;
    } else if (!isValidTripleDESKey(encryptKey)) {
      setEncryptError("Key must be exactly 24 characters (192 bits).");
      return;
    }
    const encrypted = CryptoJS.TripleDES.encrypt(encryptPlaintext, encryptKey).toString();
    if (!encrypted) {
      setEncryptError("Encryption failed! Check your key or plaintext.");
      return;
    }
    setEncryptCiphertext(encrypted);
  };

  const decryptText = () => {
    if (!decryptKey) {
      setDecryptError("Please provide a key!");
      return;
    }
    try {
      const decrypted = CryptoJS.TripleDES.decrypt(decryptCiphertext, decryptKey).toString(
        CryptoJS.enc.Utf8
      );
      if (!decrypted) {
        setDecryptError("Decryption failed! Check your key or ciphertext.");
        setDecryptPlaintext("");
        return;
      }
      setDecryptPlaintext(decrypted);
    } catch (error) {
      setDecryptError("Decryption failed! Check your key or ciphertext.");
    }
  };

  const isValidTripleDESKey = (key) => {
    return key.length === 24; // Kiểm tra khóa có đúng 24 ký tự không
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Encryption Section */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Text Encryption</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          placeholder="Enter plaintext"
          value={encryptPlaintext}
          onChange={(e) => {
            setEncryptPlaintext(e.target.value);
            setEncryptError("");
          }}
        ></textarea>
        <div className="flex flex-row gap-2 mb-4">
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
              if (!isValidTripleDESKey(key)) {
                setEncryptError("Key must be exactly 24 characters (192 bits).");
              } else {
                setEncryptError("");
              }
            }}
          />
          <button
            className="bg-green-500 text-white text-sm font-medium py-1 rounded-md hover:bg-green-600 w-[100px]"
            onClick={() => {
              const randomKey = CryptoJS.MD5(Math.random().toString()).toString().substring(0, 24);
              setEncryptKey(randomKey);
              setEncryptError("");
            }}
          >
            Random
          </button>
        </div>

        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Encrypted ciphertext"
          value={encryptCiphertext}
          readOnly
        ></textarea>
        {encryptError && <p className="text-red-500 mt-2">{encryptError}</p>}
        <button
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 w-full mt-4"
          onClick={encryptText}
        >
          Encrypt
        </button>
      </div>

      {/* Decryption Section */}
      <div className="w-full lg:w-1/2">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Text Decryption</h2>
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          placeholder="Enter ciphertext"
          value={decryptCiphertext}
          onChange={(e) => {
            setDecryptCiphertext(e.target.value);
            setDecryptError("");
          }}
        ></textarea>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          placeholder="Enter decryption key"
          value={decryptKey}
          onChange={(e) => {
            setDecryptKey(e.target.value);
            setDecryptError("");
          }}
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Decrypted plaintext"
          value={decryptPlaintext}
          readOnly
        ></textarea>
        {decryptError && <p className="text-red-500 mt-2">{decryptError}</p>}
        <button
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 w-full mt-4"
          onClick={decryptText}
        >
          Decrypt
        </button>
      </div>
    </div>
  );
}

export default TextEncryption;
