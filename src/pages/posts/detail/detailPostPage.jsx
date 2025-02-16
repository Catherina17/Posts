import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Typo } from "../../../components/ui/typo/typo"
import { Container } from "../../../components/ui/container/container"
import { Link } from "../../../components/ui/link/link"
import { deletePost, getPostById, showPost } from "../../../redux/slices/postsSlice"
import * as SC from './styles' 

export const DetailPostPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { list } = useSelector((state) => state.posts.posts)
    const postForView = useSelector((state) => state.posts.postForView)

    const [postForDelete, setPostForDelete] = useState(null)

    const onDeletePost = () => {    
        dispatch(deletePost(postForDelete))

        setPostForDelete(null)

        return navigate('/posts')
    }

    useEffect(() => {
        const intId = Number(id)
        const findedPosts = list ? list.find((item) => item.id === intId) : undefined
        
        if (findedPosts) {
            dispatch(showPost(findedPosts))
        } else {
            dispatch(getPostById(intId))
        }
    }, [id, list, dispatch])

    if (postForView.loading) {
        return <Container>Loading...</Container>
    }

    if (!postForView.post || !postForView.post.hasOwnProperty('id')) {
        return <>Пост не найден</>
    }

    const { post } = postForView

    const image = post.image || 'https://avatars.dzeninfra.ru/get-zen_doc/9712766/pub_646797f029bffd1d3593de99_6467980dfa619c3404e8f47c/scale_1200'

    return <Container>
        {postForDelete && 
            <SC.ModalWrapper>
                <SC.Modal>
                    <SC.ModalText>Вы точно уверены, что хотите удалить публикацию с ID - {postForDelete.id}?</SC.ModalText>
                    <SC.ModalContent>
                        <SC.DeleteButton onClick={onDeletePost}>Да</SC.DeleteButton>
                        <button onClick={() => setPostForDelete(null)}>Нет</button>
                    </SC.ModalContent>
                </SC.Modal>
            </SC.ModalWrapper>
        }
        <Typo>{post.title}</Typo>
        <SC.Image src={image} alt={post.title} />
        <SC.Text>{post.body}</SC.Text>
        <div style={{ clear: 'both' }} />
        <SC.LinkWrapper>
            <Link to='/posts/'>Обратно к публикациям</Link>
            {list && <Link to={`/posts/${post.id}/edit`}>Редактировать</Link>}
            {list && <SC.DeleteButton onClick={() => setPostForDelete(post)}>Удалить</SC.DeleteButton>}
        </SC.LinkWrapper>
    </Container>
}