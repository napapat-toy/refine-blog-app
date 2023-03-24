import { useShow } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";
import { Profile } from "components";

const UserProfile = () => {
  const { queryResult } = useShow();

  const { data, isLoading, isError } = queryResult;

  const user = data?.data ?? {};

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;
  
  return (
    <Box>
      <Profile
        type="User"
        name={user?.name}
        email={user?.email}
        avatar={user?.avatar}
        blogs={user?.allBlogs}
      />
    </Box>
  );
};

export default UserProfile;
