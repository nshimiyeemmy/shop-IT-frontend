import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS

} from '../constants/userConstants'

//Login action
export const login = (email,password) => async dispatch =>{

    try {

        dispatch({type:LOGIN_REQUEST});
        const config = {
            headers:{
               'Content-Type':'application/json',
            }
        }
        const data = await axios.post(`/api/v1/login`, { email,password },config)
        dispatch({
            type:LOGIN_SUCCESS,
            payload:{user:data.data}

        })
    } catch (error) {
        dispatch({
            type:LOGIN_FAIL,
            payload:error.response.data.message
        })
    }
}
    //Clear Erorrs using CLEAR_ERRORS constant
    export const clearErrors = () =>async(dispatch)=>{
        dispatch({
            type:CLEAR_ERRORS
        })
    }
