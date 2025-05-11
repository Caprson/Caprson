// import TaskCard from './TaskCard';
// import { Droppable } from 'react-beautiful-dnd';
// function Column({ columnId, title, tasks, droppableId }) {
//     return (
//         <section
//             aria-labelledby={`${columnId}-title`}
//             className="flex flex-col bg-gray-100 rounded p-4 w-full max-w-md md:max-w-none"
//         >
//             <h2
//                 className="text-sm font-semibold text-gray-500 uppercase mb-3 select-none flex items-center space-x-2"
//                 id={`${columnId}-title`}
//             >
//                 <span>{title}</span>
//                 <span className="bg-gray-300 text-gray-600 text-sm font-semibold rounded px-2 py-1 select-none">
//                     {tasks.length}
//                 </span>
//             </h2>
//             <Droppable droppableId={String(droppableId)}>
//                 {(provided, snapshot) => (
//                     <ul
//                         className={`space-y-3 min-h-[100px] ${snapshot.isDraggingOver ? 'bg-blue-50 rounded p-2' : ''}`}
//                         ref={provided.innerRef}
//                         {...provided.droppableProps}
//                     >
//                         {tasks.map(
//                             (task, index) => (
//                                 console.log('Rendering task:', task.id),
//                                 (<TaskCard key={task.id} task={task} index={index} />)
//                             ),
//                         )}
//                         {provided.placeholder}
//                     </ul>
//                 )}
//             </Droppable>
//             <button
//                 className="mt-3 flex items-center space-x-2 text-gray-700 text-base font-semibold hover:text-gray-900"
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
// export default Column;
import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { TaskCard } from './TaskCard';

export function Column(props) {
    const { setNodeRef } = useDroppable({ id: props.column.id });

    const taskItems = props.column.tasks.map((task) =>
        React.createElement(TaskCard, {
            key: task.id,
            id: task.id,
            title: task.title,
        }),
    );

    return React.createElement(
        'div',
        {
            ref: setNodeRef,
            style: {
                width: '300px',
                padding: '16px',
                backgroundColor: '#f4f5f7',
                borderRadius: '4px',
                margin: '0 8px',
                minHeight: '300px',
            },
        },
        React.createElement('h3', null, props.column.title),
        ...taskItems,
        React.createElement(
            'button',
            {
                className: 'mt-2 flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-blue-600',
            },
            React.createElement('svg', {
                className: 'w-4 h-4',
                fill: 'none',
                stroke: 'currentColor',
                strokeWidth: '2',
                strokeLinecap: 'round',
                strokeLinejoin: 'round',
                viewBox: '0 0 24 24',
                children: [
                    React.createElement('line', { x1: '12', y1: '5', x2: '12', y2: '19', key: 'v' }),
                    React.createElement('line', { x1: '5', y1: '12', x2: '19', y2: '12', key: 'h' }),
                ],
            }),
            'Create',
        ),
    );
}
