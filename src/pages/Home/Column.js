import { useDroppable } from '@dnd-kit/core';
import { Task } from './TaskCard';

export function Column({ column }) {
    const { setNodeRef } = useDroppable({ id: column.id });

    return (
        <div ref={setNodeRef} className="min-w-[162px] self-auto flex h-full flex-col max-w-full">
            <div className="bg-neutral-100 rounded p-4 min-h-[300px] h-full min-w-[162px] flex flex-col space-y-2 shadow-sm">
                <h2 className="text-2xl text-gray-600 text-neutral-500  py-4  font-medium mb-2">
                    {column.title} <span className="ml-2 text-xl bg-gray-200 px-2 rounded">{column.tasks.length}</span>
                </h2>

                {column !== undefined && column.tasks.length < 0 ? (
                    <div className="text-center mt-10 text-gray-700">
                        <div className="flex justify-center mb-4">
                            <img src="/images/sprint-icon.png" alt="Sprint" className="w-24 h-24" />
                        </div>

                        <h2 className="text-lg font-semibold mb-1">Get started in the backlog</h2>
                        <p className="text-sm mb-6">Plan and start a sprint to see work here.</p>

                        <button className="bg-white border border-gray-300 px-4 py-2 rounded text-sm font-medium shadow-sm hover:bg-gray-50">
                            Go to Backlog
                        </button>
                    </div>
                ) : (
                    column.tasks.map((task) => <Task key={task.storyId} task={task} />)
                )}

                {column.tasks.length > 0 ?? (
                    <button className="text-gray-500 hover:bg-neutral-200 p-3 rounded w-full font-medium text-2xl mt-2 text-left">
                        + Create
                    </button>
                )}
            </div>
        </div>
    );
}
