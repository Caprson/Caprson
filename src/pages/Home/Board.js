import { DndContext } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Column } from './Column';
import * as apis from '../../apis';
import useUserStoryEvents from '../../websocket/useUserStoryEvents';

const STATUS_MAP = {
    1: 'TO DO',
    2: 'IN PROGRESS',
    3: 'IN REVIEW',
    4: 'DONE',
};

const INITIAL_COLUMNS = Object.entries(STATUS_MAP).map(([id, title]) => ({
    id,
    title,
    tasks: [],
}));

export function Board() {
    const [columns, setColumns] = useState(INITIAL_COLUMNS);
    const [activeId, setActiveId] = useState(null);
    // Fetch user stories from active sprints
    const fetchAllUserStories = async () => {
        try {
            const [{ data: sprintData }, { data: bugData }] = await Promise.all([
                apis.getSprintByProject(),
                apis.getAllBug(),
            ]);

            const sprints = sprintData?.data || [];
            const activeSprints = sprints.filter((s) => s.statusId === 2);

            const allStories = (
                await Promise.all(activeSprints.map((s) => fetchUserStoriesBySprint(s.sprintId)))
            ).flat();

            const storiesWithType = allStories.map((s) => ({ ...s, type: 'story' }));
            const bugsWithType = bugData?.data.map((b) => ({ ...b, type: 'bug' })) || [];

            const allItems = [...storiesWithType, ...bugsWithType];

            const groupedByStatus = allItems.reduce((acc, item) => {
                const key = item.statusId?.toString();
                if (!acc[key]) acc[key] = [];
                acc[key].push(item);
                return acc;
            }, {});

            setColumns((prev) =>
                prev.map((col) => ({
                    ...col,
                    tasks: groupedByStatus[col.id] || [],
                })),
            );
        } catch (err) {
            console.error('Failed to fetch stories or bugs:', err);
            toast.error('Failed to load data.');
        }
    };
    const fetchUserStoriesBySprint = async (sprintId) => {
        try {
            const { data } = await apis.getUserStoreBySprintId(sprintId);
            return data?.data || [];
        } catch (err) {
            console.error('Failed to fetch user stories:', err);
            toast.error('Failed to load user stories.');
            return [];
        }
    };

    const groupUserStoriesByStatus = (stories) => {
        return stories.reduce((acc, story) => {
            const key = story.statusId?.toString();
            if (!acc[key]) acc[key] = [];
            acc[key].push(story);
            return acc;
        }, {});
    };

    const updateUserStory = async (storyId, updatedData) => {
        try {
            await apis.editUserStore(storyId, updatedData);
        } catch (err) {
            console.error('Failed to update user story:', err);
            toast.error('Failed to update story.');
        }
    };

    const handleDragEnd = ({ active, over }) => {
        if (!over || active.id === over.id) return;

        const sourceColumn = columns.find((col) =>
            col.tasks.some((task) => {
                const id = task.type === 'bug' ? String(task.bugId) : String(task.storyId);
                return id === active.id;
            }),
        );

        const destColumn = columns.find((col) => col.id === over.id);

        if (!sourceColumn || !destColumn || sourceColumn.id === destColumn.id) return;

        const movingTask = sourceColumn.tasks.find(
            (t) => (t.type === 'bug' ? String(t.bugId) : String(t.storyId)) === active.id,
        );

        // Update local UI
        setColumns((prev) =>
            prev.map((col) => {
                if (col.id === sourceColumn.id) {
                    return {
                        ...col,
                        tasks: col.tasks.filter(
                            (t) => (t.type === 'bug' ? String(t.bugId) : String(t.storyId)) !== active.id,
                        ),
                    };
                }
                if (col.id === destColumn.id) {
                    return {
                        ...col,
                        tasks: [...col.tasks, { ...movingTask, statusId: parseInt(destColumn.id) }],
                    };
                }
                return col;
            }),
        );

        // Update backend
        handleUpdateTask(movingTask, destColumn);
    };
    const handleUpdateTask = async (movingTask, destColumn) => {
        try {
            if (movingTask.type === 'bug') {
                const updated = {
                    bugId: movingTask.bugId,
                    title: movingTask.title,
                    description: movingTask.description,
                    assignedTo: movingTask.assignedTo,
                    severityId: movingTask.severityId,
                    priorityId: movingTask.priorityId,
                    statusId: parseInt(destColumn.id),
                    updatedBy: movingTask.updatedBy,
                    comment: movingTask.comment,
                };
                await apis.editBug(movingTask.bugId, updated);
            } else {
                const updated = {
                    epicId: movingTask.epicId,
                    sprintId: movingTask.sprintId,
                    name: movingTask.name,
                    description: movingTask.description,
                    priorityId: movingTask.priorityId,
                    assignedTo: movingTask.assignedTo,
                    statusId: parseInt(destColumn.id),
                };
                await apis.editUserStore(movingTask.storyId, updated);
            }
        } catch (error) {
            console.error('Failed to update task:', error);
            toast.error('An error occurred while updating the task.');
        }
    };

    useEffect(() => {
        fetchAllUserStories();
    }, []);

    // Realtime updates via WebSocket
    useUserStoryEvents({
        onCreated: fetchAllUserStories,
        onUpdated: fetchAllUserStories,
        onDeleted: fetchAllUserStories,
    });

    return (
        <div className="max-h-full h-5/6 overflow-x-hidden overflow-y-hidden">
            <div className=" relative h-full flex">
                <div className="min-w-[0px] w-full h-full">
                    <div className="relative max-h-full overflow-x-auto overflow-y-auto w-full h-full">
                        <section className="select-none min-h-full box-border min-w-fit pl-[20px] pb-[24px] items-stretch flex-row justify-start flex-nowrap flex pr-[24px] gap-3">
                            <div className="basis-0 shrink grow">
                                <DndContext onDragEnd={handleDragEnd}>
                                    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] h-full gap-4 grid-flow-col">
                                        {columns.map((col) => (
                                            <Column key={col.id} column={col} />
                                        ))}
                                    </div>
                                </DndContext>
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
}
