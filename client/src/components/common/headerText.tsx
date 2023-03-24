import { Typography } from "@pankod/refine-mui";

const HeaderText = ({ title }: any) => {
  return (
    <Typography
      fontSize={25}
      fontWeight={700}
      ml={{ xs: 4, md: 0 }}
      color="#11142D"
    >
      {title}
    </Typography>
  );
};

export default HeaderText;
