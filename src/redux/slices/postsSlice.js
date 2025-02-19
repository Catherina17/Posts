import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postsAPI } from "../../api/postsAPI";

const initialState = {
    posts: {
        list: null,
        loading: false,
        searchTerm: '',
        filteredPost: [],
        sort: ''
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
        return await postsAPI.fetchPosts()
    }
)

export const getFreshPosts = createAsyncThunk(
    'posts/fetchFreshPosts',
    async (limit) => {
        const response = await postsAPI.fetchFreshPosts(limit);
        return response;
    }
);

export const filterPosts = createAsyncThunk(
    'posts/filterPosts',
    async (searchTerm, { getState }) => {
        const { posts } = getState().posts
        
        let filteredList = [...posts.list]

        if (!posts.list || posts.list.length === 0) {
            return []
        }

        if (searchTerm) {
            filteredList = filteredList.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }
        
        const sort = posts.sort
        
        if (sort) { 
            const order = sort === 'ASC' ? 1 : sort === 'DESC' ? -1 : 0
                  
            filteredList.sort((a, b) => 
              order === 0 ? 0 : order * a.title.localeCompare(b.title)
            )
        }

        return filteredList
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        editPost: (state, action) => {
            state.posts.list = state.posts.list.map((post) => {
                if (post.id === action.payload.id) {
                    return action.payload
                }

                return post
            })
        },
        addPost: (state, action) => {
            const newPost = {...action.payload}

            newPost.id = new Date().getTime()
            state.posts.list = state.posts.list ? [newPost, ...state.posts.list] : [newPost]
        },
        showPost: (state, action) => {
            state.postForView = {
                post: action.payload,
                loading: false
            }
        },
        deletePost: (state, action) => {
            console.log("Состояние до удаления:", state.posts.list)
            state.posts.list = state.posts.list.filter((post) => post.id !== action.payload.id)
    
            if (state.freshPosts.posts) {
                state.freshPosts.posts = state.freshPosts.posts.filter((post) => post.id !== action.payload.id)
                console.log("Состояние freshPosts (после удаления):", state.freshPosts.posts)
            }
            
            state.postForView = {
                post: null,
                loading: false
            }
        }, 
        setSearchTerm: (state, action) => {
            state.posts.searchTerm = action.payload
        },
        updateFilteredPosts: (state, action) => {
            state.posts.filteredPost = action.payload;
        },
        setSort: (state, action) => {
            state.posts.sort = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getPostById.pending, (state) => {
            state.postForView = {
                post: null,
                loading: true
            }
        }),
        builder.addCase(getPostById.fulfilled, (state, action) => {
            state.postForView = {
                post: action.payload,
                loading: false
            }
        }),
        builder.addCase(getPosts.pending, (state) => {
            state.posts = {
                list: null,
                loading: true
            }
        }),
        builder.addCase(getPosts.fulfilled, (state, action) => {
            state.posts = {
                list: action.payload,
                loading: false
            }
        }),
        builder.addCase(getFreshPosts.pending, (state) => {
            state.freshPosts = {
                posts: null,
                loading: true
            }
        }),
        builder.addCase(getFreshPosts.fulfilled, (state, action) => {
            console.log("Свежие посты в postsSlice в getFreshPosts.fulfilled: ", action.payload); 
            state.freshPosts = {
                posts: action.payload,
                loading: false
            }
        })
        builder.addCase(filterPosts.pending, (state) => {
            state.posts.loading = true;
        }),
        builder.addCase(filterPosts.fulfilled, (state, action) => {
            state.posts.filteredPost = action.payload; 
            state.posts.loading = false;
            console.log('Отфильтрованный список state.posts.filteredPost:', state.posts.filteredPost);
        })      
    },       
})

export const { editPost, addPost, showPost, deletePost, setSearchTerm, updateFilteredPosts, setSort } = postsSlice.actions

export default postsSlice.reducer