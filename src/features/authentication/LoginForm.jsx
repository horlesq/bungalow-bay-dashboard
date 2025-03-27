import { useState } from "react";
import { useLogin } from "./useLogin";

import { Button } from "../../ui/Button";
import { Form } from "../../ui/Form";
import { Input } from "../../ui/Input";
import { FormRowVertical } from "../../ui/FormRowVertical";
import { SpinnerMini } from "../../ui/SpinnerMini";

export function LoginForm() {
    const [email, setEmail] = useState("horlesq@admin.com");
    const [password, setPassword] = useState("pass1337");
    const { login, isLoadingLogin } = useLogin();

    function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) return;

        login(
            { email, password },
            {
                onSettled: () => {
                    setEmail("");
                    setPassword("");
                },
            }
        );
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormRowVertical label="Email address">
                <Input
                    type="email"
                    id="email"
                    // This makes this form better for password managers
                    autoComplete="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoadingLogin}
                />
            </FormRowVertical>
            <FormRowVertical label="Password">
                <Input
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoadingLogin}
                />
            </FormRowVertical>
            <FormRowVertical>
                <Button size="large" disabled={isLoadingLogin}>
                    {!isLoadingLogin ? "Log in" : <SpinnerMini />}
                </Button>
            </FormRowVertical>
        </Form>
    );
}
