import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import NotFound from "@/pages/404";
import Directory from "./pages/directory/Directory";

function App() {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<Home />} />
            <Route path="directory" element={<Directory />} />
            <Route path="auth">
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Route>
        </Routes>
    );
}

export default App;
