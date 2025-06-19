import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Addpleople from '~/pages/Projects/Addpleople';
import * as actions from '../../../store/actions';

function BoardNav() {
    const { isShowAddpeople } = useSelector((state) => state.app);
    const dispatch = useDispatch();

    return (
        <nav class="flex space-x-6 border-b border-gray-200 px-6 text-xl font-semibold text-gray-600 select-none overflow-x-auto">
            <a
                href="/blacklog"
                class="flex items-center space-x-1 border-b-2 border-blue-600 text-blue-600 pb-3"
                aria-current="page"
            >
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                >
                    <path d="M3 7h18M3 12h18M3 17h18" />
                </svg>
                <span>Backlog</span>
            </a>
            <a
                href="/"
                class="flex items-center space-x-1 border-b-2 border-transparent hover:text-gray-900 hover:border-gray-300 pb-3"
            >
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                >
                    <path d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2v-5H3v5a2 2 0 002 2z" />
                </svg>
                <span>Active sprints</span>
            </a>

            <a
                href="/listwork"
                class="flex items-center space-x-1 border-b-2 border-transparent hover:text-gray-900 hover:border-gray-300 pb-3"
            >
                <svg
                    class="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    viewBox="0 0 24 24"
                >
                    <rect x="3" y="4" width="18" height="16" rx="2" ry="2" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>List</span>
            </a>
            <div
                onClick={() => dispatch(actions.IsShowAddPeople(true))}
                class="flex items-center hover:bg-blue-700 space-x-1 bg-blue-500 mb-2  border-b-2 border-transparent text-white rounded p-2 cursor-default cursor-pointer select-none"
            >
                <span>Add pleople</span>

                <button aria-label="Add" class="ml-1 p-1 rounded " tabindex="-1">
                    <svg
                        class="w-6 h-6"
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
                </button>
            </div>
            {isShowAddpeople ? <Addpleople /> : <></>}
        </nav>
    );
}
export default BoardNav;
