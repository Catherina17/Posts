import { useDispatch, useSelector } from "react-redux"
import { Container } from "../../components/container/styles"
import { PostsComponents } from "../../components/posts/postsComponents"
import { Typo } from "../../components/typo/typo"
import { useEffect } from "react"
import { getPosts } from "../../redux/slices/postsSlice"


export const PostsPage = () => {
    const { list, loading } = useSelector((state) => state.posts.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPosts())
    }, [])

    if (!list && loading) {
        return <Container>Loading...</Container>
    }

    if(!list) {
        return <>404</>
    }

    return <Container>
        <Typo>Публикации</Typo>
        <PostsComponents posts={list} />
    </Container>
}