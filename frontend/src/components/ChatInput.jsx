import React, { useState, useRef, useEffect } from "react";
import { useChatState } from "../global/useChatState.js";
import { FiSend } from "react-icons/fi";
import { FaFileImage } from "react-icons/fa";
import { motion } from 'framer-motion'

function ChatInput() {
    const { chats, sendMessage, selectedUser, getMessages } = useChatState()
    const [text, setText] = useState("");
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null);
    const [showPreview, setShowPreview] = useState(false)
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
                setImagePreview(reader.result);
                setShowPreview(true);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleClearImage = () => {
        setImagePreview(null);
        setShowPreview(false);
        inputFileRef.current.value = "";
        setImageFile(null);
    }

    const handleMessageSent = (event) => {
        event.preventDefault();
        if (text.trim() || imageFile) {

            const message = {
                text: text.trim(),
                image: imageFile || null
            }
            sendMessage(selectedUser._id, message);
            setText("");
            handleClearImage();
        }
    };

    const handlePressEnter = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleMessageSent(event)
        }
    }

    return (
        <div>
            <form onSubmit={handleMessageSent} className="relative flex items-center gap-3 px-4 py-2 my-2 mx-1 bg-gray-800 rounded-xl shadow-md">
                {showPreview && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ type: "spring", stiffness: 120 }}
                        className="absolute bottom-16 right-10 left-10 flex justify-center bg-gray-800 p-2 rounded-lg shadow-lg"
                    >
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-auto max-h-52 object-cover rounded-lg border-2 border-gray-500"
                            />
                            <button
                                type="button"
                                onClick={handleClearImage}
                                className="absolute top-1 right-1 bg-red-400 h-6 w-6 text-white rounded-full hover:bg-red-500 transition"
                            >
                                X
                            </button>
                        </div>
                    </motion.div>
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
        </div>
    );
}

export default ChatInput;
