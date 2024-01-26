import React, {useContext, createContext} from "react";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
const StateContext = createContext();

export const StateContextProvider = ({ children })=>{
    
    const {contract} = useContract('0xa12CfBA186481a2073C4024c5A64a551d8AC1F27')
    const {mutateAsync: createCampaign} = useContractWrite(contract, 'createCampaign')
    const address = useAddress();
    
    const publishCampaign = async(form)=>{
        try{
            const data = await createCampaign({
                args:[
                    address,
                    form.title,
                    form.story,
                    form.goal,
                    new Date(form.deadline).getTime(),
                    form.image,
                ],
            });
            console.log('Campaign Published Successfully');
            console.log(data);
        } catch(err){
            console.log('Something Went Wrong!');
            console.log(err);
        }
    }
    return (<StateContext.Provider
        value={{
            address,
            contract,
            publishCampaign,
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