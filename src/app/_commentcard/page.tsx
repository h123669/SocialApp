import { CardHeader, IconButton } from '@mui/material'
import React from 'react'
import  MoreVertIcon  from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import  {CommentsType}  from '@/interfaces/interfaces';
import { Typography } from '@mui/material';
import photo1 from "../../../assets/img/working.png";
import Image from 'next/image';



export default function Comment({commentInfo}:{commentInfo:CommentsType}) {

    function HandelPath(path:string) {
        if(path.includes("undefined")) return photo1 ;
        else return path
    }
  return <>
  <Box sx={{backgroundColor:"#f1f1f1" ,padding:"5px",mx:1,my:2 ,borderRadius:"10px"}}>
  <CardHeader
        avatar={
          <Image src={HandelPath(commentInfo?.commentCreator?.photo)} width={50} height={50}  alt="User profile photo" />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={commentInfo?.commentCreator?.name}
        subheader={new Date(commentInfo?.createdAt).toDateString()}
    />
  <Typography component={"p"} sx={{paddingLeft:"25px"}}>
  {commentInfo?.content}
</Typography>

  </Box>

  
  
  </> 
}
