import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { Input } from "../../ui/Input";
import { Form } from "../../ui/Form";
import { Button } from "../../ui/Button";
import { FileInput } from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import { FormRow } from "../../ui/FormRow";
import { createEditBungalow } from "../../services/apiBungalows";

export function CreateBungalowForm({ bungalowToEdit = {} }) {
    const { id: editId, ...editValues } = bungalowToEdit || {};
    const isEditing = Boolean(editId);

    const { register, handleSubmit, reset, getValues, formState } = useForm({
        defaultValues: isEditing ? editValues : {},
    });
    const { errors } = formState;

    const queryClient = useQueryClient();

    const { mutate: createBungalow, isLoading: isLoadingCreate } = useMutation({
        mutationFn: createEditBungalow,
        onSuccess: () => {
            toast.success("Bungalow created");
            queryClient.invalidateQueries("bungalows");
            reset();
        },
        onError: (error) => {
            toast.error("Failed to create bungalow");
            console.error(error);
        },
    });

    const { mutate: editBungalow, isLoading: isLoadingEdit } = useMutation({
        mutationFn: ({ newBungalowData, id }) =>
            createEditBungalow(newBungalowData, id),
        onSuccess: () => {
            toast.success("Bungalow edited");
            queryClient.invalidateQueries("bungalows");
            reset();
        },
        onError: (error) => {
            toast.error("Failed to edit bungalow");
            console.error(error);
        },
    });

    function onSubmit(data) {
        const image =
            typeof data.image === "string" ? data.image : data.image[0];

        if (isEditing)
            editBungalow({ newBungalowData: { ...data, image }, id: editId });
        else createBungalow({ ...data, image: image });
    }

    function onError(errors) {
        console.error(errors);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <FormRow label="Bungalow name" error={errors.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isLoadingCreate || isLoadingEdit}
                    {...register("name", {
                        required: "Field required",
                    })}
                />
            </FormRow>

            <FormRow
                label="Maximum capacity"
                error={errors.max_capacity?.message}
            >
                <Input
                    type="number"
                    id="maxCapacity"
                    disabled={isLoadingCreate || isLoadingEdit}
                    {...register("max_capacity", {
                        required: "Field required",
                        min: {
                            value: 1,
                            message: "Capacity should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Regular price" error={errors.price?.message}>
                <Input
                    type="number"
                    id="regularPrice"
                    disabled={isLoadingCreate || isLoadingEdit}
                    {...register("price", {
                        required: "Field required",
                        min: {
                            value: 1,
                            message: "Price should be at least 1",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Discount" error={errors.discount?.message}>
                <Input
                    type="number"
                    id="discount"
                    defaultValue={0}
                    disabled={isLoadingCreate || isLoadingEdit}
                    {...register("discount", {
                        required: "Field required",
                        validate: (value) =>
                            (value >= 0 && value <= getValues().price * 10) ||
                            "Discount should be between 0 and regular price",
                    })}
                />
            </FormRow>

            <FormRow
                label="Description for website"
                error={errors.description?.message}
            >
                <Textarea
                    type="number"
                    id="description"
                    defaultValue=""
                    disabled={isLoadingCreate || isLoadingEdit}
                    {...register("description", { required: "Field required" })}
                />
            </FormRow>

            <FormRow label="Bungalow image" error={errors.image?.message}>
                <FileInput
                    id="image"
                    accept="image/*"
                    type="file"
                    {...register("image", {
                        required: isEditing ? false : "Field required",
                    })}
                />
            </FormRow>

            <FormRow>
                {/* type is an HTML attribute! */}
                <Button variation="secondary" type="reset">
                    Cancel
                </Button>
                <Button
                    disabled={isLoadingCreate || isLoadingEdit}
                    type="submit"
                >
                    {isEditing ? "Edit bungalow" : "Add bungalow"}
                </Button>
            </FormRow>
        </Form>
    );
}
