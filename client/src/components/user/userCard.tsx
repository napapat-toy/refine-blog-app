import { Avatar, Typography } from "@pankod/refine-mui";
import { Stack } from "@pankod/refine-mui";
import { Box } from "@pankod/refine-mui";
import { Link } from "@pankod/refine-react-router-v6";
import { UserCardProp } from "interfaces/user";

const UserCard = ({ id, name, avatar }: UserCardProp) => {
  return (
    <Box>
      <Box
        bgcolor="#fcfcfc"
        borderRadius="16px"
        py={2}
        px={3}
        mx={{ xs: 1.5, lg: 2 }}
        my={4}
      >
        <Stack direction="row" alignItems="center" gap={6}>
          <Avatar src={avatar} sx={{ width: "128px", height: "128px" }} />
          <Stack direction="column">
            <Link
              to={`/users/show/${id}`}
              style={{ color: "#333", textDecoration: "none" }}
            >
              <Typography
                fontSize={18}
                fontWeight={700}
                sx={{
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                {name}
              </Typography>
            </Link>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default UserCard;
