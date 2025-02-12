import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PostsPage } from './pages/posts/postsPage.jsx'
import App from './App.jsx'
import { Root } from './components/root/root.jsx'
import { EditPostPage } from './pages/posts/edit/editPostPage.jsx'
import { AddPostPage } from './pages/posts/add/addPostPage.jsx'
import { AuthPage } from './pages/authPage/authPage.jsx'
import { RegistrationPage } from './pages/registrationPage/registrationPage.jsx'
import { store } from './redux/store.js'
import './index.css'
import { DetailPostPage } from './pages/posts/detail/detailPostPage.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        index: true,
        element: <App />
      },
      {
        path: 'posts',
        element: <PostsPage />
      },
      {
        path: 'posts/:Id',
        element: <DetailPostPage />
      },
      {
        path: 'posts/:Id/edit',
        element: <EditPostPage />
      },
      {
        path: 'posts/add',
        element: <AddPostPage />
      },
      {
        path: 'auth',
        element: <AuthPage />
      },
      {
        path: 'registration',
        element: <RegistrationPage />
      },
    ]
  },
])

export default router

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
