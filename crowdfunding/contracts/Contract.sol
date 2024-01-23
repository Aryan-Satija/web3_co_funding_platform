// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
contract CrowdFunding{
    struct campaign {
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 amountCollected;
        uint256 deadline;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => campaign) public campaigns;

    uint256 campaignCnt = 0;

    function createCampaign(address _owner, string memory _title, 
    string memory _description, uint256 _deadline, uint256 _target,
    string memory _image) public returns(uint256){
        
        campaign memory new_campaign = campaign(_owner, _title, _description, _target, 0, _deadline, _image, new address[](0), new uint256[](0));
        
        require(new_campaign.deadline > block.timestamp, "The deadline should be in the future");
        
        campaigns[campaignCnt] = new_campaign;
        
        campaignCnt++;
        
        return campaignCnt - 1; 
    }
    function donate(uint256 _id) public payable {
        uint256 amount = msg.value;
        campaign storage target_campaign = campaigns[_id];
        
        target_campaign.donators.push(msg.sender);
        target_campaign.donations.push(amount);

        (bool sent, ) = payable(target_campaign.owner).call{value: amount}("");
        
        if(sent)
            target_campaign.amountCollected += amount;
    }
    function getDonators(uint256 _id) view public returns(address[] memory, uint256[] memory){
        return (campaigns[_id].donators, campaigns[_id].donations);
    }
    function getCampaigns() public view returns(campaign[] memory) {
        campaign[] memory all_campaigns = new campaign[](campaignCnt);
        
        for(uint256 i = 0; i < campaignCnt; i++) all_campaigns[i] = campaigns[i];
        
        return all_campaigns;
    }
}