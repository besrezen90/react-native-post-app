import { LOAD_POSTS, TOGGLE_BOOKED, REMOVE_POST, ADD_POST } from '../types'

const initState = {
	allPosts: [],
	bookedPosts: [],
	loading: true,
}

export const postReducer = (state = initState, action) => {
	switch (action.type) {
		case LOAD_POSTS:
			return {
				...state,
				allPosts: action.payload,
				bookedPosts: action.payload.filter(post => post.booked),
				loading: false,
			}
		case TOGGLE_BOOKED:
			const allPosts = state.allPosts.map(item => {
				if (item.id === action.payload) {
					return { ...item, booked: !item.booked }
				}
				return item
			})
			return {
				...state,
				allPosts,
				bookedPosts: allPosts.filter(post => post.booked),
			}
		case REMOVE_POST:
			return {
				...state,
				allPosts: state.allPosts.filter(
					item => item.id !== action.payload
				),
				bookedPosts: state.allPosts.filter(post => post.booked),
			}

		case ADD_POST:
			return {
				...state,
				allPosts: [{ ...action.payload }, ...state.allPosts],
			}

		default:
			return state
	}
}
