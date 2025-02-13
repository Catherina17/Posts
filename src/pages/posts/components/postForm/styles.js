import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
    max-width: 250px;
    margin: 30px auto;
`

export const Field = styled.div`

`

export const Input = styled.input`
    width: 100%;
    outline: none;
    border: 1px solid #282c34;
`

export const Textarea = styled.textarea`
    resize: none;
    width: 100%;
    outline: none;
    border: 1px solid #282c34;
`

export const Button = styled.button`
    border: none;
    background: #282c34;
    color: white;
    padding: 10px 0;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
        background: #1e2d48;
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`