import { useDispatch, useSelector } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/postsSlice'
import * as SC from './styles'

export const Pagination = () => {
    const dispatch = useDispatch()
    const { currentPage, postsPerPage } = useSelector((state) => state.posts.posts)
    const totalPosts = useSelector((state) => state.posts.posts.filteredPost.length || 0)

    const totalPages = Math.ceil(totalPosts / postsPerPage)

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            dispatch(setCurrentPage(currentPage + 1))
        }
    }

    const handlePrevPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1))
        }
    }
   
    return (
        <SC.PaginationWrapper>
        {totalPages > 1 ? (
            <>
            <SC.PaginationButton onClick={handlePrevPage} disabled={currentPage === 1}>Назад</SC.PaginationButton>
            <SC.Pages>{currentPage} из {totalPages}</SC.Pages>
            <SC.PaginationButton onClick={handleNextPage} disabled={currentPage === totalPages}>Вперед</SC.PaginationButton>
        </>
        ) : (
            <SC.OnePage>1</SC.OnePage>
        ) }     
        </SC.PaginationWrapper>
    )
}
