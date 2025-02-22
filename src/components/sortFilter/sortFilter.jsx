import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../redux/slices/postsSlice';
import * as SC from './styles';

export const SortFilter = () => {
    const dispatch = useDispatch()
    const { sort } = useSelector((state) => state.posts.posts)

    const handleSortChange = (e) => {
        dispatch(setSort(e.target.value))
    }

    return (
        <SC.SortWrapper>
            <SC.SortSelect value={sort} onChange={handleSortChange}>
                <option value=''>Relevance</option>
                <option value='ASC'>ASC</option>
                <option value='DESC'>DESC</option>
            </SC.SortSelect>
        </SC.SortWrapper>
    )
}