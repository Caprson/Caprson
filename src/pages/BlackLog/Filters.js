function Filters({ user,idSelelct, selectUser, update }) {
    function getInitials(name = '') {
        if (!name) return '';
        const words = name.trim().split(' ');
        if (words.length === 1) return words[0][0].toUpperCase();
        return words[0][0].toUpperCase() + words[words.length - 1][0].toUpperCase();
    }
    const handleToggleUser = (userId) => {
        selectUser(
            (prev) =>
                prev.includes(userId)
                    ? prev.filter((id) => id !== userId) // Xoá nếu đã có
                    : [...prev, userId], // Thêm nếu chưa có
        );
        update(true);
    };
    return (
        <div class="flex flex-wrap items-center gap-3">
            <div class="flex items-center border border-gray-300 rounded-md px-3 py-2 w-96">
                <i class="fas fa-search text-gray-400 mr-2"></i>
                <input
                    type="text"
                    placeholder="Search b..."
                    class="w-full text-xl placeholder:text-gray-400 focus:outline-none"
                />
            </div>
            <div class="flex items-center">
                {user?.map((data, index) => (
                    <div
                        key={index}
                        onClick={() => handleToggleUser(data.userId)}
                        className={`w-12 h-12 rounded-full flex p-1 items-center justify-center cursor-pointer
                            ${idSelelct.includes(data.userId) ? 'border-2 border-blue-500' : ''}`}
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
                    onClick={() => handleToggleUser('')}
                    class={`w-12 h-12 rounded-full p-1 flex items-center justify-center cursor-pointer ${idSelelct.includes('') ? 'border-2 border-blue-500' : ''}`}
                >
                    <div
                    className="w-9 h-9 bg-gray-300 text-lg rounded-full flex items-center justify-center">

                        <i class="fas fa-user text-gray-600"></i>
                    </div>
                </div>
            </div>
            <button
                class="border border-gray-300 rounded-md px-4 py-2 text-xl font-semibold text-gray-900 hover:bg-gray-100 flex items-center"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Version
                <i class="fas fa-caret-down ml-1 text-xs"></i>
            </button>
            <button
                class="border border-gray-300 rounded-md px-4 py-2 text-xl font-semibold text-gray-900 hover:bg-gray-100 flex items-center"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Epic
                <i class="fas fa-caret-down ml-1 text-xs"></i>
            </button>
            <button
                class="border border-gray-300 rounded-md px-4 py-2 text-xl font-semibold text-gray-900 hover:bg-gray-100 flex items-center"
                aria-haspopup="true"
                aria-expanded="false"
            >
                Quick filters
                <i class="fas fa-caret-down ml-1 text-xs"></i>
            </button>
            <div class="ml-auto flex items-center space-x-3">
                <button aria-label="Chart icon" class="border border-gray-300 rounded-md p-2 hover:bg-gray-100">
                    <i class="fas fa-chart-line text-gray-600"></i>
                </button>
                <button aria-label="Settings icon" class="border border-gray-300 rounded-md p-2 hover:bg-gray-100">
                    <i class="fas fa-sliders-h text-gray-600"></i>
                </button>
                <button aria-label="More options" class="border border-gray-300 rounded-md p-2 hover:bg-gray-100">
                    <i class="fas fa-ellipsis-h text-gray-600"></i>
                </button>
            </div>
        </div>
    );
}
export default Filters;
