export interface IProfile {
  displayName: string,
  username: string,
  phoneNumber: string,
  city: string;
  image: string,
  following: boolean,
  followersCount: number,
  followingCount: number,
  photos: IPhoto[]
}

export interface IPhoto {
  id: string,
  url: string,
  isMain: boolean
}

export interface IUserProduct {
  id: string;
  title: string;
  category: string;
  date: Date;
}

export interface IUserJob {
  id: string;
  title: string;
  category: string;
  expiresAt: Date;
}

export interface IUserBlog {
  id: string;
  title: string;
  category: string;
  date: Date;
}