"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: "#191c1a",
          color: "#f2f3ef",
          border: "1px solid #303431",
        },
      }}
    />
  );
}