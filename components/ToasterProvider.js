"use client";
import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
    return (
        <Toaster
            position="bottom-right"
            toastOptions={{
                style: {
                    background: "#0a0a0a",
                    color: "#fff",
                    border: "1px solid rgba(0,255,159,0.15)",
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: "11px",
                    letterSpacing: "0.1em",
                },
            }}
        />
    );
}
