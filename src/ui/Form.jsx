import styled, { css } from "styled-components";

const Form = styled.form`
    ${(props) =>
        props.type !== "modal" &&
        css`
            padding: 2.4rem 4rem;

            /* Box */
            background-color: var(--color-gray-0);
            border: 1px solid var(--color-gray-100);
            border-radius: var(--border-radius-md);
        `}

    ${(props) =>
        props.type === "modal" &&
        css`
            width: 80rem;
        `}
    
  overflow: hidden;
    font-size: 1.4rem;
`;

export default Form;