import { useRef, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../store/actions';
import * as apis from '../../apis'
import { toast } from 'react-toastify';
function PopupSprint({ setIsUpdate}) {
    const modalRef = useRef();
    const { isShowPopup } = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const [sprint, setSprint] = useState({
        name: '',
        startDate: '',
        endDate: '',
        statusId: 1,
        goal: '',
    });
    const handleChange  = (e) => {
        setSprint({...sprint, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(sprint)
        const PostData = async() => {
            try {
                await apis
                            .createSprint(sprint)
                            .then((res) => {
                                console.log(res)
                                setIsUpdate(true)
                                dispatch(actions.IsShowPopup(false));
                            })
                            .catch((error) => {
                                console.error('Registration error: ', error);
                                toast.error('An error occurred during sign up. Please try again.');
                            });
            } catch (error) {
                toast.error('An error occurred during sign up. Please try again.');
            }
         }
         PostData();
    }
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                dispatch(actions.IsShowPopup(false));
            }
        };

        if (isShowPopup) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isShowPopup]);

    if (!isShowPopup) return null;
    return (
        <div class="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center p-4">
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                className="bg-white rounded-md max-w-3xl w-full p-8 drop-shadow-lg"
            >
                <h2 id="modal-title" class="text-gray-900 font-semibold text-3xl mb-2">
                    Edit sprint: <span class="font-bold">NHOM4 Sprint 3</span>
                </h2>
                <p class="text-gray-700 text-xl mb-6">
                    Required fields are marked with an asterisk
                    <span class="text-red-600 font-bold">*</span>
                </p>

                <form onSubmit={handleSubmit} class="space-y-5" >
                    <div>
                        <label for="sprint-name" class="block text-gray-700 text-xl font-semibold mb-1">
                            Sprint name <span class="text-red-600">*</span>
                        </label>
                        <input
                            id="sprint-name"
                            type="text"
                            name="name"
                            onChange={handleChange}
                            class="w-full border border-solid border-gray-300 rounded-md px-3 py-2 text-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    <div>
                        <label for="duration" class="block text-gray-700  font-semibold text-xl font-normal mb-1">
                            Duration
                        </label>
                        <select
                            id="duration"
                            class="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            <option selected>custom</option>
                        </select>
                    </div>

                    <div class="flex space-x-4">
                        <div class="flex-1">
                            <label for="start-date" class="block text-gray-700 text-xl  font-semibold font-normal mb-1">
                                Start date
                            </label>
                            <div class="flex items-center border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-xl">
                                <input
                                    id="start-date"
                                    type="date"
                                    name='startDate'
                                    onChange={handleChange}
                                    placeholder="e.g. 12/31/2018"
                                    class="w-1/2 focus:outline-none"
                                />
                                
                            </div>
                        </div>
                        <div class="flex-1">
                            <label for="end-date" class="block text-gray-700  font-semibold text-xl font-normal mb-1">
                                End date
                            </label>
                            <div class="flex items-center border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-xl">
                                <input
                                    id="end-date"
                                    type="date"
                                    name='endDate'
                                    onChange={handleChange}
                                    placeholder="e.g. 01/14/2019"
                                    class="w-1/2 focus:outline-none"
                                />
                                
                            </div>
                        </div>
                    </div>

                    <div>
                        <label for="sprint-goal" class="block text-gray-700  font-semibold text-xl font-normal mb-1">
                            Sprint goal
                        </label>
                        <textarea
                            id="sprint-goal"
                            rows="6"
                            name='goal'
                            onChange={handleChange}
                            class="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 text-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
                        ></textarea>
                    </div>

                    <div class="flex justify-end space-x-4 text-xl">
                        <button
                            type="button"
                            class="text-gray-700 border hover:bg-gray-200 rounded px-4 py-2 focus:outline-none"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default PopupSprint;
