import { useState, useRef, useEffect, use } from 'react';
import { toast } from 'react-toastify';
import * as apis from '../../apis';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import { FaChevronUp, FaChevronDown, FaEquals } from 'react-icons/fa';

function RightPanel({ item }) {
    const modalRef = useRef();
    const [isShowSubTask, setIsShowSubTask] = useState(false);
    const [subTaskName, setSubTaskName] = useState('');
    const [user, setUser] = useState([]);
    const [userAssignee, setUserAssignee] = useState({});
    const [userReport, setUserReport] = useState({});
    const [subTask, setSubTask] = useState([]);
    const [userStory, setUserStory] = useState([]);
    const [sprint, setSprint] = useState({});
    const [dataUserStory, setDataUserStory] = useState();
    const [updateUserStory, setUpdateDataUserStory] = useState();
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState('');
    const { isShowRightpanel } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const priority = {
        1: 'Low',
        2: 'Medium',
        3: 'High',
        4: 'Highest',
    };
        const status = [
        { id: 1, title: 'TO DO' },
        { id: 2, title: 'IN PROGRESS' },
        { id: 3, title: 'IN REVIEW' },
        { id: 4, title: 'DONE' },
    ];
    const handleSubmid = async () => {
        const task = {
            storyId: userStory.storyId,
            assignedTo: '',
            name: subTaskName,
            description: '',
            statusId: 1,
            estimatedHours: 2,
            loggedHours: 2,
            remainingHours: 2,
        };
        await apis
            .createUserStore('tasks', task)
            .then((res) => {
                setSubTaskName('');
                setIsShowSubTask(false);
            })
            .catch((error) => {
                console.error('Registration error: ', error);
                toast.error('An error occurred during sign up. Please try again.');
            });
    };
    const getUserStoryById = async (id) => {
        await apis
            .getUserStoryById(id)
            .then((res) => {
                setUserStory(res.data.data);
            })
            .catch((error) => {
                console.error('Registration error: ', error);
                toast.error('An error occurred during sign up. Please try again.');
            });
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
        getUserStoryById(item);
        getTaskByStory(item)
    }, [item]);

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
    useEffect(() => {
        if (!!userStory && !!userStory.assignedTo && userStory.updatedBy != '') {
            getUser(userStory?.assignedTo);
            getUserRP(userStory?.updatedBy);
            if (!!userStory.sprintId) getSprintById(userStory.sprintId);
        }
    }, [userStory]);
    function getInitials(name = '') {
        if (!name) return '';
        const words = name.trim().split(' ');
        if (words.length === 1) return words[0][0].toUpperCase();
        return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    }

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
   
    const handleChange = async (e) => {
        const update = {
            epicId: userStory?.epicId,
            sprintId: userStory?.sprintId,
            name: userStory?.name,
            description: userStory?.description,
            priorityId: userStory?.priorityId,
            assignedTo: userStory?.assignedTo,
            statusId: e.target.value,
        };
        try {
            await apis
                .editUserStore(userStory?.storyId, update)
                .then((res) => {
                    getUserStoryById(userStory?.storyId);
                })
                .catch((error) => {
                    console.error('Registration error: ', error);
                    toast.error('An error occurred during sign up. Please try again.');
                });
        } catch (error) {
            toast.error('An error occurred during sign up. Please try again.');
        }
    };

    const handleSave = () => {};
    return (
        <div class="flex flex-col w-2/5 border-l border-gray-200 overflow-y-auto p-6 space-y-6">
            <div class="flex justify-between">
                <div className="flex items-center space-x-2 text-gray-700 text-xl font-normal">
                    <button class="flex items-center space-x-1 hover:text-blue-600">
                        <i class="far fa-edit"></i>
                        <span>Add parent</span>
                    </button>
                    <span>/</span>
                    <span class="font-semibold">NHOM4-19</span>
                </div>
                <div>
                    <button
                        onClick={() => dispatch(actions.IsShowRightPanel(false))}
                        className="text-xl border px-3 py-1 hover:bg-neutral-100 rounded border-solid border-gray-300"
                    >
                        X
                    </button>
                </div>
            </div>
            <h1 class="text-2xl font-bold text-gray-600">{userStory?.name}</h1>
            <button
                onClick={() => setIsShowSubTask(true)}
                class="border border-solid border-gray-300 rounded-md px-3 py-1 text-xl font-normal hover:bg-gray-100 flex items-center space-x-1 w-max"
            >
                <span class="text-2xl font-thin">+</span>
                <span>Add</span>
            </button>
            <div class="flex items-center space-x-2">
                <select
                    onChange={handleChange}
                    value={userStory.statusId}
                    class="text-sm font-semibold bg-gray-100 text-gray-700 rounded px-3 py-1 border border-gray-300 cursor-pointer"
                    aria-label="Status"
                >
                    <option value={1}>To Do</option>
                    <option value={2}>IN PROGRESS</option>
                    <option value={3}>IN REVIEW</option>
                    <option value={4}>DONE</option>
                </select>
                <button class="border border-gray-300 rounded-md px-3 py-1 text-sm font-normal hover:bg-gray-100">
                    <i class="fas fa-bolt"></i>
                </button>
            </div>
            <div className="mb-4">
                <h2 className="font-semibold text-gray-600 mb-1">Description</h2>

                {isEditing ? (
                    <div>
                        <textarea
                            value={userStory.description}
                            onChange={(e) => setDescription(e.target.value)}
                            onBlur={() => {
                                if (!userStory.description.trim()) setIsEditing(false);
                            }}
                            autoFocus
                            placeholder="Add a description..."
                            className="w-full border border-gray-300 rounded-md p-2 text-gray-700 text-lg resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            disabled={!subTaskName.trim()}
                            onClick={() => {
                                // TODO: handle API create here
                            }}
                            className={`px-3 py-2 rounded text-xl font-semibold ${
                                subTaskName.trim()
                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            Save
                        </button>
                    </div>
                ) : (
                    <div className="text-gray-500 text-lg cursor-pointer" onClick={() => setIsEditing(true)}>
                        {userStory.description ? userStory.description : 'Add a description...'}
                    </div>
                )}
            </div>
            {/* {subTask.length > 0 &&  */}
            <div>
                <table className="border-collapse">
                    <thead className="sticky top-0 z-10">
                        <tr>
                            <th className="p-3 border-b border-r border-gray-300 text-sm text-center">Type</th>
                            <th className="p-3 border-b border-r border-gray-300 text-sm text-left">Key</th>
                            <th className="p-3 border-b border-r border-gray-300 text-sm text-left">Summary</th>
                            <th className="p-3 border-b border-r border-gray-300 text-sm text-left">Status</th>
                            <th className="p-3 border-b border-r border-gray-200 text-sm text-left">Sprint</th>
                            <th className="w-12 p-3 border-b border-gray-300" />
                        </tr>
                    </thead>
                    <tbody>
                        
                         { subTask.map((data, index) => (
                            <tr key={index} className="group hover:bg-neutral-100 h-[40px]">
                                
                                <td className="relative w-[110px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-4 text-blue-500  text-lg">
                                            <i className="fas fa-check-square" />
                                        </div>
                                        
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
                                    <i class="fa-solid fa-diagram-subtask" style="color: #30c9e8;"></i>
                                </td>
                                <td className="px-4 w-[400px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left text-gray-700">
                                    {data.name}
                                </td>
                                <td className="px-4 w-[120px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left">
                                    <span className="inline-block bg-gray-300 text-gray-900 font-semibold text-lg  rounded">
                                        {status[data.statusId]}
                                    </span>
                                </td>
                               
                                <td className="px-4 w-[180px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                                    <div className="w-8 h-8 border-r rounded-full bg-[#0ea5e9] flex items-center justify-center text-xs font-semibold text-white">
                                       
                                    </div>
                                </td>
                            </tr>
                        ))} 
                    </tbody>
                </table>
            </div>
            {/* } */}
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
                            <span class="text-gray-400">{getPriorityIcon(priority[userStory.priorityId])}</span>
                            <span class="text-gray-400">{priority[userStory.priorityId]}</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default RightPanel;
