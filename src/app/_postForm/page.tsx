import { Box, TextField } from '@mui/material'
import React, { useRef } from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import axios from 'axios'
import toast from 'react-hot-toast';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
export default function PostForm() {
    


    const postContentRef =useRef<HTMLInputElement>(null)
const postFileRef =useRef<HTMLInputElement>(null)

    async function createForm() {
        const content = postContentRef?.current?.value ||""
        const file = postFileRef?.current?.files?.[0]
        console.log({content,file})

        const postData =new FormData()
        postData.append("body",content)
        if(file){
            postData.append("image",file)
        }
    
        const options ={
            url:`https://linked-posts.routemisr.com/posts`,
            method:"POST",
            headers:{
                token:localStorage.getItem("userToken")
            },
            data:postData
        }
        const {data}=await axios.request(options)
        console.log(data)
        if(data.message == "success"){
            toast.success("post has been created")
        }
        
    }

  return <>
    <Box sx={{width:"100%", mt: 1}}>
        <TextField multiline fullWidth maxRows={7} placeholder="what's on your mind ?" inputRef={postContentRef}>

        </TextField>
    </Box>
    <Box sx={{ mt: 1 ,display:"flex" ,justifyContent: "space-between"}}>
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudUploadIcon />}
    >
      Upload files
      <VisuallyHiddenInput
        type="file"
        onChange={(event) => console.log(event.target.files)}
        multiple
        ref={postFileRef}
      />
    </Button>
    <Button variant="contained" onClick={createForm} endIcon={<SendIcon />}>
        post
      </Button>
    </Box>

  </>
}
