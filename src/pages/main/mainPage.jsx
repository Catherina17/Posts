import { Container } from "../../components/container/styles"
import { PostsComponents } from "../../components/posts/postsComponents"

const INITIAL_POSTS = [
    {
      id: 1,
      title: 'Post 1',
      image: 'https://avatars.dzeninfra.ru/get-zen_doc/9712766/pub_646797f029bffd1d3593de99_6467980dfa619c3404e8f47c/scale_1200',
    },
    {
      id: 2,
      title: 'Post 2',
      image: 'https://avatars.dzeninfra.ru/get-zen_doc/9712766/pub_646797f029bffd1d3593de99_6467980dfa619c3404e8f47c/scale_1200',
    },
    {
      id: 3,
      title: 'Post 3',
      image: 'https://avatars.dzeninfra.ru/get-zen_doc/9712766/pub_646797f029bffd1d3593de99_6467980dfa619c3404e8f47c/scale_1200',
    }
]

export const MainPage = () => (
    <>
        <Container>
            <PostsComponents posts={INITIAL_POSTS} />
        </Container>
    </>
)