"use client";

import React, { useState } from "react";

export interface IToDo {
    id: string;
    content: string;
    isComplete: boolean;
}

const TaskMessage = (props: {
    item: IToDo;
    handleClickCheck: () => void;
    handleClickDelete: () => void;
    handleChangeUpdate: (newValue: string) => void;
}) => {
    const [editingValue, setEditingValue] = useState<string>(
        props.item.content
    );

    const { item, handleClickCheck, handleClickDelete, handleChangeUpdate } =
        props;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditingValue(e.target.value);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleChangeUpdate(editingValue);
        }
    };

    return (
        <div className="p-4 items-start self-stretch rounded-lg border border-solid border-gray-300 shadow-md opacity-75 my-4">
            <div className="flex justify-between text-white">
                <div className="flex gap-3">
                    <button type="button" onClick={handleClickCheck}>
                        {item.isComplete ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-check-circle"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-circle"
                            >
                                <circle cx="12" cy="12" r="10" />
                            </svg>
                        )}
                    </button>
                    <input
                        className={` ${item.isComplete ? "line-through" : ""} `}
                        value={editingValue}
                        onChange={handleInputChange}
                        onKeyDown={handleInputKeyDown}
                    />
                </div>
                <button type="button" onClick={handleClickDelete}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-trash-2"
                    >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                        <line x1="10" x2="10" y1="11" y2="17" />
                        <line x1="14" x2="14" y1="11" y2="17" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default TaskMessage;
