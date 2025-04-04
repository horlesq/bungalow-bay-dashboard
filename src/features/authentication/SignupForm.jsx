import { useForm } from "react-hook-form";
import { Button } from "../../ui/Button";
import { Form } from "../../ui/Form";
import { FormRow } from "../../ui/FormRow";
import { Input } from "../../ui/Input";

// Email regex: /\S+@\S+\.\S+/

export function SignupForm() {
    const { register, formState, getValues, handleSubmit } = useForm();
    const { errors } = formState;

    function onSubmit(data) {
        console.log(data);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <FormRow label="Full name" error={errors.full_name?.message}>
                <Input
                    type="text"
                    id="fullName"
                    {...register("full_name", {
                        required: "This field is required",
                    })}
                />
            </FormRow>

            <FormRow label="Email address" error={errors.email?.message}>
                <Input
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "This field is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Email address is invalid",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Password" error={errors.password?.message}>
                <Input
                    type="password"
                    id="password"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters",
                        },
                    })}
                />
            </FormRow>

            <FormRow
                label="Repeat password"
                error={errors.passwordConfirm?.message}
            >
                <Input
                    type="password"
                    id="passwordConfirm"
                    {...register("password_confirm", {
                        required: "This field is required",
                        validate: (value) =>
                            value === getValues().password ||
                            "Passwords do not match",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button>Create new user</Button>
            </FormRow>
        </Form>
    );
}
