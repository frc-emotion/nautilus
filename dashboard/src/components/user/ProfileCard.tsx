import { UserNoPassword } from "@/context/auth";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";

import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { Mail, Phone } from "lucide-react";

export default function ProfileCard({
    user,
    className,
}: {
    user: UserNoPassword;
    className?: string;
}) {
    return (
        <Card className={className}>
            <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                    <CardTitle>{`${user.firstname} ${user.lastname}`}</CardTitle>
                    <UserAvatar user={user} />
                </div>
                <div className="flex items-center justify-between">
                    <CardDescription>
                        {user.tagline ? user.tagline : null}
                    </CardDescription>
                    <div className="space-x-3">
                        <HoverCard>
                            <HoverCardTrigger className="underline">
                                <Link to={`tel:${user.phone}`}>call</Link>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-full">
                                <Link
                                    to={`tel:${user.phone}`}
                                    className="flex items-center justify-center"
                                >
                                    <Phone size="20" className="mr-2" />
                                    {user.phone}
                                </Link>
                            </HoverCardContent>
                        </HoverCard>
                        <HoverCard>
                            <HoverCardTrigger className="underline">
                                <Link to={`mailto:${user.email}`}>email</Link>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-full">
                                <Link
                                    to={`mailto:${user.email}`}
                                    className="flex items-center justify-center"
                                >
                                    <Mail size="20" className="mr-2" />
                                    {user.email}
                                </Link>
                            </HoverCardContent>
                        </HoverCard>
                    </div>
                </div>
            </CardHeader>
            {/* <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter> */}
        </Card>
    );
}
