import PropTypes from 'prop-types';

function TaskItem({ id, description, assignee, status, score }) {
    return (
        <div className="flex items-center border-b border-gray-200 px-4 py-3 space-x-2">
          <input type="checkbox" defaultChecked className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
          <span className="text-gray-500 select-text">{id}</span>
          <span className="flex-1 select-text">{description}</span>
          <button className="border border-gray-300 rounded text-lg px-1 py-0.5 select-none">
            {status}
            <svg className="inline-block w-6 h-6 ml-1" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
          {score && <span className="w-20 text-center text-gray-600 select-text border border-gray-300 rounded px-1 py-0.5">{score}</span>}
          <button className="text-red-500 hover:text-red-600">
            <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M17 13l-5 5-5-5" />
            </svg>
          </button>
          <button className="rounded-full bg-orange-500 text-white text-lg font-semibold w-8 h-8 flex items-center justify-center select-none">
            {assignee}
          </button>
        </div>
    
    );
}

TaskItem.propTypes = {
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    assignee: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    score: PropTypes.string,
};

export default TaskItem;
