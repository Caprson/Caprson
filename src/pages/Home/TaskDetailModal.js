import { Dialog } from '@headlessui/react';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as apis from '../../apis';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiagramSuccessor } from '@fortawesome/free-solid-svg-icons';
import { FaChevronUp, FaChevronDown, FaEquals } from 'react-icons/fa';

export const TaskDetailModal = ({ task, onClose }) => {
    const taskId = task?.bugId || task?.storyId;
    const isBug = !!task?.bugId;
    const [isShowSubTask, setIsShowSubTask] = useState(false);
    const [subTask, setSubTask] = useState([]);
    const [subTaskName, setSubTaskName] = useState('');
    const [sprint, setSprint] = useState({});
    const [userAssignee, setUserAssignee] = useState({});
    const [userReport, setUserReport] = useState({});
    const status = {
        1: 'TO DO',
        2: 'IN PROGRESS',
        3: 'IN REVIEW',
        4: 'DONE',
    };
    const priority = {
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Highest',
    };
    function getPriorityIcon(priority) {
        switch (priority) {
            case 'Highest':
                return (
                    <span className="text-red-500 text-sm">
                        <FaChevronUp />
                        <FaChevronUp className="-mt-2" />
                    </span>
                );
            case 'High':
                return <FaChevronUp className="text-red-400 text-sm" />;
            case 'Medium':
                return <FaEquals className="text-gray-500 text-sm" />;
            case 'Low':
                return <FaChevronDown className="text-blue-400 text-sm" />;
            default:
                return null;
        }
    }
    const getTaskByStory = (id) => {
        const PostData = async () => {
            try {
                await apis
                    .getTaskByStoryId(id)
                    .then((res) => {
                        setSubTask(res.data.data);
                    })
                    .catch((error) => {
                        console.error('Registration error: ', error);
                        toast.error('An error occurred during sign up. Please try again.');
                    });
            } catch (error) {
                toast.error('An error occurred during sign up. Please try again.');
            }
        };
        PostData();
    };
    const handleSubmid = async () => {
        const tasks = {
            storyId: task?.storyId,
            assignedTo: '',
            name: subTaskName,
            description: '',
            statusId: 1,
            estimatedHours: 2,
            loggedHours: 2,
            remainingHours: 2,
        };
        await apis
            .createUserStore('tasks', tasks)
            .then((res) => {
                setSubTaskName('');
                setIsShowSubTask(false);
                if (!!task?.storyId) getTaskByStory(task?.storyId);
            })
            .catch((error) => {
                console.error('Registration error: ', error);
                toast.error('An error occurred during sign up. Please try again.');
            });
    };
    const getUser = (id) => {
        const PostData = async () => {
            try {
                await apis
                    .getUseById(id)
                    .then((res) => {
                        setUserAssignee(res.data.data);
                    })
                    .catch((error) => {
                        console.error('Registration error: ', error);
                        toast.error('An error occurred during sign up. Please try again.');
                    });
            } catch (error) {
                toast.error('An error occurred during sign up. Please try again.');
            }
        };
        PostData();
    };
    const getUserRP = (id) => {
        const PostData = async () => {
            try {
                await apis
                    .getUseById(id)
                    .then((res) => {
                        setUserReport(res.data.data);
                    })
                    .catch((error) => {
                        console.error('Registration error: ', error);
                        toast.error('An error occurred during sign up. Please try again.');
                    });
            } catch (error) {
                toast.error('An error occurred during sign up. Please try again.');
            }
        };
        PostData();
    };
    const getSprintById = async (id) => {
        await apis
            .getSprintById(id)
            .then((res) => {
                setSprint(res.data.data);
            })
            .catch((error) => {
                console.error('Registration error: ', error);
                toast.error('An error occurred during sign up. Please try again.');
            });
    };
    useEffect(() => {
        if (!isBug && !!task?.storyId) getTaskByStory(taskId);
        if (!!task?.assignedTo && task?.assignedTo != '') {
            getUser(task?.assignedTo);
        }
        if (!!task?.updatedBy && task?.updatedBy != '') getUserRP(task?.updatedBy);
        if (!!task?.sprintId) getSprintById(task.sprintId);
    }, [task]);

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
    function getColorFromStatus(name = '') {
        switch (name.toUpperCase()) {
            case 'TO DO':
                return 'bg-gray-200 text-gray-800';
            case 'IN PROGRESS':
                return 'bg-blue-500';
            case 'IN REVIEW':
                return 'bg-orange-400';
            case 'DONE':
                return 'bg-green-500';
            default:
                return 'bg-gray-200';
        }
    }
    return (
        <Dialog open={!!task} onClose={onClose} className="relative z-50">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

            {/* Centered panel */}
            <div className="fixed inset-0 flex items-center justify-center">
                <Dialog.Panel className="relative bg-white px-8 py-4 w-[900px] h-[70vh] overflow-y-hidden rounded-md shadow-xl">
                    <div className="flex justify-between  ">
                        {/* Close button */}
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
                            onClick={onClose}
                        >
                            ×
                        </button>

                        {/* Header */}
                        <div className="  pt-6 pb-3">
                            <div className="text-xl text-gray-500 mb-2">
                                <span className="text-purple-600 font-medium">⚡ NHOM4-25</span> /{' '}
                                <span className={`font-medium ${isBug ? 'text-red-500' : 'text-blue-500'}`}>
                                    {isBug ? '🐞' : '📘'} NHOM4-{taskId}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex max-h-full overflow-y-auto w-full h-5/6">
                        <div className="w-1/2">
                            <h2 className="text-4xl font-semibold py-4 rounded-b hover:bg-neutral-100 px-3 ">
                                {task?.name || task?.title}
                            </h2>
                            <div className="py-2">
                                <span
                                    onClick={() => setIsShowSubTask(true)}
                                    className="px-4 py-2 border border-gray-300 cursor-pointer hover:bg-neutral-100"
                                >
                                    + Add
                                </span>
                            </div>
                            {/* Description */}
                            <div className="flex flex-col">
                                <span className="text-gray-700 font-bold mt-4">Description</span>
                                {task?.description !== '' ? (
                                    <span className="text-gray-700 w-full text-xl p-2 hover:bg-neutral-100">
                                        {task?.description}
                                    </span>
                                ) : (
                                    <span className="text-gray-400 w-full text-xl p-2 hover:bg-neutral-100 ">
                                        Add a description...
                                    </span>
                                )}
                            </div>

                            {/* Subtasks */}
                            {subTask.length > 0 && (
                                <div className="border rounded-xl mt-5">
                                    <table className="border-collapse ">
                                        <thead className="sticky top-0 z-10">
                                            <tr>
                                                <th className="p-3 border-b border-r border-gray-300 text-sm text-center">
                                                    Type
                                                </th>
                                                <th className="p-3 border-b border-r border-gray-300 text-sm text-left">
                                                    Key
                                                </th>
                                                <th className="p-3 border-b border-r border-gray-300 text-sm text-left">
                                                    Summary
                                                </th>
                                                <th className="p-3 border-b border-r border-gray-300 text-sm text-left">
                                                    Priority
                                                </th>
                                                <th className="p-3 border-b border-r border-gray-300 text-sm text-left">
                                                    Status
                                                </th>
                                                <th className="p-3 border-b border-r border-gray-200 text-sm text-left">
                                                    Sprint
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {subTask.map((data, index) => (
                                                <tr key={index} className="group hover:bg-neutral-100 h-[40px]">
                                                    <td className="relative w-[110px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <div className="w-4 text-blue-500  text-lg">
                                                                <i className="fas fa-check-square" />
                                                            </div>

                                                            <div className="w-4 ">
                                                                <button
                                                                    title="Create child work item"
                                                                    className="hidden group-hover:inline-flex text-2xl text-gray-400 hover:text-gray-500"
                                                                >
                                                                    <i className="fas fa-plus" />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="w-[120px] px-4  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left text-gray-700">
                                                        <FontAwesomeIcon
                                                            icon={faDiagramSuccessor}
                                                            style={{ color: '#31a3d3' }}
                                                        />
                                                    </td>
                                                    <td className="px-4 w-[400px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left text-gray-700">
                                                        {data.name}
                                                    </td>
                                                    <td className="px-4 w-[120px]  overflow-hidden whitespace-nowrap text-ellipsis border-b cursor-pointer border-r border-gray-300 text-left">
                                                        <span className="inline-block font-semibold text-xl flex gap-2 items-center  rounded">
                                                            {getPriorityIcon(priority[data?.priorityId])}
                                                            <span>{priority[data?.priorityId]}</span>
                                                        </span>
                                                    </td>
                                                    <td className="px-4 w-[120px]  overflow-hidden whitespace-nowrap text-ellipsis border-b cursor-pointer border-r border-gray-300 text-left">
                                                        <span className="inline-block bg-gray-300 text-gray-900 font-semibold text-lg  rounded">
                                                            {status[data.statusId]}
                                                        </span>
                                                    </td>

                                                    <td className="px-4 w-[180px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                                                        {!!data?.assignedTo && data?.assignedTo !== '' ? (
                                                            <div
                                                                className={`relative w-10 h-10 rounded-full  ${getColorFromName(
                                                                    data?.assignedTo,
                                                                )}  cursor-pointer text-white font-bold flex items-center justify-center text-sm gap-0.5`}
                                                            ></div>
                                                        ) : (
                                                            <div className="w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-600 flex items-center justify-center">
                                                                <i className="fas fa-user"></i>
                                                            </div>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {isShowSubTask && (
                                <div className="box-border border-none mt-3">
                                    <div className="w-full flex items-center gap-2">
                                        <div className="flex items-center px-3 py-2 rounded-md bg-gray-100 text-gray-500 text-lg gap-2">
                                            <i className="fas fa-project-diagram text-blue-500"></i> Sub-task
                                            <i className="fas fa-chevron-down text-md ml-1"></i>
                                        </div>

                                        <input
                                            type="text"
                                            className="flex-1 border border-solid border-gray-300 rounded px-3 py-2 text-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="What needs to be done?"
                                            value={subTaskName}
                                            onChange={(e) => setSubTaskName(e.target.value)}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-2 mt-3">
                                        <button
                                            disabled={!subTaskName.trim()}
                                            onClick={() => {
                                                handleSubmid();
                                                // TODO: handle API create here
                                            }}
                                            className={`px-3 py-2 rounded text-xl font-semibold ${
                                                subTaskName.trim()
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                        >
                                            Create
                                        </button>

                                        <button
                                            className="text-xl  text-gray-600  px-2 rounded hover:bg-neutral-200"
                                            onClick={() => {
                                                setIsShowSubTask(false);
                                                setSubTaskName('');
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="w-1/2 px-5 mt-5">
                            {/* Info Grid */}
                            <div className="py-4 px-2 ">
                                <div className="text-gray-100">
                                    <button
                                        className={`${getColorFromStatus(
                                            status[task?.statusId],
                                        )} px-3 font-medium py-2 rounded`}
                                    >
                                        {status[task?.statusId]}
                                    </button>
                                </div>
                            </div>
                            <section class="border border-gray-300 rounded-md p-4 space-y-4">
                                <button
                                    class="flex justify-between w-full text-left font-semibold text-gray-900"
                                    aria-expanded="true"
                                    aria-controls="details-content"
                                    id="details-header"
                                >
                                    <span>Details</span>
                                    <svg
                                        class="w-5 h-5 text-gray-600"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        aria-hidden="true"
                                    >
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </button>
                                <div id="details-content" aria-labelledby="details-header" class="space-y-3">
                                    <div class="flex items-center gap-12">
                                        <span class="w-24 font-medium text-gray-600">Assignee</span>
                                        <div class="flex items-center space-x-2">
                                            <div class="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-medium">
                                                {getInitials(userAssignee.userName)}
                                            </div>
                                            <span>{userAssignee.userName}</span>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-12">
                                        <span class="w-24 font-medium text-gray-600">Reporter</span>
                                        <div class="flex items-center space-x-2">
                                            <div class="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-medium">
                                                {getInitials(userReport.userName)}
                                            </div>
                                            <span>{userReport.userName}</span>
                                        </div>
                                    </div>
                                    <div class="flex gap-12">
                                        <span class="w-24 font-medium text-gray-600">Sprint</span>
                                        <div class="">{sprint?.name}</div>
                                    </div>
                                    <div class="flex  gap-12">
                                        <span class="w-24 font-medium text-gray-600">Priority</span>
                                        <div className="flex items-center gap-4">
                                            <span class="text-gray-400">
                                                {getPriorityIcon(priority[task?.priorityId])}
                                            </span>
                                            <span class="text-gray-400">{priority[task?.priorityId]}</span>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    );
};
