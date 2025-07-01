import Assignee from './Assignee';
import * as apis from '../../apis';
import { toast } from 'react-toastify';
import { useEffect, useState, useRef, use } from 'react';
import { FaChevronUp, FaChevronDown, FaEquals } from 'react-icons/fa';
function TableRow({ row, update }) {
    const [userAssignee, setUserAssignee] = useState({});
    const [userReport, setUserReport] = useState({});
    const [sprint, setSprint] = useState({});
    const [showStatus, setShowStatus] = useState(false);
    const [showAssignee, setShowAssignee] = useState(false);
    const [showAssigneeSelect, setShowAssigneeSelect] = useState(false);
    const [user, setUser] = useState([]);
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [editedTitle, setEditedTitle] = useState('');
    const [isEditingDescript, setIsEditingDescript] = useState(false);
    const [editedDescript, setEditedDescript] = useState('');
    const dropdownRef = useRef(null);
    const status = {
        1: 'TO DO',
        2: 'IN PROGRESS',
        3: 'IN REVIEW',
        4: 'DONE',
    };
    const icon = {
        epic: '⚡',
        story: '📘',
        bug: '🐞',
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
    const firstItemRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (firstItemRef.current && !firstItemRef.current.contains(event.target)) {
                setShowStatus(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);
    const handleCreateChild = (parentTask) => {
        // Gọi form tạo task với parentId = parentTask.storyId (hoặc id gì đó)
    };
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
    function getColorFromName(name = '') {
        const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500'];
        const index = name ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    }

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
    const getUserReport = (id) => {
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
    const getSprint = (id) => {
        const PostData = async () => {
            try {
                await apis
                    .getSprintById(id)
                    .then((res) => {
                        setSprint(res.data.data);
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
    useEffect(() => {
        if (row.assignedTo !== undefined || row.assignedTo !== '') getUser(row.assignedTo);
        if (!!row.createdBy || row.createdBy !== '') getUserReport(row.createdBy);
        if (!!row.sprintId) getSprint(row.sprintId);
    }, [row]);
    function getInitials(name = '') {
        if (!name) return '';
        const words = name.trim().split(' ');
        if (words.length === 1) return words[0][0].toUpperCase();
        return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    }
    const TYPE_OPTIONS = [
        {
            id: 1,
            name: 'Epic',
            icon: '⚡',
            type: 'epic',
            buildPayload: (name) => ({
                name: name.name,
                description: name.description,
                startDate: name.startDate,
                endDate: name.endDate,
                statusId: name.statusId,
            }),
        },
        {
            id: 2,
            name: 'Story',
            icon: '📘',
            type: 'stories',
            buildPayload: (name) => ({
                epicId: name.editEpic,
                sprintId: name.sprintId,
                name: name.name,
                description: name.description,
                priorityId: name.priorityId,
                assignedTo: name.assignedTo,
                statusId: name.statusId,
            }),
        },
        {
            id: 4,
            name: 'Bug',
            icon: '🐞',
            type: 'bug',
            buildPayload: (name) => ({
                bugId: name.bugId,
                title: name.title,
                description: name.description,
                assignedTo: name.assignedTo,
                severityId: name.severityId,
                priorityId: name.priorityId,
                statusId: name.statusId,
                updatedBy: name.updatedBy,
                comment: name.comment,
            }),
        },
    ];
    const handleDropStatus = (status) => {
        const PostData = async () => {
            try {
                let matchedType = null;

                // Xác định type từ row
                if ('title' in row) {
                    matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'bug');
                } else if ('epicId' in row && 'sprintId' in row) {
                    matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'stories');
                } else if ('startDate' in row && 'endDate' in row) {
                    matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'epic');
                }

                if (!matchedType) {
                    toast.error('Không xác định được loại dữ liệu để cập nhật');
                    return;
                }

                const payload = {
                    ...matchedType.buildPayload(row),
                    statusId: status, // override lại status
                };

                // Chọn API theo type
                if (matchedType.type === 'epic') {
                    await apis.editEpic(row?.epicId, payload);
                } else if (matchedType.type === 'stories') {
                    await apis.editUserStore(row?.storyId, payload);
                } else if (matchedType.type === 'bug') {
                    await apis.editBug(row?.bugId, payload);
                }
                update(true);
                toast.success('Cập nhật thành công!');
            } catch (error) {
                console.error('Update error:', error);
                toast.error('Đã xảy ra lỗi, vui lòng thử lại.');
            }
        };
        PostData();
        setShowStatus(false);
    };
    const handleUpdateTitle = async () => {
        if (!editedTitle.trim()) return;
        try {
            let matchedType = null;

            // Xác định type từ row
            if ('title' in row) {
                matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'bug');
            } else if ('epicId' in row && 'sprintId' in row) {
                matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'stories');
            } else if ('startDate' in row && 'endDate' in row) {
                matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'epic');
            }

            if (!matchedType) {
                toast.error('Không xác định được loại dữ liệu để cập nhật');
                return;
            }

            const built = matchedType.buildPayload(row);
            const payload = {
                ...built,
                ...(built.name !== undefined
                    ? { name: editedTitle || built.name }
                    : { title: editedTitle || built.title }),
            };

            if (matchedType.type === 'epic') {
                await apis.editEpic(row?.epicId, payload);
            } else if (matchedType.type === 'stories') {
                await apis
                    .editUserStore(row?.storyId, payload)
                    .then((res) => {
                        if (update.assignedTo !== null) getUser(update?.assignedTo);
                        setShowAssigneeSelect(false);
                    })
                    .catch((error) => {
                        console.error('Registration error: ', error);
                        toast.error('An error occurred during sign up. Please try again.');
                    });
            } else if (matchedType.type === 'bug') {
                await apis.editBug(row?.bugId, payload);
            }
            update(true);
            setIsEditingTitle(false);
        } catch (err) {
            console.error('Failed to update title:', err);
        }
    };
    const handleUpdateDescript = async () => {
        if (!editedDescript.trim()) return;
        try {
            let matchedType = null;

            // Xác định type từ row
            if ('title' in row) {
                matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'bug');
            } else if ('epicId' in row && 'sprintId' in row) {
                matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'stories');
            } else if ('startDate' in row && 'endDate' in row) {
                matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'epic');
            }

            if (!matchedType) {
                toast.error('Không xác định được loại dữ liệu để cập nhật');
                return;
            }

            const built = matchedType.buildPayload(row);
            const payload = {
                ...built,
                ...(built.description !== undefined
                    ? { description: editedDescript|| built.description }
                    : { comment: editedDescript || built.comment }),
            };

            if (matchedType.type === 'epic') {
                await apis.editEpic(row?.epicId, payload);
            } else if (matchedType.type === 'stories') {
                await apis
                    .editUserStore(row?.storyId, payload)
                    .then((res) => {
                        if (update.assignedTo !== null) getUser(update?.assignedTo);
                        setShowAssigneeSelect(false);
                    })
                    .catch((error) => {
                        console.error('Registration error: ', error);
                        toast.error('An error occurred during sign up. Please try again.');
                    });
            } else if (matchedType.type === 'bug') {
                await apis.editBug(row?.bugId, payload);
            }
            update(true);
            setIsEditingDescript(false);
        } catch (err) {
            console.error('Failed to update title:', err);
            setIsEditingDescript(false);
        }
    };
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
    const handleUserSelect = (userId) => {
        const PostData = async () => {
            try {
                let matchedType = null;

                // Xác định type từ row
                if ('title' in row) {
                    matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'bug');
                } else if ('epicId' in row && 'sprintId' in row) {
                    matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'stories');
                } else if ('startDate' in row && 'endDate' in row) {
                    matchedType = TYPE_OPTIONS.find((opt) => opt.type === 'epic');
                }

                if (!matchedType) {
                    toast.error('Không xác định được loại dữ liệu để cập nhật');
                    return;
                }

                const payload = {
                    ...matchedType.buildPayload(row),
                    assignedTo: userId, // override lại status
                };

                if (matchedType.type === 'epic') {
                    await apis.editEpic(row?.epicId, payload);
                } else if (matchedType.type === 'stories') {
                    await apis
                        .editUserStore(row?.storyId, payload)
                        .then((res) => {
                            if (update.assignedTo !== null) getUser(update?.assignedTo);
                            setShowAssigneeSelect(false);
                        })
                        .catch((error) => {
                            console.error('Registration error: ', error);
                            toast.error('An error occurred during sign up. Please try again.');
                        });
                } else if (matchedType.type === 'bug') {
                    await apis.editBug(row?.bugId, payload);
                }
                update(true);
            } catch (error) {
                toast.error('An error occurred during sign up. Please try again.');
            }
        };
        PostData();
        setShowAssigneeSelect(false);
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
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        }).format(date);
    };
    return (
        <tr className="group hover:bg-neutral-100 h-[40px]">
            <td className="p-4 border-b border-r border-gray-300 text-center">
                <input
                    type="checkbox"
                    defaultChecked=""
                    aria-label="Select row"
                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
            </td>
            <td className="relative w-[110px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                <div className="flex items-center justify-center gap-2">
                    <div className="w-4 text-blue-500  text-lg">{icon[row.type]}</div>
                    {/* Nút + hiện khi hover */}
                    <div className="w-4 ">
                        <button
                            title="Create child work item"
                            onClick={() => handleCreateChild()}
                            className="hidden group-hover:inline-flex text-2xl text-gray-400 hover:text-gray-500"
                        >
                            <i className="fas fa-plus" />
                        </button>
                    </div>
                </div>
            </td>
            <td className="w-[120px] px-4  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left text-gray-700">
                {row.storyId || row.epicId}
            </td>
            <td className="px-4 w-[400px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left text-gray-700">
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
                            className="mt-2 w-full text-xl  text-gray-700 border border-solid focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border-gray-300 rounded px-2 py-1"
                        />
                    ) : (
                        <h1
                            onClick={() => {
                                setIsEditingTitle(true);
                                setEditedTitle(row?.name || row?.title);
                            }}
                            className=" text-xl text-gray-600 cursor-pointer hover:bg-neutral-200 py-2 px-1 rounded"
                        >
                            {row?.name || row?.title}
                        </h1>
                    )}
                </div>
            </td>
            <td className="px-4 w-[120px] relative   whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left">
                <div
                    onClick={() => setShowStatus((prev) => !prev)}
                    className={`${getColorFromStatus(
                        status[row.statusId],
                    )} inline-block text-gray-200 px-2 cursor-pointer font-semibold text-lg  rounded`}
                >
                    {status[row.statusId]}
                </div>
                {showStatus && (
                    <div
                        ref={firstItemRef}
                        className="absolute top-10 right-0 z-50 w-64 py-3 bg-white shadow-xl border rounded text-lg overflow-hidden"
                    >
                        {Object.entries(status).map(([id, title], index) => (
                            <div
                                key={id}
                                tabIndex={-1}
                                onClick={() => handleDropStatus(id)}
                                className="flex items-center px-4 py-2 hover:bg-gray-200 cursor-pointer"
                            >
                                <div
                                    className={`p-2 rounded-lg ${getColorFromStatus(
                                        title,
                                    )} flex items-center justify-center text-sm font-bold text-white min-w-[110px]`}
                                >
                                    {title}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </td>
            <td
                title={row?.description || row?.comment}
                className="px-4 max-w-[250px] overflow-hidden whitespace-nowrap text-ellipsis h-full border-b border-r border-gray-300 text-left text-gray-500"
            >
                {row?.description !== '' || row?.comment !== '' ? (
                    isEditingDescript ? (
                        <input
                            value={editedDescript}
                            onChange={(e) => setEditedDescript(e.target.value)}
                            onBlur={handleUpdateDescript}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleUpdateDescript();
                            }}
                            autoFocus
                            className="mt-2 w-full text-xl text-gray-700 border border-solid focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 border-gray-300 rounded px-2 py-1"
                        />
                    ) : (
                        <h1
                            onClick={() => {
                                setIsEditingDescript(true);
                                setEditedDescript(row?.description || row?.comment);
                            }}
                            className="text-xl text-gray-600 cursor-pointer hover:bg-neutral-200 py-2 px-1 rounded"
                        >
                            {row?.description || row?.comment}
                        </h1>
                    )
                ) : (
                    <div
                        onClick={() => {
                            setIsEditingDescript(true);
                            setEditedDescript('');
                        }}
                        className="cursor-pointer hover:bg-neutral-100 px-2 py-1 rounded inline-flex items-center gap-2"
                    >
                        <i className="far fa-comment-alt text-lg" />
                        <span className="text-sm text-gray-500">Add comment</span>
                    </div>
                )}
            </td>
            <td className="px-4 w-[145px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left">
                {!!row.sprintId && (
                    <span className="bg-green-100 border border-solid border-green-600 px-2 rounded-xl">
                        {sprint.name}
                    </span>
                )}
            </td>
            <td className="px-4 w-[180px]  relative  whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                {!!row.assignedTo && row.assignedTo !== '' ? (
                    <div className="flex gap-3 items-center">
                        <div
                            ref={dropdownRef}
                            onClick={() => {
                                setShowAssigneeSelect((prev) => !prev);
                            }}
                            title={`Assignee: ${userAssignee?.userName}`}
                            className={` w-10 h-10 rounded-full  ${getColorFromName(
                                userAssignee?.userName,
                            )}  cursor-pointer text-white font-bold flex items-center justify-center text-sm gap-0.5`}
                        >
                            {getInitials(userAssignee.userName)}
                        </div>
                        <span className="font-semibold text-lg text-gray-600">{userAssignee.email}</span>
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
                        onClick={() => {
                            setShowAssigneeSelect((prev) => !prev);
                        }}
                        title="Click to assign user"
                        className=" w-10 h-10 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-600 flex items-center justify-center"
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
            </td>
            <td className="px-4 w-[60px]  overflow-hidden  whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                {!!row.priorityId && (
                    <div className="flex items-center gap-2">
                        <span>{getPriorityIcon(priority[row.priorityId])}</span>
                        <span>{priority[row.priorityId]}</span>
                    </div>
                )}
            </td>
            <td className="px-4 w-[60px]  overflow-hidden  whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                {!!row.createdAt && formatDate(row.createdAt)}
            </td>
            <td className="px-4 w-[60px]  overflow-hidden  whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                {!!row.updatedAt && formatDate(row.updatedAt)}
            </td>
            <td className="px-4 w-[60px]  overflow-hidden  whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                {!!row.createdBy && (
                    <div className="flex -items-center gap-2">
                        <div
                            title={`Assignee: ${userReport?.userName}`}
                            className={` w-10 h-10 rounded-full  ${getColorFromName(
                                userReport?.userName,
                            )}  cursor-pointer text-white font-bold flex items-center justify-center text-sm gap-0.5`}
                        >
                            {getInitials(userReport.userName)}
                        </div>
                        <span className="font-semibold text-lg text-gray-600">{userReport.email}</span>
                    </div>
                )}
            </td>
        </tr>
    );
}
export default TableRow;
function TypeIcon({ type }) {
    if (type === 'bug') {
        return <i className="fas fa-bug text-red-600" title="Bug"></i>;
    }
    if (type === 'done') {
        return null; // checkbox handled separately
    }
    return null;
}
