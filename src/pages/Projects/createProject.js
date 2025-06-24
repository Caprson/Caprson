import images from '~/assets/images';
import * as apis from '~/apis/index';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function CreateProject() {
    const navigate = useNavigate();

    const [project, setProject] = useState({
        name: '',
        description: '',
        startDate: '',
        endDate: '',
        statusId: 1,
    });
    const status = {
        1:"Not Started",
        2:"In Progress",
        3:"Completed",
        4:"On Hold",
        5:""
    }

    const handleChange = (e) => {
        setProject({ ...project, [e.target.name]: e.target.value });
    };

    const handlleSubmit = (e) => {
        e.preventDefault();
        const FetApi = async () => {
            await apis
                .createProject(project)
                .then((res) => {
                    navigate('/projects');
                    toast.success('Sign up successful!');
                })
                .catch((error) => {
                    console.error('Registration error: ', error);
                    toast.error('An error occurred during sign up. Please try again.');
                });
        };
        FetApi();
    };
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-x-auto">
            <div className="max-w-max w-full flex flex-col md:flex-row items-center md:items-start gap-12">
                {/* Left form section */}
                <div className="max-w-md w-full">
                    <h1 className="text-2xl font-semibold mb-2">Create project</h1>
                    <p className="text-xl text-gray-700 mb-4">
                        Explore what's possible when you collaborate with your team. Edit project details anytime in
                        project settings.
                    </p>
                    <p className="text-lg text-gray-400 mb-6">
                        Required fields are marked with an asterisk <span className="text-red-600">*</span>
                    </p>
                    <form onSubmit={handlleSubmit} className="space-y-6">
                        <label className="block text-xl font-semibold mb-1" htmlFor="project-name">
                            Name <span className="text-red-600">*</span>
                        </label>
                        <input
                            id="project-name"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            placeholder="Try a team name, project goal, milestone..."
                            className="w-full border border-solid border-gray-300 text-lg rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        />
                        {/* <div className="flex justify-between items-center mb-2">
                            <span className="text-xl font-semibold text-gray-700">Template</span>
                            <button
                                type="button"
                                className="text-xl font-semibold text-gray-700 hover:underline flex items-center gap-1"
                            >
                                More templates
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 18l6-6-6-6"></path>
                                </svg>
                            </button>
                        </div> */}
                        {/* <button
                            type="button"
                            className="w-full flex items-center bg-gray-100 rounded-md shadow-sm border border-gray-200 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
                        >
                            <div
                                className="bg-white p-4 flex items-center justify-center rounded-l-md border-r border-gray-200"
                                style={{ width: 72, height: 72 }}
                            >
                                <img
                                    alt="Icon representing project management with a ruler and pencil"
                                    className="w-12 h-12 object-contain"
                                    draggable="false"
                                    height="48"
                                    width="48"
                                    src="https://storage.googleapis.com/a1aa/image/1a83d719-ba55-4e22-a87c-59c18dbba2ef.jpg"
                                />
                            </div>
                            <div className="flex-1 text-left px-4 py-3">
                                <p className="text-xl font-semibold text-gray-900 mb-0.5">Project management</p>
                                <p className="text-xl text-blue-600 font-semibold flex items-center gap-1 mb-0.5">
                                    <svg
                                        aria-hidden="true"
                                        className="w-4 h-4"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M14 10h4l-5 5-5-5h4V4h2z"></path>
                                    </svg>
                                    Jira
                                </p>
                                <p className="text-xs text-gray-600 leading-tight">
                                    Manage activities for completing a business project.
                                </p>
                            </div>
                            <div className="pr-4">
                                <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M9 18l6-6-6-6"></path>
                                </svg>
                            </div>
                        </button>
                        <button
                            type="button"
                            className="mt-4 flex items-center gap-2 text-gray-700 text-xl font-normal hover:underline"
                        >
                            <svg
                                aria-hidden="true"
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path d="M9 18l6-6-6-6"></path>
                            </svg>
                            Show more
                        </button> */}
                        <div>
                            <div>
                                <label className="block text-xl font-semibold mb-1" htmlFor="date_start">
                                    Start Date <span className="text-red-600">*</span>
                                </label>
                                <input
                                    id="date_start"
                                    type="date"
                                    name="startDate"
                                    onChange={handleChange}
                                    placeholder="22/3/2024"
                                    className="w-full border border-solid border-gray-300 text-lg rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-xl font-semibold mb-1" htmlFor="date_end">
                                    End Date <span className="text-red-600">*</span>
                                </label>
                                <input
                                    id="date_end"
                                    type="date"
                                    name="endDate"
                                    onChange={handleChange}
                                    placeholder="20/12/2025"
                                    className="w-full border border-solid border-gray-300 text-lg rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xl font-semibold mb-1" htmlFor="project-name">
                                Status <span className="text-red-600">*</span>
                            </label>
                            <input
                                id="project-name"
                                type="number"
                                min={0}
                                name="statusId"
                                onChange={handleChange}
                                placeholder="Try a team name, project goal, milestone..."
                                className="w-full border border-solid border-gray-300 text-lg rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-semibold mb-1" htmlFor="project-name">
                                Description
                            </label>
                            <input
                                id="project-name"
                                type="text"
                                name="description"
                                onChange={handleChange}
                                placeholder="Try a team name, project goal, milestone..."
                                className="w-full border border-solid border-gray-300 text-lg rounded-md px-3 py-2 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            />
                        </div>
                        <div className="flex gap-4 mt-6">
                            <button
                                type="button"
                                className="px-4 py-2 border border-solid border-gray-300 rounded-md text-gray-900 font-normal hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-1"
                            >
                                Cancel
                            </button>
                            <button type="submit" className="px-4 py-2 bg-blue-200 text-gray-400 rounded-md">
                                Create project
                            </button>
                        </div>
                    </form>
                </div>
                {/* Right image section */}
                <div className="relative flex-1 flex justify-center items-center">
                    <img
                        alt="Abstract blue blob shape behind the project management interface"
                        className="absolute -top-36 w-full"
                        draggable="false"
                        height="1200"
                        width="1000"
                        src={images.bongbong}
                        style={{ zIndex: 0 }}
                    />
                    <img
                        alt="User interface of a project management tool showing a table with keys and colored status indicators"
                        className="relative max-w-[600px] max-h-[400px] rounded-lg shadow-lg border border-gray-200"
                        draggable="false"
                        height="400"
                        width="600"
                        src="https://storage.googleapis.com/a1aa/image/613ca631-e38c-4793-0e25-c0b305c6ff51.jpg"
                        style={{ zIndex: 10 }}
                    />
                </div>
            </div>
        </div>
    );
}
