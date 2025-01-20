import * as React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CommentIcon from '@mui/icons-material/Comment';
import Comment from '@/app/_commentcard/page';
import { Divider } from '@mui/material';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from 'next/link'
import Image from 'next/image';
import { PostType } from '@/interfaces/interfaces';

export default function PostCard({ postObj, showAllComments }: { postObj: PostType, showAllComments: boolean }) {

  const comments = Array.isArray(postObj?.comments) ? postObj.comments : [];

  return (
    <Card sx={{ maxWidth: "100%", mt: 1, padding: { xs: 2, sm: 3 }, borderRadius: 2 }}>
      <CardHeader
        avatar={<Image src={postObj?.user?.photo} width={50} height={50} alt="photo" />}
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postObj?.user?.name}
        subheader={new Date(postObj?.createdAt).toDateString()}
        sx={{
          paddingBottom: { xs: 1, sm: 2 },
          paddingTop: { xs: 1, sm: 2 }
        }}
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {postObj?.body}
        </Typography>
      </CardContent>
      {postObj?.image && (
        <CardMedia
          component="img"
          height="250"
          image={postObj?.image}
          alt="Post image"
          sx={{ objectFit: 'cover', borderRadius: 1, marginBottom: 2 }}
        />
      )}

      <CardActions disableSpacing sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="comments">
          <CommentIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

      <Divider>comments</Divider>

      {comments.length > 0 && !showAllComments ? (
        <Comment commentInfo={comments[0]} />
      ) : null}

      {comments.length > 1 && showAllComments ? (
        comments.map((comment) => (
          <Comment key={comment._id} commentInfo={comment} />
        ))
      ) : null}

      {!showAllComments && comments.length > 1 && (
        <Button variant="contained" fullWidth sx={{ my: 1, mx: 1 }}>
          <Link href={`../../post/${postObj._id}`} passHref>
            Show more comments
          </Link>
        </Button>
      )}

      <TextField
        multiline
        fullWidth
        minRows={2}
        placeholder="Add your comment"
        sx={{ mt: 1 }}
      />
    </Card>
  );
}
