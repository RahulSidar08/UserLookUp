import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name : 'Auth',
    initialState  : {
        users : [],
        token : null
    },
    reducers : {
        setUser : (state , action) => {
            state.users = action.payload
        },
        setToken : (state,action) => {
            state.token = action.payload
        }
    }
})

export const {setUser , setToken} = authSlice.actions
export default authSlice.reducer