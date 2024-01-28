// owner
// pid


import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { useStateContext } from '../utils';
export const CampaignDetails = () => {
    const {id} = useParams();
    const [campaignDetails, setCampaignDetails] = useState(null); 
    const {contract, getCampaigns} = useStateContext();
    useEffect(()=>{
        (async()=>{
            if(contract){
                const campaigns = await getCampaigns();
                const campaign = campaigns.find((cmpgn)=>{
                    if(cmpgn.pid + 1 == id) return cmpgn;
                })  
                setCampaignDetails(campaign);
            }
        })()
    }, [contract])
    return (
        <div >
            {
                campaignDetails ? (<div style={{padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px'}}>
                    <div>
                        <img src={campaignDetails.image} style={{width: '500px', height:'350px', borderRadius: '10px'}}/>
                    </div>
                    <div style={{color: '#aaaaaa', fontFamily: 'fantasy', fontSize: '25px'}}>
                        {
                            campaignDetails.title
                        }
                    </div>
                    <div style={{color: '#dddddd', fontFamily: 'fantasy', fontSize: '18px'}}>
                        {
                            campaignDetails.story
                        }
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '50px'}}>
                        <div style={{color: '#00ad48', fontFamily: 'fantasy', fontSize: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '200px', height:'100px', gap: '10px', backgroundColor: 'rgba(120, 120, 120, 0.2)', borderRadius: '5px', cursor: 'pointer'}}>
                            <div>Target Amount</div>
                            <div>{campaignDetails.goal} eth</div>
                        </div>
                        <div style={{color: '#0048ad', fontFamily: 'fantasy', fontSize: '22px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '200px', height:'100px', gap: '10px', backgroundColor: 'rgba(120, 120, 120, 0.2)', borderRadius: '5px', cursor: 'pointer'}}>
                            <div>Amount Collected</div>
                            <div>{campaignDetails.amountCollected} eth</div>
                        </div>
                    </div>
                    <div style={{color: '#aaaaaa', fontFamily: 'fantasy', fontSize: '18px'}}>
                        By 
                        {" "}
                        <span style={{color: '#e67e67', fontFamily: 'fantasy', fontSize: '18px'}}>
                            {
                                campaignDetails.owner
                            }
                        </span>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                        <input type='number' step='0.1' className='formField'/>
                        <button className='btn'>Fund Now</button>
                    </div>
                </div>) : (<div style={{padding: '2rem', fontFamily: 'fantasy', color: '#aaaaaa', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    Loading....
                </div>) 
            }
        </div>
    )
}
