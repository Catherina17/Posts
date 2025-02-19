import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSort, filterPosts } from '../../redux/slices/postsSlice';
import * as SC from './styles'

export const SortFilter = () => {
    const dispatch = useDispatch()

    const [sort, setSortState] = useState('')
    const { searchTerm } = useSelector((state) => state.posts.posts)


    const handleSortChange = (e) => {
        setSortState(e.target.value)

        dispatch(setSort(e.target.value))
        dispatch(filterPosts(searchTerm, { sort: e.target.value }))
    }

    return (
        <SC.SortWrapper>
            <SC.SortSelect onChange={handleSortChange}>
                <option value=''>Relevance</option>
                <option value='ASC'>ASC</option>
                <option value='DESC'>DESC</option>
            </SC.SortSelect>
        </SC.SortWrapper>
    )
}