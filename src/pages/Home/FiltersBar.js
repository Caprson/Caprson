import { useEffect,useState } from 'react';
import *  as apis from "../../apis"
import { toast } from 'react-toastify';
import Icon from './Icon';

function FiltersBar({setSelectedUserId,update,selectedUserId}) {
    const [users,setUsers] = useState([]);
        function getInitials(name = '') {
        if (!name) return '';
        const words = name.trim().split(' ');
        if (words.length === 1) return words[0][0].toUpperCase();
        return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    }
    const handleToggleUser = (userId) => {
        setSelectedUserId(
            (prev) =>
                prev.includes(userId)
                    ? prev.filter((id) => id !== userId) // Xoá nếu đã có
                    : [...prev, userId], // Thêm nếu chưa có
        );
        update(true);
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
        useEffect(()=>{
            GetUserByProject()
        },[])
    return (
        <div className=" flex justify-between px-8 mb-4">
            <div className='flex flex-wrap items-center space-x-3'>
                <input
                    aria-label="Search board"
                    className="border border-gray-300 border-solid rounded px-4 py-2 text-xl w-48 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
                    placeholder="Search b..."
                    type="search"
                />
                <button
                    aria-label="User filter"
                    className="p-2 rounded border border-gray-300 hover:bg-gray-100"
                    type="button"
                >
                    <Icon className="far fa-user-circle text-gray-600" />
                </button>
                <div aria-label="User avatars" className="flex -space-x-2" role="list" title="Users">
                    {users?.map((data, index) => (
                    <div
                        key={index}
                        title={data.userName}
                        onClick={() => handleToggleUser(data.userId)}
                        className={`w-12 h-12 rounded-full flex p-1 items-center justify-center cursor-pointer
                            ${selectedUserId.includes(data.userId) ? 'border-2 border-blue-500' : ''}`}
                        aria-label={`User initial ${getInitials(data.userName)}`}
                    >
                        <div
                        className="w-8 h-8 rounded-full bg-orange-500 text-white font-semibold flex items-center justify-center text-xl"
                        >
                                
                            {getInitials(data.userName)}
                        </div>
                    </div>
                ))}
                <div
                    aria-label="User icon"
                    title="UnAssignee"
                    onClick={() => handleToggleUser('')}
                    class={`w-12 h-12 rounded-full p-1 flex items-center justify-center cursor-pointer ${selectedUserId.includes('')? 'border-2 border-blue-500' : ''}`}
                >
                    <div
                    className="w-9 h-9 bg-gray-300 text-lg rounded-full flex items-center justify-center">

                        <i class="fas fa-user text-gray-600"></i>
                    </div>
                </div>
                </div>
                <button className="border border-gray-300 rounded px-4 py-2 text-xl" type="button">
                    Type
                    <svg
                        className="inline w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <button className="border border-gray-300 rounded px-4 py-2 text-xl" type="button">
                    Label
                    <svg
                        className="inline w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
                <button className="border border-gray-300 rounded px-4 py-2 text-xl" type="button">
                    Quick filters
                    <svg
                        className="inline w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </button>
            </div>
            <div className='flex flex-wrap items-center space-x-3'>
                            <button
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold rounded px-4 py-2"
                type="button"
            >
                Complete sprint
            </button>
            <button aria-label="Refresh" className="p-2 rounded border border-gray-300 hover:bg-gray-100" type="button">
                <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <polyline points="1 4 1 10 7 10"></polyline>
                    <polyline points="23 20 23 14 17 14"></polyline>
                    <path d="M20.49 9A9 9 0 0 0 5.21 15.36L1 11" stroke="#4B5563" strokeLinejoin="round"></path>
                    <path d="M3.51 15A9 9 0 0 0 18.79 8.64L23 13" stroke="#4B5563" strokeLinejoin="round"></path>
                </svg>
            </button>
            <button
                className="border border-blue-600 text-blue-600 rounded px-4 py-2 text-xl font-semibold"
                type="button"
            >
                Group: Stories
            </button>
            <button
                aria-label="Open in new window"
                className="p-2 rounded border border-gray-300 hover:bg-gray-100"
                type="button"
            >
                <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" x2="21" y1="14" y2="3"></line>
                </svg>
            </button>
            <button
                aria-label="Board settings"
                className="p-2 rounded border border-gray-300 hover:bg-gray-100"
                type="button"
            >
                <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <rect height="18" rx="2" width="18" x="3" y="3"></rect>
                    <line x1="9" x2="9" y1="3" y2="21"></line>
                    <line x1="15" x2="15" y1="3" y2="21"></line>
                    <line x1="3" x2="21" y1="9" y2="9"></line>
                    <line x1="3" x2="21" y1="15" y2="15"></line>
                </svg>
            </button>
            <button aria-label="More options" className="p-2 rounded hover:bg-gray-100" type="button">
                <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <circle cx="12" cy="12" r="1"></circle>
                    <circle cx="19" cy="12" r="1"></circle>
                    <circle cx="5" cy="12" r="1"></circle>
                </svg>
            </button>
            </div>
        </div>
    );
}
export default FiltersBar;
