import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    list: [
        {
            id: 5,
            title: 'Post 5',
            image: 'https://avatars.dzeninfra.ru/get-zen_doc/9712766/pub_646797f029bffd1d3593de99_6467980dfa619c3404e8f47c/scale_1200',
            text: 'Щенок корги :)'
        },
        {
            id: 4,
            title: 'Post 4',
            image: 'https://avatars.dzeninfra.ru/get-zen_doc/9712766/pub_646797f029bffd1d3593de99_6467980dfa619c3404e8f47c/scale_1200',
            text: 'Щенок корги :)'
        },
        {
            id: 3,
            title: 'Post 3',
            image: 'https://avatars.dzeninfra.ru/get-zen_doc/9712766/pub_646797f029bffd1d3593de99_6467980dfa619c3404e8f47c/scale_1200',
            text: 'Щенок корги :)'
        },
        {
            id: 2,
            title: 'Post 2',
            image: 'https://avatars.dzeninfra.ru/get-zen_doc/9712766/pub_646797f029bffd1d3593de99_6467980dfa619c3404e8f47c/scale_1200',
            text: 'Щенок корги :)'
        },
        {
            id: 1,
            title: 'Post 1',
            image: 'https://avatars.dzeninfra.ru/get-zen_doc/9712766/pub_646797f029bffd1d3593de99_6467980dfa619c3404e8f47c/scale_1200',
            text: 'Щенок корги :)'
        },
    ],
    postForView: null,
    freshPosts: null,
}

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.list = action.payload
        },

        editPost: (state, action) => {
            
        },
        getPost: (state, action) => {
            state.postForView = state.list.find((item) => item.id === action.payload)
        },
        getFreshPosts: (state) => {
            state.freshPosts = state.list.slice(0, 3)
        },
        addPost: (state, action) => {

        }
    }        
})

export const { setPosts, editPost, getPost, addPost, getFreshPosts } = postsSlice.actions

export default postsSlice.reducer