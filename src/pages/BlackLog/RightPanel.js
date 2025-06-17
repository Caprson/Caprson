import { useState, useRef, useEffect, use } from 'react';
import { toast } from 'react-toastify';
import * as apis from '../../apis';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';

function RightPanel() {
    const modalRef = useRef();
    const { isShowRightpanel } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    
    return (
        <div class="flex flex-col w-2/5 border-l border-gray-200 overflow-y-auto p-6 space-y-6">
            <div class="flex items-center space-x-2 text-gray-700 text-sm font-normal">
                <button class="flex items-center space-x-1 hover:text-blue-600">
                    <i class="far fa-edit"></i>
                    <span>Add parent</span>
                </button>
                <span>/</span>
                <span class="font-semibold">NHOM4-19</span>
            </div>
            <h1 class="text-2xl font-bold text-gray-900">UserStory 1</h1>
            <button class="border border-gray-300 rounded-md px-3 py-1 text-sm font-normal hover:bg-gray-100 flex items-center space-x-1 w-max">
                <span class="text-xl font-thin">+</span>
                <span>Add</span>
            </button>
            <div class="flex items-center space-x-2">
                <select
                    class="text-sm font-semibold bg-gray-300 text-gray-700 rounded px-3 py-1 border border-gray-300 cursor-pointer"
                    aria-label="Status"
                >
                    <option>To Do</option>
                </select>
                <button class="border border-gray-300 rounded-md px-3 py-1 text-sm font-normal hover:bg-gray-100">
                    <i class="fas fa-bolt"></i>
                </button>
            </div>
            <div>
                <h2 class="font-semibold text-gray-900 mb-1">Description</h2>
                <textarea
                    placeholder="Add a description..."
                    class="w-full border border-gray-300 rounded-md p-2 text-gray-500 text-sm resize-y min-h-[80px] focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
            </div>
            <section class="border border-gray-300 rounded-md p-4 space-y-4">
                <button
                    class="flex justify-between w-full text-left font-semibold text-gray-900"
                    aria-expanded="true"
                    aria-controls="details-content"
                    id="details-header"
                >
                    <span>Details</span>
                    <svg
                        class="w-5 h-5 text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                    </svg>
                </button>
                <div id="details-content" aria-labelledby="details-header" class="space-y-3">
                    <div class="flex items-center space-x-3">
                        <span class="w-24 font-semibold text-gray-900">Assignee</span>
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold">
                                LD
                            </div>
                            <span>Lê Chung Dũng</span>
                        </div>
                        <button class="text-blue-600 font-normal text-sm hover:underline">Assign to me</button>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="w-24 font-semibold text-gray-900">Reporter</span>
                        <div class="flex items-center space-x-2">
                            <div class="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-sm font-semibold">
                                LD
                            </div>
                            <span>Lê Chung Dũng</span>
                        </div>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <span class="w-24 font-semibold text-gray-900">Development</span>
                        <div class="flex flex-col space-y-1 ml-24">
                            <button class="text-blue-600 font-normal text-sm flex items-center space-x-1 hover:underline">
                                <i class="fas fa-code-branch"></i>
                                <span>Create branch</span>
                                <svg
                                    class="w-4 h-4 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                            <button class="text-blue-600 font-normal text-sm flex items-center space-x-1 hover:underline">
                                <i class="fas fa-code-commit"></i>
                                <span>Create commit</span>
                                <svg
                                    class="w-4 h-4 text-blue-600"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="w-24 font-semibold text-gray-900">Labels</span>
                        <span class="text-gray-400">None</span>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default RightPanel
