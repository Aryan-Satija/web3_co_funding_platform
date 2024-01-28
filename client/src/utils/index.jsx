import React, {useContext, createContext} from "react";
import { useAddress, useConnect, metamaskWallet, useContract, useContractWrite } from "@thirdweb-dev/react";
import { toast } from "react-toastify";
import { ethers } from "ethers";
const StateContext = createContext();

export const StateContextProvider = ({ children })=>{
    
    const {contract} = useContract('0x0c003b99a1fba8Cb3A44F9f8132eA6E673F0e7F3')
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
            console.log(err.message);
            toast.update(id, {render: `${err.message}`, type: 'error', autoClose: 5000, isLoading: false})
            return [];
        }
    }

    const getUserCampaigns = async()=>{
        const allCampaigns = await getCampaigns();
        const userCampaigns = allCampaigns.filter((campaign)=>{
            if(campaign.owner === address) return address; 
        })   
        return userCampaigns;
    }
    return (<StateContext.Provider
        value={{
            address,
            contract,
            publishCampaign,
            getCampaigns,
            getUserCampaigns,
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