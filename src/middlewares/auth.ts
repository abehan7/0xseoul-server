import express from "express";
import { SignatureData } from "caver-js";
import { caver } from "../utils/web3-interact";
import { readJson } from "../utils/common";
type ISignatureData = object | SignatureData | string[];

export const authContext = async ({ req }: { req: express.Request }) => {
  try {
    const { signature, wallet_address, signmessage } = req.headers;

    if (!signature || !signmessage || !wallet_address)
      throw new Error("invalid params");
    const _signature = readJson(signature as string);

    const isAuthenticated = await caver.validator.validateSignedMessage(
      signmessage as string,
      _signature,
      wallet_address as string
    );
    console.log(`isAuthenticated: ${isAuthenticated}`);

    if (!isAuthenticated) throw new Error("empty wallet_address");

    return { wallet_address };
  } catch (error: any) {
    console.log(error.message);
    return { wallet_address: null };
  }
};

const auth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { signature, signMessage, wallet_address } = req.body;
    if (!signature || !signMessage || !wallet_address)
      throw new Error("invalid params");

    console.log(signature, signMessage);

    const publicKey = caver.utils.recoverPublicKey(
      signMessage as string,
      signature as ISignatureData
    );
    const isAuthenticated = await caver.klay.getAccountKey(publicKey);

    if (!isAuthenticated) throw new Error("empty wallet_address");
    req.decodedWallet = wallet_address;
    next();
  } catch (error: any) {
    console.log(error.message);
  }
};
