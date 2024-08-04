import { UserNoPassword } from "@/context/auth";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "../user/UserAvatar";

export default function NavbarProfile({ user }: { user: UserNoPassword }) {
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <UserAvatar user={user} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="mr-5 mt-1">
                    <DropdownMenuLabel>{`${user.firstname} ${user.lastname}`}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600 font-bold">
                        Logout
                        {/* TODO: Handle logout */}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
