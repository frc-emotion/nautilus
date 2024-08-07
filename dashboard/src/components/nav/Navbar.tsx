import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/auth";
import NavbarProfile from "./NavbarProfile";

interface NavMenuItem {
    label: string;
    route: string;
}

const primaryNavMenuItems: NavMenuItem[] = [
    {
        label: "Home",
        route: "/",
    },
    {
        label: "Scouting",
        route: "/",
    },
    {
        label: "Attendance",
        route: "/",
    },
    {
        label: "Directory",
        route: "/directory",
    },
    {
        label: "Settings",
        route: "/",
    },
];

export default function Navbar() {
    const { user } = useAuth();

    return (
        <div className="relative mb-5 h-20 w-full border-b-2 border-b-neutral-400">
            <div className="flex h-full w-full items-center justify-center">
                <NavigationMenu className="w-full">
                    <NavigationMenuList>
                        {primaryNavMenuItems.map((item, index) => (
                            <NavigationMenuItem key={index}>
                                <Link to={item.route}>
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        {item.label}
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        ))}
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
                {user ? (
                    <NavbarProfile user={user} />
                ) : (
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link to="/auth/login">
                                    <NavigationMenuLink
                                        className={navigationMenuTriggerStyle()}
                                    >
                                        Login
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                )}
            </div>
        </div>
    );
}
