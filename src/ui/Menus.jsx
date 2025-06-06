import styled from "styled-components";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { createContext, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useOutsideClick } from "../hooks/useOutsideClick";

const Menu = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const StyledToggle = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;

    &:hover {
        background-color: var(--color-gray-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        color: var(--color-gray-700);
    }
`;

const StyledList = styled.ul`
    position: fixed;

    background-color: var(--color-gray-0);
    box-shadow: var(--shadow-md);
    border-radius: var(--border-radius-md);

    right: ${(props) => props.position.x}px;
    top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
    width: 100%;
    text-align: left;
    background: none;
    border: none;
    padding: 1.2rem 2.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    display: flex;
    align-items: center;
    gap: 1.6rem;

    &:hover {
        background-color: var(--color-gray-50);
    }

    & svg {
        width: 1.6rem;
        height: 1.6rem;
        color: var(--color-gray-400);
        transition: all 0.3s;
    }
`;

const MenuContext = createContext();

export function Menus({ children }) {
    const [openId, setOpenId] = useState("");
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const close = () => setOpenId("");
    const open = setOpenId;

    return (
        <MenuContext.Provider
            value={{ openId, close, open, position, setPosition }}
        >
            {children}
        </MenuContext.Provider>
    );
}

function Toggle({ id }) {
    const { openId, close, open, setPosition } = useContext(MenuContext);

    // This function will open the menu if it's closed or close it if it's open
    function handleClick(event) {
        event.stopPropagation();
        const rect = event.target.closest("button").getBoundingClientRect();

        setPosition({
            x: window.innerWidth - rect.width - rect.x,
            y: rect.y + rect.height + 4,
        });

        openId === "" || openId !== id ? open(id) : close();
    }

    useEffect(() => {
        function handleScroll() {
            if (openId) {
                close();
                document.removeEventListener("wheel", handleScroll);
            }
        }
        if (openId) document.addEventListener("wheel", handleScroll);

        return () => document.removeEventListener("wheel", handleScroll);
    }, [close, openId]);

    return (
        <StyledToggle onClick={handleClick}>
            <HiEllipsisHorizontal />
        </StyledToggle>
    );
}

function List({ id, children }) {
    const { openId, position, close } = useContext(MenuContext);

    // Close the window when clicking outside of it
    const ref = useOutsideClick(close, false);

    if (openId !== id) return null;
    return createPortal(
        <StyledList position={position} ref={ref}>
            {children}
        </StyledList>,
        document.body
    );
}

function Button({ children, onClick, icon }) {
    const { close } = useContext(MenuContext);

    function handleClick() {
        onClick?.();
        close();
    }

    return (
        <li>
            <StyledButton onClick={handleClick}>
                {icon}
                <span>{children}</span>
            </StyledButton>
        </li>
    );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;
