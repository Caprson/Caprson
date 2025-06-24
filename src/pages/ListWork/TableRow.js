import Assignee from './Assignee';
function TableRow({ row }) {
    const status = {
        1: 'TO DO',
        2: 'IN PROGRESS',
        3: 'IN REVIEW',
        4: 'DONE',
    };
    const handleCreateChild = (parentTask) => {
        // Gọi form tạo task với parentId = parentTask.storyId (hoặc id gì đó)
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
                    <div className="w-4 text-blue-500  text-lg">
                        <i className="fas fa-check-square" />
                    </div>
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
            <td className="px-4 w-[120px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left">
                <span className="inline-block bg-gray-400 text-gray-900 font-semibold text-lg  rounded">
                    {status[row.statusId]}
                </span>
            </td>
            <td className="px-4 w-[145px]  overflow-hidden whitespace-nowrap text-ellipsis h-full border-b border-r border-gray-300 text-left text-gray-500">
                <i className="far fa-comment-alt text-lg" /> Add comment
            </td>
            <td className="px-4 w-[145px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300 text-left">
                {!!row.sprintId && row.sprintId}
            </td>
            <td className="px-4 w-[180px]  overflow-hidden whitespace-nowrap text-ellipsis border-b border-r border-gray-300">
                <div className="w-8 h-8 border-r rounded-full bg-[#0ea5e9] flex items-center justify-center text-xs font-semibold text-white">
                    {!!row.assignedTo && row.assignedTo !== '' ? row.assignedTo : <></>}
                </div>
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
