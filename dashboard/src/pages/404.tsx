import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="h-screen w-screen flex flex-col space-y-5 items-center justify-center">
            <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
            <Button variant="link" className="text-xl underline"><Link to="/">Go Home</Link></Button>
        </div>
    );
}
