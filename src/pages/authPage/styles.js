import styled from 'styled-components'
import { Button } from '../../components/ui/button/styles'

export const SignInButton = styled(Button)`
    background:rgb(32, 146, 240); 
        
    &:hover:not(:disabled) {
        background:rgb(11, 124, 216); 
    } 
`

export const CloseButton = styled(Button)`
    background:rgb(42, 128, 198);
`