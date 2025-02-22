import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/postsSlice";
import * as SC from './styles';
import { Button } from '../ui/button/button';

export const Pagination = () => {
    const dispatch = useDispatch();
    const { currentPage, filteredPost, postsPerPage } = useSelector((state) => state.posts.posts);
    
    const pageCount = Math.ceil((filteredPost?.length || 0) / postsPerPage);

    const handleNextPage = () => {
        if (currentPage < pageCount - 1) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    return (
        <SC.PaginationWrapper>
            {pageCount > 0 && (
                <>
                    <Button 
                        className='pagination' 
                        onClick={handlePrevPage} 
                        disabled={currentPage === 0}
                    >
                        Назад
                    </Button>
                    <div>
                        {Array.from({ length: pageCount }, (_, index) => (
                            <div
                                key={index}
                                onClick={() => dispatch(setCurrentPage(index + 1))}
                            >
                                {index + 1}
                            </div>
                        ))}
                    </div>
                    <Button 
                        className='pagination' 
                        onClick={handleNextPage} 
                        disabled={currentPage === pageCount - 1}
                    >
                        Вперед
                    </Button>
                </>
            )}
        </SC.PaginationWrapper>
    );
};
