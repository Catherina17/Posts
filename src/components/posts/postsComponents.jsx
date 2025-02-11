import { Post } from "./components/post/post"
import * as SC from './styles'

export const PostsComponents = ({ posts }) => (
    <>
        <SC.Title>Свежие публикации</SC.Title>
        <SC.Posts>
            {posts.map((post) => (
                <Post post={post} />
            ))}
        </SC.Posts>
    </>
)

            


