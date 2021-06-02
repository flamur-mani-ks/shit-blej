export interface IProfile {
  displayName: string,
  username: string,
  phoneNumber: string,
  city: string;
  image: string,
  photos: IPhoto[]
}

export interface IPhoto {
  id: string,
  url: string,
  isMain: boolean
}