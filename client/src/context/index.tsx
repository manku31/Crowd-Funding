import { Children, createContext, ReactNode, useContext } from "react";
import {
  metamaskWallet,
  SmartContract,
  useAddress,
  useContract,
  useContractWrite,
} from "@thirdweb-dev/react";
import { BaseContract, BigNumber } from "ethers";

interface CampaignForm {
  title: string;
  description: string;
  target: BigNumber;
  deadline: string;
  image: string;
}

interface StateContextType {
  address: string | undefined;
  contract: SmartContract<BaseContract> | undefined;
  // connect: ReturnType<typeof metamaskWallet>;
  createCampaign: (form: CampaignForm) => Promise<unknown>;
}

interface StateContextProviderProps {
  children: ReactNode;
}

const StateContext = createContext<StateContextType | undefined>(undefined);

export const StateContextProvider = ({
  children,
}: StateContextProviderProps) => {
  const { contract } = useContract(
    "0x4Bcb24E83bFD70Cd7f9a247D377B9B15b49E91c6"
  );
  const { mutateAsync: createCampaign } = useContractWrite(
    contract,
    "createCampaign"
  );
  const address = useAddress();
  const connect = metamaskWallet();

  const publishCampaign = async (form: CampaignForm) => {
    try {
      if (!address) throw new Error("No wallet connected");

      const deadline = new Date(form.deadline).getTime();

      const data = await createCampaign({
        args: [
          address,
          form.title,
          form.description,
          form.target,
          deadline,
          form.image,
        ],
      });
      console.log("Contract call success", data);
      // return data;
    } catch (error) {
      console.error("Contract call error", error);
      // throw error;
    }
  };

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        // connect,
        createCampaign: publishCampaign,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = (): StateContextType => {
  const context = useContext(StateContext);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }
  return context;
};
