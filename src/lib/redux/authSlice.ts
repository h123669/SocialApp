import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

interface FormValues {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    dateOfBirth: string; 
    gender: string;
  }
const initialState:{userToken:null|string,userData:null|string,isLoading:boolean,isError:boolean }=
{userToken:null,userData:null,isLoading:false,isError:false}
export const submitLogin= createAsyncThunk("authSlice/submitLogin",(formval:{email:string,password:string})=>{
    return axios.post(`https://linked-posts.routemisr.com/users/signin`,formval
    ).then((resp)=>{
        return resp
    }).catch((err)=>{
        return err
    })
})

export const submitRegister= createAsyncThunk("authSlice/submitRegister",(formval:FormValues)=>{
    return axios.post(`https://linked-posts.routemisr.com/users/signup`,formval
    ).then((resp)=>{
        return resp
    }).catch((err)=>{
        return err
    })
})
const authSlice =createSlice({
    name:"authSlice",
    initialState,
    reducers:{
        logout:(state)=>{
            state.userToken=null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(submitLogin.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(submitLogin.fulfilled,(state,action)=>{
            console.log(action?.payload?.data?.token)
            state.userToken=action?.payload?.data?.token
            
        })
        builder.addCase(submitLogin.rejected,(state)=>{
            state.isError=true
        })


        builder.addCase(submitRegister.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(submitRegister.fulfilled,(state,action)=>{
            console.log(action?.payload?.data?.token)
            state.userToken=action?.payload?.data?.token
            
        })
        builder.addCase(submitRegister.rejected,(state)=>{
            state.isError=true
        })
    }
})

export const authReducer =authSlice.reducer