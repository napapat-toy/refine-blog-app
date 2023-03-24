import {
  Avatar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@pankod/refine-mui";
import { Box, Stack } from "@pankod/refine-mui";
import React, { useState } from "react";
import {
  Star,
  StarBorder,
  ThumbUpOffAlt,
  ThumbUpAlt,
  Build,
  Delete,
  MoreHoriz,
  Check,
} from "@mui/icons-material";
import { useShow } from "@pankod/refine-core";
import { Link, useNavigate, useParams } from "@pankod/refine-react-router-v6";
import { useGetIdentity } from "@pankod/refine-core";
import { useDelete } from "@pankod/refine-core";
import { HeaderText } from "components";

const BlogDetail = () => {
  const [likeButton, setLikeButton] = useState(false);
  const [favoriteButton, setFavoriteButton] = useState(false);
  const [confirmDelete, setconfirmDelete] = useState(false);

  const navigate = useNavigate();
  const { data: user } = useGetIdentity();
  const { queryResult } = useShow();
  const { mutate } = useDelete();
  const { id } = useParams();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setconfirmDelete(false);
  };

  const handleDelete = (id: string | undefined) => {
    if (confirmDelete) {
      mutate({
        resource: "blogs",
        id: id ? id : "",
      });
      navigate(`/blogs`);
    }
    setconfirmDelete(true);
  };

  const { data, isLoading, isError } = queryResult;

  const blog = data?.data ?? {};

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  const isCurrentUser = user.email === blog.author.email;

  return (
    <Box>
      <HeaderText title="Blog Detail" />
      <Box
        bgcolor="#fcfcfc"
        borderRadius="16px"
        py={2}
        px={3}
        mx={{ xs: 1.5, lg: 4 }}
        my={4}
        boxShadow={"0 22px 25px 2px rgba(176, 176, 176, 0.5)"}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            <Avatar
              alt="placeholder"
              src={
                blog.author.avatar
                  ? blog.author.avatar
                  : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
              }
              sx={{ width: 64, height: 64 }}
            />
            <Link
              to={`/users/show/${user.userid}`}
              style={{ color: "#333", textDecoration: "none" }}
            >
              <Typography
                fontSize={20}
                ml={1.5}
                my={4}
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {blog.author.name}
              </Typography>
            </Link>
          </Stack>

          {isCurrentUser && (
            <>
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <MoreHoriz />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem
                  onClick={() => navigate(`/blogs/edit/${id}`)}
                  sx={{ padding: 2 }}
                >
                  <Build color="info" />
                </MenuItem>
                <MenuItem onClick={() => handleDelete(id)} sx={{ padding: 2 }}>
                  <Delete color="error" />
                  {confirmDelete && <Check />}
                </MenuItem>
              </Menu>
            </>
          )}
        </Stack>
        <Typography
          fontSize={28}
          fontWeight={700}
          color="#333"
          // lineHeight={{ xs: 1.1 }}
          sx={{
            wordBreak: `${
              blog.title.length < 30 ? "break-words" : "break-all"
            }`,
          }}
        >
          {blog.title}
        </Typography>
        <Typography
          fontSize={22}
          color="#808191"
          mt={2}
          sx={{
            wordBreak: `${
              blog.description.length < 30 ? "break-words" : "break-all"
            }`,
          }}
        >
          {blog.description}
        </Typography>
        <Box
          display="flex"
          justifyContent="center"
          flex={1}
          width="100%"
          height="100%"
          my={4}
        >
          {blog.picture ? (
            <img
              src={blog.picture}
              alt={blog.title}
              style={{ width: "100%", height: "auto" }}
            />
          ) : (
            <img src="https://via.placeholder.com/150" alt="placeholder" />
          )}
        </Box>

        {/* <Stack direction="row">
          <Typography
            fontSize={16}
            fontWeight={600}
            color="#808191"
            display="flex"
            alignItems="center"
          >
            <IconButton
              color="info"
              aria-label="like button"
              component="label"
              onClick={() => setLikeButton(!likeButton)}
            >
              {likeButton ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
            </IconButton>
            {blog.likes}
          </Typography>
          <Typography
            fontSize={16}
            fontWeight={600}
            color="#808191"
            display="flex"
            alignItems="center"
            ml={2}
          >
            <IconButton
              color="warning"
              aria-label="favorite button"
              component="label"
              onClick={() => setFavoriteButton(!favoriteButton)}
            >
              {favoriteButton ? <Star /> : <StarBorder />}
            </IconButton>
            {blog.favorite}
          </Typography>
        </Stack> */}
      </Box>
    </Box>
  );
};

export default BlogDetail;
