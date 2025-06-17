import { DndContext } from '@dnd-kit/core';
import { initialData } from './data';
import { Column } from './Column';
import * as apis from '../../apis';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';

const STATUS_MAP = {
    1: 'TO DO',
    2: 'IN PROGRESS',
    3: 'IN REVIEW',
    4: 'DONE',
};

export function Board() {
    const [columns, setColumns] = useState([
        { id: '1', title: 'TO DO', tasks: [] },
        { id: '2', title: 'IN PROGRESS', tasks: [] },
        { id: '3', title: 'IN REVIEW', tasks: [] },
        { id: '4', title: 'DONE', tasks: [] },
    ]);

    const GetAllSprint = async () => {
        await apis
            .getSprintByProject()
            .then(async (res) => {
                const sprintStarted = res?.data?.data.filter((sprint) => sprint?.statusId === 2);
                const grouped = {
                    1: [],
                    2: [],
                    3: [],
                    4: [],
                };

                const promises = sprintStarted.map((element) => GetUserStory(element?.sprintId));

                const allUserStories = await Promise.all(promises); // => [[], [], [story1, story2], ...]

                const mergedUserStories = allUserStories.flat(); // Nối tất cả mảng con thành một mảng lớn

                mergedUserStories.forEach((story) => {
                    if (grouped[story.statusId]) {
                        grouped[story.statusId].push(story);
                    }
                });
                setColumns((prevCols) =>
                    prevCols.map((col) => ({
                        ...col,
                        tasks: grouped[parseInt(col.id)] || [],
                    })),
                );
            })
            .catch((error) => {
                console.error('Registration error: ', error);
                toast.error('An error occurred during sign up. Please try again.');
            });
    };

    const GetUserStory = async (sprintId) => {
        try {
            const res = await apis.getUserStoreBySprintId(sprintId);
            return res.data.data; // Trả về mảng userStory
        } catch (error) {
            console.error('Failed to fetch user stories:', error);
            toast.error('An error occurred. Please try again.');
            return []; // Trả về mảng rỗng nếu lỗi để tránh lỗi undefined
        }
    };
    const UpdateUserStory = async (storeId, data) => {
        await apis
            .editUserStore(storeId, data)
            .then((res) => {
                GetAllSprint();
            })
            .catch((error) => {
                console.error('Failed to fetch user stories:', error);
                toast.error('An error occurred during sign up. Please try again.');
            });
    };

    useEffect(() => {
        GetAllSprint();
    }, []);

    function onDragEnd({ active, over }) {
        if (!over) return;

        const sourceCol = columns.find((col) => col.tasks.some((t) => String(t.storyId) === active.id));

        const destCol = columns.find((col) => col.id === over.id);

        if (!sourceCol || !destCol || sourceCol.id === destCol.id) return;

        const movingTask = sourceCol.tasks.find((t) => String(t.storyId) === active.id);

        // cập nhật local UI
        setColumns((prev) =>
            prev.map((col) => {
                if (col.id === sourceCol.id)
                    return {
                        ...col,
                        tasks: col.tasks.filter((t) => String(t.storyId) !== active.id),
                    };
                if (col.id === destCol.id)
                    return {
                        ...col,
                        tasks: [...col.tasks, { ...movingTask, statusId: parseInt(destCol.id) }],
                    };
                return col;
            }),
        );

        // gọi API update status
        const update = {
            epicId: movingTask.epicId,
            sprintId: movingTask?.sprintId,
            name: movingTask?.name,
            description: movingTask?.description,
            priorityId: movingTask?.priorityId,
            assignedTo: movingTask?.assignedTo,
            statusId: parseInt(destCol.id), // cập nhật mới!
        };

        UpdateUserStory(movingTask?.storyId, update);
    }

    return (
        <div className="max-h-full h-5/6 overflow-x-hidden overflow-y-hidden">
            <div className="z-10 relative h-full flex">
                <div className="min-w-[0px] w-full h-full">
                    <div className="relative max-h-full overflow-x-auto overflow-y-auto w-full h-full ">
                        <section className="select-none min-h-full box-border min-w-fit pl-[20px] pb-[24px] items-stretch flex-row justify-start flex-nowrap flex pr-[24px] gap-3 ">
                            <div className="basis-0 shrink grow">
                                <DndContext onDragEnd={onDragEnd}>
                                    <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] h-full gap-4 grid-flow-col ">
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
