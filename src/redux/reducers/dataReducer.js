import {
    ADD_COMMENTS_FAILURE,
    ADD_COMMENTS_REQUEST, ADD_COMMENTS_SUCCESS,
    ADD_POSTS_FAILURE,
    ADD_POSTS_REQUEST, ADD_POSTS_SUCCESS,
    FETCH_COMMENTS_FAILURE,
    FETCH_COMMENTS_REQUEST, FETCH_COMMENTS_SUCCESS,
    FETCH_POSTS_FAILURE,
    FETCH_POSTS_REQUEST,
    FETCH_POSTS_SUCCESS,
    FETCH_USERS_FAILURE,
    FETCH_USERS_REQUEST,
    FETCH_USERS_SUCCESS, HIDE_ERROR, SHOW_ERROR,
} from "../types";

const initialState = {
    users: [],
    posts: [],
    comments: [],
    loading: false,
    error: null,
}

export const dataReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_USERS_SUCCESS:
            return {
                ...state,
                loading: false,
                users: action.payload,
                error: ''
            }
        case FETCH_USERS_FAILURE:
            return {
                loading: false,
                users: [],
                error: action.payload
            }
        case FETCH_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: action.payload,
                error: ''
            }
        case FETCH_POSTS_FAILURE:
            return {
                loading: false,
                posts: [],
                error: action.payload
            }
        case FETCH_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: action.payload,
                error: ''
            }
        case FETCH_COMMENTS_FAILURE:
            return {
                loading: false,
                comments: [],
                error: action.payload
            }
        case SHOW_ERROR:
            return {
                error: action.payload
            }
        case HIDE_ERROR:
            return {
                error: null
            }
        case ADD_POSTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_POSTS_SUCCESS:
            return {
                ...state,
                loading: false,
                posts: [...state.posts, action.payload],
                error: ''
            }
        case ADD_POSTS_FAILURE:
            return {
                loading: false,
                posts: [],
                error: action.payload
            }
        case ADD_COMMENTS_REQUEST:
            return {
                ...state,
                loading: true
            }
        case ADD_COMMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                comments: [...state.comments, action.payload],
                error: ''
            }
        case ADD_COMMENTS_FAILURE:
            return {
                loading: false,
                comments: [],
                error: action.payload
            }
        default:
            return state
    }
}