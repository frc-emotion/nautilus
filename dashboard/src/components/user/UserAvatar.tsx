import { Avatar as UIAvatar, AvatarFallback } from "@/components/ui/avatar";
import { UserNoPassword } from "@/context/auth";

export default function UserAvatar({ user }: { user: UserNoPassword }) {
    return (
        <UIAvatar className="select-none">
            {/* TODO: Add AvatarImage when supported */}
            <AvatarFallback>{`${user?.firstname.charAt(0).toUpperCase()}${user?.lastname.charAt(0).toUpperCase()}`}</AvatarFallback>
        </UIAvatar>
    );
}
