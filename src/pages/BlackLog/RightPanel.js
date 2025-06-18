import { useState, useRef, useEffect, use } from 'react';
import { toast } from 'react-toastify';
import * as apis from '../../apis';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

function RightPanel({ item }) {
    const modalRef = useRef();
    const [isShowSubTask, setIsShowSubTask] = useState(false);
    const [subTaskName, setSubTaskName] = useState('');
    const [user, setUser] = useState([]);
    const [userAssignee, setUserAssignee] = useState({});
    const [userReport, setUserReport] = useState({});
    const [userStory, setUserStory] = useState([]);
    const [sprint, setSprint] = useState({});
    const [dataUserStory, setDataUserStory] = useState();
    const [updateUserStory, setUpdateDataUserStory] = useState();
    const { isShowRightpanel } = useSelector((state) => state.app);
    const dispatch = useDispatch();

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
                
                console.log('Creating subtask:', res.data);
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
            .getSprintByProject(id)
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
    console.log(userStory);
    useEffect(() => {
        if (!!userStory) {
            getUser(userStory.assignedTo);
            getUserRP(userStory.updatedBy);
            getSprintById(userStory.sprintId);
        }
    }, [userStory]);
    function getInitials(name = '') {
        if (!name) return '';
        const words = name.trim().split(' ');
        if (words.length === 1) return words[0][0].toUpperCase();
        return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    }
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
            <h1 class="text-2xl font-bold text-gray-900">{userStory?.name}</h1>
            <button
                onClick={() => setIsShowSubTask(true)}
                class="border border-solid border-gray-300 rounded-md px-3 py-1 text-xl font-normal hover:bg-gray-100 flex items-center space-x-1 w-max"
            >
                <span class="text-2xl font-thin">+</span>
                <span>Add</span>
            </button>
            <div class="flex items-center space-x-2">
                <select
                    class="text-sm font-semibold bg-gray-300 text-gray-700 rounded px-3 py-1 border border-gray-300 cursor-pointer"
                    aria-label="Status"
                >
                    <option>To Do</option>
                </select>
                <button class="border border-gray-300 rounded-md px-3 py-1 text-sm font-normal hover:bg-gray-100">
                    <i class="fas fa-bolt"></i>
                </button>
            </div>
            <div>
                <h2 class="font-semibold text-gray-900 mb-1">Description</h2>
                <textarea
                    placeholder="Add a description..."
                    class="w-full border border-gray-300 rounded-md p-2 text-gray-500 text-xl resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>
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
                    <div class="flex items-center space-x-3">
                        <span class="w-24 font-semibold text-gray-900">Assignee</span>
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold">
                                {getInitials(userAssignee.userName)}
                            </div>
                            <span>{userAssignee.userName}</span>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="w-24 font-semibold text-gray-900">Reporter</span>
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold">
                                {getInitials(userReport.userName)}
                            </div>
                            <span>{userReport.userName}</span>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <span class="w-24 font-semibold text-gray-900">Sprint</span>
                        <div class="flex flex-col space-y-1 ml-24"></div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="w-24 font-semibold text-gray-900">Priority</span>
                        <span class="text-gray-400"></span>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default RightPanel;
