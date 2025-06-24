import Filters from './Filters';
import BoardContent from './BoardContent';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { useState, useRef, useEffect, use } from 'react';
import { toast } from 'react-toastify';
import * as apis from '../../apis';
import { DragOverlay } from '@dnd-kit/core';
import PopupSprint from './PopupSprint';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import RightPanel from './RightPanel';
import useUserStoryEvents from '../../websocket/useUserStoryEvents';

function DraggableTask({ id, index, name, item, updateData, detail }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: String(id) });
    const [showAssigneeSelect, setShowAssigneeSelect] = useState(false);
    const [showStatus, setShowStatus] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [showEpic, setShowEpic] = useState(false);
    const [user, setUser] = useState([]);
    const [userAssignee, setUserAssignee] = useState({});
    const [epics, setEpics] = useState([]);
    const [epic, setEpic] = useState({});
    const [subTask, setSubTask] = useState([]);
    const dropdownRef = useRef(null);
    const [selectedStatusId, setSelectedStatusId] = useState(1);
    const firstItemRef = useRef(null);
    const dispatch = useDispatch();

    const status = [
        { id: 1, title: 'TO DO' },
        { id: 2, title: 'IN PROGRESS' },
        { id: 3, title: 'IN REVIEW' },
        { id: 4, title: 'DONE' },
    ];

    const epicRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (epicRef.current && !epicRef.current.contains(event.target)) {
                setShowEpic(false);
            }
        }

        if (showEpic) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showEpic]);

    useEffect(() => {
        if (showStatus && firstItemRef.current) {
            firstItemRef.current.focus();
        }
    }, [showStatus]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowAssigneeSelect(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const getTaskByStory = (id) => {
        const PostData = async () => {
            try {
                await apis
                    .getTaskByStoryId(id)
                    .then((res) => {
                        console.log(res);
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
    const GetEpicByProject = async () => {
        try {
            await apis
                .getAllEpics()
                .then((res) => {
                    setEpics(res.data.data);
                })
                .catch((error) => {
                    console.error('Registration error: ', error);
                    toast.error('An error occurred during sign up. Please try again.');
                });
        } catch (error) {
            toast.error('An error occurred during sign up. Please try again.');
        }
    };
    const GetEpicById = async (id) => {
        console.log(id);
        try {
            await apis
                .getEpicById(id)
                .then((res) => {
                    setEpic(res.data.data);
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
        GetEpicByProject();
    }, []);

    useEffect(() => {
        if (item != undefined && item.assignedTo !== '') {
            getUser(item?.assignedTo);
        }
        if (!!item && item.epicId !== null) {
            GetEpicById(item.epicId);
        }
        setSelectedStatusId(item.statusId);
        if (!!item) {
            getTaskByStory(item.storyId);
        }
    }, [item]);

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

    const style = {
        transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    };

    const stopDrag = (e) => e.stopPropagation();

    const handleUserSelect = (userId) => {
        console.log(userId);
        const PostData = async () => {
            try {
                const update = {
                    epicId: item?.epicId,
                    sprintId: item?.sprintId,
                    name: item?.name,
                    description: item?.description,
                    priorityId: item?.priorityId,
                    assignedTo: userId,
                    statusId: 1,
                };

                await apis
                    .editUserStore(item?.storyId, update)
                    .then((res) => {
                        if (update.assignedTo !== null) getUser(update?.assignedTo);

                        GetUserByProject();
                        updateData(true);
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
    const handleStatusSelect = (status) => {
        const PostData = async () => {
            try {
                const update = {
                    epicId: item?.epicId,
                    sprintId: item?.sprintId,
                    name: item?.name,
                    description: item?.description,
                    priorityId: item?.priorityId,
                    assignedTo: item?.assignedTo,
                    statusId: status,
                };
                await apis
                    .editUserStore(item?.storyId, update)
                    .then((res) => {
                        updateData(true);
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
        setShowStatus(false);
    };
    const handleSelectEpic = (epicId) => {
        const PostData = async () => {
            try {
                const update = {
                    epicId: epicId,
                    sprintId: item?.sprintId,
                    name: item?.name,
                    description: item?.description,
                    priorityId: item?.priorityId,
                    assignedTo: item?.assignedTo,
                    statusId: item?.statusId,
                };
                await apis
                    .editUserStore(item?.storyId, update)
                    .then((res) => {
                        updateData(true);
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
        setShowStatus(false);
    };

    function getInitials(name = '') {
        if (!name) return '';
        const words = name.trim().split(' ');
        if (words.length === 1) return words[0][0].toUpperCase();
        return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    }

    function getInitialsElements(name = '') {
        return getInitials(name); // chỉ return chuỗi, không cần tạo nhiều `div` con nữa
    }
    function getColorFromName(name = '') {
        const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500'];
        const index = name ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    }
    function getColorFromStatus(name = '') {
        switch (name.toUpperCase()) {
            case 'TO DO':
                return 'bg-gray-400';
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

    const isDraggingRef = useRef(false);
    const mouseMovedRef = useRef(false);
    const statusRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (statusRef.current && !statusRef.current.contains(event.target)) {
                setShowStatus(false);
            }
        };

        if (showStatus) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showStatus]);

    useEffect(() => {
        const handleMouseMove = () => {
            mouseMovedRef.current = true;
        };

        const handleMouseUp = (e) => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);

            if (!mouseMovedRef.current) {
                dispatch(actions.IsShowRightPanel(true));
                detail(item);
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
        elem.addEventListener('mousedown', handleMouseDown);

        return () => {
            elem.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    const containerRef = useRef(null);
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={style}
            className="items-center group hover:bg-stone-100 relative bg-white rounded cursor-pointer select-none"
        >
            <div
                {...listeners}
                ref={containerRef}
                className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer "
            ></div>
            <div className="flex items-cente px-4 py-5 border border-gray-200 justify-between">
                <div className="flex items-center space-x-3">
                    <div className=" relative items-center">
                        <i className="fas fa-chevron-down text-gray-600"></i>
                    </div>
                    <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded"
                        onClick={stopDrag}
                    />
                    <span className="text-xl text-gray-900">
                        <span className="font-semibold">NHOM4-{index + 1}</span> {name}
                    </span>
                </div>
                <div className="flex relative items-center space-x-3">
                    <div className="relative w-[50px]" ref={epicRef}>
                        {!!item && epic.epicId === item.epicId ? (
                            <div
                                onClick={(e) => {
                                    stopDrag(e);
                                    setShowEpic((prev) => !prev);
                                }}
                                className={`rounded-lg flex gap-2 items-center justify-center text-lg font-bold ${getColorFromStatus(
                                    epic.name,
                                )}`}
                            >
                                <div className="text-purple-300">
                                    <i className="fas fa-bolt"></i>
                                </div>
                                {epic.name}
                            </div>
                        ) : (
                            <button
                                onClick={(e) => {
                                    stopDrag(e);
                                    setShowEpic((prev) => !prev);
                                }}
                                className="border border-solid border-gray-200 text-lg px-2 py-1 font-semibold opacity-0 group-hover:opacity-100 pointer-events-auto transition hover:bg-neutral-200"
                            >
                                + Epic
                            </button>
                        )}
                        {showEpic && (
                            <div className="absolute top-12 right-0 z-50 w-72 py-3 bg-white shadow-md border rounded text-lg overflow-hidden">
                                {epics.map((data, index) => (
                                    <div
                                        key={index}
                                        ref={index === 0 ? firstItemRef : null}
                                        tabIndex={-1}
                                        onClick={() => handleSelectEpic(data.epicId)}
                                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <div className="text-purple-300">
                                            <i className="fas fa-bolt"></i>
                                        </div>
                                        <div className="p-1 rounded-lg flex items-center text-lg font-bold">
                                            {data.name}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="relative w-[110px] " ref={statusRef}>
                        <button
                            onClick={(e) => {
                                stopDrag(e);
                                setShowStatus((prev) => !prev);
                            }}
                            className={`flex items-center justify-center text-gray-700 font-semibold text-white text-sm min-w-[70px] rounded p-2 ${getColorFromStatus(
                                status.find((st) => st.id === item.statusId).title,
                            )}`}
                        >
                            {item && status.find((st) => st.id === item.statusId).title}
                        </button>
                        {!!item && showStatus && (
                            <div className="absolute top-10 right-0 z-50 w-72 py-3 bg-white shadow-md border rounded text-lg overflow-hidden">
                                {status
                                    .filter((data) => data.id !== selectedStatusId)
                                    .map((data, index) => (
                                        <div
                                            key={data.id}
                                            ref={index === 0 ? firstItemRef : null}
                                            tabIndex={-1} // cần thiết để .focus() hoạt động
                                            onClick={() => {
                                                handleStatusSelect(data.id);
                                            }}
                                            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <div
                                                className={`p-2 rounded-lg ${getColorFromStatus(
                                                    data.title,
                                                )} flex items-center justify-center text-sm font-bold text-white min-w-[110px]`}
                                            >
                                                {data.title}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                    <button onClick={stopDrag} className="text-gray-500 w-[40px] text-xl px-2">
                        -
                    </button>
                    <button onClick={stopDrag} className="text-orange-600 w-[40px] text-xl px-2">
                        =
                    </button>

                    {item != undefined && !!item.assignedTo ? (
                        <div
                            ref={dropdownRef}
                            onClick={(e) => {
                                stopDrag(e);
                                setShowAssigneeSelect((prev) => !prev);
                            }}
                            title={`Assignee: ${userAssignee?.userName}`}
                            className={`relative w-10 h-10 rounded-full  ${getColorFromName(
                                userAssignee?.userName,
                            )}  cursor-pointer text-white font-bold flex items-center justify-center text-sm gap-0.5`}
                        >
                            {/* Avatar gồm nhiều chữ cái với màu riêng */}
                            {getInitialsElements(userAssignee?.userName)}

                            {showAssigneeSelect && (
                                <div className="absolute top-10 right-0 z-50 w-96 py-3  bg-white shadow-md border rounded text-lg overflow-hidden">
                                    <div
                                        onClick={() => handleUserSelect(null)}
                                        className="hover:bg-gray-100 flex items-center gap-2 px-4 py-3 cursor-pointer"
                                    >
                                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold bg-neutral-300">
                                            <i className="fas fa-user"></i>
                                        </div>
                                        <span className="text-gray-700">Un Assignee</span>
                                    </div>
                                    {user.map((data) => (
                                        <div
                                            key={data.userId}
                                            onClick={() => handleUserSelect(data.userId)}
                                            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold bg-orange-500">
                                                {getInitials(data.userName)}
                                            </div>
                                            <span className="text-gray-700">{data.userName}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : (
                        <div
                            ref={dropdownRef}
                            onClick={(e) => {
                                stopDrag(e);
                                setShowAssigneeSelect((prev) => !prev);
                            }}
                            title="Click to assign user"
                            className="relative w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-600 flex items-center justify-center"
                        >
                            <i className="fas fa-user"></i>

                            {showAssigneeSelect && (
                                <ul className="absolute top-10 right-0 z-50 w-96 py-3 bg-white shadow-md border rounded text-lg overflow-hidden">
                                    {user.map((data) => (
                                        <li
                                            key={data.userId}
                                            onClick={() => handleUserSelect(data.userId)}
                                            className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                        >
                                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-lg font-bold bg-orange-500">
                                                {getInitials(data.userName)}
                                            </div>
                                            <span className="text-gray-700 font-bold">{data.userName}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    <div className="group w-[40px]">
                        <button
                            className="opacity-0 group-hover:opacity-100 transition rounded px-2 py-1 hover:bg-neutral-200"
                            onClick={() => {
                                setShowEdit((prev) => !prev);
                            }}
                        >
                            <i className="fas fa-ellipsis-h text-gray-600"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DroppableColumn({ id, items, renderTask }) {
    const { setNodeRef } = useDroppable({ id });
    return (
        <div
            ref={setNodeRef}
            id={`${id}-items`}
            className="border border-dashed border-gray-300 rounded-md py-6 text-gray-600 text-xl"
        >
            {items.length === 0 ? (
                <p className="text-center">Your {id} is empty.</p>
            ) : (
                <div className="space-y-2">{items.map(renderTask)}</div>
            )}
        </div>
    );
}

function SprintColumn({ id, taskSprint, items, isUpda, renderTask }) {
    const { setNodeRef } = useDroppable({ id });
    const StatusEnum = {
        1: 'Start Sprint',
        2: 'Completed',
        3: 'Done',
        4: 'Cancelled',
    };
    const handleClick = (newStatusId) => {
        const PostData = async () => {
            try {
                const updateSprint = {
                    name: taskSprint?.name,
                    startDate: taskSprint?.startDate,
                    endDate: taskSprint?.endDate,
                    statusId: newStatusId + 1,
                    goal: taskSprint?.goal,
                };
                await apis
                    .updateSprint(taskSprint?.sprintId, updateSprint)
                    .then((res) => {
                        isUpda(true);
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
    return (
        <div
            ref={setNodeRef}
            aria-labelledby={`${taskSprint?.sprintId}-heading`}
            className=" bg-neutral-100 rounded-md px-7 py-5 space-y-3"
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id={`${taskSprint?.sprintId}-checkbox`}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    />
                    <button
                        aria-expanded="true"
                        aria-controls={`${taskSprint?.sprintId}-items`}
                        className="flex items-center space-x-1 font-semibold text-gray-900 text-xl focus:outline-none"
                    >
                        <i className="fas fa-chevron-down text-gray-600"></i>
                        <span id={`${taskSprint?.sprintId}-heading`}>{taskSprint?.name}</span>
                    </button>
                    <span className="text-gray-500 text-xl">{taskSprint?.startDate}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="ml-auto flex items-center space-x-1 text-lg font-semibold rounded-md px-1.5 py-0.5">
                        <span className="bg-gray-200 text-gray-700 rounded px-2 py-0.5">0</span>
                        <span className="bg-blue-400 text-white rounded px-2 py-0.5">0</span>
                        <span className="bg-green-100 text-green-700 rounded px-2 py-0.5">0</span>
                    </div>
                    <button
                        onClick={() => handleClick(taskSprint?.statusId)}
                        className="border border-solid border-gray-300 rounded-md px-3 py-1 text-xl font-semibold hover:bg-gray-100"
                    >
                        {StatusEnum[taskSprint?.statusId]}
                    </button>
                    <button
                        aria-label="More options"
                        className="border border-transparent rounded-md p-2 hover:bg-gray-100"
                    >
                        <i className="fas fa-ellipsis-h text-gray-600"></i>
                    </button>
                </div>
            </div>

            <ul id={`${taskSprint?.sprintId}-items`} className="divide-y divide-gray-200 rounded-md">
                {items.map(renderTask)}
            </ul>
        </div>
    );
}

function BlackLog() {
    const [isCreating, setIsCreating] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [items, setItems] = useState([]);
    const [itemsSprint, setItemSprint] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [columns, setColumns] = useState({});
    const [users, setUsers] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [detail, setDetail] = useState({});
    const { isShowPopup, isShowRightPanel } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const [userStore, SetUserStore] = useState({
        epicId: null,
        sprintId: null,
        name: '',
        description: '',
        priorityId: 1,
        assignedTo: '',
        statusId: 1,
    });

    const [userStoreEdit, setUserStoreEdit] = useState({
        epicId: null,
        sprintId: 0,
        name: '',
        description: '',
        priorityId: 1,
        assignedTo: '',
        statusId: 1,
    });

    const inputRef = useRef(null);

    const handleCreateClick = () => {
        setIsCreating(true);
    };

    const handleChange = (e) => {
        SetUserStore({ ...userStore, [e.target.name]: e.target.value });
    };

    const handleInputKeyPress = async (e) => {
        if (e.key === 'Enter' && userStore.name.trim() !== '') {
            setIsCreating(false);
            CreateListStore();
        }
    };

    // create list công việc
    const CreateListStore = async () => {
        try {
            await apis
                .createUserStore('stories', userStore)
                .then((res) => {
                    GetAllData();
                    SetUserStore({ ...userStore, name: '' });
                })
                .catch((error) => {
                    console.error('Registration error: ', error);
                    toast.error('An error occurred during sign up. Please try again.');
                });
        } catch (error) {
            toast.error('Creation failed');
        }
    };

    const GetAllSprint = async () => {
        await apis
            .getSprintByProject()
            .then((res) => {
                console.log(res.data);
                setItemSprint(res.data);
            })
            .catch((error) => {
                console.error('Registration error: ', error);
                toast.error('An error occurred during sign up. Please try again.');
            });
    };

    const GetAllData = async () => {
        try {
            const [backlogRes, sprintRes] = await Promise.all([apis.getUserStore(), apis.getSprintByProject()]);

            const items = backlogRes.data.data;
            const sprints = sprintRes?.data.data?.filter((item) => item.statusId < 3);
            // ⚠️ Filter theo assigned user
            const assignedItems =
                selectedUserId.length === 0 ? items : items.filter((item) => selectedUserId.includes(item.assignedTo));
            setItems(items); // vẫn cập nhật state nếu bạn cần sau này

            const newColumns = {
                backlog: assignedItems.filter((item) => !item.sprintId),
            };

            sprints.forEach((sprint) => {
                const sprintItems = assignedItems.filter((item) => item.sprintId === sprint.sprintId);
                if (sprint.sprintId) {
                    newColumns[sprint.sprintId] = sprintItems; // loại null/undefined
                }
            });
            setItemSprint(sprints);
            setColumns(newColumns);
        } catch (error) {
            console.error('Error fetching backlog or sprints:', error);
            toast.error('An error occurred while fetching data.');
        }
    };

    const UpdateUserStore = async (id) => {
        try {
            await apis
                .editUserStore(id, userStoreEdit)
                .then((res) => {
                    GetAllData();
                })
                .catch((error) => {
                    console.error('Registration error: ', error);
                    toast.error('An error occurred during sign up. Please try again.');
                });
        } catch (error) {
            toast.error('Creation failed');
        }
    };

    useEffect(() => {
        GetAllData();
        GetUserByProject();
    }, []);

    useEffect(() => {
        if (isUpdate) {
            setIsUpdate(false);
            GetAllData();
        }
    }, [isUpdate]);

    // 👇 Detect click outside input
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                setIsCreating(false);
            }
        };

        if (isCreating) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isCreating]);

    useUserStoryEvents({
        onCreated: (story) => {
            toast.success(`Story created: ${story.name}`);
            GetAllData();
        },
        onUpdated: (story) => {
            toast.info(`Story updated: ${story.name}`);
            GetAllData();
        },
        onDeleted: (story) => {
            toast.warn(`Story deleted`);
            GetAllData();
        },
    });

    const handleDragEnd = ({ active, over }) => {
        if (!over || !active?.id) return;

        const activeId = String(active.id);
        const overId = String(over.id);
        let from = null;

        for (const key of Object.keys(columns)) {
            const col = columns[key];
            if (Array.isArray(col)) {
                const found = col.find((i) => String(i?.storyId) === activeId);
                if (found) {
                    from = key;
                    break;
                }
            }
        }

        if (!from || !columns[from] || !columns[overId] || from === overId) return;

        const item = columns[from].find((i) => String(i?.storyId) === activeId);
        if (!item) return;

        // Tạo dữ liệu cần gửi cho update
        const isMovingToBacklog = overId === 'backlog';
        const targetSprint = itemsSprint.find((s) => String(s.sprintId) === overId);

        const updateData = {
            epicId: item.epicId,
            sprintId: isMovingToBacklog ? null : targetSprint?.sprintId,
            name: item.name,
            description: item.description,
            priorityId: item.priorityId,
            assignedTo: item.assignedTo,
            statusId: item.statusId,
        };

        apis.editUserStore(item.storyId, updateData)
            .then(() => GetAllData())
            .catch((err) => {
                console.error(err);
                toast.error('Failed to update sprint');
            });

        setColumns({
            ...columns,
            [from]: columns[from].filter((i) => String(i?.storyId) !== activeId),
            [overId]: [...columns[overId], item],
        });
    };
    const GetUserByProject = async () => {
        try {
            await apis
                .getUseByProject()
                .then((res) => {
                    setUsers(res.data.data);
                })
                .catch((error) => {
                    console.error('Registration error: ', error);
                    toast.error('An error occurred during sign up. Please try again.');
                });
        } catch (error) {
            toast.error('An error occurred during sign up. Please try again.');
        }
    };
    return (
        <div className="h-full p-4 space-y-6">
            <Filters user={users} idSelelct={selectedUserId} selectUser={setSelectedUserId} update={setIsUpdate} />

            <div className="flex h-full w-full">
                <div className="w-full h-full">
                    <DndContext
                        onDragStart={(event) => setActiveId(event.active.id)}
                        onDragEnd={(event) => {
                            setActiveId(null);
                            handleDragEnd(event);
                        }}
                    >
                        <div className="flex flex-1  overflow-hidden h-5/6 max-h-full">
                            <div className="w-full overflow-y-auto overflow-x-auto px-6 py-5 space-y-10">
                                {/* Dynamic Sprint Columns */}
                                {Object.keys(columns)
                                    .filter((key) => key !== 'backlog' && Array.isArray(columns[key]))
                                    .map((key) => {
                                        const sprint = itemsSprint.find((s) => String(s.sprintId) === key); // tìm sprint theo name
                                        return (
                                            <SprintColumn
                                                key={key}
                                                id={String(key)}
                                                taskSprint={sprint}
                                                items={columns[key]}
                                                isUpda={setIsUpdate}
                                                renderTask={(item, idx) => (
                                                    <DraggableTask
                                                        key={item?.storyId}
                                                        id={String(item?.storyId)}
                                                        item={item}
                                                        index={idx}
                                                        name={item?.name}
                                                        updateData={setIsUpdate}
                                                        detail={setDetail}
                                                    />
                                                )}
                                            />
                                        );
                                    })}

                                {/* Backlog section */}
                                <div
                                    aria-labelledby="backlog-heading"
                                    className="border border-gray-200 rounded-md p-4 space-y-3 bg-gray-50"
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-3">
                                            <button
                                                aria-expanded="false"
                                                aria-controls="backlog-items"
                                                className="flex items-center space-x-1 font-semibold text-gray-900 text-xl focus:outline-none"
                                            >
                                                <i className="fas fa-chevron-right text-gray-400"></i>
                                                <span id="backlog-heading">Backlog</span>
                                            </button>
                                            <span className="text-gray-400 text-xl">
                                                ({columns?.backlog?.length || 0} work items)
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className="ml-auto flex items-center space-x-1 text-lg font-semibold rounded-md px-1.5 py-0.5">
                                                <span className="bg-gray-200 text-gray-700 rounded px-2 py-0.5">0</span>
                                                <span className="bg-blue-400 text-white rounded px-2 py-0.5">0</span>
                                                <span className="bg-green-100 text-green-700 rounded px-2 py-0.5">
                                                    0
                                                </span>
                                            </div>
                                            <button
                                                className="border border-solid border-gray-300 rounded-md px-3 py-1 text-xl font-semibold hover:bg-gray-100"
                                                onClick={() => dispatch(actions.IsShowPopup(true))}
                                            >
                                                Create sprint
                                            </button>
                                        </div>
                                    </div>

                                    <DroppableColumn
                                        id="backlog"
                                        items={columns.backlog || []}
                                        renderTask={(item, idx) =>
                                            item ? (
                                                <DraggableTask
                                                    key={String(item?.storyId)}
                                                    id={String(item?.storyId)}
                                                    item={item}
                                                    index={idx}
                                                    name={item?.name}
                                                    updateData={setIsUpdate}
                                                    detail={(item) => {
                                                        setDetail(item);
                                                    }}
                                                />
                                            ) : null
                                        }
                                    />

                                    {isCreating ? (
                                        <input
                                            ref={inputRef}
                                            type="text"
                                            name="name"
                                            value={userStore.name}
                                            onChange={handleChange}
                                            onKeyDown={handleInputKeyPress}
                                            className="w-full p-2 mt-1 block px-3 py-2 border-solid bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 text-xl"
                                            placeholder="Type task and press Enter"
                                            autoFocus
                                        />
                                    ) : (
                                        <button
                                            className="flex items-center w-full hover:bg-gray-200 px-2 py-3 rounded space-x-2 text-gray-900 font-semibold text-xl"
                                            onClick={handleCreateClick}
                                        >
                                            <i className="fas fa-plus text-lg"></i>
                                            <span>Create</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </DndContext>
                </div>
                {isShowRightPanel ? <RightPanel key={detail.storyId} item={detail.storyId} /> : <></>}
            </div>

            <DragOverlay>
                {activeId ? (
                    <div className="px-4 py-3 bg-white rounded shadow-lg text-xl font-semibold">
                        {items.find((i) => String(i.storyId) === String(activeId))?.name}
                    </div>
                ) : null}
            </DragOverlay>
            {isShowPopup ? <PopupSprint setIsUpdate={setIsUpdate} /> : <></>}
        </div>
    );
}
export default BlackLog;
