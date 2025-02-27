import { useDispatch, useSelector } from 'react-redux'
import { setSearchTerm } from '../../redux/slices/postsSlice'
import * as SC from './styles'

export const SearchFilter = () => {
    const dispatch = useDispatch()
    const { searchTerm } = useSelector((state) => state.posts.posts)

    const handleSearchChange = (e) => {
        dispatch(setSearchTerm(e.target.value))
    }

    return (
        <SC.Input
            type='text'
            value={searchTerm ?? ''}
            onChange={handleSearchChange}
            placeholder='Search'
        />
    )
}