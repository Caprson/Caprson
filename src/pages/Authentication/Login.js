import * as apis from '../../apis';
import * as actions from '../../store/actions';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };
    // hủy Cookie
    function deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    // Hàm để lấy giá trị của một cookie
    function getCookie(name) {
        const cookies = document.cookie.split('; ');

        for (let cookie of cookies) {
            const [key, value] = cookie.split('=');
            if (key === name) {
                return decodeURIComponent(value);
            }
        }
        return undefined;
    }

    // check xem người dùng đã đăng nhập chưa
    function checkLoggedIn() {
        var token = getCookie('token');
        if (token) {
            // Gọi các API hoặc thực hiện các hành động khác khi người dùng đã đăng nhập
            dispatch(actions.checkLogin(true));
        } else {
            // Hiển thị form đăng nhập hoặc các nút chức năng đăng nhập
            dispatch(actions.checkLogin(false));
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const Login = async () => {
            try {
                await apis
                    .login(formData)
                    .then((res) => {
                        console.log(res);
                        if (res.status === 200) {
                            toast.success('login success');

                            localStorage.setItem('accessToken', res.data.data.accessToken);
                            localStorage.setItem('refreshToken', res.data.data.refreshToken);
                            dispatch(actions.checkLogin(true));
                            navigate('/projects');
                        }
                    })
                    .catch((res) => {
                        if (res.status === 401) {
                            toast.error('account or password is incorrect');
                        }
                    });
            } catch (error) {
                toast.error(error);
            }
        };
        Login();
    };

    const handleLogout = () => {
        const FetchData = async () => {
            try {
                await apis.logout().then((res) => {
                    if (res.status === 200) {
                        deleteCookie('token');
                        checkLoggedIn();
                        dispatch(actions(false));
                    }
                });
            } catch (error) {
                deleteCookie('token');
                window.location.reload();
                console.error(error);
            }
        };
        FetchData();
    };
    return (
        <>
            <div className="bg-[#f8fafc] min-h-screen flex justify-center items-start pt-16 relative overflow-x-hidden">
                <img
                    alt="Illustration of people interacting with charts and graphs on blue platforms on the left side"
                    className="absolute bottom-0 left-0 max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]"
                    height={300}
                    src="https://storage.googleapis.com/a1aa/image/d0b680b6-b8ff-46d0-58fc-d8e4cfee6658.jpg"
                    width={300}
                />
                <img
                    alt="Illustration of people holding a large pencil and looking through a magnifier at documents on blue platforms on the right side"
                    className="absolute bottom-0 right-0 max-w-[300px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-[450px]"
                    height={300}
                    src="https://storage.googleapis.com/a1aa/image/b7732045-149b-42b2-ff42-245b3f6455b0.jpg"
                    width={300}
                />
                <main className="bg-white rounded-md shadow-md w-full max-w-md p-8 z-10" style={{ minWidth: 320 }}>
                    <div className="flex justify-center mb-4">
                        <img
                            alt="Blue globe icon representing Atlas logo"
                            className="w-10 h-10"
                            height={40}
                            src="./logo_2.png"
                            width={40}
                        />
                        <span className="text-[#0c71f2] font-semibold text-3xl ml-2">WorkWave</span>
                    </div>
                    <h2 className="text-center font-semibold text-gray-900 mb-6 text-xl">Đăng nhập để tiếp tục</h2>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-xl font-semibold text-gray-700 mb-1" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="w-full border border-solid border-gray-300 rounded-md px-3 py-2 text-xl text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-[#0c71f2]"
                                id="email"
                                name="email"
                                type="email"
                                onChange={handleChange}
                                defaultValue=""
                            />
                        </div>
                        <div>
                            <label className="block text-xl font-semibold text-gray-700 mb-1" htmlFor="pasword">
                                Password
                            </label>
                            <input
                                className="w-full border border-solid border-gray-300 rounded-md px-3 py-2 text-xl text-gray-900 mb-3 focus:outline-none focus:ring-2 focus:ring-[#0c71f2]"
                                id="password"
                                name="password"
                                onChange={handleChange}
                                type="password"
                                defaultValue=""
                            />
                        </div>
                        <div className="flex items-center mb-6 text-gray-700 text-xl">
                            <input
                                className="w-4 h-4  border-3 border-solid rounded border-gray-300 focus:ring-[#6b7dd1]"
                                id="remember"
                                name="remember"
                                type="checkbox"
                            />
                            <label className="ml-2 select-none" htmlFor="remember">
                                Nhớ thông tin đăng nhập của tôi
                            </label>
                            <div
                                aria-label="Information"
                                className="ml-2 flex justify-center items-center w-5 h-5 rounded-full bg-[#6b7dd1] text-white text-xs font-semibold cursor-default"
                                title="Information"
                            >
                                i
                            </div>
                        </div>
                        <button
                            className="w-full bg-[#0c71f2] text-white font-semibold text-2xl rounded-md py-3 mb-6 hover:bg-[#095ecb] transition-colors"
                            type="submit"
                        >
                            Tiếp tục
                        </button>
                    </form>
                    <p className="text-center text-gray-600 text-xl mb-4">Hoặc tiếp tục với:</p>
                    <div className="text-center text-[#0c71f2] text-xl mb-6">
                        <a className="underline hover:text-[#095ecb]" href="/signup">
                            Bạn chưa có tài khoản<span>·</span>Tạo tài khoản
                        </a>
                    </div>
                    <hr className="border-gray-300 mb-6" />
                    {/* <div className="text-center text-gray-700 text-xs leading-relaxed">
                        <div className="flex justify-center items-center mb-2 space-x-2">
                            <img
                                alt="Atlassian logo icon"
                                className="w-5 h-5"
                                height={20}
                                src="https://storage.googleapis.com/a1aa/image/d9dc297a-315d-41f5-8fd8-d062ad9abb31.jpg"
                                width={20}
                            />
                            <span className="font-semibold text-xl">ATLASSIAN</span>
                        </div>
                        <p className="mb-1 text-xl">
                            Một tài khoản cho Trello, Jira, Confluence và
                            <a
                                className="text-[#0c71f2] text-xl underline hover:text-[#095ecb]"
                                href="#"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                sản phẩm khác
                            </a>
                            .
                        </p>
                        <p className="mb-1 text-xl">
                            <a
                                className="text-[#0c71f2] underline hover:text-[#095ecb]"
                                href="#"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Chính sách quyền riêng tư
                            </a>
                            ·
                            <a
                                className="text-[#0c71f2] underline hover:text-[#095ecb]"
                                href="#"
                                rel="noopener noreferrer"
                                target="_blank"
                            >
                                Lưu ý dành cho người dùng
                            </a>
                        </p>
                    </div> */}
                </main>
            </div>
        </>
    );
}
export default Login;
