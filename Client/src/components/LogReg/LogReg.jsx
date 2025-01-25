import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Nav from "../Nav";

function LogReg() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      <Nav />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
          <div className="flex justify-between mb-4">
            <button
              className={`w-1/2 py-2 font-medium text-sm ${
                isLogin ? "border-b-2 border-indigo-600" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(true)}
            >
              Login
            </button>
            <button
              className={`w-1/2 py-2 font-medium text-sm ${
                !isLogin ? "border-b-2 border-indigo-600" : "text-gray-500"
              }`}
              onClick={() => setIsLogin(false)}
            >
              Register
            </button>
          </div>
          {isLogin ? <Login /> : <Register />}
        </div>
      </div>
    </>
  );
}

export default LogReg;
