import { useDispatch, useSelector } from "react-redux"
import { Container } from "../../components/ui/container/container"
import { PostsComponents } from "../../components/posts/postsComponents"
import { Typo } from "../../components/ui/typo/typo"
import { useEffect } from "react"
import { getFreshPosts } from "../../redux/slices/postsSlice"

export const MainPage = () => {
  const dispatch = useDispatch()

  const { post } = useSelector((state) => state.posts.postForView)
  const { posts, loading } = useSelector((state) => state.posts.freshPosts)

  useEffect(() => {
    dispatch(getFreshPosts())
  }, [dispatch])

  return <>
    <Container>
      {loading && <>Loading...</>}
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
  </>
}