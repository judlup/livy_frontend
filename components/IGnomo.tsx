export interface IGnomo {
  id: number;
  name: string;
  thumbnail: string;
  age: number;
  weight: number;
  height: number;
  hair_color: string;
  professions: string[];
  friends: string[];
}

export interface IGnomoDetailsProps {
  show: boolean;
  handleClose: () => void;
  gnomo: IGnomo;
}
