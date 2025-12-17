import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppProvider } from "./lib/AppProvider";
import AuthRequiredRoute from "./components/middlewares/AuthRequiredRoute";
import Login from "./components/pages/Login";
import Signup from "./components/pages/Signup";
import Verify from "./components/pages/Verify";
import Dashboard from "./components/pages/Dashboard";
import NonAuthRequiredRoute from "./components/middlewares/NonAuthRequiredRoute";
import Grocery from "./components/pages/Grocery";
import Progress from "./components/pages/Progress";
import Planner from "./components/pages/Planner";
import Profile from "./components/pages/Profile";
import { ToastContainer } from "react-toastify";

function App() {
  const queryClient = new QueryClient();
  return (
    <div className="bg-[#F9FAFB]">
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route
                path="/*"
                element={
                  <AuthRequiredRoute>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/planner" element={<Planner />} />
                      <Route path="/progress" element={<Progress />} />
                      <Route path="/grocery" element={<Grocery />} />
                      <Route path="/profile" element={<Profile />} />
                    </Routes>
                  </AuthRequiredRoute>
                }
              />
              <Route
                path="/auth/*"
                element={
                  <NonAuthRequiredRoute>
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                      <Route path="/verify" element={<Verify />} />
                    </Routes>
                  </NonAuthRequiredRoute>
                }
              />
            </Routes>
          </BrowserRouter>
        </AppProvider>
        <ToastContainer />
      </QueryClientProvider>
    </div>
  );
}

export default App;
