import styled, { keyframes } from 'styled-components'

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`

export const LoadingContainer = styled.div`     
    margin: 30px auto;
    display: flex;
    justify-content: center; 
    align-items: center;
`

export const LoadingIndicator = styled.div`
    width: 30px;
    height: 30px;
    border: 3px solid #f3f3f3;
    border-top: 3px solid rgb(106, 106, 108);
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`
