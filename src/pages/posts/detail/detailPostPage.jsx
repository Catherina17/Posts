import { useNavigate, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { Typo } from "../../../components/ui/typo/typo"
import { Container } from "../../../components/ui/container/container"
import { Link } from "../../../components/ui/link/link"
import { deletePost, getPostById, showPost, getFreshPosts } from "../../../redux/slices/postsSlice"
import { Modal } from "../../../components/ui/modal/modal"
import { Button } from "../../../components/ui/button/button"
import { LoadingIndicator } from "../../../components/posts/components/loading/loading"
import * as SC from './styles' 

export const DetailPostPage = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { list } = useSelector((state) => state.posts.posts)
    const postForView = useSelector((state) => state.posts.postForView)
    const { user } = useSelector((state) => state.auth)

    const [postForDelete, setPostForDelete] = useState(null)

    const showEditAndDeleteBtn = list && user

    const onDeletePost = () => {    
        console.log("Удаление в deletePostPage:", postForDelete)
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
        return <LoadingIndicator />
    }

    if (!postForView.post || !postForView.post.hasOwnProperty('id')) {
        return <>Пост не найден</>
    }

    const { post } = postForView

    const image = post.image || 'https://avatars.dzeninfra.ru/get-zen_doc/9712766/pub_646797f029bffd1d3593de99_6467980dfa619c3404e8f47c/scale_1200'

    return <Container>
        {postForDelete && 
            <Modal
                title={`Вы точно уверены, что хотите удалить публикацию с ID - ${postForDelete.id}?`}
            >
                <SC.DeleteButton onClick={onDeletePost}>Да</SC.DeleteButton>
                <Button className='cancel' onClick={() => setPostForDelete(null)}>Нет</Button>
                {/* <SC.ButtonRed onClick={() => setPostForDelete(null)}>Нет</SC.ButtonRed> */}
            </Modal>
        }
        <Typo>{post.title}</Typo>
        <SC.Image src={image} alt={post.title} />
        <SC.Text>{post.body}</SC.Text>
        <div style={{ clear: 'both' }} />
        <SC.LinkWrapper>
            <Link to='/posts/'>Обратно к публикациям</Link>
            {showEditAndDeleteBtn && <Link to={`/posts/${post.id}/edit`}>Редактировать</Link>}
            {showEditAndDeleteBtn && <SC.DeleteButton onClick={() => setPostForDelete(post)}>Удалить</SC.DeleteButton>}
        </SC.LinkWrapper>
    </Container>
}