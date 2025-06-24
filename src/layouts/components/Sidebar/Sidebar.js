import { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { NavLink } from 'react-router-dom';
import * as apis from '~/apis/index';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';

import config from '~/config';
import {
    HomeActiveIcon,
    HomeIcon,
    LiveActiveIcon,
    LiveIcon,
    UserGroupActiveIcon,
    UserGroupIcon,
    YourWork,
} from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts/SuggestedAccounts';
import * as userService from '~/services/userService';

const cx = classNames.bind(styles);

function Sidebar() {
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [projects,setProjects] = useState([])
    useEffect(() => {
        userService
            .getSuggested({ page: 1, perPage: 5 })
            .then((data) => {
                setSuggestedUsers(data);
            })
            .catch((error) => console.error());
    }, []);
    useEffect(() => {
        const FetApi = async () => {
            await apis
                .getProjectByUserId()
                .then((res) => {
                    setProjects(res.data.data);
                    toast.success('Sign up successful!');
                })
                .catch((error) => {
                    console.log(error);
                    toast.error('An error occurred during sign up. Please try again.');
                });
        };
        FetApi();
    }, []);
    return (
        <aside class="flex fixed x-col w-96 h-full border-r border-gray-200 px-4 py-6 text-2xl select-none">
            <nav class="flex flex-col space-y-3 text-gray-700">
                <a href="#" class="flex items-center space-x-3 hover:text-blue-600">
                    <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                    </svg>
                    <span>For you</span>
                </a>

                <button className="flex items-center space-x-3 hover:text-blue-600">
                    <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span>Projects</span>
                    <button aria-label="Add project" class="ml-auto text-gray-400 hover:text-gray-600">
                        <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                        </svg>
                    </button>
                </button>

                <div class="mt-4 text-lg font-semibold text-gray-400 uppercase tracking-wide">Recent</div>
                {projects.map((data,index) => (
                    <NavLink
                        key={index}
                        to="/" // Thay đổi đường dẫn tùy ý
                        className="flex items-center space-x-2 mt-1 px-2 py-1 rounded bg-blue-100 text-blue-700 font-semibold"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            viewBox="0 0 24 24"
                        >
                            <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                            <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        <span>{data.name}</span>
                    </NavLink>
                ))}
                <a href="/projects" class="flex items-center space-x-2 mt-1 px-2 py-1 rounded hover:bg-gray-100">
                    <svg
                        class="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                    >
                        <path d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    <span>View all projects</span>
                </a>

                <a href="#" class="flex items-center space-x-2 mt-1 px-2 py-1 rounded hover:bg-gray-100">
                    <svg
                        class="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 8v4l3 3" />
                    </svg>
                    <span>Teams</span>
                </a>
            </nav>
        </aside>
    );
}

export default Sidebar;
