import React, { useState, useRef } from "react";
import { useChatState } from "../global/useChatState.js";
import { FiSend } from "react-icons/fi";
import { FaFileImage } from "react-icons/fa";

function ChatInput() {
    const [text, setText] = useState("");
    const [images, setImages] = useState([]);
    const [imagePreview, setImagePreview] = useState(false);
    const { sendMessage } = useChatState();
    const inputFileRef = useRef(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImages([...images, file]);
            setImagePreview(true);
        }
    };

    const handleTextSent = (e) => {
        e.preventDefault();
        if (text.trim() || imagePreview) {
            sendMessage(text, images);
            setText("");
            setImages([]);
            setImagePreview(false);
        }
    };

    return (
        <form onSubmit={handleTextSent} className="flex items-center gap-3 px-4 py-2 my-2 mx-1 bg-gray-800 rounded-xl shadow-md">
            {/* Image Upload Icon */}
            <div className="relative">
                <button
                    type="button"
                    onClick={() => inputFileRef.current.click()}
                    className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 text-white focus:outline-none transition"
                >
                    <FaFileImage size={20} />
                </button>
                <input
                    type="file"
                    ref={inputFileRef}
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                />
            </div>

            {/* Text Input */}
            <div className="flex flex-1">
                <textarea
                    placeholder="Type your message here..."
                    className="w-full resize-none rounded-lg border border-gray-300 p-2"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={1}
                />
            </div>

            {/* Send Button */}
            <button
                type="submit"
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                disabled={!text.trim() && !imagePreview}
            >
                <FiSend size={22} />
            </button>
        </form>
    );
}

export default ChatInput;
