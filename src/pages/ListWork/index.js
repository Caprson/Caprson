import UserCircles from './UserCircles';
import TableRow from './TableRow';
import { useState, useRef, useEffect } from 'react';
import * as apis from '../../apis';
import { toast } from 'react-toastify';

function ListWork() {
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);
    const [dropUp, setDropUp] = useState(false);
    const [isCreating, setIsCreating] = useState();
    const [dataAll, setDataAll] = useState([]);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState([]);
    const [users, setUsers] = useState([]);
    const today = new Date();
    const startDate = today.toISOString().split('T')[0]; // yyyy-mm-dd

    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(today.getDate() + 7);
    const endDate = sevenDaysLater.toISOString().split('T')[0];

    const TYPE_OPTIONS = [
        {
            id: 1,
            name: 'Epic',
            icon: '⚡',
            type: 'epic',
            buildPayload: (name) => ({
                name: name,
                description: '',
                startDate: startDate,
                endDate: endDate,
                statusId: 1,
            }),
        },
        {
            id: 2,
            name: 'Story',
            icon: '📘',
            type: 'stories',
            buildPayload: (name) => ({
                epicId: null,
                sprintId: null,
                name: name,
                description: '',
                priorityId: 1,
                assignedTo: '',
                statusId: 1,
            }),
        },
        {
            id: 4,
            name: 'Bug',
            icon: '🐞',
            buildPayload: (name) => ({
                projectId: localStorage.getItem('projectId'),
                storyId: 1,
                taskId: 1,
                title: name,
                description: '',
                assignedTo: '',
                severityId: 1,
                priorityId: 1,
                statusId: 1,
            }),
        },
    ];
    const [selectedType, setSelectedType] = useState(TYPE_OPTIONS[1]); // mặc định là Story
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const [userStore, SetUserStore] = useState({
        name: '',
    });

    useEffect(() => {
        if (dropdownOpen && dropdownRef.current) {
            const rect = dropdownRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - rect.bottom;
            const dropdownHeight = 200; // hoặc đo thật nếu muốn chính xác hơn

            setDropUp(spaceBelow < dropdownHeight); // nếu thiếu chỗ thì bật dropUp
        }
    }, [dropdownOpen]);
    const handleCreateClick = () => {
        setIsCreating(true);
    };
    const handleChange = (e) => {
        SetUserStore({ ...userStore, [e.target.name]: e.target.value });
    };
    const handleInputKeyPress = async (e) => {
        if (e.key === 'Enter') {
            CreateListStore();
        }
    };

    const CreateListStore = async () => {
        if (userStore.name.trim() === '') return;
        try {
            const payload = selectedType.buildPayload(userStore.name);
            if (selectedType.name !== 'Bug') {
                await apis
                    .createUserStore(selectedType.type, payload)
                    .then((res) => {
                        console.log(res);
                        SetUserStore({ ...userStore, name: '' });
                        setIsCreating(false);
                    })
                    .catch((error) => {
                        console.error('Registration error: ', error);
                        toast.error('An error occurred during sign up. Please try again.');
                    });
            } else {
                await apis
                    .createBug(payload)
                    .then((res) => {
                        SetUserStore({ ...userStore, name: '' });
                        setIsCreating(false);
                    })
                    .catch((error) => {
                        console.error('Registration error: ', error);
                        toast.error('An error occurred during sign up. Please try again.');
                    });
            }
        } catch (error) {
            toast.error('Creation failed');
        }
    };

    const GetAllTypeProject = async () => {
        try {
            const [storyRes, bugsRes, epicRes] = await Promise.all([
                apis.getUserStore(),
                apis.getAllBug(),
                apis.getAllEpics(),
            ]);
            const assignedstoryRes =
                selectedUserId.length === 0
                    ? storyRes.data.data
                    : storyRes.data.data.filter((item) => selectedUserId.includes(item.assignedTo));
            const assignedbugsRes =
                selectedUserId.length === 0
                    ? bugsRes.data.data
                    : bugsRes.data.data.filter((item) => selectedUserId.includes(item.assignedTo));
            const assignedepicRes =
                selectedUserId.length === 0
                    ? epicRes.data.data
                    : epicRes.data.data.filter((item) => selectedUserId.includes(item.assignedTo));
            // Giả sử mỗi response trả về .data là một mảng
            const allData = [
                ...assignedstoryRes.map((item) => ({ ...item, type: 'story' })),
                ...assignedbugsRes.map((item) => ({ ...item, type: 'bug' })),
                ...assignedepicRes.map((item) => ({ ...item, type: 'epic' })),
            ];
            
            console.log('Merged Data:', allData);
            setDataAll(allData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
            return [];
        }
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

    useEffect(() => {
        GetAllTypeProject();
        GetUserByProject();
    }, []);

    useEffect(() => {
        if (isUpdate) {
            setIsUpdate(false);
            GetAllTypeProject();
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

   

    return (
        <div className="max-w-[1440px] h-full mx-auto p-6">
            {/* Search and Filter */}
            <div className="flex flex-wrap items-center justify-between mb-4 gap-3">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <input
                            type="search"
                            placeholder="Search list"
                            className="border border-gray-300 rounded px-3 py-2 w-60 text-xl placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                            aria-label="Search list"
                        />
                        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                    <UserCircles
                        user={users}
                        idSelelct={selectedUserId}
                        selectUser={setSelectedUserId}
                        update={setIsUpdate}
                    />
                    <button
                        className="border border-gray-300 rounded px-3 py-2 text-xl font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Filter
                        <svg
                            className="inline w-3 h-3 ml-1"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="border border-gray-300 rounded px-4 py-2 text-xl font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 flex items-center gap-1"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Group
                        <svg
                            className="w-3 h-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    <button
                        aria-label="Settings"
                        className="border border-gray-300 rounded p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                        </svg>
                    </button>
                    <button
                        aria-label="More options"
                        className="border border-gray-300 rounded p-2 text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Table */}

            <div className="border border-gray-300  rounded-xl ">
                <div className=" overflow-x-hidden overflow-y-hidden  ">
                    <div className="overflow-x-auto overflow-y-auto max-h-[450px] shadow">
                        <table className="min-w-[900px] w-full border-collapse text-2xl text-gray-700">
                            <thead className="bg-gray-100 sticky top-0 ">
                                <tr>
                                    <th className="w-12 p-4 border-b border-r border-gray-300 text-center">
                                        <input
                                            type="checkbox"
                                            aria-label="Select all"
                                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                    </th>
                                    <th className="p-3 border-b border-r border-gray-300 font-semibold text-center">
                                        Type
                                    </th>
                                    <th className="p-3 border-b border-r border-gray-300 font-semibold text-left">
                                        Key
                                    </th>
                                    <th className="p-3 border-b border-r border-gray-300 font-semibold text-left">
                                        Summary
                                    </th>
                                    <th className="p-3 border-b border-r border-gray-300 font-semibold text-left">
                                        Status
                                    </th>
                                    <th className="p-3 border-b border-r border-gray-300 font-semibold text-left">
                                        Comments
                                    </th>
                                    <th className="p-3 border-b border-r border-gray-200 font-semibold text-left">
                                        Sprint
                                    </th>
                                    <th className="w-12 p-3 border-b border-gray-300">Assignee</th>
                                </tr>
                            </thead>
                            <tbody>
                                {dataAll.map((data, index) => (
                                    <TableRow key={index} update={setIsUpdate} row={data} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {isCreating ? (
                    <div
                        ref={inputRef}
                        className="flex items-center border border-blue-500 rounded-lg px-3 py-2 mt-4 focus-within:ring-2 focus-within:ring-blue-500 w-full shadow-sm relative"
                    >
                        {/* Dropdown Trigger */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="flex items-center text-blue-600 font-medium border border-blue-500 rounded px-2 py-1 mr-3 text-2xl bg-white"
                            >
                                <span>{selectedType.icon}</span>
                                <i className="fas text-xl fa-caret-down ml-1" />
                            </button>

                            {/* Dropdown Menu */}
                            {dropdownOpen && (
                                <div
                                    ref={dropdownRef}
                                    className={`absolute z-10 bg-white border rounded shadow-md w-96 ${
                                        dropUp ? 'bottom-full mb-1' : 'top-full mt-1'
                                    }`}
                                >
                                    {TYPE_OPTIONS.map((type) => (
                                        <div
                                            key={type.id}
                                            className={`px-3 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2 text-xl ${
                                                selectedType.id === type.id ? 'bg-blue-50 font-semibold' : ''
                                            }`}
                                            onClick={() => {
                                                setSelectedType(type);
                                                setDropdownOpen(false);
                                            }}
                                        >
                                            <span>{type.icon}</span>
                                            <span>{type.name}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <input
                            type="text"
                            value={userStore.name}
                            name="name"
                            onChange={handleChange}
                            onKeyDown={handleInputKeyPress}
                            className="flex-1 outline-none text-xl placeholder-gray-400"
                            placeholder="What needs to be done?"
                            autoFocus
                        />
                        <button type="button" className="text-gray-600 hover:text-black mr-2">
                            <i className="fas fa-user-circle text-3xl" />
                        </button>
                        {/* Button Create */}
                        <button
                            onClick={CreateListStore}
                            className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 text-lg font-semibold flex items-center gap-1"
                        >
                            Create <span>↩</span>
                        </button>
                    </div>
                ) : (
                    <button
                        className="mt-4 flex items-center gap-2 text-gray-700 font-semibold text-xl p-4 hover:bg-neutral-100 w-full"
                        type="button"
                        onClick={handleCreateClick}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Create
                    </button>
                )}
            </div>
        </div>
    );
}
export default ListWork;
