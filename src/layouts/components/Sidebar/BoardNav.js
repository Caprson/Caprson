function BoardNav() {
    return (
        <nav
            aria-label="Board navigation"
            className="flex flex-wrap w-full items-center space-x-6 border-b border-gray-200 px-10 py-3 mb-3 text-2xl font-medium text-gray-700 select-none"
        >
            <button className="flex items-center space-x-1 hover:text-gray-900">
                <i className="fas fa-globe-americas text-2xl"></i>
                <span>Summary</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-900">
                <i className="fas fa-stream text-2xl"></i>
                <span>Timeline</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-900">
                <i className="fas fa-list-alt text-2xl"></i>
                <span>Backlog</span>
            </button>
            <button
                aria-current="page"
                className="flex items-center space-x-1 text-blue-600 border-b-2 border-blue-600"
            >
                <i className="fas fa-columns text-2xl"></i>
                <span>Active sprints</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-900">
                <i className="fas fa-calendar-alt text-2xl"></i>
                <span>Calendar</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-900">
                <i className="fas fa-chart-line text-2xl"></i>
                <span>Reports</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-900">
                <i className="fas fa-list text-2xl"></i>
                <span>List</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-900">
                <i className="fas fa-sliders-h text-2xl"></i>
                <span>Forms</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-900">
                <i className="fas fa-bullseye text-2xl"></i>
                <span>Goals</span>
            </button>
            <button className="flex items-center space-x-1 hover:text-gray-900">
                <i className="far fa-envelope text-2xl"></i>
                <span>All work</span>
            </button>
            <button className="flex items-center space-x-1 text-gray-400 cursor-default" disabled>
                <span>More</span>
                <span className="ml-1 rounded bg-gray-200 text-gray-500 text-xs font-semibold px-1.5">6</span>
            </button>
            <button aria-label="Add" className="p-1 rounded hover:bg-gray-100" type="button">
                <svg
                    className="w-5 h-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <line x1="12" x2="12" y1="5" y2="19"></line>
                    <line x1="5" x2="19" y1="12" y2="12"></line>
                </svg>
            </button>
        </nav>
    );
}
export default BoardNav;

// function TopNavbar() {
//     return (
//         <header className="flex items-center border-b border-gray-200 px-3 sm:px-6 h-14">
//             <div className="flex items-center space-x-3">
//                 <button aria-label="Back" className="p-1 rounded hover:bg-gray-100">
//                     <svg
//                         className="w-6 h-6 text-gray-600"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                     >
//                         <polyline points="15 18 9 12 15 6"></polyline>
//                     </svg>
//                 </button>
//                 <button aria-label="Apps" className="p-1 rounded hover:bg-gray-100">
//                     <svg
//                         className="w-6 h-6 text-gray-600"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                     >
//                         <rect height="7" rx="1" width="7" x="3" y="3"></rect>
//                         <rect height="7" rx="1" width="7" x="14" y="3"></rect>
//                         <rect height="7" rx="1" width="7" x="14" y="14"></rect>
//                         <rect height="7" rx="1" width="7" x="3" y="14"></rect>
//                     </svg>
//                 </button>
//                 <div className="flex items-center space-x-1">
//                     <div className="w-7 h-7 rounded bg-blue-700 flex items-center justify-center text-white text-2xl font-semibold">
//                         <Icon className="fab fa-jira" />
//                     </div>
//                     <span className="font-semibold text-gray-900 select-none text-2xl leading-none">Jira</span>
//                 </div>
//             </div>
//             <form aria-label="Search" className="flex flex-grow max-w-3xl mx-4" role="search">
//                 <input
//                     aria-label="Search"
//                     className="w-full border border-gray-300 rounded px-4 py-2 text-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
//                     placeholder="Search"
//                     type="search"
//                 />
//             </form>
//             <div className="flex items-center space-x-3">
//                 <button
//                     className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold rounded px-4 py-2"
//                     type="button"
//                 >
//                     + Create
//                 </button>
//                 <button
//                     className="flex items-center space-x-2 border border-purple-400 rounded px-4 py-2 text-purple-600 text-2xl font-semibold hover:bg-purple-50"
//                     type="button"
//                 >
//                     <svg
//                         className="w-5 h-5"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                     >
//                         <path
//                             d="M12 2l1.5 4.5 4.5 1.5-4.5 1.5L12 14l-1.5-4.5-4.5-1.5 4.5-1.5L12 2z"
//                             stroke="#A78BFA"
//                         ></path>
//                     </svg>
//                     <span>Upgrade</span>
//                 </button>
//                 <button aria-label="Notifications" className="relative p-2 rounded hover:bg-gray-100" type="button">
//                     <Icon className="far fa-bell text-gray-600" />
//                     <span className="absolute -top-1 -right-1 bg-red-300 text-red-900 text-xs font-semibold rounded px-1 leading-none select-none">
//                         8
//                     </span>
//                 </button>
//                 <button aria-label="Help" className="p-2 rounded hover:bg-gray-100" type="button">
//                     <Icon className="far fa-question-circle text-gray-600" />
//                 </button>
//                 <button aria-label="Settings" className="p-2 rounded hover:bg-gray-100" type="button">
//                     <Icon className="fas fa-cog text-gray-600" />
//                 </button>
//                 <button
//                     aria-label="User menu"
//                     className="w-8 h-8 rounded-full bg-orange-400 text-white font-semibold text-2xl flex items-center justify-center"
//                     type="button"
//                 >
//                     H
//                 </button>
//             </div>
//         </header>
//     );
// }

// function Sidebar() {
//     return (
//         <nav
//             aria-label="Sidebar"
//             className="flex flex-col w-64 border-r border-gray-200 px-6 py-4 text-gray-700 text-2xl select-none
//           hidden md:flex"
//         >
//             <ul className="space-y-4">
//                 <li>
//                     <button aria-label="Collapse sidebar" className="p-2 rounded hover:bg-gray-100" type="button">
//                         <svg
//                             className="w-6 h-6 text-gray-600"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             viewBox="0 0 24 24"
//                         >
//                             <polyline points="15 18 9 12 15 6"></polyline>
//                         </svg>
//                     </button>
//                 </li>
//                 <li>
//                     <button aria-label="Apps" className="p-2 rounded hover:bg-gray-100" type="button">
//                         <svg
//                             className="w-6 h-6 text-gray-600"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             viewBox="0 0 24 24"
//                         >
//                             <rect height="7" rx="1" width="7" x="3" y="3"></rect>
//                             <rect height="7" rx="1" width="7" x="14" y="3"></rect>
//                             <rect height="7" rx="1" width="7" x="14" y="14"></rect>
//                             <rect height="7" rx="1" width="7" x="3" y="14"></rect>
//                         </svg>
//                     </button>
//                 </li>
//                 <li className="flex items-center space-x-3 font-semibold text-gray-900 text-2xl">
//                     <div className="w-7 h-7 rounded bg-blue-700 flex items-center justify-center text-white text-2xl font-semibold">
//                         <Icon className="fab fa-jira" />
//                     </div>
//                     <span>Jira</span>
//                 </li>
//             </ul>
//             <ul className="mt-8 space-y-4 text-gray-700 text-2xl">
//                 <li className="flex items-center space-x-3">
//                     <Icon className="far fa-user-circle text-xl" />
//                     <span>For you</span>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                     <Icon className="far fa-clock text-xl" />
//                     <span>Recent</span>
//                     <svg
//                         className="w-4 h-4 ml-auto text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                     >
//                         <polyline points="9 18 15 12 9 6"></polyline>
//                     </svg>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                     <Icon className="far fa-star text-xl" />
//                     <span>Starred</span>
//                     <svg
//                         className="w-4 h-4 ml-auto text-gray-400"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth="2"
//                         viewBox="0 0 24 24"
//                     >
//                         <polyline points="9 18 15 12 9 6"></polyline>
//                     </svg>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                     <Icon className="fas fa-th-large text-xl" />
//                     <span>Apps</span>
//                 </li>
//                 <li className="flex items-center space-x-3 font-semibold">
//                     <Icon className="fas fa-folder text-xl" />
//                     <span>Projects</span>
//                     <button aria-label="Add project" className="ml-auto p-2 rounded hover:bg-gray-100" type="button">
//                         <svg
//                             className="w-5 h-5 text-gray-600"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             viewBox="0 0 24 24"
//                         >
//                             <line x1="12" x2="12" y1="5" y2="19"></line>
//                             <line x1="5" x2="19" y1="12" y2="12"></line>
//                         </svg>
//                     </button>
//                     <button aria-label="More options" className="p-2 rounded hover:bg-gray-100" type="button">
//                         <svg
//                             className="w-5 h-5 text-gray-600"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             viewBox="0 0 24 24"
//                         >
//                             <circle cx="12" cy="12" r="1"></circle>
//                             <circle cx="19" cy="12" r="1"></circle>
//                             <circle cx="5" cy="12" r="1"></circle>
//                         </svg>
//                     </button>
//                 </li>
//             </ul>
//             <div className="mt-4 text-xs text-gray-400 font-semibold uppercase select-none">Recent</div>
//             <ul className="mt-2 space-y-3 text-2xl text-gray-700">
//                 <li className="flex items-center space-x-3">
//                     <img
//                         alt="WorkWave icon with flame emoji"
//                         className="w-6 h-6"
//                         height="24"
//                         src="https://storage.googleapis.com/a1aa/image/4a30239b-a377-44ef-b4d7-b38e26d09d30.jpg"
//                         width="24"
//                     />
//                     <a className="font-semibold text-blue-600 hover:underline truncate max-w-[12rem]" href="#">
//                         WorkWave
//                     </a>
//                     <button
//                         aria-label="Add WorkWave project"
//                         className="ml-auto p-2 rounded hover:bg-gray-100"
//                         type="button"
//                     >
//                         <svg
//                             className="w-5 h-5 text-gray-600"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             viewBox="0 0 24 24"
//                         >
//                             <line x1="12" x2="12" y1="5" y2="19"></line>
//                             <line x1="5" x2="19" y1="12" y2="12"></line>
//                         </svg>
//                     </button>
//                     <button aria-label="More options" className="p-2 rounded hover:bg-gray-100" type="button">
//                         <svg
//                             className="w-5 h-5 text-gray-600"
//                             fill="none"
//                             stroke="currentColor"
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth="2"
//                             viewBox="0 0 24 24"
//                         >
//                             <circle cx="12" cy="12" r="1"></circle>
//                             <circle cx="19" cy="12" r="1"></circle>
//                             <circle cx="5" cy="12" r="1"></circle>
//                         </svg>
//                     </button>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                     <img
//                         alt="Core Work Wave icon with koala emoji"
//                         className="w-6 h-6"
//                         height="24"
//                         src="https://storage.googleapis.com/a1aa/image/f4aa872e-e9cc-4439-a8ae-7126c57980fe.jpg"
//                         width="24"
//                     />
//                     <a className="truncate max-w-[12rem] hover:underline" href="#">
//                         Core Work Wave
//                     </a>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                     <Icon className="fas fa-sliders-h" />
//                     <span>View all projects</span>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                     <Icon className="fas fa-filter" />
//                     <span>Filters</span>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                     <Icon className="fas fa-columns" />
//                     <span>Dashboards</span>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                     <Icon className="fas fa-users" />
//                     <span>Teams</span>
//                 </li>
//                 <li className="flex items-center space-x-3">
//                     <Icon className="fas fa-sliders-h" />
//                     <span>Customize sidebar</span>
//                 </li>
//             </ul>
//             <button
//                 className="mt-auto flex items-center space-x-3 text-2xl text-gray-600 font-semibold border-t border-gray-200 pt-4"
//                 type="button"
//             >
//                 <Icon className="fas fa-comment-alt" />
//                 <span>Give feedback on the n...</span>
//             </button>
//         </nav>
//     );
// }

// function BoardNav() {
//     return (
//         <nav
//             aria-label="Board navigation"
//             className="flex flex-wrap items-center space-x-6 border-b border-gray-200 mb-4 text-2xl font-semibold text-gray-700 select-none"
//         >
//             <button className="flex items-center space-x-2 hover:text-gray-900">
//                 <Icon className="fas fa-globe-americas" />
//                 <span>Summary</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-gray-900">
//                 <Icon className="fas fa-stream" />
//                 <span>Timeline</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-gray-900">
//                 <Icon className="fas fa-list-alt" />
//                 <span>Backlog</span>
//             </button>
//             <button
//                 aria-current="page"
//                 className="flex items-center space-x-2 text-blue-600 border-b-2 border-blue-600"
//             >
//                 <Icon className="fas fa-columns" />
//                 <span>Active sprints</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-gray-900">
//                 <Icon className="fas fa-calendar-alt" />
//                 <span>Calendar</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-gray-900">
//                 <Icon className="fas fa-chart-line" />
//                 <span>Reports</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-gray-900">
//                 <Icon className="fas fa-list" />
//                 <span>List</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-gray-900">
//                 <Icon className="fas fa-sliders-h" />
//                 <span>Forms</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-gray-900">
//                 <Icon className="fas fa-bullseye" />
//                 <span>Goals</span>
//             </button>
//             <button className="flex items-center space-x-2 hover:text-gray-900">
//                 <Icon className="far fa-envelope" />
//                 <span>All work</span>
//             </button>
//             <button className="flex items-center space-x-2 text-gray-400 cursor-default" disabled>
//                 <span>More</span>
//                 <span className="ml-2 rounded bg-gray-200 text-gray-500 text-2xl font-semibold px-2">6</span>
//             </button>
//             <button aria-label="Add" className="p-2 rounded hover:bg-gray-100" type="button">
//                 <svg
//                     className="w-6 h-6 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <line x1="12" x2="12" y1="5" y2="19"></line>
//                     <line x1="5" x2="19" y1="12" y2="12"></line>
//                 </svg>
//             </button>
//         </nav>
//     );
// }

// function FiltersBar() {
//     return (
//         <div className="flex flex-wrap items-center space-x-3 mb-4">
//             <input
//                 aria-label="Search board"
//                 className="border border-gray-300 rounded px-4 py-2 text-2xl w-48 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
//                 placeholder="Search b..."
//                 type="search"
//             />
//             <button
//                 aria-label="User filter"
//                 className="p-2 rounded border border-gray-300 hover:bg-gray-100"
//                 type="button"
//             >
//                 <Icon className="far fa-user-circle text-gray-600" />
//             </button>
//             <div aria-label="User avatars" className="flex -space-x-2" role="list" title="Users">
//                 <div
//                     className="w-7 h-7 rounded-full bg-orange-400 text-white text-2xl font-semibold flex items-center justify-center ring-2 ring-white"
//                     title="User H"
//                 >
//                     H
//                 </div>
//                 <div
//                     className="w-7 h-7 rounded-full bg-orange-500 text-white text-2xl font-semibold flex items-center justify-center ring-2 ring-white"
//                     title="User D"
//                 >
//                     D
//                 </div>
//                 <div
//                     className="w-7 h-7 rounded-full bg-teal-600 text-white text-2xl font-semibold flex items-center justify-center ring-2 ring-white"
//                     title="User LD"
//                 >
//                     LD
//                 </div>
//             </div>
//             <button className="border border-gray-300 rounded px-4 py-2 text-2xl" type="button">
//                 Type
//                 <svg
//                     className="inline w-4 h-4 ml-1"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <polyline points="6 9 12 15 18 9"></polyline>
//                 </svg>
//             </button>
//             <button className="border border-gray-300 rounded px-4 py-2 text-2xl" type="button">
//                 Label
//                 <svg
//                     className="inline w-4 h-4 ml-1"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <polyline points="6 9 12 15 18 9"></polyline>
//                 </svg>
//             </button>
//             <button className="border border-gray-300 rounded px-4 py-2 text-2xl" type="button">
//                 Quick filters
//                 <svg
//                     className="inline w-4 h-4 ml-1"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <polyline points="6 9 12 15 18 9"></polyline>
//                 </svg>
//             </button>
//             <button
//                 className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold rounded px-4 py-2"
//                 type="button"
//             >
//                 Complete sprint
//             </button>
//             <button aria-label="Refresh" className="p-2 rounded border border-gray-300 hover:bg-gray-100" type="button">
//                 <svg
//                     className="w-6 h-6 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <polyline points="1 4 1 10 7 10"></polyline>
//                     <polyline points="23 20 23 14 17 14"></polyline>
//                     <path d="M20.49 9A9 9 0 0 0 5.21 15.36L1 11" stroke="#4B5563" strokeLinejoin="round"></path>
//                     <path d="M3.51 15A9 9 0 0 0 18.79 8.64L23 13" stroke="#4B5563" strokeLinejoin="round"></path>
//                 </svg>
//             </button>
//             <button
//                 className="border border-blue-600 text-blue-600 rounded px-4 py-2 text-2xl font-semibold"
//                 type="button"
//             >
//                 Group: Stories
//             </button>
//             <button
//                 aria-label="Open in new window"
//                 className="p-2 rounded border border-gray-300 hover:bg-gray-100"
//                 type="button"
//             >
//                 <svg
//                     className="w-6 h-6 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
//                     <polyline points="15 3 21 3 21 9"></polyline>
//                     <line x1="10" x2="21" y1="14" y2="3"></line>
//                 </svg>
//             </button>
//             <button
//                 aria-label="Board settings"
//                 className="p-2 rounded border border-gray-300 hover:bg-gray-100"
//                 type="button"
//             >
//                 <svg
//                     className="w-6 h-6 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <rect height="18" rx="2" width="18" x="3" y="3"></rect>
//                     <line x1="9" x2="9" y1="3" y2="21"></line>
//                     <line x1="15" x2="15" y1="3" y2="21"></line>
//                     <line x1="3" x2="21" y1="9" y2="9"></line>
//                     <line x1="3" x2="21" y1="15" y2="15"></line>
//                 </svg>
//             </button>
//             <button aria-label="More options" className="p-2 rounded hover:bg-gray-100" type="button">
//                 <svg
//                     className="w-6 h-6 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <circle cx="12" cy="12" r="1"></circle>
//                     <circle cx="19" cy="12" r="1"></circle>
//                     <circle cx="5" cy="12" r="1"></circle>
//                 </svg>
//             </button>
//         </div>
//     );
// }

// function TaskCard({ title, id, count, bug, user }) {
//     return (
//         <li className="bg-white rounded border border-gray-300 p-4 flex justify-between items-start">
//             <div className="flex flex-col space-y-2 max-w-[calc(100%-2.5rem)]">
//                 <p className="text-2xl leading-snug">{title}</p>
//                 <div className={`flex items-center space-x-3 text-2xl ${bug ? 'text-red-500' : 'text-gray-500'}`}>
//                     {bug ? (
//                         <>
//                             <i className="fas fa-bug"></i>
//                             <span>{id}</span>
//                         </>
//                     ) : (
//                         <label className="flex items-center space-x-2 select-none">
//                             <input
//                                 checked
//                                 className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
//                                 type="checkbox"
//                                 readOnly
//                             />
//                             <span>{id}</span>
//                         </label>
//                     )}
//                     {count && !bug && (
//                         <span className="bg-gray-300 text-gray-700 text-2xl font-semibold rounded px-2 py-1 select-none">
//                             {count.toLocaleString()}
//                         </span>
//                     )}
//                 </div>
//             </div>
//             <div className="flex flex-col items-center space-y-2">
//                 <svg
//                     className="w-5 h-5 text-red-500"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <polyline points="18 15 12 9 6 15"></polyline>
//                 </svg>
//                 <div
//                     className={`w-7 h-7 rounded-full text-white text-2xl font-semibold flex items-center justify-center select-none ${
//                         user === 'H'
//                             ? 'bg-orange-400'
//                             : user === 'D'
//                             ? 'bg-orange-500'
//                             : user === 'LD'
//                             ? 'bg-teal-600'
//                             : 'bg-gray-400'
//                     }`}
//                     title={`User ${user}`}
//                 >
//                     {user}
//                 </div>
//             </div>
//         </li>
//     );
// }

// function ToDoColumn() {
//     return (
//         <section
//             aria-labelledby="todo-title"
//             className="flex flex-col bg-gray-100 rounded p-4 w-full max-w-md md:max-w-none md:w-96"
//         >
//             <h2
//                 className="text-2xl font-semibold text-gray-500 uppercase mb-3 select-none flex items-center space-x-2"
//                 id="todo-title"
//             >
//                 <span>TO DO</span>
//                 <span className="bg-gray-300 text-gray-600 text-2xl font-semibold rounded px-2 py-1 select-none">4</span>
//             </h2>
//             <ul className="space-y-3">
//                 <TaskCard title="Thiết kế giao diện bằng Figma" id="NHOM4-1" user="H" />
//                 <TaskCard title="Chọn kiến trúc cho dự án" id="NHOM4-2" user="LD" />
//                 <TaskCard title="Thiết kế DataBase" id="NHOM4-3" count={1158} user="D" />
//                 <TaskCard title="loi" id="NHOM4-8" bug user="H" />
//             </ul>
//             <button
//                 className="mt-3 flex items-center space-x-2 text-gray-700 text-2xl font-semibold hover:text-gray-900"
//                 type="button"
//             >
//                 <svg
//                     className="w-6 h-6"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <line x1="12" x2="12" y1="5" y2="19"></line>
//                     <line x1="5" x2="19" y1="12" y2="12"></line>
//                 </svg>
//                 <span>Create</span>
//             </button>
//         </section>
//     );
// }

// function InProgressColumn() {
//     return (
//         <section
//             aria-labelledby="inprogress-title"
//             className="flex flex-col bg-gray-50 rounded p-4 w-full max-w-md md:max-w-none md:w-96"
//         >
//             <h2 className="text-2xl font-semibold text-gray-400 uppercase mb-3 select-none" id="inprogress-title">
//                 IN PROGRESS
//             </h2>
//         </section>
//     );
// }

// function DoneColumn() {
//     return (
//         <section
//             aria-labelledby="done-title"
//             className="flex flex-col bg-gray-50 rounded p-4 w-full max-w-md md:max-w-none md:w-96"
//         >
//             <h2 className="text-2xl font-semibold text-gray-400 uppercase mb-3 select-none" id="done-title">
//                 DONE
//             </h2>
//             <button
//                 aria-label="Add task"
//                 className="p-2 rounded border border-gray-300 hover:bg-gray-100 self-start"
//                 type="button"
//             >
//                 <svg
//                     className="w-6 h-6 text-gray-600"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <line x1="12" x2="12" y1="5" y2="19"></line>
//                     <line x1="5" x2="19" y1="12" y2="12"></line>
//                 </svg>
//             </button>
//         </section>
//     );
// }

// function QuickstartButton() {
//     return (
//         <button
//             aria-label="Quickstart"
//             className="fixed bottom-6 right-6 flex items-center space-x-3 bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 py-3 shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
//             type="button"
//         >
//             <Icon className="fas fa-lightbulb" />
//             <span className="select-none text-2xl font-semibold">Quickstart</span>
//             <button
//                 aria-label="Close quickstart"
//                 className="ml-3 w-7 h-7 rounded-full bg-purple-700 hover:bg-purple-800 flex items-center justify-center text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-purple-400"
//                 type="button"
//             >
//                 <svg
//                     className="w-4 h-4"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     viewBox="0 0 24 24"
//                 >
//                     <line x1="18" x2="6" y1="6" y2="18"></line>
//                     <line x1="6" x2="18" y1="6" y2="18"></line>
//                 </svg>
//             </button>
//         </button>
//     );
// }

// function App() {
//     return (
//         <div className="flex flex-col min-h-screen">
//             <TopNavbar />
//             <div className="flex flex-grow overflow-hidden">
//                 <Sidebar />
//                 <main className="flex-grow overflow-auto p-4 sm:p-6">
//                     <div className="mb-3 text-2xl text-gray-600 select-none">Projects / WorkWave</div>
//                     <div className="flex items-center space-x-3 mb-4">
//                         <h1 className="text-3xl font-extrabold leading-tight select-text">NHOM4 board</h1>
//                         <button aria-label="More options" className="p-2 rounded hover:bg-gray-100" type="button">
//                             <svg
//                                 className="w-6 h-6 text-gray-600"
//                                 fill="none"
//                                 stroke="currentColor"
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 strokeWidth="2"
//                                 viewBox="0 0 24 24"
//                             >
//                                 <circle cx="12" cy="12" r="1"></circle>
//                                 <circle cx="19" cy="12" r="1"></circle>
//                                 <circle cx="5" cy="12" r="1"></circle>
//                             </svg>
//                         </button>
//                     </div>
//                     <BoardNav />
//                     <FiltersBar />
//                     <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row md:space-x-6">
//                         <ToDoColumn />
//                         <InProgressColumn />
//                         <DoneColumn />
//                     </div>
//                 </main>
//             </div>
//             <QuickstartButton />
//         </div>
//     );
// }
