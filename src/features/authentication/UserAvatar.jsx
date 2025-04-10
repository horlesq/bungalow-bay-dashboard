import styled from "styled-components";
import { useUser } from "./useUser";
import { ButtonIcon } from "../../ui/ButtonIcon";
import { useNavigate } from "react-router-dom";

const StyledUserAvatar = styled.div`
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font-weight: 500;
    font-size: 1.4rem;
    color: var(--color-gray-600);
`;

const Avatar = styled.img`
    display: block;
    width: 4rem;
    width: 3.6rem;
    aspect-ratio: 1;
    object-fit: cover;
    object-position: center;
    border-radius: 50%;
    border: 2px solid var(--color-brand-600);
`;

export function UserAvatar() {
    const { user } = useUser();
    const navigate = useNavigate();

    const { full_name, avatar } = user.user_metadata;

    return (
        <StyledUserAvatar>
            <ButtonIcon onClick={() => navigate("/account")}>
                <Avatar
                    src={avatar || "default-user.jpg"}
                    alt={`Avatar of ${full_name}`}
                />
            </ButtonIcon>
            <span>{full_name}</span>
        </StyledUserAvatar>
    );
}
