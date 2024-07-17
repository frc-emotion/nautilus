import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link } from "react-router-dom";

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
        route: "/",
    },
    {
        label: "Settings",
        route: "/",
    },
];

const rightNavMenuItems: NavMenuItem[] = [
    {
        label: "Login",
        route: "/auth/login",
    },
];

export default function Navbar() {
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
                <NavigationMenu>
                    <NavigationMenuList>
                        {rightNavMenuItems.map((item, index) => (
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
        </div>
    );
}
