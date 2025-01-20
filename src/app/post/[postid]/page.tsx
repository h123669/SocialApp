"use client"
import React, { use } from 'react'
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { store } from '@/lib/redux/store';
import { getPostsDetails } from '@/lib/redux/PostsSlice';
import PostCard from '@/app/_component/allPosts/page';
import { PropagateLoader } from "react-spinners";
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';



export default function Page({params}:{params:Promise<{postid:string}>}) {
    const {postid}=use(params)
    const dispatch= useDispatch <typeof store.dispatch>()
    const {details}= useSelector((state)=>{
      return state.postReducer
    })
    console.log(details)
  
    useEffect(()=>{
      dispatch(getPostsDetails(postid))
    },[postid,dispatch])
    return (
        <>
          {details ? (
            <Container maxWidth="sm">
              <Card sx={{ maxWidth: "100%", mt: 1 }}>
                <PostCard postObj={details} showAllComments={true} />
              </Card>
            </Container>
          ) : (
            <Stack
              direction="row"
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",vh: "100%",width:"100%", mt: 1}}
            >
            <PropagateLoader color="#0000ff" sx={{ padding: 2 }} />
            </Stack>
          )}
        </>
      );
      

}