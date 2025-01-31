import styled from "styled-components";
import { format, isToday } from "date-fns";

import { Tag } from "../../ui/Tag";
import { Table } from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";

const Bungalow = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-gray-600);
    font-family: "Sono";
`;

const Stacked = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    & span:first-child {
        font-weight: 500;
    }

    & span:last-child {
        color: var(--color-gray-500);
        font-size: 1.2rem;
    }
`;

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

export function BookingRow({
    booking: {
        id: bookingId,
        created_at,
        start_date: startDate,
        end_date: endDate,
        num_nights: numNights,
        num_guests: numGuests,
        total_price: totalPrice,
        status,
        guests: { full_name: guestName, email },
        bungalows: { name: bungalowName },
    },
}) {
    const statusToTagName = {
        unconfirmed: "blue",
        "checked-in": "green",
        "checked-out": "silver",
    };

    return (
        <Table.Row>
            <Bungalow>{bungalowName}</Bungalow>

            <Stacked>
                <span>{guestName}</span>
                <span>{email}</span>
            </Stacked>

            <Stacked>
                <span>
                    {isToday(new Date(startDate))
                        ? "Today"
                        : formatDistanceFromNow(startDate)}{" "}
                    &rarr; {numNights} night stay
                </span>
                <span>
                    {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(endDate), "MMM dd yyyy")}
                </span>
            </Stacked>

            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

            <Amount>{formatCurrency(totalPrice)}</Amount>
        </Table.Row>
    );
}
