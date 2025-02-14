import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { Typo } from "../../../components/typo/typo"
import { Container } from "../../../components/container/styles"
import { Link } from "../../../components/link/link"
import { getPostById, showPost } from "../../../redux/slices/postsSlice"
import * as SC from './styles' 

export const DetailPostPage = () => {
    const { id } = useParams()
    const { list } = useSelector((state) => state.posts.posts)
    const postForView = useSelector((state) => state.posts.postForView)
    const dispatch = useDispatch()
    
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
        <Typo>{post.title}</Typo>
        <SC.Image src={image} alt={post.title} />
        <SC.Text>{post.body}</SC.Text>
        <div style={{ clear: 'both' }} />
        <SC.LinkWrapper>
            <Link to='/posts/'>Обратно к публикациям</Link>
        </SC.LinkWrapper>
    </Container>
}