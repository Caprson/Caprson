import Filters from './Filters';
import BoardContent from './BoardContent';
import { DndContext, useDraggable, useDroppable } from '@dnd-kit/core';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import * as apis from '../../apis';
import { DragOverlay } from '@dnd-kit/core';
import PopupSprint from './PopupSprint';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

function DraggableTask({ id, index, name, item }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: String(id) });
    const [showAssigneeSelect, setShowAssigneeSelect] = useState(false);
    const [user, setUser] = useState([]);
    const [userAssignee, setUserAssignee] = useState({});
    const dropdownRef = useRef(null);

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

    useEffect(() => {
        if (item != undefined) {
            getUser(item?.assignedTo);
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
                        getUser(update?.assignedTo);
                        GetUserByProject();
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
    return (
        <div
            ref={setNodeRef}
            {...attributes}
            style={style}
            className="flex items-center relative justify-between px-4 py-3 bg-white rounded shadow cursor-move select-none mb-2"
        >
            <div {...listeners} className="absolute top-0 bottom-0 left-0 right-0 cursor-pointer "></div>
            <div className="flex items-center space-x-3">
                <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" onClick={stopDrag} />
                <span className="text-xl text-gray-900">
                    <span className="font-semibold">NHOM4-{index + 1}</span> {name}
                </span>
            </div>
            <div className="flex items-center space-x-3">
                <button onClick={stopDrag} className="bg-gray-300 text-gray-700 text-sm rounded px-2 py-1">
                    TO DO
                </button>
                <button onClick={stopDrag} className="text-gray-500 text-xl px-2">
                    -
                </button>
                <button onClick={stopDrag} className="text-orange-600 text-xl px-2">
                    =
                </button>

                {item != undefined && item.assignedTo ? (
                    <div
                    ref={dropdownRef}
                        onClick={(e) => {
                            stopDrag(e);
                            setShowAssigneeSelect((prev) => !prev);
                        }}
                        title={`Assignee: ${userAssignee?.userName}`}
                         className={`relative w-8 h-8 rounded-full ${getColorFromName(userAssignee?.userName)} hover:opacity-90 cursor-pointer text-white font-bold flex items-center justify-center text-sm gap-0.5`}
                    >
                        {/* Avatar gồm nhiều chữ cái với màu riêng */}
                        {getInitialsElements(userAssignee?.userName)}

                        {showAssigneeSelect && (
                            <ul className="absolute top-10 right-0 z-50 w-96 py-3  bg-white shadow-md border rounded text-lg overflow-hidden">
                                {user.map((data) => (
                                    <li
                                        key={data.userId}
                                        onClick={() => handleUserSelect( data.userId)}
                                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-lg font-bold bg-orange-500">
                                            {getInitials(data.userName)}
                                        </div>
                                        <span className='text-gray-700'>{data.userName}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                ) : (
                    <div
                        onClick={(e) => {
                            stopDrag(e);
                            setShowAssigneeSelect((prev) => !prev);
                        }}
                        title="Click to assign user"
                        className="relative w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400 cursor-pointer text-gray-600 flex items-center justify-center"
                    >
                        <i className="fas fa-user"></i>

                        {showAssigneeSelect && (
                            <ul className="absolute top-10 right-0 z-50 w-96 py-3  bg-white shadow-md border rounded text-lg overflow-hidden">
                                {user.map((data) => (
                                    <li
                                        key={data.userId}
                                        onClick={() => handleUserSelect( data.userId)}
                                        className="flex items-center gap-2 px-4 py-3 hover:bg-gray-100 cursor-pointer"
                                    >
                                        <div className="w-6 h-6 rounded-full flex items-center justify-center text-lg font-bold bg-orange-500">
                                            {getInitials(data.userName)}
                                        </div>
                                        <span className='text-gray-700'>{data.userName}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
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

function SprintColumn({ id, title, timeRange, items, renderTask }) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div
            ref={setNodeRef}
            aria-labelledby={`${id}-heading`}
            className="border border-gray-200 rounded-md p-4 space-y-3"
        >
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <input
                        type="checkbox"
                        id={`${id}-checkbox`}
                        className="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    />
                    <button
                        aria-expanded="true"
                        aria-controls={`${id}-items`}
                        className="flex items-center space-x-1 font-semibold text-gray-900 text-xl focus:outline-none"
                    >
                        <i className="fas fa-chevron-down text-gray-600"></i>
                        <span id={`${id}-heading`}>{title}</span>
                    </button>
                    <span className="text-gray-500 text-xl">{timeRange}</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div className="ml-auto flex items-center space-x-1 text-lg font-semibold rounded-md px-1.5 py-0.5">
                        <span className="bg-gray-200 text-gray-700 rounded px-2 py-0.5">0</span>
                        <span className="bg-blue-400 text-white rounded px-2 py-0.5">0</span>
                        <span className="bg-green-100 text-green-700 rounded px-2 py-0.5">0</span>
                    </div>
                    <button className="border border-solid border-gray-300 rounded-md px-3 py-1 text-xl font-semibold hover:bg-gray-100">
                        Complete sprint
                    </button>
                    <button
                        aria-label="More options"
                        className="border border-transparent rounded-md p-2 hover:bg-gray-100"
                    >
                        <i className="fas fa-ellipsis-h text-gray-600"></i>
                    </button>
                </div>
            </div>

            <ul id={`${id}-items`} className="divide-y divide-gray-200 border border-gray-200 rounded-md">
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
    const { isShowPopup } = useSelector((state) => state.app);
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
                .createUserStore(userStore)
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
            const sprints = sprintRes.data.data;

            setItems(items); // vẫn cập nhật state nếu bạn cần sau này
            setItemSprint(sprints);

            const newColumns = {
                backlog: items.filter((item) => !item.sprintId),
            };

            sprints.forEach((sprint) => {
                const sprintItems = items.filter((item) => item.sprintId === sprint.sprintId);
                if (sprint.name && Array.isArray(sprintItems)) {
                    newColumns[sprint.name] = sprintItems.filter(Boolean); // loại null/undefined
                }
            });

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
    }, []);

    useEffect(() => {
        if (isUpdate) {
            GetAllSprint();
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
        const targetSprint = itemsSprint.find((s) => s.name === overId);

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

    return (
        <div className="h-full p-4 space-y-6">
            <Filters />

            <DndContext
                onDragStart={(event) => setActiveId(event.active.id)}
                onDragEnd={(event) => {
                    setActiveId(null);
                    handleDragEnd(event);
                }}
            >
                <div className="flex flex-1 overflow-y-hidden overflow-x-hidden max-h-full">
                    <div className="w-full overflow-y-auto overflow-x-auto px-6 py-5 space-y-6">
                        {/* Dynamic Sprint Columns */}
                        {Object.keys(columns)
                            .filter((key) => key !== 'backlog' && Array.isArray(columns[key]))
                            .map((key) => (
                                <SprintColumn
                                    key={key}
                                    id={key}
                                    title={key}
                                    timeRange="..."
                                    items={columns[key]}
                                    renderTask={(item, idx) => (
                                        <DraggableTask
                                            key={item?.storyId}
                                            id={String(item?.storyId)}
                                            item={item}
                                            index={idx}
                                            name={item?.name}
                                        />
                                    )}
                                />
                            ))}

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
                                        <span className="bg-green-100 text-green-700 rounded px-2 py-0.5">0</span>
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
