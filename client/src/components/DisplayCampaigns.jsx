import React, {useState, useEffect} from 'react'
import { useStateContext } from '../utils';
import { useNavigate } from 'react-router-dom';
import './DisplayCampaigns.css'
export const DisplayCampaigns = ({title, personalised}) => {
    const [campaigns, setCampaigns] = useState([]);
    const {contract, getCampaigns, getUserCampaigns} = useStateContext();
    const navigate = useNavigate();
    useEffect(()=>{
        if(contract){
            (async()=>{
                if(personalised){
                    const data = await getUserCampaigns();
                    setCampaigns(data);
                }
                else{
                    const data = await getCampaigns();
                    setCampaigns(data);
                }
            })();
        }
    }, [contract, title, personalised])
    console.log(campaigns);
    return (
    <div>
        <div style={{fontSize: '25px', color: '#aaaaaa', fontFamily: 'fantasy', paddingTop: '15px', paddingLeft: '15px'}}>{title}</div>
        <div style={{display: 'flex', flexWrap: 'wrap', gap:'10px', padding: '15px'}}>
            {
                campaigns && campaigns.map((campaign)=>{
                    return (<div key={campaign.pid} className={'campaignCard'}>
                        <div style={{width:'100%'}}>
                            <img src={campaign.image} width={'100%'} height={'180px'} style={{borderRadius: '5px'}}/>
                            <div style={{display: 'flex', flexDirection: 'column', gap: '10px', padding: '5px'}}>
                                <div style={{fontFamily: 'fantasy', letterSpacing: '0.5px', color: '#00ff78'}}>#{campaign.pid+1}</div>
                                <div style={{fontFamily: 'fantasy', letterSpacing: '0.5px', color: '#cccccc'}}>{campaign.title}</div>
                                <div style={{fontFamily: 'fantasy', letterSpacing: '0.5px', color: '#aaaaaa'}}>{(campaign.story.length > 100) ? (`${campaign.story.substr(0, 100)}....`) : (campaign.story) }</div>
                                <div style={{fontFamily: 'fantasy', letterSpacing: '0.5px', color: '#0098ff'}}>Goal: {campaign.goal} eth</div>
                                <div style={{fontFamily: 'fantasy', letterSpacing: '0.5px', color: '#0076ff'}}>Funds Collected: {campaign.amountCollected} eth</div>
                                <div style={{fontFamily: 'fantasy', letterSpacing: '0.5px', color: '#cccccc'}}>Owner: {campaign.owner.substr(0, 25)}....</div>
                                <button className='btn' onClick={()=>{
                                    navigate(`/campaignDetails/${campaign.pid+1}`)
                                }}>RAISE FUND</button>
                            </div>
                        </div>
                    </div>)
                })
            }
        </div>
    </div>
  )
}
