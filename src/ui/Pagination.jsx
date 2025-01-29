import styled from "styled-components";
import { MdOutlineNavigateBefore, MdOutlineNavigateNext } from "react-icons/md";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../utils/constants";

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const P = styled.p`
    font-size: 1.4rem;
    margin-left: 0.8rem;

    & span {
        font-weight: 600;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 0.6rem;
`;

const PaginationButton = styled.button`
    background-color: ${(props) =>
        props.active ? " var(--color-brand-600)" : "var(--color-gray-50)"};
    color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    transition: all 0.3s;

    &:has(span:last-child) {
        padding-left: 0.4rem;
    }

    &:has(span:first-child) {
        padding-right: 0.4rem;
    }

    & svg {
        height: 1.8rem;
        width: 1.8rem;
    }

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

export function Pagination({ count }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const currentPage = Number(searchParams.get("page")) || 1;
    const pageCount = Math.ceil(count / PAGE_SIZE);

    function nextPage() {
        // Calculate the next page
        const nextPage =
            currentPage === pageCount ? pageCount : currentPage + 1;
        // Set the new page in the URL
        searchParams.set("page", nextPage);
        setSearchParams(searchParams);
    }

    function previousPage() {
        // Calculate the previous page
        const previousPage = currentPage === 1 ? 1 : currentPage - 1;
        // Set the new page in the URL
        searchParams.set("page", previousPage);
        setSearchParams(searchParams);
    }

    if (pageCount <= 1) return null;

    return (
        <StyledPagination>
            <P>
                <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
                <span>
                    {currentPage === pageCount
                        ? count
                        : currentPage * PAGE_SIZE}
                </span>{" "}
                of <span>{count}</span> results
            </P>

            <Buttons>
                <PaginationButton
                    onClick={previousPage}
                    disabled={currentPage === 1}
                >
                    <MdOutlineNavigateBefore /> <span>Previous</span>
                </PaginationButton>
                <PaginationButton
                    onClick={nextPage}
                    disabled={currentPage === pageCount}
                >
                    <span>Next</span> <MdOutlineNavigateNext />
                </PaginationButton>
            </Buttons>
        </StyledPagination>
    );
}
