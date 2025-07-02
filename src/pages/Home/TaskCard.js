import { useDraggable } from '@dnd-kit/core';
import * as apis from '../../apis';
import { useEffect, useState, useRef } from 'react';
import { toast } from 'react-toastify';

export function Task({ task, onClick }) {
    const id = task.type === 'bug' ? `bug-${task.bugId}` : `story-${task.storyId}`;
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

    const [user, setUser] = useState({});
    const containerRef = useRef(null);
    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };

    const GetUser = async (id) => {
        try {
            const res = await apis.getUseById(id);
            setUser(res.data.data);
        } catch (error) {
            console.error('Failed to fetch user:', error);
            toast.error('An error occurred while fetching user.');
        }
    };

    useEffect(() => {
        if (task.assignedTo != null) GetUser(task.assignedTo);
    }, [task.assignedTo]);

    function getInitials(name = '') {
        if (!name) return '';
        const words = name.trim().split(' ');
        return words.length === 1
            ? words[0][0].toUpperCase()
            : words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    }

    function getColorFromName(name = '') {
        const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500'];
        const index = name ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    }
    const isDraggingRef = useRef(false);
    const mouseMovedRef = useRef(false);
    useEffect(() => {
        const handleMouseMove = () => {
            mouseMovedRef.current = true;
        };

        const handleMouseUp = () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);

            if (!mouseMovedRef.current) {
                console.log('jsdbasd');
                onClick(task);
            }

            isDraggingRef.current = false;
            mouseMovedRef.current = false;
        };

        const handleMouseDown = () => {
            isDraggingRef.current = true;
            mouseMovedRef.current = false;
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        };

        const elem = containerRef.current;
        if (elem) {
            elem.addEventListener('mousedown', handleMouseDown);
        }

        return () => {
            if (elem) {
                elem.removeEventListener('mousedown', handleMouseDown);
            }
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [onClick]);

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={style}
            className="relative bg-white border-2 hover:bg-neutral-200 border-solid border-gray-700 rounded p-3 shadow-sm text-xl flex justify-between items-center cursor-pointer"
        >
            <div
                {...listeners}
                ref={containerRef}
                className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer "
            ></div>
            <div className="flex flex-col gap-3 w-full">
                <div className="py-2">
                    <h2 className="font-semibold" title={task.name || task.title}>
                        {task.type === 'bug' ? '🐞' : '📘'} {task.name || task.title}
                    </h2>
                </div>
                <div className="flex justify-between w-full">
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" />
                        <span className="font-semibold">CWW-{task.type === 'bug' ? task.bugId : task.storyId}</span>
                    </div>
                    {user.userName ? (
                        <div
                            className={`relative w-8 h-8 rounded-full ${getColorFromName(
                                user.userName,
                            )} hover:opacity-90 cursor-pointer text-white font-bold flex items-center justify-center text-sm`}
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
