import Assignee from './Assignee';
import * as apis from '../../apis';
import { toast } from 'react-toastify';
import { useEffect, useState, useRef } from 'react';

function TableRow({ row }) {
    const [userAssignee, setUserAssignee] = useState({});
    const [sprint, setSprint] = useState({});
    const [showStatus, setShowStatus] = useState(false);
    const [showAssignee, setShowAssignee] = useState(false);
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
        if (!!row.assignedTo || row.assignedTo !== '') getUser(row.assignedTo);
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
            type :'bug',
            buildPayload: (name) => ({
                projectId: localStorage.getItem('projectId'),
                storyId: name.storyId,
                taskId: name.taskId,
                title: name.title,
                description: name.description,
                assignedTo: name.assignedTo,
                severityId: name.severityId,
                priorityId: name.priorityId,
                statusId: name.statusId,
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

                toast.success('Cập nhật thành công!');
            } catch (error) {
                console.error('Update error:', error);
                toast.error('Đã xảy ra lỗi, vui lòng thử lại.');
            }
        };
        PostData();
        setShowStatus(false);
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
                {row.name || row.title}
            </td>
            <td   ref={firstItemRef} className="px-4 w-[120px] relative   whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left">
                <div
                    onClick={() => setShowStatus((prev) => !prev)}
                    className={`${getColorFromStatus(
                        status[row.statusId],
                    )} inline-block text-gray-200 px-2 cursor-pointer font-semibold text-lg  rounded`}
                >
                    {status[row.statusId]}
                </div>
                {showStatus && (
                    <div className="absolute top-10 right-0 z-50 w-64 py-3 bg-white shadow-xl border rounded text-lg overflow-hidden">
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
            <td className="px-4 w-[145px]  overflow-hidden whitespace-nowrap text-ellipsis h-full border-b border-r border-gray-300 text-left text-gray-500">
                <i className="far fa-comment-alt text-lg" /> Add comment
            </td>
            <td className="px-4 w-[145px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left">
                {!!row.sprintId && (
                    <span className="bg-green-100 border border-solid border-green-600 px-2 rounded-xl">
                        {sprint.name}
                    </span>
                )}
            </td>
            <td className="px-4 w-[180px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                {!!row.assignedTo && row.assignedTo !== '' ? (
                    <div className="flex gap-3 items-center">
                        <div className="w-10 h-10 border-r rounded-full bg-[#0ea5e9] flex items-center justify-center text-sm font-semibold text-white">
                            {getInitials(userAssignee.userName)}
                        </div>
                        <span className="font-semibold text-lg text-gray-600">{userAssignee.email}</span>
                    </div>
                ) : (
                    <div className="w-10 h-10  rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-600 flex items-center justify-center">
                        <i className="fas fa-user"></i>
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
