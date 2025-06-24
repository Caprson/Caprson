import images from '~/assets/images';
import * as apis from '~/apis/index';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Projects() {
    const navigate = useNavigate();

    const [project, setProject] = useState([]);

    useEffect(() => {
        const FetApi = async () => {
            await apis
                .getProjectByUserId()
                .then((res) => {
                    setProject(res.data.data);
                    console.log(res.data.data);
                    toast.success('Sign up successful!');
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('An error occurred during sign up. Please try again.');
                });
        };
        FetApi();
    }, []);

    const GetUserById = (id) => {
        var username = '';
        const FetApi = async () => {
            await apis
                .getUserById(id)
                .then((res) => {
                    username = res.data.data.userName;
                    toast.success('Sign up successful!');
                })
                .catch((error) => {
                    console.error('Registration error: ', error);
                    toast.error('An error occurred during sign up. Please try again.');
                });
        };
        FetApi();
        return username;
    };

    const SelectProject = (proId) => {
        navigate('/blacklog');
        if (proId !== null) {
            console.log(proId);
            localStorage.setItem('projectId', proId);
        }
    };
    const [userMap, setUserMap] = useState({});
    const getAllUser = async (id) => {
        try {
            const res = await apis.getUseById(id);
            return res.data.data;
        } catch (error) {
            console.error('Fetch error:', error);
            toast.error('An error occurred during sign up. Please try again.');
            return null;
        }
    };
    useEffect(() => {
        const fetchCreators = async () => {
            const res = {};
            await Promise.all(
                project.map(async (pj) => {
                    if (pj?.createdBy) {
                        const user = await getAllUser(pj.createdBy);
                        res[pj.createdBy] = user;
                    }
                }),
            );
            setUserMap(res);
        };
        if (project.length) fetchCreators();
    }, [project]);
    function getColorFromName(name = '') {
        const colors = ['bg-red-500', 'bg-green-500', 'bg-yellow-500', 'bg-blue-500', 'bg-purple-500'];
        const index = name ? name.charCodeAt(0) % colors.length : 0;
        return colors[index];
    }
       function getInitials(name = '') {
        if (!name) return '';
        const words = name.trim().split(' ');
        if (words.length === 1) return words[0][0].toUpperCase();
        return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    }
    const formatDate = (dateString) => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
};
    return (
        <body class="bg-white text-gray-800 font-sans p-6">
            <div class="max-w-6xl mx-auto">
                <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <h2 class="text-gray-900 font-semibold text-lg mb-4 sm:mb-0">Projects</h2>
                    <div class="flex space-x-2">
                        <button
                            class="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                            type="button"
                            onClick={() => navigate('/createProject')}
                        >
                            Create project
                        </button>
                        <button
                            class="border border-gray-300 text-gray-700 text-sm font-normal px-3 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                            type="button"
                        >
                            Templates
                        </button>
                    </div>
                </div>
                <form class="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0 mb-4 max-w-md">
                    <label class="sr-only" for="search">
                        Search projects
                    </label>
                    <input
                        class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 flex-grow"
                        id="search"
                        placeholder="Search projects"
                        type="search"
                    />
                    <label class="sr-only" for="filter">
                        Filter by product
                    </label>
                    <select
                        class="border border-gray-300 rounded px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-48"
                        id="filter"
                    >
                        <option>Filter by product</option>
                    </select>
                </form>
                <div class="overflow-x-auto border border-gray-300 rounded">
                    <table class="min-w-full divide-y divide-gray-300 text-sm">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="w-12 px-3 py-2 text-left text-gray-700 font-semibold" scope="col">
                                    <i class="far fa-star"></i>
                                </th>
                                <th
                                    class="px-3 py-2 text-left text-gray-700 font-semibold cursor-pointer select-none"
                                    scope="col"
                                >
                                    Name
                                    <i class="fas fa-sort-down ml-1 text-gray-400"></i>
                                </th>
                                <th class="px-3 py-2 text-left text-gray-700 font-semibold" scope="col">
                                    Key
                                </th>
                                <th class="px-3 py-2 text-left text-gray-700 font-semibold" scope="col">
                                    Type
                                </th>
                                <th class="px-3 py-2 text-left text-gray-700 font-semibold" scope="col">
                                    Lead
                                </th>
                                <th class="w-20 px-3 py-2 text-center text-gray-700 font-semibold" scope="col">
                                    Project URL
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200 bg-white">
                            {project.map((pj) => (
                                <tr>
                                    <td class="w-12 px-3 py-2 text-left text-gray-400">
                                        <i class="far fa-star"></i>
                                    </td>
                                    <td class="px-3 py-2 flex items-center space-x-2">
                                        <img
                                            alt="Blue square icon with a white bear face illustration"
                                            class="w-5 h-5 rounded"
                                            height="20"
                                            src="https://storage.googleapis.com/a1aa/image/dca10588-fd8a-41bc-5676-15692ec2b9d6.jpg"
                                            width="20"
                                        />
                                        <a
                                            class="text-blue-600 hover:underline text-sm cursor-pointer font-normal"
                                            onClick={() => SelectProject(pj?.projectId)}
                                        >
                                            {pj.name}
                                        </a>
                                    </td>
                                    <td class="px-3 py-2 text-gray-900 font-normal">{}</td>
                                    <td class="px-3 py-2 text-gray-900 font-normal">{formatDate(pj?.createdAt)}</td>
                                    <td class="px-3 py-2 flex items-center space-x-2 text-gray-900 font-normal">
                                        <div
                                            aria-label="LD"
                                            className={`w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-semibold text-white select-none ${getColorFromName(userMap[pj.createdBy]?.userName)}`}
                                        >
                                           {getInitials(userMap[pj.createdBy]?.userName)}
                                        </div>

                                        <span> {userMap[pj.createdBy]?.userName }</span>
                                    </td>
                                    <td class="w-20 px-3 py-2 text-center text-gray-400 cursor-pointer select-none">
                                        •••
                                    </td>
                                </tr>
                            ))}
                            {/* <tr>
                                <td class="w-12 px-3 py-2 text-left text-gray-400">
                                    <i class="far fa-star"></i>
                                </td>
                                <td class="px-3 py-2 flex items-center space-x-2">
                                    <img
                                        alt="Red square icon with a white wrench illustration"
                                        class="w-5 h-5 rounded"
                                        height="20"
                                        src="https://storage.googleapis.com/a1aa/image/3c95f2ef-dc82-4465-31db-0d9c0a0596a3.jpg"
                                        width="20"
                                    />
                                    <a class="text-blue-600 hover:underline text-sm font-normal" href="#">
                                        WorkWave
                                    </a>
                                </td>
                                <td class="px-3 py-2 text-gray-900 font-normal">NHOM4</td>
                                <td class="px-3 py-2 text-gray-900 font-normal">Company-managed software</td>
                                <td class="px-3 py-2 flex items-center space-x-2 text-gray-900 font-normal">
                                    <div
                                        aria-label="LD"
                                        class="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-xs font-semibold text-white select-none"
                                    >
                                        LD
                                    </div>
                                    <span>Lê Chung Dũng</span>
                                </td>
                                <td class="w-20 px-3 py-2 text-center text-gray-400 cursor-pointer select-none">•••</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                <nav
                    aria-label="Pagination"
                    class="mt-6 flex justify-center items-center space-x-3 text-gray-500 text-sm select-none"
                >
                    <button
                        aria-label="Previous page"
                        class="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        type="button"
                    >
                        <svg
                            aria-hidden="true"
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            viewbox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M15 19l-7-7 7-7" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                    <button
                        aria-current="page"
                        class="border border-blue-500 text-blue-600 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        type="button"
                    >
                        1
                    </button>
                    <button
                        aria-label="Next page"
                        class="p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
                        type="button"
                    >
                        <svg
                            aria-hidden="true"
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            viewbox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path d="M9 5l7 7-7 7" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </button>
                </nav>
            </div>
        </body>
    );
}
export default Projects;
