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
export const submitLogin = createAsyncThunk('authSlice/submitLogin', async (formval: { email: string; password: string }) => {
    try {
      const response = await axios.post('https://linked-posts.routemisr.com/users/signin', formval);
      
      return {
        token: response.data.token,  
        message: response.data.message, 
      };
    } catch (error) {
      return Promise.reject(error); 
    }
  });

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
            state.userToken=action?.payload?.data?.token
            
        })
        builder.addCase(submitLogin.rejected,(state)=>{
            state.isError=true
        })


        builder.addCase(submitRegister.pending,(state)=>{
            state.isLoading=true
        })
        builder.addCase(submitRegister.fulfilled,(state,action)=>{
            state.userToken=action?.payload?.data?.token
            
        })
        builder.addCase(submitRegister.rejected,(state)=>{
            state.isError=true
        })
    }
})

export const authReducer =authSlice.reducer