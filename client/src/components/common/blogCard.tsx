import { Avatar, Box, IconButton, Stack, Typography } from "@pankod/refine-mui";
import { BlogCardProp } from "interfaces/common";
import { useState } from "react";
import {
  Star,
  StarBorder,
  ThumbUpOffAlt,
  ThumbUpAlt,
} from "@mui/icons-material";
import { Link, useNavigate } from "@pankod/refine-react-router-v6";
import moment from "moment";

const BlogCard = ({
  blogId,
  title,
  shortDesc,
  avatar,
  author,
  picture,
  createdAt,
}: BlogCardProp) => {
  const [likeButton, setLikeButton] = useState(false);
  const [favoriteButton, setFavoriteButton] = useState(false);

  const navigate = useNavigate();

  return (
    <Box
      bgcolor="#fcfcfc"
      borderRadius="16px"
      py={2}
      px={3}
      mx={{ xs: 1.5, lg: 2 }}
      my={4}
      sx={{
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0 22px 25px 2px rgba(176, 176, 176, 0.5)",
          transition: "0.2s ease-in",
        },
      }}
      onClick={() => navigate(`/blogs/show/${blogId}`)}
    >
      <Stack
        direction={{ xs: "column", md: "row" }}
        justifyContent="space-between"
        flex={1}
      >
        <Stack justifyContent="space-between">
          <Stack>
            <Stack direction="row" alignItems="center">
              <Avatar
                alt="placeholder"
                src={
                  avatar
                    ? avatar
                    : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png"
                }
                sx={{ width: 25, height: 25 }}
              />
              <Typography fontSize={14} mx={1.5}>
                {author}
              </Typography>
              <Typography fontSize={12} color="#808191">
                {moment(createdAt).fromNow()}
              </Typography>
            </Stack>

            <Typography
              fontSize={24}
              fontWeight={700}
              letterSpacing={0.3}
              mt={1.5}
              sx={{
                color: "#333",
                textDecoration: "underline",
                wordBreak: `${title.length < 30 ? "break-words" : "break-all"}`,
              }}
            >
              {title.length > 50 ? `${title.slice(0, 50)}...` : title}
            </Typography>
            <Typography
              fontSize={18}
              color="#808191"
              sx={{
                wordBreak: `${
                  shortDesc && shortDesc?.length < 30
                    ? "break-words"
                    : "break-all"
                }`,
              }}
            >
              {shortDesc && shortDesc.length > 60
                ? `${shortDesc.slice(0, 60)}...`
                : shortDesc}
            </Typography>
          </Stack>

          {/* <Stack direction="row" gap={2}>
            <IconButton
              color="info"
              aria-label="like button"
              component="label"
              onClick={() => setLikeButton(!likeButton)}
            >
              {likeButton ? <ThumbUpAlt /> : <ThumbUpOffAlt />}
            </IconButton>
            <IconButton
              color="warning"
              aria-label="favorite button"
              component="label"
              onClick={() => setFavoriteButton(!favoriteButton)}
            >
              {favoriteButton ? <Star /> : <StarBorder />}
            </IconButton>
          </Stack> */}
        </Stack>

        <Box
          display="flex"
          justifyContent={{ xs: "center", lg: "flex-end" }}
          alignItems="center"
          width="100%"
          height={{ xs: "100%", lg: "150px" }}
          flex={1}
          mt={2}
        >
          {picture ? (
            <img
              src={picture}
              alt={title}
              style={{ width: "100%", maxWidth: "fit-content", height: "100%" }}
            />
          ) : (
            <img src="https://via.placeholder.com/150" alt="placeholder" />
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default BlogCard;
