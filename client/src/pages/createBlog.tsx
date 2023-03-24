import { FieldValues, useForm } from "@pankod/refine-react-hook-form";
import { useGetIdentity } from "@pankod/refine-core";
import { useState } from "react";

import { Form } from "components";

const CreateBlog = () => {
  const [image, setImage] = useState({ name: "", url: "" });
  const { data: user } = useGetIdentity();

  const {
    refineCore: { onFinish, formLoading },
    register,
    handleSubmit,
  } = useForm();

  const onFinishSubmit = (data: FieldValues) => {
    // POST to /blogs
    onFinish({
      ...data,
      picture: image,
      email: user.email,
    });
  };

  const handleImageChange = (file: File) => {
    const reader = (readFile: File) =>
      new Promise<string>((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.onload = () => resolve(fileReader.result as string);
        fileReader.readAsDataURL(readFile);
      });

    reader(file).then((result: string) =>
      setImage({ name: file?.name, url: result })
    );
  };

  return (
    <Form
      image={image}
      formLoading={formLoading}
      register={register}
      handleSubmit={handleSubmit}
      onFinishSubmit={onFinishSubmit}
      handleImageChange={handleImageChange}
      title="Create Blog"
    />
  );
};

export default CreateBlog;
