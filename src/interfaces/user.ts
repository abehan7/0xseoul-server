export interface IUser {
  wallet_address: string;
  holding_nfts: number[];
  createdAt: Date;
  isAdmin: boolean;
  _id?: string;
}
