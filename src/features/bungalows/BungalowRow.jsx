import styled from "styled-components";
import { IoDuplicate } from "react-icons/io5";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { formatCurrency } from "../../utils/helpers";
import { CreateBungalowForm } from "./CreateBungalowForm";
import { useDeleteBungalow } from "./useDeleteBungalow";
import { useCreateBungalow } from "./useCreateBungalow";
import { Modal } from "../../ui/Modal";
import { ConfirmDelete } from "../../ui/ConfirmDelete";

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
    const { isLoadingCreate, createBungalow } = useCreateBungalow();
    const { isLoadingDelete, deleteBungalow } = useDeleteBungalow();

    const {
        id,
        name,
        max_capacity: maxCapacity,
        price,
        discount,
        image,
        description,
    } = bungalow;

    function handleDuplicate() {
        createBungalow({
            name: `Copy of ${name}`,
            max_capacity: maxCapacity,
            price,
            discount,
            image,
            description,
        });
    }

    return (
        <TableRow role="row">
            <Img src={image} />
            <Bungalow>{name}</Bungalow>
            <div>Up to {maxCapacity} persons</div>
            <Price>{formatCurrency(price)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span></span>
            )}
            <div>
                <button onClick={handleDuplicate} disabled={isLoadingCreate}>
                    <IoDuplicate />
                </button>

                <Modal>
                    <Modal.Open opens="bungalow-form">
                        <button>
                            <MdModeEdit />
                        </button>
                    </Modal.Open>
                    <Modal.Window name="bungalow-form">
                        <CreateBungalowForm bungalowToEdit={bungalow} />
                    </Modal.Window>

                    <Modal.Open opens={"delete"}>
                        <button>
                            <MdDelete />
                        </button>
                    </Modal.Open>
                    <Modal.Window name={"delete"}>
                        <ConfirmDelete
                            resourceName="bungalow"
                            disabled={isLoadingDelete}
                            onConfirm={() => deleteBungalow(id)}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </TableRow>
    );
}
