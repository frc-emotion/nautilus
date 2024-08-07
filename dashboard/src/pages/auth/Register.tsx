import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import PageTitle from "@/components/properties/PageTitle";
import { Alert, AlertDescription } from "@/components/ui/alert";

const registerFormSchema = z.object({
    firstname: z.string(),
    lastname: z.string(),
    username: z.string(),
    email: z.string(),
    phone: z.string(),
    password: z.string(),
    passwordConfirm: z.string(),
});

// TODO: Import from server package instead
const validateEmail = (email: String) => {
    return email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

function RegisterForm() {
    const [formError, setFormError] = useState("");

    const form = useForm<z.infer<typeof registerFormSchema>>({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            username: "",
            email: "",
            phone: "",
            password: "",
            passwordConfirm: "",
        },
    });

    async function onSubmit(values: z.infer<typeof registerFormSchema>) {
        if (!validateEmail(values.email)) {
            form.setError("email", {
                type: "manual",
                message: "Invalid email address",
            });
            return;
        }

        const response = await fetch(
            `${import.meta.env.VITE_API_URL}/users/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            if (data.fields) {
                for (const field of data.fields) {
                    form.setError(field.name, {
                        type: "manual",
                        message: field.message,
                    });
                }
            } else {
                setFormError(data.message);
            }
        } else {
            setFormError("");
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
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="firstname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                    <Input {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="lastname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                    <Input {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input {...field} required />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone</FormLabel>
                                <FormControl>
                                    <Input {...field} required />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        required
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="passwordConfirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        required
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Create Account
                </Button>
            </form>
        </Form>
    );
}

function Register() {
    const navigate = useNavigate();
    return (
        <>
            <PageTitle title="Register" />
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
                            Register
                        </h1>
                        <RegisterForm />
                        <div className="flex w-full flex-row justify-end">
                            <Button variant="link">
                                <Link to="/auth/login">Log In</Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;
