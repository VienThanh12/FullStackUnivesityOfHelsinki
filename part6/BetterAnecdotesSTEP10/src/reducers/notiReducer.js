import { createSlice } from "@reduxjs/toolkit"

const noti = [
    'you voted',
    'you created',
]

const initialState = noti.map(noti => "")
const notiSlice = createSlice({
    name: 'Notification',
    initialState, 
    reducers: {
        notiCreate(state, action){
            const content = action.payload
            var s = noti[1] + ' ' + content
            console.log(s)
            return s
        },
        notiVote(state, action){
            const content = action.payload
            var s = noti[0] + ' ' + content
            console.log(s)
            return s
        },
        reset5(state, action) {
            return [
                '',
                ''
            ]
        }
    },
})

export const { notiCreate, notiVote, reset5 } = notiSlice.actions
export default notiSlice.reducer