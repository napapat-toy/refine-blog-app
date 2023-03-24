import { BaseKey } from "@pankod/refine-core";

export interface BlogCardProp {
  blogId?: BaseKey | undefined;
  title: string;
  shortDesc?: string | undefined;
  description?: string;
  avatar?: string;
  author: string;
  likes: number;
  favorite: number;
  picture?: string | undefined;
  createdAt: string;
}

export interface ProfileProps {
  type: string;
  name: string;
  avatar: string;
  email: string;
  blogs: Array | undefined;
}

export interface CustomButtonProps {
  type?: string;
  title: string;
  backgroundColor: string;
  color: string;
  fullWidth?: boolean;
  icon?: ReactNode;
  disabled?: boolean;
  handleClick?: () => void;
}

export interface FormProps {
  formLoading: boolean;
  register: any;
  handleSubmit: FormEventHandler<HTMLFormElement> | undefined;
  onFinishSubmit: (data: FieldValues) => Promise<void> | void;
  handleImageChange: (file) => void;
}
