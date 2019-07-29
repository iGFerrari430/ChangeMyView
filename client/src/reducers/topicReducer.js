const defaultState = {
    currTopic: null
}

const postReducer = (state = defaultState, action) => {
    switch(action.type){
        case "SET_POST":
            return {
                ...state,
                currTopic: action.topic
            };
        case "REMOVE_POST":
            return {
                ...state,
                currTopic: null
            };
        default:
            return state;
    }
}