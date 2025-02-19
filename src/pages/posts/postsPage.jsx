import { useDispatch, useSelector } from "react-redux"
import { Container } from "../../components/ui/container/container"
import { PostsComponents } from "../../components/posts/postsComponents"
import { Typo } from "../../components/ui/typo/typo"
import { useEffect } from "react"
import { getPosts } from "../../redux/slices/postsSlice"
import { LoadingIndicator } from "../../components/posts/components/loading/loading"
import { SearchFilter } from "../../components/searchFilter/searchFilter"
import { SortFilter } from "../../components/sortFilter/sortFilter"


export const PostsPage = () => {
    const { list, loading, filteredPost } = ((state) => state.posts.posts)

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

    const postsToDisplay = filteredPost || list

    return <Container>
        <Typo>Публикации</Typo>
        <SearchFilter />
        <SortFilter />
        <PostsComponents posts={postsToDisplay} />
    </Container>
}