import React, { useState } from "react";
import NotificationComponent from "../common/NotificationComponent";
import { userGetLoginRequest } from "./services";
const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isShowNotification, setIsShowNotification] = useState<boolean>(false);

  const { mutate, isSuccess, data, isError } = userGetLoginRequest();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const params = {
      email,
      password,
    };

    mutate(params);
    setIsShowNotification(true);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4 text-gray-800">Login</h2>

        {isShowNotification ? (
          <NotificationComponent
            message={
              isSuccess ? data?.data.message : "Incorrect email or password"
            }
            type={isSuccess ? "success" : "error"}
          />
        ) : null}

        <form onSubmit={handleSubmit} encType="form-data">
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
