import { useDispatch } from "react-redux";
import { addPost } from "../../../redux/slices/postsSlice";
import { PostForm } from "../components/postForm/postForm";


export const AddPostPage = () => {
    const dispatch = useDispatch()

    const onSubmitForm = (formValues) => {
        dispatch(addPost(formValues))
    }
    
    
    return <PostForm title={'Добавление нового поста'} onSubmitForm={onSubmitForm}/>
}