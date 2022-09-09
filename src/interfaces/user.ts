export interface IUser {
  wallet_address: string;
  holding_avatars: string[];
  holding_clothes: string[];
  createdAt: Date;
  isAdmin: boolean;
  _id?: string;
}
