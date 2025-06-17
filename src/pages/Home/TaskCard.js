import { useDraggable } from '@dnd-kit/core';
import * as apis from '../../apis';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export function Task({ task }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: String(task.storyId) });
    const [user, setUser] = useState({});
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };
    const GetUser = async (id) => {
        await apis
            .getUseById(id)
            .then((res) => {
                setUser(res.data.data);
            })
            .catch((error) => {
                console.error('Failed to fetch user stories:', error);
                toast.error('An error occurred during sign up. Please try again.');
            });
    };
    useEffect(() => {
        if (task.assignedTo != null) GetUser(task.assignedTo);
    }, []);

    function getInitials(name = '') {
        if (!name) return '';
        const words = name.trim().split(' ');
        if (words.length === 1) return words[0][0].toUpperCase();
        return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    }

    function getColorFromName(name = '') {
        const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500'];
        const index = name ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    }
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="bg-white border-2 hover:bg-neutral-200 border-solid border-gray-700 rounded p-3 shadow-sm text-xl flex justify-between items-center cursor-pointer"
        >
            <div className="flex flex-col gap-3 w-full">
                <div className="py-2">
                    <h2 className="font-semibold" title={task.name}>
                        {task.name}
                    </h2>
                </div>
                <div className=" flex justify-between w-full">
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="font-semibold">CWW-{task.storyId}</span>
                    </div>
                    {user.userName !== undefined ? (
                      
                        <div
                            className={`relative w-8 h-8 rounded-full ${getColorFromName(
                                user?.userName,
                            )} hover:opacity-90 cursor-pointer text-white font-bold flex items-center justify-center text-sm gap-0.5`}
                        >
                            {getInitials(user.userName)}
                        </div>
                    ) : (
                        <div
                            title="Click to assign user"
                            className="relative w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-600 flex items-center justify-center"
                        >
                            <i className="fas fa-user"></i>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
