import { useList } from "@pankod/refine-core";
import { Box, Typography } from "@pankod/refine-mui";
import { HeaderText, UserCard } from "components";

const Users = () => {
  const { data, isLoading, isError } = useList({
    resource: "users",
  });

  const allUsers = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error...</Typography>;

  return (
    <Box>
      <HeaderText title="All Users" />
      {allUsers.map((user) => (
        <UserCard
          key={user.name}
          name={user.name}
          avatar={user.avatar}
          id={user._id}
        />
      ))}
    </Box>
  );
};

export default Users;
