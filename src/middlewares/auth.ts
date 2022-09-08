import express from "express";
import { SignatureData } from "caver-js";
import { caver } from "../utils/web3-interact";
type ISignatureData = object | SignatureData | string[];

export const authContext = async ({ req }: { req: express.Request }) => {
  try {
    // if (!req.headers.authorization)

    //   throw new AuthenticationError("empty token");
    // if (!req.headers.authorization) return { user: undefined };

    // const token = req.headers.authorization.substr(7);
    const { signature, wallet_address, signmessage } = req.headers;
    const _signature = signature as string;
    // console.log(req.headers);
    // console.log(signature, signmessage, wallet_address);
    if (!signature || !signmessage || !wallet_address)
      return { wallet_address: undefined };
    const toArr = _signature.split(",");
    console.log(`toArr:`, toArr);

    // const publicKey = caver.utils.recoverPublicKey(
    //   signmessage as string,
    //   toArr as ISignatureData
    // );
    // console.log(`publicKey: ${publicKey}`);

    const isAuthenticated = await caver.validator.validateSignedMessage(
      signmessage as string,
      toArr,
      wallet_address as string
    );
    console.log(`isAuthenticated: ${isAuthenticated}`);

    if (!isAuthenticated) throw new Error("empty wallet_address");

    // const user = "this user is authenticated";
    // const user = users.find((user) => user.token === token);
    // if (!user) throw new AuthenticationError('invalid token');
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
