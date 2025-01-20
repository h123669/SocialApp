'use client'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getPostsFun } from '@/lib/redux/PostsSlice';
import { store } from '@/lib/redux/store';
import PostCard from "./_component/allPosts/page";
import Box from '@mui/material/Box';
import { PostType } from '@/interfaces/interfaces';
import { PropagateLoader } from "react-spinners";
import Stack from '@mui/material/Stack';
import PostForm from "./_postForm/page";

export default function Home() {
  const dispatch= useDispatch <typeof store.dispatch>()
  const {allPosts}= useSelector((state)=>{
    return state.postReducer
  })
  console.log(allPosts)

  useEffect(()=>{
    dispatch(getPostsFun())
  },[dispatch])
  return <>
   <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 2 }}>
  <Box sx={{ gridColumn: 'span 3' }}>
    
  </Box>
  <Box sx={{ gridColumn: 'span 6' }}>
    <PostForm/>
    {allPosts.length>0 ? allPosts.map((post:PostType)=>{return <PostCard key={post._id} postObj={post}/>}) 
    : <Stack
    direction="row"
    spacing={2}
    sx={{
      justifyContent: "center",
      alignItems: "center",vh: "100%",width:"100%", mt: 1}}
  >
  <PropagateLoader color="#0000ff" sx={{ padding: 2 }} />
  </Stack> 
  } 
  </Box>
  <Box sx={{ gridColumn: 'span 3' }}>
    
  </Box>
  
</Box>
</>
  
}
