import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Stack,
  TextField,
  Typography,
} from "@pankod/refine-mui";
import { FieldValues } from "@pankod/refine-react-hook-form";
import CustomButton from "components/common/customButton";
import HeaderText from "./headerText";

const Form = ({
  formLoading,
  register,
  handleSubmit,
  onFinishSubmit,
  handleImageChange,
  image,
  title,
  editData,
}: FieldValues) => {
  return (
    <Box>
      <HeaderText title={title} />
      <Box display="flex" justifyContent="center" width="100%">
        <Box
          m={4}
          minWidth={300}
          width="100%"
          borderRadius="15px"
          padding="20px"
          bgcolor="#fcfcfc"
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
            onSubmit={handleSubmit(onFinishSubmit)}
          >
            <FormControl>
              <FormHelperText
                sx={{ fontSize: 22, fontWeight: 500, margin: "6px 4px" }}
              >
                Title
              </FormHelperText>
              <TextField
                required
                id="outlined-basic"
                color="info"
                {...register("title", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{ fontSize: 22, fontWeight: 500, margin: "6px 4px" }}
              >
                Description
              </FormHelperText>
              <TextField
                required
                id="outlined-basic"
                color="info"
                multiline
                rows={3}
                {...register("description", { required: true })}
              />
            </FormControl>
            <FormControl>
              <FormHelperText
                sx={{ fontSize: 22, fontWeight: 500, margin: "6px 4px" }}
              >
                Short Description
              </FormHelperText>
              <TextField
                id="outlined-basic"
                color="info"
                multiline
                rows={3}
                {...register("shortDesc")}
              />
            </FormControl>

            <Stack direction={{ xs: "column", sm: "row" }} alignItems="center">
              <Stack direction="row" alignItems="center" gap={2}>
                <Typography fontSize={20} ml={1.5} my={2}>
                  Blog Image
                </Typography>
                <Button
                  component="label"
                  sx={{
                    width: "fit-content",
                    height: "fit-content",
                    color: "#2ed480",
                    textTransform: "capitalize",
                    fontSize: 16,
                    "&:hover": {
                      bgcolor: "#29c2751c",
                    },
                  }}
                >
                  Upload *
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      // @ts-ignore
                      handleImageChange(e.target.files[0]);
                    }}
                  />
                </Button>
              </Stack>

              {image.name && (
                <Typography fontSize={20} ml={1.5}>
                  {image?.name}
                </Typography>
              )}
            </Stack>

            <CustomButton
              type="submit"
              title={formLoading ? "Submitting..." : "Submit"}
              backgroundColor="#475be8"
              color="#fcfcfc"
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default Form;
