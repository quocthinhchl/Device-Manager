import { combineReducers, createStore } from 'redux'
import userReducer from './Slice/UserSlice'
import { configureStore } from '@reduxjs/toolkit'
const rootStore = combineReducers({
    // counter: counterReducer,
    user: userReducer,
})
const store = configureStore({
    reducer: rootStore
})
// export const store = configureStore({
//     reducer: {
//         // counter: counterReducer,
//         user: userReducer,
//     },
// })
export default store
