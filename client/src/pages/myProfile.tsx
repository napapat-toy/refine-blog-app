import { useGetIdentity } from "@pankod/refine-core";
import { useOne } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";
import { Profile } from "components";

const MyProfile = () => {
  const { data: user } = useGetIdentity();
  const { data, isLoading, isError } = useOne({
    resource: "users",
    id: user?.userid,
  });

  const myProfile = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <Profile
        type="My"
        name={myProfile?.name}
        email={myProfile?.email}
        avatar={myProfile?.avatar}
        blogs={myProfile?.allBlogs}
      />
    </Box>
  );
};

export default MyProfile;
