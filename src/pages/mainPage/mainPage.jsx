import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Container } from '../../components/ui/container/container'
import { PostsComponents } from '../../components/posts/postsComponents'
import { Typo } from '../../components/ui/typo/typo'
import { getFreshPosts } from '../../redux/slices/postsSlice'
import { LoadingIndicator } from '../../components/posts/components/loading/loading'

export const MainPage = () => {
  const dispatch = useDispatch()

  const { post } = useSelector((state) => state.posts.postForView)
  const { posts, loading } = useSelector((state) => state.posts.freshPosts)
  const { list } = useSelector((state) => state.posts.posts)

  useEffect(() => {
    if (!posts) {
      dispatch(getFreshPosts())
    }
}, [dispatch, posts])

  return (
    <Container> 
      {loading && <LoadingIndicator />}
      {!loading && posts && posts.length === 0 && (
        <Typo>Свежих публикаций нет</Typo>
      )}
      {posts && posts.length > 0 && (
        <>
          <Typo>Свежие публикации</Typo>
          <PostsComponents posts={posts} />
        </>
      )}
      {post && list.some(p => p.id === post.id) && (
          <>
            <Typo>Последний просмотренный пост</Typo>
            <PostsComponents posts={[post]} />
          </>
        )
      }
    </Container>
  )
}