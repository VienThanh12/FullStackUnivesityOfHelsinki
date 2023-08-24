const filterReducer = (state = '', action) => {
    switch(action.type) {
        case 'Filter':
            return action.payload
    default:
        return state
    }
}

export const filterChange = (filter) => {
    return {
        type: 'Filter',
        payload: filter,
    }
}

export default filterReducer