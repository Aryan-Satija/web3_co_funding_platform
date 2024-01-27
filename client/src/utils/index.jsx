import React, {useContext, createContext} from "react";
import { useAddress, useConnect, metamaskWallet, useContract, useContractWrite } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
const StateContext = createContext();

export const StateContextProvider = ({ children })=>{
    
    const {contract} = useContract('0xa12CfBA186481a2073C4024c5A64a551d8AC1F27')
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign')
    const address = useAddress();
    const connect = useConnect();
    const walletConfig = metamaskWallet();

    const connectToWallet = async()=>{
        const id = toast.loading("Loading ....");
        try{
            await connect(walletConfig);
            toast.update(id, {render: 'Wallet Connected Successfully', type: 'success', autoClose: 5000, isLoading: false})
        } catch(err){
            toast.update(id, {render: `${err.message}`, type: 'error', autoClose: 5000, isLoading: false});
        }
    }
    const publishCampaign = async(form)=>{
        const id = toast.loading('Loading....');
        try{
            const data = await createCampaign({
                args:[
                    address,
                    form.title,
                    form.story,
                    new Date(form.deadline).getTime(),
                    form.goal,
                    form.image,
                ],
            });
            toast.update(id, {render: 'Campaign Published Successfully....', type: 'success', autoClose: 5000, isLoading: false});
            console.log('Campaign Published Successfully');
            console.log(data);
        } catch(err){
            toast.update(id, {render: `${err.message}`, type: 'error', autoClose: 5000, isLoading: false});
            console.log('Something Went Wrong!');
            console.log(err);
        }
    }

    const getCampaigns = async()=>{
        const id = toast.loading('Loading....');
        try{
            const campaigns = await contract.call('getCampaigns');
            const parsedCampaigns = campaigns.map((campaign, idx)=>{
                return {
                    owner: campaign.owner,
                    title: campaign.title,
                    story: campaign.description,
                    goal: ethers.utils.formatEther(campaign.target.toString()),
                    deadline : campaign.deadline.toNumber(),
                    amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
                    image: campaign.image,
                    pid: idx,
                }
            })
            toast.update(id, {render: 'Campaigns Fetched ....', type: 'success', autoClose: 5000, isLoading: false});
            return parsedCampaigns;
        } catch(err){
            toast.update(id, {render: `${err.message}`, type: 'error', autoClose: 5000, isLoading: false})
            return [];
        }
    }
    return (<StateContext.Provider
        value={{
            address,
            contract,
            publishCampaign,
            getCampaigns,
            connectToWallet
        }}
    >
        {
            children
        }
    </StateContext.Provider>)
}

export const useStateContext = (()=>{
    return useContext(StateContext);
})