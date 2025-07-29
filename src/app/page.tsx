'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Album, Cancion, Footer, Header, Sidebar } from "./components";

// instancia de QueryClient
const queryClient = new QueryClient();

export default function Home() {
  return (
    // Usando instancia de queryClient
    <QueryClientProvider client={queryClient}>
     <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <Sidebar />
        <main className="flex-grow overflow-y-auto bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm">
          <div className="p-6 pb-32">
            <div className="max-w-7xl mx-auto space-y-8">
              <Album />
              <Cancion />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
    </QueryClientProvider>
  );
}
