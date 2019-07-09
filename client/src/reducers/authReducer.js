const defaultState = {
    isLoggedin: false,
    user: null
}

const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                isLoggedin: true,
                user: action.user
            };
        case "REMOVE_USER": 
            return {
                ...state,
                isLoggedin: false,
                user: null
            }
        default: 
            return state;
    }
}

export default authReducer;