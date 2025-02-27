import styled from 'styled-components'
import { Button } from '../ui/button/styles'

export const PaginationWrapper = styled.div`
    display: flex;
    gap: 15px;
    align-items: center;
    justify-content: center;
    margin: 50px;
`
export const PaginationButton = styled(Button)`
    max-width: 80px;
    width: 100%;
    background:rgb(26, 28, 31); 
        
    &:hover:not(:disabled) {
        background:rgb(50, 51, 54); 
    }
`

export const Pages = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 600;
    border-bottom: 3px solid rgba(0, 0, 0, 1);
    height: 25px;
    width: 60px;
`

export const OnePage = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 50px;
    font-size: 16px;
    font-weight: 600;
    line-height: 16px;
    border-bottom: 3px solid rgba(0, 0, 0, 1);
    height: 25px;
    width: 25px;
`