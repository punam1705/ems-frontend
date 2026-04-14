
import React from "react";
const API = import.meta.env.VITE_API_URL;

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center 
                    bg-linear-to-br from-blue-100 via-white to-gray-200 px-4">

      {/* CARD */}
      <div className="backdrop-blur-lg bg-white/80 border border-white/40 
                      shadow-xl rounded-2xl p-8 w-full max-w-md">

        {/* LOGO / TITLE */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            Sign in to continue
          </p>
        </div>

        {/* GOOGLE BUTTON */}
        <a
          href={`${API}/oauth2/authorization/google`}
          className="w-full flex items-center justify-center gap-3 
                     border border-gray-300 py-3 rounded-lg 
                     bg-white hover:bg-gray-100 transition 
                     shadow-sm"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="google"
            className="w-5 h-5"
          />
          <span className="text-gray-700 font-medium text-sm">
            Continue with Google
          </span>
        </a>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <hr className="grow border-gray-300" />
          <span className="mx-2 text-gray-400 text-xs">Secure Login</span>
          <hr className="grow border-gray-300" />
        </div>

        {/* FOOT TEXT */}
        <p className="text-center text-xs text-gray-400">
          Powered by Google OAuth
        </p>

      </div>

    </div>
  );
}