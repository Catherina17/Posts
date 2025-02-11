import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Posts } from './pages/posts/posts.jsx'
import App from './App.jsx'
import { Root } from './components/root/root.jsx'
import { DetailPost } from './pages/posts/detail/detail.jsx'
import { EditPost } from './pages/posts/edit/edit.jsx'
import { AddPost } from './pages/posts/add/add.jsx'
import { Auth } from './pages/auth/auth.jsx'
import { Registration } from './pages/registration/registration.jsx'
import { store } from './redux/store.js'
import './index.css'

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
        element: <Posts />
      },
      {
        path: 'posts/:Id',
        element: <DetailPost />
      },
      {
        path: 'posts/:Id/edit',
        element: <EditPost />
      },
      {
        path: 'posts/add',
        element: <AddPost />
      },
      {
        path: 'auth',
        element: <Auth />
      },
      {
        path: 'registration',
        element: <Registration />
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
