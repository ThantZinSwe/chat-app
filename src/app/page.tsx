"use client";
import { useRouter } from "next/navigation";
import ProtectedRoute from "../../components/ProtectedRoute";
import { useAuth } from "../../context/AuthContext";
import SearchProfile from "../../components/SearchProfile";
import ChatLists from "../../components/ChatLists";
import Chat from "../../components/Chat";

export default function Home() {
  const { user, logout } = useAuth();

  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <div className="flex flex-row items-center justify-center h-12 w-full">
              <div className="flex items-center justify-center rounded-2xl text-primary-700 bg-primary-100 h-10 w-10">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  ></path>
                </svg>
              </div>
              <div className="ml-2 font-bold text-2xl">ChatApp</div>
            </div>
            <div className="flex flex-col items-center bg-primary-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
              <div className="h-20 w-20 rounded-full border overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${user?.displayName}`}
                  alt={user?.displayName}
                  className="h-full w-full"
                />
              </div>
              <div className="text-sm font-semibold mt-2">
                {user?.displayName}.
              </div>
              <div className="text-xs text-gray-500">{user?.email}</div>
              <div className="flex flex-row items-center mt-3">
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center px-2 py-1 bg-red-500 hover:bg-red-400 text-white text-xs font-medium rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-3 h-3 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                    />
                  </svg>
                  <span>Logout</span>
                </button>
              </div>
            </div>
            <div className="flex flex-col mb-8">
              <SearchProfile authUser={user} />

              <ChatLists authUser={user} />
            </div>
          </div>
          <Chat />
        </div>
      </div>
    </ProtectedRoute>
  );
}
