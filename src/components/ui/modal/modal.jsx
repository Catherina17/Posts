import * as SC from './styles'

export const Modal = ({ title, children }) => {

    return (
        <SC.ModalWrapper>
            <SC.Modal>
                <SC.ModalText>{title}</SC.ModalText>
                <SC.ModalContent>{children}</SC.ModalContent>
            </SC.Modal>
        </SC.ModalWrapper>
    )
}