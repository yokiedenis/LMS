"use client";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
    value: string;
}

const ReactQuill = dynamic(() => import("react-quill"), {
    ssr: false, // Disable server-side rendering for this component
});

export const Preview = ({ value }: PreviewProps) => {
    return (
        <div className="bg-white dark:bg-slate-700">
            <ReactQuill theme="bubble" value={value} readOnly />
        </div>
    );
};
