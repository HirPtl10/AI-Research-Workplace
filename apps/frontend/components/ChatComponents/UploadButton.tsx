"use client";

import { useRef } from "react";

export default function UploadButton() {
    const fileInputRef = useRef<HTMLInputElement>(null);

    function handleClick() {
        fileInputRef.current?.click();
    }

    function handleFileChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = e.target.files?.[0];

        if (!file) return;

        console.log(file);
    }

    return (
        <>
            <button
                type="button"
                onClick={handleClick}
                title="Attach file"
                className="p-2.5 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors shrink-0"
            >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
            </button>

            <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
            />
        </>
    );
}