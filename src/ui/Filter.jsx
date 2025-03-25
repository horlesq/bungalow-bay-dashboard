import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
    border: 1px solid var(--color-gray-100);
    background-color: var(--color-gray-0);
    box-shadow: var(--shadow-sm);
    border-radius: var(--border-radius-sm);
    padding: 0.4rem;
    display: flex;
    gap: 0.4rem;
`;

const FilterButton = styled.button`
    background-color: var(--color-gray-0);
    border: none;

    ${(props) =>
        props.active &&
        css`
            background-color: var(--color-brand-600);
            color: var(--color-brand-50);
        `}

    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;
    /* To give the same height as select */
    padding: 0.44rem 0.8rem;
    transition: all 0.3s;

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

export function Filter({ options }) {
    const [searchParams, setSearchParams] = useSearchParams();
    if (searchParams.get("page")) searchParams.set("page", 1); // Reset the page number when the filter changes

    const currentFilter = searchParams.get("filter") || options[0].value;

    function handleClick(value) {
        searchParams.set("filter", value);
        setSearchParams(searchParams);
    }

    return (
        <StyledFilter>
            {options.map((option) => (
                <FilterButton
                    key={option.value}
                    onClick={() => handleClick(option.value)}
                    active={currentFilter === option.value}
                    disabled={currentFilter === option.value}
                >
                    {option.label}
                </FilterButton>
            ))}
        </StyledFilter>
    );
}
