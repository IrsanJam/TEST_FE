import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import axios from 'axios';

const LoginPage = () => {
  const [loginState, setLoginState] = React.useState({
    username: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/login`, {
        username: loginState.username,
        password: loginState.password,
      });
      if (response) {
        const token = response.data.data.token;
        console.log(token)
        Cookies.set('authToken', token);
        Swal.fire({
          title: 'Confirmation',
          text: `Welcome Todo List`,
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: 'rgb(3 150 199)',
        }).then((res) => {
          if (res.isConfirmed) {
            navigate('/main');
          }
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Login Failed',
        text: 'Username or password is wrong.',
        icon: 'error',
        confirmButtonText: 'Coba Lagi',
        confirmButtonColor: '#06121e',
      });
    }
  };

  return (
    <div>
      <section className="bg-gray-900 dark:bg-gray-50">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          ></a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <div className="flex-col justify-center items-center w-full gap-5">
                <img
                  className="ml-[148px] max-h-[100px]  w-[100px]"
                  src="https://res.cloudinary.com/dmuggkwp1/image/upload/v1733979715/icon-preview_v3vqht.png"
                  alt="logo"
                />
                <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Login to your account
                </h1>
              </div>

              <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required={true}
                    onChange={(e) =>
                      setLoginState((prevState) => ({ ...prevState, username: e.target.value }))
                    }
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required={true}
                    onChange={(e) =>
                      setLoginState((prevState) => ({ ...prevState, password: e.target.value }))
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                        Remember me
                      </label>
                    </div>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-gray-900 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;