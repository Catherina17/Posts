import { Post } from "./components/post/post"
import * as SC from './styles'

export const PostsComponents = ({ posts }) => (
    <SC.Posts>
        {posts.map((post) => (
            <Post key={post.id} post={post} />
        ))}
    </SC.Posts>
)