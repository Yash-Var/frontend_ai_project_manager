import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authService";

import {
  useAuth
} from "../../context/AuthContext";

export default function Login() {

  const navigate =
    useNavigate();

  const { loginUser } =
    useAuth();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin =
    async () => {

      try {

        const response =
          await login(
            email,
            password
          );

        loginUser(
          response.token
        );

        navigate(
          "/dashboard"
        );

      } catch {

        alert(
          "Login Failed"
        );
      }
    };

  return (
    <div className="h-screen flex items-center justify-center">

      <div className="w-96 bg-white shadow-lg rounded-lg p-6">

        <h1 className="text-2xl font-bold mb-6">
          Login
        </h1>

        <input
          className="border w-full p-2 mb-4"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <input
          type="password"
          className="border w-full p-2 mb-4"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
        />

        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-4 py-2 rounded w-full"
        >
          Login
        </button>

      </div>

    </div>
  );
}