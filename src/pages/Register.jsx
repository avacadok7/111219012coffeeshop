import React, { useState } from "react";
import { auth, db } from "../../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Register({ onSuccess }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const nickname = e.target.nickname.value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      // Save nickname to Firestore under users/{uid}
      await setDoc(doc(db, "users", userCredential.user.uid), { nickname });
      setError("");
      setSuccess(true);
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f1ed]">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-sm items-center">
          <h2 className="text-2xl font-bold text-[#714F43] mb-2 text-center font-[jaro]">Account Created!</h2>
          <button
            className="bg-[#714F43] text-white py-2 px-6 rounded-md hover:bg-[#5c3d33] transition mt-4"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f1ed]">
      <form
        className="bg-white p-8 rounded-lg shadow-md flex flex-col gap-4 w-full max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-[#714F43] mb-2 text-center font-[jaro]">Register</h2>
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
        <input
          name="nickname"
          type="text"
          placeholder="Nickname"
          className="border rounded-md px-4 py-2 focus:outline-none focus:border-[#714F43]"
          required
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-[#714F43] text-white py-2 rounded-md hover:bg-[#5c3d33] transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;