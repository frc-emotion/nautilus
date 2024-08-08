import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth, UserNoPassword } from "./context/auth";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFound from "@/pages/404";
import Directory from "./pages/directory/Directory";
import Profile from "./pages/users/Profile";

const PrivateWrapper = ({ children }: { children: JSX.Element }) => {
    const { user, loading } = useAuth();
    if (loading) {
        return <p>Loading...</p>;
    }
    return user ? children : <Navigate to="/auth/login" />;
};

function App() {
    return (
        <Routes>
            <Route index element={<Home />} />
            <Route path="directory" element={<Directory />} />
            <Route path="auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
            <Route
                path="user/:id"
                element={
                    <PrivateWrapper>
                        <Profile />
                    </PrivateWrapper>
                }
            />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
