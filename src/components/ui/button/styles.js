import styled from 'styled-components';

export const Button = styled.button`
    border: none;
    color: white;
    padding: 10px 15px;
    border-radius: 10px;
    cursor: pointer;
    transition: background 0.3s;

    &.registration {
        background:rgb(78, 174, 81); 
        
        &:hover:not(:disabled) {
            background:rgb(71, 161, 75);
        }  
    }

    &.login {
        background:rgb(32, 146, 240); 
        
        &:hover:not(:disabled) {
            background:rgb(11, 124, 216); 
        } 
    }

    &.cancel {
        background:rgb(248, 68, 55); 
        
        &:hover {
            background:rgb(216, 24, 11); 
        }
    }  

    &.logout {
        background:rgb(254, 154, 3); 
        
        &:hover {
            background:rgb(247, 138, 5);
        } 
    }

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`


// import styled, { css } from 'styled-components';

// export const buttonStyles = css`
//     border: none;
//     color: white;
//     padding: 10px 15px;
//     border-radius: 10px;
//     cursor: pointer;
//     transition: background 0.3s;

//     &:disabled {
//         opacity: 0.5;
//         cursor: default;
//     }
// `

// export const Button = styled.button`
//     ${buttonStyles}
// `