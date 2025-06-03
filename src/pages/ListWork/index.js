import UserCircles from './UserCircles';
import TableRow from './TableRow';
function ListWork() {
    const users = [
        { id: 1, initials: 'H', color: 'bg-orange-500', name: 'hongson31202' },
        { id: 2, initials: 'H', color: 'bg-orange-400', name: 'hongson31202' },
        { id: 3, initials: 'D', color: 'bg-orange-500', name: 'duongtuanhd97' },
        { id: 4, initials: 'LD', color: 'bg-cyan-700', name: 'Lê Chung Dũng' },
    ];

    const rows = [
        {
            type: 'bug',
            key: 'NHOM4-8',
            summary: 'loi',
            status: 'TO DO',
            sprint: 'NHOM4 Sprint 3',
            assignee: users[0],
            done: false,
            priority: 'h',
            created: '24/08/2024',
            updated: '2/9/2024',
            reporter: users[3],
        },
        {
            type: 'done',
            key: 'NHOM4-5',
            summary: 'Tạo Base dự án',
            status: 'TO DO',
            sprint: 'NHOM4 Sprint 3',
            assignee: null,
            done: true,
            priority: 'h',
            created: '24/08/2024',
            updated: '2/9/2024',
            reporter: users[3],
        },
        {
            type: 'done',
            key: 'NHOM4-6',
            summary: 'Code Flutter',
            status: 'TO DO',
            sprint: 'NHOM4 Sprint 3',
            assignee: null,
            done: true,
            priority: 'h',
            created: '24/08/2024',
            updated: '2/9/2024',
            reporter: users[3],
        },
        {
            type: 'done',
            key: 'NHOM4-1',
            summary: 'Thiết kế giao diện bằng Figma',
            status: 'TO DO',
            sprint: 'NHOM4 Sprint 1',
            assignee: users[0],
            done: true,
            priority: 'h',
            created: '24/08/2024',
            updated: '2/9/2024',
            reporter: users[3],
        },
        {
            type: 'done',
            key: 'NHOM4-3',
            summary: 'Thiết kế DataBase',
            status: 'TO DO',
            sprint: 'NHOM4 Sprint 1',
            assignee: users[2],
            done: true,
            priority: 'h',
            created: '24/08/2024',
            updated: '2/9/2024',
            reporter: users[3],
        },
        {
            type: 'done',
            key: 'NHOM4-2',
            summary: 'Chọn kiến trúc cho dự án',
            status: 'TO DO',
            sprint: 'NHOM4 Sprint 1',
            assignee: users[3],
            done: true,
            priority: 'h',
            created: '24/08/2024',
            updated: '2/9/2024',
            reporter: users[3],
        },
        {
            type: 'done',
            key: 'NHOM4-10',
            summary: 'Â',
            status: 'TO DO',
            sprint: '',
            assignee: null,
            done: true,
            priority: 'h',
            created: '24/08/2024',
            updated: '2/9/2024',
            reporter: users[3],
        },
        {
            type: 'bug',
            key: 'NHOM4-9',
            summary: 'Lỗi giao diện',
            status: 'TO DO',
            sprint: 'NHOM4 Sprint 3',
            assignee: users[0],
            done: false,
            priority: 'h',
            created: '24/08/2024',
            updated: '2/9/2024',
            reporter: users[3],
        },
    ];

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
                    <UserCircles />
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
            <div className="relative h-full w-full">
                <div className="h-full">
                    <div className="overflow-x-auto min-w-auto min-h-auto overflow-y-auto border border-gray-200 rounded-md">
                        <table className="min-w-full border-collapse border border-gray-200 text-xl">
                            <thead className="bg-gray-100 text-gray-700 font-semibold select-none">
                                <tr>
                                    <th className="border border-gray-200 px-4 py-2 text-left w-16">Type</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left w-28">Key</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left min-w-[300px]">
                                        Summary
                                    </th>
                                    <th className="border border-gray-200 px-4 py-2 text-left w-24">Status</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left w-40">Comments</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left w-36">Sprint</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left w-48">Assignee</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left w-28">Priority</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left w-28">Created</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left w-28">Updated</th>
                                    <th className="border border-gray-200 px-4 py-2 text-left w-28">Reporter</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-900">
                                {rows.map((row) => (
                                    <TableRow key={row.key} row={row} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Create button */}
            <button
                className="mt-3 flex items-center gap-2 text-gray-700 font-semibold text-xl focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1"
                aria-label="Create new item"
            >
                <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Create
            </button>
        </div>
    );
}
export default ListWork;
