import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

export function TaskCard(props) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: props.id,
    });

    const style = {
        transform: CSS.Translate.toString(transform),
    };

    return React.createElement(
        'div',
        {
            ref: setNodeRef,
            style,
            className: 'bg-white border border-gray-300 rounded p-3 mb-3 shadow-sm',
            ...listeners,
            ...attributes,
        },
        React.createElement(
            'div',
            { className: 'flex justify-between items-start' },
            React.createElement('p', { className: 'text-sm font-medium text-gray-800 leading-tight' }, props.title),
            React.createElement(
                'div',
                {
                    className:
                        'text-xs font-bold text-white bg-orange-400 w-6 h-6 flex items-center justify-center rounded-full',
                },
                props.id.split('-')[1]?.charAt(0) || '?',
            ),
        ),
        React.createElement(
            'div',
            { className: 'mt-2 flex items-center justify-between text-xs text-gray-500' },
            React.createElement(
                'span',
                { className: 'flex items-center gap-1' },
                React.createElement('input', {
                    type: 'checkbox',
                    checked: true,
                    disabled: true,
                    className: 'text-blue-600',
                }),
                props.id,
            ),
            props.id === 'task-3'
                ? React.createElement(
                      'div',
                      { className: 'bg-gray-200 rounded px-2 py-0.5 text-gray-700 font-semibold text-xs' },
                      '1,158',
                  )
                : null,
        ),
    );
}
