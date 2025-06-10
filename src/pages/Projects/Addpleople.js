import { useState } from 'react';
import { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import * as apis from '../../apis';
import { toast } from 'react-toastify';
function Addpleople() {
    const modalRef = useRef();
    const [isShow, setIsShow] = useState();
    const { isShowAddpeople } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    
    const [people, setPeople] = useState({
        email:'',
        roleId:1
    })

    const handleClick = () => {
        setIsShow(true);
    };

    const handleChange = (e) => {
        setPeople({...people,[e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const PostData = async () => {
            try {
                await apis
                    .addPeopleProject(people)
                    .then((res) => {
                        console.log(res);
                        dispatch(actions.IsShowAddPeople(false));
                    })
                    .catch((error) => {
                        console.error('Registration error: ', error);
                        toast.error('An error occurred during sign up. Please try again.');
                    });
            } catch (error) {
                toast.error('An error occurred during sign up. Please try again.');
            }
        };
        PostData();
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                dispatch(actions.IsShowAddPeople(false));
            }
        };

        if (isShowAddpeople) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isShowAddpeople]);

    if (!isShowAddpeople) return null;
    return (
        <div
            aria-labelledby="modal-title"
            aria-modal="true"
            class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4"
            role="dialog"
        >
            <div ref={modalRef} class="bg-white rounded-md shadow-lg max-w-md w-full p-6 relative" role="document">
                <button
                    aria-label="Close"
                    class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                    <svg
                        aria-hidden="true"
                        class="w-5 h-5"
                        fill="none"
                        focusable="false"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        viewbox="0 0 24 24"
                    >
                        <line x1="18" x2="6" y1="6" y2="18"></line>
                        <line x1="6" x2="18" y1="6" y2="18"></line>
                    </svg>
                </button>
                <h2 class="text-lg font-semibold text-gray-900 mb-6 leading-tight" id="modal-title">
                    Add people to Core Work Wave
                </h2>
                <form onSubmit={handleSubmit}>
                    <label class="block text-sm font-medium text-gray-900 mb-1" for="names-emails">
                        Names or emails
                        <span class="text-red-600">*</span>
                    </label>
                    <input
                        class="w-full border border-solid border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        id="names-emails"
                        name='email'
                        onChange={handleChange}
                        placeholder="e.g., Maria, maria@company.com"
                        required=""
                        type="text"
                    />
                    <p class="text-xs text-gray-500 mt-2 mb-4">or add from</p>
                    {/* <div class="flex space-x-3 mb-6">
                        <button
                            class="flex items-center border border-gray-300 rounded-md px-3 py-2 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            type="button"
                        >
                            <img
                                alt="Google logo, a multicolored G letter"
                                class="mr-2"
                                height="20"
                                src="https://storage.googleapis.com/a1aa/image/96d503f2-c4c1-4a49-3a55-52f59aff1af5.jpg"
                                width="20"
                            />
                            Google
                        </button>
                        <button
                            class="flex items-center border border-gray-300 rounded-md px-3 py-2 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            type="button"
                        >
                            <img
                                alt="Slack logo, a colorful hashtag symbol"
                                class="mr-2"
                                height="20"
                                src="https://storage.googleapis.com/a1aa/image/98db972b-6a2b-42d2-86ee-b9dfb19c3bcf.jpg"
                                width="20"
                            />
                            Slack
                        </button>
                        <button
                            class="flex items-center border border-gray-300 rounded-md px-3 py-2 text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            type="button"
                        >
                            <img
                                alt="Microsoft logo, four colored squares"
                                class="mr-2"
                                height="20"
                                src="https://storage.googleapis.com/a1aa/image/c95aebf8-2ab8-48c7-01d3-5a39e007d136.jpg"
                                width="20"
                            />
                            Microsoft
                        </button>
                    </div> */}  
                    <label class="block text-sm font-medium text-gray-900 mb-1" for="role">
                        Role
                    </label>
                    <select
                        name='roleId'
                        onChange={handleChange}
                        class="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                        id="role"
                    >
                        <option value={null}>Choose role</option>
                        <option value={1}>Admin</option>
                        <option value={2}>Product Owner</option>
                        <option value={3}>Scrum Master</option>
                        <option value={4}>Developer</option>
                        <option value={5}>Tester</option>
                        <option value={6}>Viewer</option>
                    </select>
                    <p class="text-xs text-gray-500 mt-4 mb-6 leading-tight">
                        This site is protected by reCAPTCHA and the Google
                        <a
                            class="text-blue-600 underline"
                            href="https://policies.google.com/privacy"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Privacy Policy
                        </a>
                        and
                        <a
                            class="text-blue-600 underline"
                            href="https://policies.google.com/terms"
                            rel="noopener noreferrer"
                            target="_blank"
                        >
                            Terms of Service
                        </a>
                        apply.
                    </p>
                    <div class="flex justify-end space-x-4">
                        <button class="text-gray-700 font-semibold hover:underline focus:outline-none" type="button">
                            Cancel
                        </button>
                        <button
                            class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            type="submit"
                        >
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Addpleople;
