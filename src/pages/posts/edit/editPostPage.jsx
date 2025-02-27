import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { PostForm } from '../components/postForm/postForm'
import { editPost } from '../../../redux/slices/postsSlice'
import { Modal } from '../../../components/ui/modal/modal'
import { Button } from '../../../components/ui/button/button'

export const EditPostPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const { list } = useSelector((state) => state.posts.posts)

    const [modalVisible, setModalVisible] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const onSubmitForm = (formValues) => {
        dispatch(editPost(formValues))
        setModalMessage('Пост успешно отредактирован')
        setModalVisible(true)
    }
    

    if(!list) {
        return <>Пост не найден</>
    }

    const findedPost = list.find((item) => item.id === Number(id))

    return (
        <>
            <PostForm 
                title={`Редактирование поста - ${id}`} 
                onSubmitForm={onSubmitForm} defaultValues={findedPost} 
            />
            {modalVisible && (
                <Modal title={modalMessage}>
                    <Button onClick={() => setModalVisible(false)}>Ок</Button>
                </Modal>
            )}
        </>
    )
}