import React from "react";

interface Props {
    active?: boolean;

    onClick?(): void;
}

export const ListIcon = (props: Props) => {
    const color = props.active ? "#0061F3" : "#CECED1";

    return (
        <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={props.onClick}
            style={{ borderRadius: 4 }}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.6666 14.6667H25.3333V18.6667H14.6666V14.6667ZM15.3333 15.3333H24.6666V18H15.3333V15.3333Z"
                fill={color}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.6666 21.3333H25.3333V25.3333H14.6666V21.3333ZM15.3333 22H24.6666V24.6667H15.3333V22Z"
                fill={color}
            />
            <path
                d="M4 1H36V-1H4V1ZM39 4V36H41V4H39ZM36 39H4V41H36V39ZM1 36V4H-1V36H1ZM4 39C2.34315 39 1 37.6569 1 36H-1C-1 38.7614 1.23858 41 4 41V39ZM39 36C39 37.6569 37.6569 39 36 39V41C38.7614 41 41 38.7614 41 36H39ZM36 1C37.6569 1 39 2.34315 39 4H41C41 1.23858 38.7614 -1 36 -1V1ZM4 -1C1.23858 -1 -1 1.23858 -1 4H1C1 2.34315 2.34315 1 4 1V-1Z"
                fill={color}
            />
        </svg>
    );
};
