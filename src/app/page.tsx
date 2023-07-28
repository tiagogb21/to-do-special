"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import TaskMessage, { IToDo } from "./components/TaskMessage";

const initialState: IToDo = {
    id: uuidv4(),
    content: "",
    isComplete: false,
};

export default function Home() {
    const [inputValue, setInputValue] = useState<string>("");
    const [toDoStore, setToDoStore] = useState<IToDo[]>([initialState]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleClick = () => {
        if (Boolean(inputValue)) {
            const newTask: IToDo = {
                id: uuidv4(),
                content: inputValue,
                isComplete: false,
            };

            setToDoStore((state) => [...state, newTask]);
            setInputValue("");
        }
    };

    const handleClickCheck = (item: IToDo) => {
        const updatedToDoStore = toDoStore.map((todo) =>
            todo.id === item.id
                ? { ...todo, isComplete: !todo.isComplete }
                : todo
        );

        setToDoStore(updatedToDoStore);
    };

    const handleClickDelete = (item: IToDo) => {
        const deletedItemFromToDoStore = toDoStore.filter(
            (todo) => todo.id !== item.id
        );
        setToDoStore(deletedItemFromToDoStore);
    };

    const handleChangeUpdate = (item: IToDo, newValue: string) => {
        const updatedToDoStore = toDoStore.map((todo) =>
            todo.id === item.id ? { ...todo, content: newValue } : todo
        );

        setToDoStore(updatedToDoStore);
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(toDoStore);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setToDoStore(items);
    };

    return (
        <div className="flex flex-col h-screen w-full">
            <header className="bg-zinc-950 w-full h-46 py-16 flex items-center justify-center">
                <h1 className="text-4xl not-italic font-black leading-normal">
                    <span className="text-sky-500">To</span>
                    <span className="text-purple-800">Do</span>
                </h1>
            </header>
            <main className="bg-zinc-900 w-full h-screen flex items-start justify-center pt-16">
                <div className="flex w-2/4 fixed justify-between gap-4 top-40">
                    <div className="flex items-center gap-2 flex-grow-1 flex-shrink-0 rounded-md  grow">
                        <input
                            type="text"
                            className="p-2 bg-zinc-500 border focus:border-blue-400 focus:ring focus:ring-blue-400 focus:outline-none rounded-md text-white w-full"
                            placeholder="Adicione uma nova tarefa"
                            onChange={handleChange}
                            value={inputValue}
                        />
                    </div>
                    <button
                        type="button"
                        className="p-2 justify-center items-center gap-2 rounded-md flex bg-blue-400 text-white hover:bg-blue-500 font-semibold transition duration-300 ease-in-out"
                        onClick={handleClick}
                    >
                        Criar
                        <span>
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
                                className="lucide lucide-plus-circle"
                            >
                                <circle cx="12" cy="12" r="10" />
                                <path d="M8 12h8" />
                                <path d="M12 8v8" />
                            </svg>
                        </span>
                    </button>
                </div>
                <div className="flex flex-col w-2/4 gap-4">
                    <div className="flex justify-between items-end self-stretch text-white">
                        <p className="flex items-center text-sky-500 gap-2">
                            tarefas criadas:
                            <span className="flex justify-center bg-zinc-700 h-6 w-6 rounded-full text-white">
                                {toDoStore.length}
                            </span>
                        </p>
                        <p className="flex items-center text-purple-800 gap-2">
                            concluídas:
                            <span className="flex justify-center bg-zinc-700 h-6 w-6 rounded-full text-white">
                                {
                                    toDoStore.filter(
                                        ({ isComplete }: IToDo) => isComplete
                                    ).length
                                }
                            </span>
                        </p>
                    </div>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable droppableId="tasks">
                            {(provided) => (
                                <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {toDoStore.length === 0 ? (
                                        <div className="flex flex-col justify-center items-center gap-4 self-stretch py-16 px-6 text-white border-t border-zinc-800 shadow-md">
                                            <p className="flex flex-col items-center gap-4">
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
                                                    className="lucide lucide-clipboard-list"
                                                >
                                                    <rect
                                                        width="8"
                                                        height="4"
                                                        x="8"
                                                        y="2"
                                                        rx="1"
                                                        ry="1"
                                                    />
                                                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                                                    <path d="M12 11h4" />
                                                    <path d="M12 16h4" />
                                                    <path d="M8 11h.01" />
                                                    <path d="M8 16h.01" />
                                                </svg>
                                                <span className="font-bold">
                                                    Você ainda não tem tarefas
                                                    cadastradas
                                                </span>
                                                <span className="font-medium">
                                                    Crie tarefas e organize seus
                                                    itens a fazer
                                                </span>
                                            </p>
                                        </div>
                                    ) : (
                                        toDoStore.map((item, index) => (
                                            <Draggable
                                                key={item.id}
                                                draggableId={item.id}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <TaskMessage
                                                            item={item}
                                                            handleClickCheck={() =>
                                                                handleClickCheck(
                                                                    item
                                                                )
                                                            }
                                                            handleClickDelete={() =>
                                                                handleClickDelete(
                                                                    item
                                                                )
                                                            }
                                                            handleChangeUpdate={(
                                                                value
                                                            ) =>
                                                                handleChangeUpdate(
                                                                    item,
                                                                    value
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        ))
                                    )}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </DragDropContext>
                </div>
            </main>
        </div>
    );
}
