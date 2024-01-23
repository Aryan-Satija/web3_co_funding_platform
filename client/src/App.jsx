import { ConnectWallet } from "@thirdweb-dev/react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CreateCampaign } from "./pages/createCampaign";
export default function Home() {
  return (
    <div style={{width:'100vw', minHeight: '100vh', backgroundColor: "#1c1c1a"}}>
      	<Navbar />
		<Routes>
			{/* <Route exact path="/" element={<Home/>}/> */}
			{/* <Route exact path="/profile" element={<Profile/>}/> */}
			<Route exact path="/createCampaign" element={<CreateCampaign/>}/>
		</Routes>
    </div>
  );
}
