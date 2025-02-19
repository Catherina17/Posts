import { useDispatch, useSelector } from "react-redux"
import { Container } from "../../components/ui/container/container"
import { PostsComponents } from "../../components/posts/postsComponents"
import { Typo } from "../../components/ui/typo/typo"
import { useEffect } from "react"
import { getPosts } from "../../redux/slices/postsSlice"
import { LoadingIndicator } from "../../components/posts/components/loading/loading"


export const PostsPage = () => {
    const { list, loading } = useSelector((state) => state.posts.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!list) {
            dispatch(getPosts())
        }
    }, [list, dispatch])

    if (!list && loading) {
        return <LoadingIndicator />
    }

    if(!list) {
        return <>404</>
    }

    return <Container>
        <Typo>Публикации</Typo>
        <PostsComponents posts={list} />
    </Container>
}