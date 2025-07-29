import React from "react";
import Image from "next/image";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-gray-900 to-gray-800 p-4 text-white shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto flex items-center gap-8">
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="bg-gradient-to-br from-red-500 to-red-600 p-2 rounded-full shadow-lg">
            <Image
              src="/logo_spotify2.png"
              width={28}
              height={28}
              alt="Kodigo Music Logo"
              className="filter brightness-0 invert"
            />
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            KODIGO MUSIC
          </h1>
        </div>

        <div className="flex-1 max-w-2xl relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="search"
            placeholder="Buscar canciones, artistas, álbumes..."
            className="w-full pl-12 pr-6 py-3 rounded-full text-white bg-gray-800/50 backdrop-blur-sm border border-gray-600/50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 text-base placeholder-gray-400 transition-all duration-200 hover:bg-gray-700/50"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-700/50 transition-colors duration-200">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};
