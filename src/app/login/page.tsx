"use client"
import React from 'react'
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useFormik } from 'formik';
import { submitLogin } from '@/lib/redux/authSlice';
import { useDispatch } from 'react-redux';
import { store } from '@/lib/redux/store';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export default function Login() {
  
  const router =useRouter()
  const dispatch =useDispatch<typeof store.dispatch>()
  const initialValues:{email:string,password:string}={
    email:"",
    password:"",
  }
const formik =useFormik({
  initialValues,
  onSubmit:(val)=>{
    dispatch(submitLogin(val)).then((response)=>{
      console.log(response?.payload?.data?.token)
      localStorage.setItem("userToken", response?.payload?.data?.token);
      if(response?.payload?.data?.message=="success"){
        toast.success('Welcome ...!')
        router.push("/")
      }else{
        toast.error('invalid mail or password ...')
      }
    }).catch((error)=>{
      console.log(error)
    });
  },
})
  return <>
  <h2>Login Pages</h2>
  <Container maxWidth="sm">
    <Paper elevation={24}>
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{marginBlock:"20px"}}>
        <TextField value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}
        sx={{width:"100%"}} id="email" label="Email" name="email" variant="filled" />
        </Box>
        <Box sx={{marginBlock:"20px"}}>
        <TextField value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}
        sx={{width:"100%"}} id="password" label="password" name="password" variant="filled" type="password" />
        </Box>
        <Button type="submit" variant="contained">Submit</Button>
      </form>  
    </Paper> 
  </Container>

  </>
}
