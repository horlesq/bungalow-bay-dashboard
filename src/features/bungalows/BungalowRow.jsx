import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import {
    QueryClient,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { deleteBungalow } from "../../services/apiBungalows";
import toast from "react-hot-toast";
import { useState } from "react";
import { CreateBungalowForm } from "./CreateBungalowForm";

const TableRow = styled.div`
    display: grid;
    grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
    column-gap: 2.4rem;
    align-items: center;
    padding: 1.4rem 2.4rem;

    &:not(:last-child) {
        border-bottom: 1px solid var(--color-gray-100);
    }
`;

const Img = styled.img`
    display: block;
    width: 8rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Bungalow = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-gray-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

export function BungalowRow({ bungalow }) {
    const [showForm, setShowForm] = useState(false);

    const {
        id,
        name,
        max_capacity: maxCapacity,
        price,
        discount,
        image,
    } = bungalow;

    const queryClient = useQueryClient();

    const { isLoading, mutate } = useMutation({
        mutationFn: deleteBungalow,
        onSuccess: () => {
            toast.success("Bungalow deleted successfully.");
            queryClient.invalidateQueries("bungalows");
        },
        onError: (error) => {
            toast.error("An error occurred. Please try again.");
            console.error(error);
        },
    });

    return (
        <>
            <TableRow role="row">
                <Img src={image} />
                <Bungalow>{name}</Bungalow>
                <div>Up to {maxCapacity} persons</div>
                <Price>{formatCurrency(price)}</Price>
                <Discount>{formatCurrency(discount)}</Discount>
                <div>
                    <button onClick={() => setShowForm((show) => !show)}>
                        Edit
                    </button>
                    <button onClick={() => mutate(id)} disabled={isLoading}>
                        Delete
                    </button>
                </div>
            </TableRow>
            {showForm && <CreateBungalowForm bungalowToEdit={bungalow} />}
        </>
    );
}
