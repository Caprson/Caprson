import React, { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { initialData } from './data';
import { Column } from './Column';

export function Board() {
    const [columns, setColumns] = useState(initialData);

    function onDragEnd(event) {
        const { active, over } = event;
        if (!over) return;

        const sourceColumn = columns.find((col) => col.tasks.find((task) => task.id === active.id));
        const destinationColumn = columns.find((col) => col.id === over.id);

        if (!sourceColumn || !destinationColumn || sourceColumn.id === destinationColumn.id) return;

        const task = sourceColumn.tasks.find((t) => t.id === active.id);
        const newSourceTasks = sourceColumn.tasks.filter((t) => t.id !== active.id);
        const newDestinationTasks = [...destinationColumn.tasks, task];

        const newColumns = columns.map((col) => {
            if (col.id === sourceColumn.id) return { ...col, tasks: newSourceTasks };
            if (col.id === destinationColumn.id) return { ...col, tasks: newDestinationTasks };
            return col;
        });

        setColumns(newColumns);
    }

    const columnElements = columns.map((col) => React.createElement(Column, { key: col.id, column: col }));

    return React.createElement(
        DndContext,
        { onDragEnd },
        React.createElement(
            'div',
            { style: { display: 'flex', justifyContent: 'center', gap: '16px' } },
            ...columnElements,
        ),
    );
}
