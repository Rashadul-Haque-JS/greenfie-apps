export interface IRecipe {
  _id?: string;
  title: string;
  description: string;
  image: string;
  video: string;
  ingredients: string[];
  directions: string[];

}

export interface IProducts{
  _id?: string;
  name: string;
  description: string;
  price:number;
  image: string;
  unit?: string;
  inStock:number;
  isAvailable: boolean;
  ownerId: string;
}
export interface IApps{
  _id?: string;
  name: string;
  image: string;
  page:string;
 
}

export interface GenericProps{
  [key:string]:any
}

export type TButton = {
  children: React.ReactNode;
  style?:string;
  mode: 'primary' | 'others';
  onClick?:(event: React.MouseEvent<HTMLElement>) =>void
};
export type TLink = {
  children: React.ReactNode;
  style?:string;
  mode: 'primary' | 'others';
  url?:string;
};

export interface IUser {
  name: string;
  email: string;
  password: string;
  area: string;
  city: string;
  country: string;
  phone: string;
  gender: string;
  avatar: string | null;
  confirm_token: string | null;
}

export interface ILink {
  setIsOpen: (option:boolean) => void;
}

export interface IUserUpdate {
  $set?: Partial<IUser>;
  $unset?: { [key in keyof IUser]?: boolean } & { confirmationToken?: boolean };
}

export interface DecodedToken {
  _id: string;
  iat: number;
  exp: number;
} 