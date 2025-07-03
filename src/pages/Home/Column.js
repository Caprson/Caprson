import { useDroppable } from '@dnd-kit/core';
import { Task } from './TaskCard';
import { TaskDetailModal } from './TaskDetailModal';
import { useEffect, useState } from 'react';

export function Column({ column, setIsUpdate, isUpdate }) {
    const { setNodeRef } = useDroppable({ id: `column-${column.id}` });
    const [selectedTask, setSelectedTask] = useState(null);
    const [updatedTask, setUpdatedTask] = useState(null);
    return (
        <div ref={setNodeRef} className="min-w-[162px] self-auto flex h-full flex-col max-w-full">
            <div className="bg-neutral-100 rounded p-4 min-h-[300px] h-full min-w-[162px] flex flex-col space-y-2 shadow-sm">
                <h2 className="text-2xl text-gray-600 text-neutral-500 py-4 font-medium mb-2">
                    {column.title} <span className="ml-2 text-xl bg-gray-200 px-2 rounded">{column.tasks.length}</span>
                </h2>

                {column.tasks.length <= 0 ? (
                    <div className="text-center mt-10 text-gray-700"></div>
                ) : (
                    column.tasks.map((task) => (
                        <Task
                            key={task.storyId || task.bugId}
                            isUpdate={isUpdate}
                            updatedTask={updatedTask}
                            setIsUpdate={setIsUpdate}
                            onClick={setSelectedTask}
                            task={{ ...task, type: task.bugId ? 'bug' : 'story' }}
                        />
                    ))
                )}

                {/* {column.tasks.length > 0 && (
                    <button className="text-gray-500 hover:bg-neutral-200 p-3 rounded w-full font-medium text-2xl mt-2 text-left">
                        + Create
                    </button>
                )} */}
                {/* Modal */}
                <TaskDetailModal
                    updatedTask={updatedTask}
                    setIsUpdate={setIsUpdate}
                    setUpdatedTask={setUpdatedTask}
                    isUpdate={isUpdate}
                    task={selectedTask}
                    onClose={() => setSelectedTask(null)}
                    refreshTask={(task) => setSelectedTask(task)}
                />
            </div>
        </div>
    );
}
