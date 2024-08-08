import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./context/auth.tsx";
import { ThemeProvider } from "./context/theme.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    // TODO: Add theme toggle
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <AuthProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </AuthProvider>
    </ThemeProvider>
);
