function Filters() {
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
            <div class="flex items-center space-x-2">
                <div
                    class="w-8 h-8 rounded-full bg-orange-500 text-white font-semibold flex items-center justify-center text-xl"
                    aria-label="User initial H"
                >
                    H
                </div>
                <button
                    aria-label="User icon"
                    class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
                >
                    <i class="fas fa-user text-gray-600"></i>
                </button>
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
