import { NavLink } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from '../ui/button/styles'

export const Menu = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: space-between;
    max-width: 500px;
    margin: 15px auto 0 auto;
`

export const MenuItem = styled(NavLink)`
    font-size: 16px;
    text-decoration: none;
    color: black;

    &.active {
        color: darkred;
    }

    &:hover {
        text-decoration: underline;
    }
`

export const LogoutButton = styled(Button)`
    background:rgb(78, 16, 16); 
        
    &:hover:not(:disabled) {
        background:rgb(101, 32, 32);
    }
`