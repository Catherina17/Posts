import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postsAPI } from '../../api/postsAPI'

const initialState = {
    posts: {
        list: null,
        loading: false,
        searchTerm: '',
        filteredPost: [],
        sort: '',
        currentPage: 1, 
        postsPerPage: 12,
        paginatedPosts: [],
    },
    postForView: {
        post: null,
        loading: false,
    },
    freshPosts: {
        posts: null,
        loading: false
    },
}

export const getPostById = createAsyncThunk(
    'posts/fetchById',
    async (postId) => {
        return await postsAPI.fetchById(postId)
    }
)

export const getPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await postsAPI.fetchPosts()
        return response
    }
)

export const getFreshPosts = createAsyncThunk(
    'posts/fetchFreshPosts',
    async (limit, { getState }) => {
        const state = getState()
        if (state.posts.freshPosts.posts) {
            return state.posts.freshPosts.posts
        }
        const response = await postsAPI.fetchFreshPosts(limit)
        return response
    }
)

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        editPost: (state, action) => {
            const updateList = (list) => {
                return list.map((post) => {
                    return post.id === action.payload.id ? action.payload : post
                })
            }

            state.posts.list = updateList(state.posts.list)
        
            if (state.freshPosts.posts) {
                state.freshPosts.posts = updateList(state.freshPosts.posts)
            }  

            state.posts.filteredPost = state.posts.list.filter(post => 
                post.title.toLowerCase().includes(state.posts.searchTerm.toLowerCase())
            )
        
            state.posts.paginatedPosts = state.posts.filteredPost.slice(0, state.posts.postsPerPage)

            if (state.postForView.post && state.postForView.post.id === action.payload.id) {
                state.postForView.post = action.payload
            } 
        },              
        addPost: (state, action) => {
            const newPost = { ...action.payload }
            newPost.id = new Date().getTime()
        
            state.posts.list = state.posts.list ? [newPost, ...state.posts.list] : [newPost]
        
            state.posts.filteredPost = state.posts.list.filter(post =>
                post.title.toLowerCase().includes(state.posts.searchTerm.toLowerCase())
            )
        
            state.posts.paginatedPosts = state.posts.filteredPost.slice(0, state.posts.postsPerPage)
        },               
        showPost: (state, action) => {
            state.postForView = {
                post: action.payload,
                loading: false
            }
        },   
        deletePost: (state, action) => {      
            state.posts.list = state.posts.list.filter(post => post.id !== action.payload.id)

            if (state.freshPosts.posts) {
                state.freshPosts.posts = state.freshPosts.posts.filter(post => post.id !== action.payload.id)
            }

            if (state.freshPosts.posts.length < 3) {
                const newFreshPost = state.posts.list.find(post => 
                    !state.freshPosts.posts.some(freshPost => freshPost.id === post.id)
                )

                newFreshPost && state.freshPosts.posts.push(newFreshPost)
            }
                
            const filteredPosts = state.posts.list.filter(post => 
                post.title.toLowerCase().includes(state.posts.searchTerm.toLowerCase())
            )
        
            state.posts.filteredPost = filteredPosts

            state.posts.currentPage = 1
            state.posts.paginatedPosts = filteredPosts.slice(0, state.posts.postsPerPage)
        }, 
        setSearchTerm: (state, action) => {
            state.posts.searchTerm = action.payload
        
            const filteredPosts = state.posts.list.filter(post => 
                post.title.toLowerCase().includes(action.payload.toLowerCase())
            )

            if (state.posts.sort) {
                const order = state.posts.sort === 'ASC' ? 1 : -1
                
                state.posts.filteredPost = filteredPosts.sort((a, b) => 
                    order * a.title.localeCompare(b.title)
                )
            } else {
                state.posts.filteredPost = filteredPosts
            }
        
            state.posts.currentPage = 1
            state.posts.paginatedPosts = state.posts.filteredPost.slice(0, state.posts.postsPerPage)
        },     
        setSort: (state, action) => {
            state.posts.sort = action.payload

            if (action.payload === '') {
                state.posts.filteredPost = [...state.posts.list.filter(post => 
                    post.title.toLowerCase().includes(state.posts.searchTerm.toLowerCase())
                )]
            } else {
                const order = action.payload === 'ASC' ? 1 : -1

                state.posts.filteredPost.sort((a, b) => 
                    order * a.title.localeCompare(b.title)
                )
            }
        
            state.posts.currentPage = 1
            state.posts.paginatedPosts = state.posts.filteredPost.slice(0, state.posts.postsPerPage)
        }, 
        setCurrentPage: (state, action) => {
            state.posts.currentPage = action.payload
            const startIndex = (state.posts.currentPage - 1) * state.posts.postsPerPage
            const endIndex = startIndex + state.posts.postsPerPage
            state.posts.paginatedPosts = state.posts.filteredPost.slice(startIndex, endIndex)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPostById.pending, (state) => {
            state.postForView.loading = true
        }),
        builder.addCase(getPostById.fulfilled, (state, action) => {
            state.postForView = {
                post: action.payload,
                loading: false,
            }
        }),
        builder.addCase(getPosts.pending, (state) => {
            state.posts.loading = true;
        }),
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts.list = action.payload
            state.posts.loading = false
            state.posts.filteredPost = action.payload
            state.posts.paginatedPosts = action.payload.slice(0, state.posts.postsPerPage)
        }),
        builder.addCase(getFreshPosts.pending, (state) => {
            state.freshPosts.loading = true
        }),
        builder.addCase(getFreshPosts.fulfilled, (state, action) => {
            state.freshPosts.posts = action.payload
            state.freshPosts.loading = false
        })
    },
})

export const { editPost, addPost, showPost, deletePost, setSearchTerm, setSort, setCurrentPage } = postsSlice.actions

export default postsSlice.reducer