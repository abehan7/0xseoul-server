import Caver from "caver-js";

export const caver = new Caver("https://kaikas.cypress.klaytn.net:8651/");

interface IDecodeSignerProps {
  account: string;
  signature: any;
  signMessage: string;
}

const decodeSigner = async (props: IDecodeSignerProps) => {
  //   if (!caver || !account || !signature) return;
  const { account, signature, signMessage } = props;
  try {
    //   "signer message",
    const signer = await caver.validator.validateSignedMessage(
      signMessage,
      signature,
      account
    );
    console.log(signer);
    return signer;
  } catch (error) {
    console.error(error);
  }
};
