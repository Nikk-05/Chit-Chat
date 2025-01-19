import React, { useState, useRef, useEffect } from "react";
import { useChatState } from "../global/useChatState.js";
import { FiSend } from "react-icons/fi";
import { FaFileImage } from "react-icons/fa";

function ChatInput() {
    const { chats, sendMessage, selectedUser, getMessages} = useChatState()
    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null);
    const inputFileRef = useRef(null);

    useEffect(() => {
        getMessages(selectedUser._id)
    }, [getMessages, selectedUser._id, chats])
    
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file)
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result); // Display the preview
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = () => {
        setImagePreview(null);
        inputFileRef.current.value = "";
    }

    const handleMessageSent = (event) => {
        event.preventDefault();
        if (text.trim() || imagePreview) {

            const message = {
                text: text.trim(),
                image: imageFile || null
            }
            sendMessage(selectedUser._id, message);
            setText("");
            setImagePreview(null);
        }
    };

    const handlePressEnter = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleMessageSent(event)
        }
    }

    return (
        <form onSubmit={handleMessageSent} className="flex items-center gap-3 px-4 py-2 my-2 mx-1 bg-gray-800 rounded-xl shadow-md">
            {/* Image Preview */}
            {imagePreview && (
                <div className="relative mb-2">
                    <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full max-h-40 object-cover rounded-lg"
                    />
                    <button
                        type="button"
                        onClick={handleClearImage}
                        className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-500 transition"
                    >
                        ✕
                    </button>
                </div>
            )}

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
                    className="w-full resize-none rounded-lg border border-gray-500 p-2 text-white"
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    onKeyDown={handlePressEnter}
                    rows={1}
                />
            </div>

            {/* Send Button */}
            <button
                type="submit"
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-50 disabled:cursor-not-allowed transition"
                disabled={!text.length && !imagePreview}
            >
                <FiSend size={22} />
            </button>
        </form>
    );
}

export default ChatInput;
