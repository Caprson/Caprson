import Filters from './Filters';
import BoardContent from './BoardContent';

function BlackLog() {
    return (
        <div className='h-full'>
            <Filters />
            <div className=' flex flex-1 overflow-y-hidden overflow-x-hidden max-h-full'>
                <div class=" w-full overflow-y-auto overflow-x-auto px-6 py-5 space-y-6">
                    <BoardContent />
                    <BoardContent />
                    <BoardContent />
                    <BoardContent />
                    <BoardContent />
                    <button
                        class="flex items-center space-x-1 text-sm text-gray-600 hover:text-blue-600"
                        aria-label="Create new item"
                    >
                        <svg
                            class="w-5 h-5"
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
                        <span>Create</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default BlackLog;
