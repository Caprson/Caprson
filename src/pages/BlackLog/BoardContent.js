import TaskItem from './TaskItem';

function BoardContent() {
  return (
        <section aria-labelledby="sprint2-heading" class="border border-gray-200 rounded-md p-4 space-y-3">
            <div class="flex justify-between items-center ">
                <div className='flex items-center space-x-3'>
                    <input
                        type="checkbox"
                        id="sprint2-checkbox"
                        class="w-5 h-5 text-blue-600 border-gray-300 rounded"
                    />
                    <button
                        aria-expanded="true"
                        aria-controls="sprint2-items"
                        class="flex items-center space-x-1 font-semibold text-gray-900 text-xl focus:outline-none"
                    >
                        <i class="fas fa-chevron-down text-gray-600"></i>
                        <span id="sprint2-heading">NHOM4 Sprint 2</span>
                    </button>
                    <span class="text-gray-500 text-xl">4 Jun – 11 Jun (2 work items)</span>
                </div>
                <div className="flex items-center space-x-3">
                    <div class="ml-auto flex items-center space-x-1 text-lg font-semibold rounded-md px-1.5 py-0.5">
                        <span class="bg-gray-200 text-gray-700 rounded px-2 py-0.5">0</span>
                        <span class="bg-blue-400 text-white rounded px-2 py-0.5">0</span>
                        <span class="bg-green-100 text-green-700 rounded px-2 py-0.5">0</span>
                    </div>
                    <button class="border border-solid border-gray-300 rounded-md px-3 py-1 text-xl font-semibold hover:bg-gray-100">
                        Complete sprint
                    </button>
                    <button
                        aria-label="More options"
                        class="border border-transparent rounded-md p-2 hover:bg-gray-100"
                    >
                        <i class="fas fa-ellipsis-h text-gray-600"></i>
                    </button>
                </div>
            </div>

            <ul id="sprint2-items" class="divide-y divide-gray-200 border border-gray-200 rounded-md">
                <li class="flex items-center justify-between px-4 py-3">
                    <div class="flex items-center space-x-3">
                        <input type="checkbox" checked class="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                        <span class="text-xl text-gray-900">
                            <span class="font-semibold">NHOM4-17</span> dávdsa
                        </span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button
                            class="bg-gray-300 text-gray-700 text-lg font-semibold rounded px-2 py-1"
                            aria-label="Status To Do"
                        >
                            TO DO
                            <i class="fas fa-caret-down ml-1"></i>
                        </button>
                        <button class="text-gray-500 text-xl font-semibold px-3 py-1" aria-label="Dash">
                            -
                        </button>
                        <button class="text-orange-600 text-lg font-semibold leading-none" aria-label="Menu">
                            =
                        </button>
                        <button
                            aria-label="User icon"
                            class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
                        >
                            <i class="fas fa-user text-gray-600"></i>
                        </button>
                    </div>
                </li>
                <li class="flex items-center justify-between px-4 py-3">
                    <div class="flex items-center space-x-3">
                        <input type="checkbox" checked class="w-4 h-4 text-blue-600 border-gray-300 rounded" />
                        <span class="text-xl text-gray-900">
                            <span class="font-semibold">NHOM4-16</span> adb
                        </span>
                    </div>
                    <div class="flex items-center space-x-4">
                        <button
                            class="bg-gray-300 text-gray-700 text-lg font-semibold rounded px-2 py-1"
                            aria-label="Status To Do"
                        >
                            TO DO
                            <i class="fas fa-caret-down ml-1"></i>
                        </button>
                        <button class="text-gray-500 text-xl font-semibold px-3 py-1" aria-label="Dash">
                            -
                        </button>
                        <button class="text-orange-600 text-lg font-semibold leading-none" aria-label="Menu">
                            =
                        </button>
                        <button
                            aria-label="User icon"
                            class="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center"
                        >
                            <i class="fas fa-user text-gray-600"></i>
                        </button>
                    </div>
                </li>
            </ul>
        </section>
  );
}

export default BoardContent;
