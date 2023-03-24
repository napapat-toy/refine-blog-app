export interface BlogProp {
  _id?: BaseKey | undefined;
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
