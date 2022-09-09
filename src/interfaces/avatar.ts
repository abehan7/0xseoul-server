import { IClothes } from "./clothes";

export interface IAvatar {
  owner: string;
  token_id: number;
  hair: IClothes | null;
  clothing: IClothes | null;
  eyes: IClothes | null;
  mouth: IClothes | null;
  off_hand: IClothes | null;
  skin: IClothes | null;
  background: IClothes | null;
  createdAt: string;
  base_image_url: string;
  overlapped_image_url: string;
}
