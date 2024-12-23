import styled from "styled-components";

const StyledHeader = styled.header`
    background-color: var(--color-gray-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-gray-100);
`;

export function Header() {
    return <StyledHeader>header</StyledHeader>;
}
