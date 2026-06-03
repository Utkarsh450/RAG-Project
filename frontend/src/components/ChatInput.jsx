import { useState } from "react";

import { toast } from "react-hot-toast";

import { chatService } from "../services/chatService";

export default function ChatInput({

    selectedPdf,

    setMessages,

    asking,

    setAsking

}) {

    const [question,
        setQuestion] =
        useState("");

    const handleSubmit =
        async (e) => {

            e.preventDefault();

            if (
                !question.trim()
            ) {
                return;
            }

            if (
                !selectedPdf
            ) {

                toast.error(
                    "Please upload and select a PDF first."
                );

                return;
            }

            const currentQuestion =
                question;

            setQuestion("");

            setMessages(
                prev => [
                    ...prev,
                    {
                        role: "user",
                        content:
                            currentQuestion
                    }
                ]
            );

            try {

                setAsking(
                    true
                );

                const response =
                    await chatService.askQuestion(
                        currentQuestion,


                        selectedPdf.name
                    );

                setMessages(
                    prev => [
                        ...prev,
                        {
                            role:
                                "assistant",

                            content:
                                response.answer
                        }
                    ]
                );

            } catch (
                error
            ) {

                console.error(
                    error
                );

                toast.error(
                    error?.response?.data?.detail ||
                    "Failed to get response"
                );

                setMessages(
                    prev => [
                        ...prev,
                        {
                            role:
                                "assistant",

                            content:
                                "Sorry, something went wrong while processing your request."
                        }
                    ]
                );

            } finally {

                setAsking(
                    false
                );
            }
        };

    return (

        <div
            className="
            border-t
            bg-white
            p-4
        "
        >

            <form
                onSubmit={
                    handleSubmit
                }
                className="
                flex
                gap-3
            "
            >

                <input
                    type="text"

                    value={
                        question
                    }

                    onChange={
                        (e) =>
                            setQuestion(
                                e.target.value
                            )
                    }

                    placeholder="
                    Ask a question about your PDF...
                    "

                    disabled={
                        asking
                    }

                    className="
                    flex-1
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-violet-500
                    disabled:bg-gray-100
                "
                />

                <button
                    type="submit"

                    disabled={
                        asking
                    }

                    className="
                    px-6
                    rounded-xl
                    bg-violet-600
                    text-white
                    hover:bg-violet-700
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                "
                >

                    {
                        asking
                            ? "Thinking..."
                            : "Send"
                    }

                </button>

            </form>

        </div>

    );
}