import styled from 'styled-components'

export const Button = styled.button`
    border: none;
    color: white;
    background: #282c34;
    padding: 10px 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s;

    &:hover:not(:disabled) {
        background: #1e2d48;
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`