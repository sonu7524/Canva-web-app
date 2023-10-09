import action from "./actions";
const initialState = {
    images: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_IMAGE':
            return {
                ...state,
                images: action.payload,
            }
        default:
            return state
    }
}

export default reducer;