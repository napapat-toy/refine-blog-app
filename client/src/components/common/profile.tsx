import { Avatar, Box, Stack, Typography } from "@pankod/refine-mui";
import { BlogProp } from "interfaces/blog";
import { ProfileProps } from "interfaces/common";
import BlogCard from "./blogCard";
import HeaderText from "./headerText";

const Profile = ({ type, name, avatar, email, blogs }: ProfileProps) => {
  return (
    <Box>
      <HeaderText title={`${type} Profile`} />
      <Box
        bgcolor="#fcfcfc"
        borderRadius="16px"
        py={2}
        px={3}
        mx={{ xs: 1.5, lg: 4 }}
        my={4}
      >
        <Stack direction="row" alignItems="center" gap={2}>
          <Avatar
            src={avatar}
            sx={{
              width: { xs: "64px", lg: "128px" },
              height: { xs: "64px", lg: "128px" },
            }}
          />
          <Stack direction="column">
            <Typography
              fontSize={18}
              fontWeight={700}
              sx={{ wordBreak: "break-all" }}
            >
              {name}
            </Typography>
            <Typography
              fontSize={16}
              fontWeight={500}
              sx={{ wordBreak: "break-all" }}
            >
              {email}
            </Typography>
          </Stack>
        </Stack>
      </Box>

      {blogs.length > 0 && (
        <Box>
          {blogs?.map((blog: BlogProp) => (
            <BlogCard
              key={blog._id}
              blogId={blog._id}
              title={blog.title}
              shortDesc={blog.shortDesc}
              avatar={avatar}
              author={name}
              picture={blog.picture}
              likes={blog.likes}
              favorite={blog.favorite}
              createdAt={blog.createdAt}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Profile;
