import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPost } from '../../../redux/slices/postsSlice'
import { PostForm } from '../components/postForm/postForm'
import { Modal } from '../../../components/ui/modal/modal'
import { Button } from '../../../components/ui/button/button'


export const AddPostPage = () => {
    const dispatch = useDispatch()

    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const onSubmitForm = (formValues) => {
        dispatch(addPost(formValues))
        setModalMessage('Пост успешно добавлен!')
        setModalVisible(true)
    }
    
    
    return (
        <>
            <PostForm title={'Добавление нового поста'} onSubmitForm={onSubmitForm}/>
            {modalVisible && (
                <Modal title={modalMessage}>
                    <Button onClick={() => setModalVisible(false)}>Ок</Button>
                </Modal>
            )}
        </>
    )
}