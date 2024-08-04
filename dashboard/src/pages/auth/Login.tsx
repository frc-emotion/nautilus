import { Button } from "@/components/ui/button";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import PageTitle from "@/components/properties/PageTitle";
import { useAuth } from "@/context/auth";

const formSchema = z.object({
    username: z.string(),
    password: z.string(),
});

function LoginForm() {
    const [formError, setFormError] = useState("");
    const navigate = useNavigate();
    const { refreshUser } = useAuth();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            console.log("logging in");
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/users/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                    credentials: "include",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setFormError(data.message);
            } else {
                setFormError("");
                refreshUser();
                navigate("/dashboard");
            }
        } catch (error) {
            setFormError(`Unknown error: ${error}`);
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(
                    async (data) => await onSubmit(data)
                )}
                className="space-y-8"
            >
                {formError && (
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>{formError}</AlertDescription>
                    </Alert>
                )}
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email or Username</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    required
                                    placeholder="mail@example.com"
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input {...field} required type="password" />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full">
                    Submit
                </Button>
            </form>
        </Form>
    );
}

function Login() {
    const navigate = useNavigate();
    return (
        <>
            <PageTitle title="Login" />
            <div>
                <button
                    onClick={() => navigate(-1)}
                    className="absolute left-6 top-6"
                >
                    <div className="sr-only">Go back</div>
                    <ArrowLeftIcon width="18.75" height="18.75" />
                </button>
                <div className="flex h-screen items-center justify-center px-5">
                    <div className="w-full max-w-md space-y-8">
                        <h1 className="text-center text-3xl font-bold">
                            Login
                        </h1>
                        <LoginForm />
                        <div className="flex w-full flex-row justify-between">
                            <Button
                                variant="link"
                                disabled={true}
                                className="cursor-not-allowed"
                            >
                                <Link to="/auth/forgot">Forgot Password?</Link>
                            </Button>
                            <Button variant="link">
                                <Link to="/auth/register">
                                    Create an Account
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
