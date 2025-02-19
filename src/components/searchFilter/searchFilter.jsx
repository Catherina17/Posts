import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterPosts, setSearchTerm } from '../../redux/slices/postsSlice';
import * as SC from './styles';

export const SearchFilter = () => {
    const dispatch = useDispatch()
    const { sort } = useSelector((state) => state.posts.posts)

    const [searchTerm, setSearchTermState] = useState('')

    const handleSearchChange = (e) => {
        setSearchTermState(e.target.value)

        dispatch(setSearchTerm(e.target.value))
        dispatch(filterPosts(e.target.value, { sort }))
    }

    return (
        <SC.Input
            type='text'
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder='Search'
        />
    )
}
