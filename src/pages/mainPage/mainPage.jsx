import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { Container } from "../../components/ui/container/container"
import { PostsComponents } from "../../components/posts/postsComponents"
import { Typo } from "../../components/ui/typo/typo"
import { getFreshPosts } from "../../redux/slices/postsSlice"
import { LoadingIndicator } from "../../components/posts/components/loading/loading"

export const MainPage = () => {
  const dispatch = useDispatch()

  const { post } = useSelector((state) => state.posts.postForView)
  const { posts, loading } = useSelector((state) => state.posts.freshPosts)

  useEffect(() => {
    if (!posts) {
      dispatch(getFreshPosts());
    }
    console.log("Проверка свежих постов в mainPage: ", posts);
}, [dispatch, posts]);

  return <Container> 
    {loading && <LoadingIndicator />}
    {posts && 
        <>
          <Typo>Свежие публикации</Typo>
          <PostsComponents posts={posts} />
        </>
    }
      {post && 
        <>
          <Typo>Последний просмотренный пост</Typo>
          <PostsComponents posts={[post]} />
        </>
      }
  </Container>
}