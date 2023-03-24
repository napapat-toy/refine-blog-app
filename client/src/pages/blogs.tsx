import { Box, Stack, Typography } from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { Add } from "@mui/icons-material";

import { BlogCard, CustomButton, HeaderText } from "components";
import { useList, useTable } from "@pankod/refine-core";

const Blogs = () => {
  const navigate = useNavigate();

  const {
    tableQueryResult: { data, isLoading, isError },
  } = useTable();

  const { data: usersData } = useList({
    resource: "users",
  });

  const blogs = data?.data ?? [];
  const users = usersData?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <HeaderText title="Blogs" />
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        m={2}
      >
        <CustomButton
          title="new"
          backgroundColor="#1e36e8"
          color="#fff"
          icon={<Add />}
          fullWidth
          handleClick={() => navigate("/blogs/create")}
        />
      </Stack>

      <Box>
        {blogs.map((blog) => {
          const authorMatch = users.findIndex(({ _id }) => _id === blog.author);
          return (
            <BlogCard
              key={blog._id}
              blogId={blog._id}
              title={blog.title}
              description={blog.description}
              shortDesc={blog.shortDesc}
              picture={blog.picture}
              likes={blog.likes}
              favorite={blog.favorite}
              avatar={users[authorMatch]?.avatar}
              author={users[authorMatch]?.name}
              createdAt={blog.createdAt}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default Blogs;
