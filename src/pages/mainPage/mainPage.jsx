import { useDispatch, useSelector } from "react-redux"
import { Container } from "../../components/container/styles"
import { PostsComponents } from "../../components/posts/postsComponents"
import { Typo } from "../../components/typo/typo"
import { useEffect } from "react"
import { getFreshPosts } from "../../redux/slices/postsSlice"

export const MainPage = () => {
  const dispatch = useDispatch()

  const postForView = useSelector((state) => state.posts.postForView)
  const freshPosts = useSelector((state) => state.posts.freshPosts)

  useEffect(() => {
    dispatch(getFreshPosts())
  }, [])

  return <>
    <Container>
      {freshPosts && 
        <>
          <Typo>Свежие публикации</Typo>
          <PostsComponents posts={freshPosts} />
        </>
      }
      {postForView && 
        <>
          <Typo>Последний просмотренный пост</Typo>
          <PostsComponents posts={[postForView]} />
        </>
      }
    </Container>
  </>
}