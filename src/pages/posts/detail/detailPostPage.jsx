import { useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useMemo } from "react"
import { Typo } from "../../../components/typo/typo"
import { Container } from "../../../components/container/styles"
import { Link } from "../../../components/link/link"
import * as SC from './styles' 
import { getPost } from "../../../redux/slices/postsSlice"

export const DetailPostPage = () => {
    const { id } = useParams()
    const postForView = useSelector((state) => state.posts.postForView)
    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getPost(Number(id)))
    }, [id])

    if (!postForView) {
        return <>Пост не найден</>
    }


    return <Container>
        <Typo>{postForView.title}</Typo>
        <SC.Image src={postForView.image} alt={postForView.title} />
        <SC.Text>{postForView.text}</SC.Text>
        <div style={{ clear: 'both' }} />
        <SC.LinkWrapper>
            <Link to='/posts/'>Обратно к публикациям</Link>
        </SC.LinkWrapper>
    </Container>
}