import { useState } from 'react';
import Column from './Column';
import TaskCard from './TaskCard';
import FiltersBar from './FiltersBar';
import React from 'react';
import { Board } from './Board';
function Home() {
    // function addTaskToDone() {
    //     // Example: add a new task to DONE column
    //     const newTask = {
    //         id: `NHOM4-${Math.floor(Math.random() * 1000)}`,
    //         title: 'New task',
    //         user: 'H',
    //     };
    //     setColumns((prev) => ({
    //         ...prev,
    //         done: {
    //             ...prev.done,
    //             tasks: [...prev.done.tasks, newTask],
    //         },
    //     }));
    // }

    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-grow overflow-hidden">
                <main className="flex-grow overflow-auto p-4 sm:p-6">
                    <FiltersBar />
                    <Board />
                </main>
            </div>
        </div>
    );
}

export default Home;
