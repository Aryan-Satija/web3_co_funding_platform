import { ConnectWallet } from "@thirdweb-dev/react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CampaignDetails } from "./pages/campaignDetails";
import { CreateCampaign } from "./pages/createCampaign";
import { DisplayCampaigns } from "./components/DisplayCampaigns";
export default function Home() {
  return (
    <div style={{width:'100vw', minHeight: '100vh', backgroundColor: "#1c1c1a", letterSpacing: '0.5px'}}>
      	<Navbar />
		<Routes>
			<Route exact path='/' element={<DisplayCampaigns title={'All Campaigns'} personalised={false}/>}/>
			<Route exact path='/profile' element={<DisplayCampaigns title={'Your Campaigns'} personalised={true}/>}/>
			<Route exact path='/createCampaign' element={<CreateCampaign/>}/>
			<Route exact path='/campaignDetails/:id' element={<CampaignDetails/>}/>
		</Routes>
    </div>
  );
}
