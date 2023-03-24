import { BaseKey } from "@pankod/refine-core";

export interface UserCardProp {
  id?: BaseKey | undefined;
  name: string;
  avatar: string;
}

export interface InfoBarProps {
  icon: ReactNode;
  name: string;
}
