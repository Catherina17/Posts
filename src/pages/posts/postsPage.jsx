import { useDispatch, useSelector } from "react-redux";
import { Container } from "../../components/ui/container/container";
import { PostsComponents } from "../../components/posts/postsComponents";
import { Typo } from "../../components/ui/typo/typo";
import { useEffect } from "react";
import { getPosts } from "../../redux/slices/postsSlice";
import { LoadingIndicator } from "../../components/posts/components/loading/loading";
import { SearchFilter } from "../../components/searchFilter/searchFilter";
import { SortFilter } from "../../components/sortFilter/sortFilter";
import { Pagination } from "../../components/pagination/pagination"; 

export const PostsPage = () => {
    const { list, loading, filteredPost = [], searchTerm, currentPage, postsPerPage } = useSelector((state) => state.posts.posts)
    const dispatch = useDispatch()

    useEffect(() => {
        if (!list) {
            dispatch(getPosts())
        } 
    }, [list, dispatch])

    if (loading) {
        return <LoadingIndicator />
    }

    if (!list) {
        return <>404</>
    }

    const postsToDisplay = (filteredPost.length > 0 || searchTerm) ? filteredPost : list
    
    // const postsToDisplay = (filteredPost.length > 0 || searchTerm) ? filteredPost : list;

    // const currentItems = postsToDisplay.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage)

    return (
        <Container>
            <Typo>Публикации</Typo>
            <SearchFilter />
            <SortFilter />
            <PostsComponents posts={postsToDisplay} />
            <Pagination /> 
        </Container>
    )
}
