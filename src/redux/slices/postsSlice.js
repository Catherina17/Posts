import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { postsAPI } from "../../api/postsAPI";

const initialState = {
    posts: {
        list: null,
        loading: false,
        searchTerm: '',
        filteredPost: [],
        sort: '',
        currentPage: 1, 
        postsPerPage: 12,
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
        console.log("Полученные посты:", response)
        return response
    }
)

export const getFreshPosts = createAsyncThunk(
    'posts/fetchFreshPosts',
    async (limit) => {
        const response = await postsAPI.fetchFreshPosts(limit);
        return response;
    }
);

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
        setSort: (state, action) => {
            state.posts.sort = action.payload;
        
            const filteredPosts = state.posts.list?.filter(post =>
                post.title.toLowerCase().includes(state.posts.searchTerm.toLowerCase())
            ) || [];
        
            if (filteredPosts.length > 0) {
                const order = action.payload === 'ASC' ? 1 : action.payload === 'DESC' ? -1 : 0;

                state.posts.filteredPost = filteredPosts.sort((a, b) => 
                    order === 0 ? 0 : order * a.title.localeCompare(b.title)
                );
            } else {
                state.posts.filteredPost = [];
            }           
        },
        setSearchTerm: (state, action) => {
            state.posts.searchTerm = action.payload;

            state.posts.filteredPost = state.posts.list?.filter(post =>
                post.title.toLowerCase().includes(state.posts.searchTerm.toLowerCase())
            ) || [];

            if (state.posts.sort) {
                const order = state.posts.sort === 'ASC' ? 1 : -1;

                state.posts.filteredPost = state.posts.filteredPost.sort((a, b) => 
                    order * a.title.localeCompare(b.title)
                );
            }
        },
        setCurrentPage: (state, action) => {
            state.posts.currentPage = action.payload;
        },
        // setSort: (state, action) => {
        //     state.posts.sort = action.payload;
        //     console.log("Обновленный setSort: ", state.posts.searchTerm);
        //     updateFilteredPosts(state);
        // },
        
        // setSearchTerm: (state, action) => {
        //     state.posts.searchTerm = action.payload;
        //     console.log("Обновленный setSearchTerm: ", state.posts.searchTerm);
        //     updateFilteredPosts(state);
        // },
        
        // updateFilteredPosts: (state) => {
        //     if (!state.posts.list || state.posts.list.length === 0) {
        //         state.posts.filteredPost = [];
        //         return;
        //     }
     
        //     const filteredPosts = state.posts.list.filter(post =>
        //         post.title.toLowerCase().includes(state.posts.searchTerm.toLowerCase())
        //     );
     
        //     const orderMap = {
        //         'ASC': 1,
        //         'DESC': -1,
        //         '': 0
        //     };
        //     const order = orderMap[state.posts.sort] !== undefined ? orderMap[state.posts.sort] : 0;
     
        //     state.posts.filteredPost = filteredPosts.length > 0 
        //         ? filteredPosts.slice().sort((a, b) => 
        //             order === 0 ? 0 : order * a.title.localeCompare(b.title)
        //         )
        //         : [];
        // },        
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
                loading: false,
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
    }  
})

export const { editPost, addPost, showPost, deletePost, setSearchTerm, setSort, setCurrentPage } = postsSlice.actions

export default postsSlice.reducer

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { postsAPI } from "../../api/postsAPI";

// const initialState = {
//     posts: {
//         list: null,
//         loading: false,
//         searchTerm: '',
//         filteredPost: [],
//         sort: '',
//         currentPage: 0,
//         itemsPerPage: 12,
//     },
//     postForView: {
//         post: null,
//         loading: false,
//     },
//     freshPosts: {
//         posts: null,
//         loading: false
//     },
// }

// export const getPostById = createAsyncThunk(
//     'posts/fetchById',
//     async (postId) => {
//         return await postsAPI.fetchById(postId)
//     }
// )

// export const getPosts = createAsyncThunk(
//     'posts/fetchPosts',
//     async () => {
//         const response = await postsAPI.fetchPosts()
//         console.log("Полученные посты:", response)
//         return response
//     }
// )

// export const getFreshPosts = createAsyncThunk(
//     'posts/fetchFreshPosts',
//     async (limit) => {
//         const response = await postsAPI.fetchFreshPosts(limit);
//         return response;
//     }
// );

// export const filterPosts = createAsyncThunk(
//     'posts/filterPosts',
//     async (searchTerm, { getState }) => {
//         const { posts } = getState().posts
        
//         if (!posts.list || posts.list.length === 0) {
//             return []
//         }

//         let filteredList = [...posts.list];

//         if (searchTerm) {
//             filteredList = filteredList.filter(post =>
//                 post.title.toLowerCase().includes(searchTerm.toLowerCase())
//             )
//         }
        
//         const sort = posts.sort
        
//         if (sort) { 
//             const order = sort === 'ASC' ? 1 : sort === 'DESC' ? -1 : 0
                  
//             filteredList.sort((a, b) => 
//               order === 0 ? 0 : order * a.title.localeCompare(b.title)
//             )
//         }

//         if (filteredList.length < posts.itemsPerPage) {
//             posts.currentPage = 0
//         }

//         console.log('Отфильтрованный список:', filteredList)
//         return filteredList;
//     }
// )

// export const postsSlice = createSlice({
//     name: 'posts',
//     initialState,
//     reducers: {
//         editPost: (state, action) => {
//             state.posts.list = state.posts.list.map((post) => {
//                 if (post.id === action.payload.id) {
//                     return action.payload
//                 }

//                 return post
//             })
//         },
//         addPost: (state, action) => {
//             const newPost = {...action.payload}

//             newPost.id = new Date().getTime()
//             state.posts.list = state.posts.list ? [newPost, ...state.posts.list] : [newPost]
//         },
//         showPost: (state, action) => {
//             state.postForView = {
//                 post: action.payload,
//                 loading: false
//             }
//         },
//         deletePost: (state, action) => {
//             console.log("Состояние до удаления:", state.posts.list)
//             state.posts.list = state.posts.list.filter((post) => post.id !== action.payload.id)
    
//             if (state.freshPosts.posts) {
//                 state.freshPosts.posts = state.freshPosts.posts.filter((post) => post.id !== action.payload.id)
//                 console.log("Состояние freshPosts (после удаления):", state.freshPosts.posts)
//             }
            
//             state.postForView = {
//                 post: null,
//                 loading: false
//             }
//         }, 
//         setSearchTerm: (state, action) => {
//             state.posts.searchTerm = action.payload
//         },
//         updateFilteredPosts: (state, action) => {
//             state.posts.filteredPost = action.payload;
//         },
//         setSort: (state, action) => {
//             state.posts.sort = action.payload;
//         },
//         setCurrentPage: (state, action) => {
//             state.posts.currentPage = action.payload
//         }
//     },
//     extraReducers: (builder) => {
//         builder.addCase(getPostById.pending, (state) => {
//             state.postForView = {
//                 post: null,
//                 loading: true
//             }
//         }),
//         builder.addCase(getPostById.fulfilled, (state, action) => {
//             state.postForView = {
//                 post: action.payload,
//                 loading: false
//             }
//         }),
//         builder.addCase(getPosts.pending, (state) => {
//             state.posts = {
//                 list: null,
//                 loading: true
//             }
//         }),
//         builder.addCase(getPosts.fulfilled, (state, action) => {
//             state.posts = {
//                 list: action.payload,
                
//                 loading: false,
//             }
//         }),
//         builder.addCase(getFreshPosts.pending, (state) => {
//             state.freshPosts = {
//                 posts: null,
//                 loading: true
//             }
//         }),
//         builder.addCase(getFreshPosts.fulfilled, (state, action) => {
//             console.log("Свежие посты в postsSlice в getFreshPosts.fulfilled: ", action.payload); 
//             state.freshPosts = {
//                 posts: action.payload,
//                 loading: false
//             }
//         })
//         builder.addCase(filterPosts.pending, (state) => {
//             state.posts.loading = true;
//         }),
//         builder.addCase(filterPosts.fulfilled, (state, action) => {
//             state.posts.filteredPost = action.payload; 
//             state.posts.loading = false;
//             console.log('Отфильтрованный список state.posts.filteredPost:', state.posts.filteredPost);
//             console.log('Список action.payload:', action.payload)
             
//         })      
//     },       
// })

// export const { editPost, addPost, showPost, deletePost, setSearchTerm, updateFilteredPosts, setSort, setCurrentPage } = postsSlice.actions

// export default postsSlice.reducer