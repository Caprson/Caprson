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
    const [showAssigneeSelect, setShowAssigneeSelect] = useState(false);
    const [subTask, setSubTask] = useState([]);
    const [subTaskName, setSubTaskName] = useState('');
    const [sprint, setSprint] = useState({});
    const [userAssignee, setUserAssignee] = useState({});
    const [userReport, setUserReport] = useState({});
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedName, setEditedName] = useState('');
    const projectName = localStorage.getItem('projectName');
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const dropdownRef = useRef(null);
    const [user, setUser] = useState([]);
    const [showAssigneeIndex, setShowAssigneeIndex] = useState(null);

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
    const handleUpdateTitle = async () => {
        if (!editedTitle.trim()) return;
        try {
            if (!isBug) {
                const payload = {
                    epicId: task?.epicId,
                    sprintId: task?.sprintId,
                    name: editedTitle,
                    description: task?.description,
                    priorityId: task?.priorityId,
                    assignedTo: task?.assignedTo,
                    statusId: task?.statusId,
                };
                await apis.editUserStore(task?.storyId, payload).then((res) => {
                    console.log(res)
                });
                // Optionally reload or update local state
                setIsEditingTitle(false);
            }
        } catch (err) {
            console.error('Failed to update title:', err);
        }
    };
    const handleChangeStatus = async (e, data) => {
        const update = {
            storyId: data.storyId,
            assignedTo: data?.assignedTo,
            name: data?.name,
            description: data.description,
            statusId: e.target.value,
            estimatedHours: data.estimatedHours,
            loggedHours: data?.loggedHours,
            remainingHours: data?.remainingHours,
        };
        try {
            await apis
                .editTask(data?.taskId, update)
                .then((res) => {
                    getTaskByStory(task?.storyId);
                })
                .catch((error) => {
                    console.error('Registration error: ', error);
                    toast.error('An error occurred during sign up. Please try again.');
                });
        } catch (error) {
            toast.error('An error occurred during sign up. Please try again.');
        }
    };
    const handleUpdateName = async (data, newName) => {
        if (!newName.trim()) return;
        try {
            const payload = {
                storyId: data.storyId,
                assignedTo: data?.assignedTo,
                name: newName,
                description: data.description,
                statusId: data?.statusId,
                estimatedHours: data.estimatedHours,
                loggedHours: data?.loggedHours,
                remainingHours: data?.remainingHours,
            };
            await apis.editTask(data.taskId, payload).then(() => {
                getTaskByStory(task?.storyId);
            }); // hoặc gọi API phù hợp với data của bạn
            // refresh lại subTask nếu cần
        } catch (error) {
            console.error('Failed to update name:', error);
        }
    };
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
    const GetUserByProject = async () => {
        try {
            await apis
                .getUseByProject()
                .then((res) => {
                    setUser(res.data.data);
                })
                .catch((error) => {
                    console.error('Registration error: ', error);
                    toast.error('An error occurred during sign up. Please try again.');
                });
        } catch (error) {
            toast.error('An error occurred during sign up. Please try again.');
        }
    };
    useEffect(() => {
        GetUserByProject();
    }, []);
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
    const handleUserSelect = (userId, data) => {
        console.log(userId);
        const PostData = async () => {
            try {
                const update = {
                    storyId: data.storyId,
                    assignedTo: userId,
                    name: data?.name,
                    description: data.description,
                    statusId: data?.statusId,
                    estimatedHours: data.estimatedHours,
                    loggedHours: data?.loggedHours,
                    remainingHours: data?.remainingHours,
                };

                await apis
                    .editTask(data.taskId, update)
                    .then((res) => {
                        update(true);
                        getTaskByStory(task?.storyId);
                        setShowAssigneeSelect(false);
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
        setShowAssigneeSelect(false);
    };

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
                                <span className={`font-medium ${isBug ? 'text-red-500' : 'text-blue-500'}`}>
                                    {isBug ? '🐞' : '📘'} {projectName} - {taskId}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="flex max-h-full overflow-y-auto w-full h-5/6">
                        <div className="w-1/2">
                            <div className="">
                                {isEditingTitle ? (
                                    <input
                                        value={editedTitle}
                                        onChange={(e) => setEditedTitle(e.target.value)}
                                        onBlur={handleUpdateTitle}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleUpdateTitle();
                                        }}
                                        autoFocus
                                        className="mt-2 w-full text-2xl font-bold text-gray-700 border border-solid focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border-gray-300 rounded px-2 py-1"
                                    />
                                ) : (
                                    <h1
                                        onClick={() => {
                                            setIsEditingTitle(true);
                                            setEditedTitle(task?.name || task?.title);
                                        }}
                                        className=" text-2xl font-bold text-gray-600 cursor-pointer hover:bg-neutral-200 py-2 px-1 rounded"
                                    >
                                        {task?.name || task?.title}
                                    </h1>
                                )}
                            </div>
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
                                    <div className="overflow-x-auto overflow-y-auto h-[200px] max-h-[200px] shadow">
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
                                                        Status
                                                    </th>
                                                    <th className="p-3 border-b border-r border-gray-200 text-sm text-left">
                                                        Assignee
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
                                                        <td className="px-4 max-w-[300px] w-[200px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left text-gray-700">
                                                            {editingIndex === index ? (
                                                                <input
                                                                    type="text"
                                                                    value={editedName}
                                                                    onChange={(e) => setEditedName(e.target.value)}
                                                                    onBlur={() => {
                                                                        handleUpdateName(data, editedName);
                                                                        setEditingIndex(null);
                                                                    }}
                                                                    onKeyDown={(e) => {
                                                                        if (e.key === 'Enter') {
                                                                            handleUpdateName(data, editedName);
                                                                            setEditingIndex(null);
                                                                        }
                                                                    }}
                                                                    autoFocus
                                                                    className="w-full px-2 py-1 border border-gray-300 rounded text-gray-800"
                                                                />
                                                            ) : (
                                                                <div
                                                                    onClick={() => {
                                                                        setEditedName(data.name);
                                                                        setEditingIndex(index);
                                                                    }}
                                                                    className="cursor-pointer w-full"
                                                                >
                                                                    {data.name}
                                                                </div>
                                                            )}
                                                        </td>

                                                        <td className="px-4 w-[120px]  overflow-hidden whitespace-nowrap text-ellipsis border-b cursor-pointer border-r border-gray-300 text-left">
                                                            <select
                                                                onChange={(e) => handleChangeStatus(e, data)}
                                                                value={data.statusId}
                                                                class="text-lg font-semibold inline-block bg-gray-300 text-gray-900 rounded focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500  cursor-pointer"
                                                                aria-label="Status"
                                                            >
                                                                <option value={1}>To Do</option>
                                                                <option value={2}>IN PROGRESS</option>
                                                                <option value={3}>IN REVIEW</option>
                                                                <option value={4}>DONE</option>
                                                            </select>
                                                        </td>

                                                        <td className="px-4 w-[180px]   whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                                                            {/* Assignee Avatar */}
                                                            <div
                                                                onClick={() =>
                                                                    setShowAssigneeIndex(
                                                                        showAssigneeIndex === index ? null : index,
                                                                    )
                                                                }
                                                                className="relative cursor-pointer"
                                                            >
                                                                {user.find((u) => u.userId === data.assignedTo)
                                                                    ?.userName?.[0] ? (
                                                                    <div
                                                                        ref={dropdownRef}
                                                                        onClick={() => {
                                                                            setShowAssigneeSelect((prev) => !prev);
                                                                        }}
                                                                        title={`Assignee: ${
                                                                            user.find(
                                                                                (u) => u.userId === data.assignedTo,
                                                                            )?.userName?.[0]
                                                                        }`}
                                                                        className={`relative w-10 h-10 rounded-full  ${getColorFromName(
                                                                            user.find(
                                                                                (u) => u.userId === data.assignedTo,
                                                                            )?.userName?.[0],
                                                                        )}  cursor-pointer text-white font-bold flex items-center justify-center text-sm gap-0.5`}
                                                                    >
                                                                        {getInitials(
                                                                            user.find(
                                                                                (u) => u.userId === data.assignedTo,
                                                                            )?.userName?.[0],
                                                                        )}
                                                                    </div>
                                                                ) : (
                                                                    <div
                                                                        className="w-9 h-9 rounded-full bg-gray-300 text-white font-bold flex items-center justify-center"
                                                                        title="Click to assign user"
                                                                    >
                                                                        <i className="fas fa-user"></i>
                                                                    </div>
                                                                )}
                                                                {showAssigneeIndex === index && (
                                                                    <div className="absolute top-10 right-0 z-50 w-72 py-2 bg-white shadow-md border rounded text-sm">
                                                                        <div
                                                                            onClick={() => handleUserSelect(null, data)}
                                                                            className="hover:bg-gray-100 flex items-center gap-2 px-4 py-2 cursor-pointer"
                                                                        >
                                                                            <div className="w-7 h-7 rounded-full bg-neutral-300 flex items-center justify-center">
                                                                                <i className="fas fa-user" />
                                                                            </div>
                                                                            <span className="text-gray-700">
                                                                                Unassign
                                                                            </span>
                                                                        </div>
                                                                        {user.map((u) => (
                                                                            <div
                                                                                key={u.userId}
                                                                                onClick={() =>
                                                                                    handleUserSelect(u.userId, data)
                                                                                }
                                                                                className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                                            >
                                                                                <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                                                                                    {u.userName[0]}
                                                                                </div>
                                                                                <span className="text-gray-700">
                                                                                    {u.userName}
                                                                                </span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
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
