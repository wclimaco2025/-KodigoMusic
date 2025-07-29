import React from "react";

export const Sidebar = () => {
  const menuItems = [
    { 
      name: "Inicio", 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L2 12.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-4.586l.293.293a1 1 0 001.414-1.414l-9-9z" />
        </svg>
      ),
      active: true
    },
    { 
      name: "Explorar", 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
        </svg>
      )
    },
    { 
      name: "Tu Biblioteca", 
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
        </svg>
      )
    }
  ];

  const playlists = [
    "Mis favoritas",
    "Rock Clásico",
    "Pop Latino",
    "Chill Vibes",
    "Workout Mix"
  ];

  return (
    <div className="w-64 h-full bg-gradient-to-b from-gray-900 to-black text-white flex flex-col">
      {/* Navigation Menu */}
      <div className="p-6">
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 group ${
                item.active 
                  ? 'bg-gray-800 text-white' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <span className={`${item.active ? 'text-red-500' : 'group-hover:text-red-400'}`}>
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Divider */}
      <div className="mx-6 h-px bg-gray-700"></div>

      {/* Playlists Section */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-400 text-sm font-semibold uppercase tracking-wider">
            Playlists
          </h3>
          <button className="text-gray-400 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-1">
          {playlists.map((playlist, index) => (
            <a
              key={index}
              href="#"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-md transition-all duration-200 text-sm"
            >
              {playlist}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="p-6 border-t border-gray-700">
        <button className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          <span className="text-sm">Instalar App</span>
        </button>
      </div>
    </div>
  );
};
