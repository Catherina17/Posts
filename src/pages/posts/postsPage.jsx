import { useSelector } from "react-redux"
import { Container } from "../../components/container/styles"
import { PostsComponents } from "../../components/posts/postsComponents"
import { Typo } from "../../components/typo/typo"


export const PostsPage = () => {
    const posts = useSelector((state) => state.posts.list)



    return <Container>
        <Typo>Публикации</Typo>
        <PostsComponents posts={posts} />
    </Container>
}