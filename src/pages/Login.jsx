import React, { useState } from "react";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

function Login({ onSuccess }) {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Email/Password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError("");
      if (onSuccess) onSuccess();
      navigate("/");
    } catch (err) {
      if (err.code === "auth/user-not-found") {
        setError("Email not registered. Please register first.");
      } else if (err.code === "auth/wrong-password") {
        setError("Incorrect password. Please try again.");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f1ed]">
      <form
        className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-[#714F43] mb-2 text-center font-[jaro]">Login</h2>
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border rounded-md px-4 py-2 focus:outline-none focus:border-[#714F43]"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border rounded-md px-4 py-2 focus:outline-none focus:border-[#714F43]"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-[#714F43] text-white py-2 rounded-md hover:bg-[#5c3d33] transition"
        >
          Login
        </button>
        <div className="text-center mt-2">
          <span className="text-sm text-gray-600">Don't have an account? </span>
          <Link
            to="/register"
            className="text-[#714F43] underline hover:text-[#5c3d33]"
          >
            Register
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;