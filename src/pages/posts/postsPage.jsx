import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from '../../components/ui/container/container'
import { PostsComponents } from '../../components/posts/postsComponents'
import { Typo } from '../../components/ui/typo/typo'
import { getPosts } from '../../redux/slices/postsSlice'
import { LoadingIndicator } from '../../components/posts/components/loading/loading'
import { SearchFilter } from '../../components/searchFilter/searchFilter'
import { SortFilter } from '../../components/sortFilter/sortFilter'
import { Pagination } from '../../components/pagination/pagination' 

export const PostsPage = () => {
    const { list, loading, paginatedPosts } = useSelector((state) => state.posts.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!list) {
            dispatch(getPosts())
        } 
    }, [dispatch, list])

    if (loading) {
        return <LoadingIndicator />
    }

    if (!list) {
        return <>404</>
    }

    return (
        <Container>
            <Typo>Публикации</Typo>
            <SearchFilter />
            <SortFilter />
            {paginatedPosts.length > 0 ? (
                <>
                    <PostsComponents posts={paginatedPosts} /> 
                    <Pagination />
                </>
            ) : (
                <Typo>Не нашлось постов с таким названием</Typo>
            )}
        </Container>
    )
}
