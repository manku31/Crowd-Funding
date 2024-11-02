// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract CrowdFunding {
    struct Campaign {
        address owner;
        string title;
        string discription;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image; // url
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;

    uint256 public numberOfCampaigns = 0;

    // Create Campaign
    //  - this function is public
    //  - returning id of the new campaign
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _discription,
        uint256 _target,
        uint256 _deadline,
        string memory _image
    ) public returns (uint256) {
        Campaign storage campaign = campaigns[numberOfCampaigns];

        require(
            campaign.deadline < block.timestamp,
            "The deadline should be a date in the future"
        );

        campaign.owner = _owner;
        campaign.title = _title;
        campaign.discription = _discription;
        campaign.target = _target;
        campaign.deadline = _deadline;
        campaign.image = _image;
        campaign.amountCollected = 0;

        numberOfCampaigns++;

        return numberOfCampaigns - 1;
    }

    // Donate to Campaign
    // - this function is public and that is a payable(Allows them to receive Ether together with a call)
    function donateToCampaign(uint256 _id) public payable {
        uint256 amount = msg.value;

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent, ) = payable(campaign.owner).call{value: amount}("");

        if (sent) {
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    // Get all Donators
    // - this function is public and that is use to view
    // - returning array of donater and donation
    function getDonators(
        uint256 _id
    ) public view returns (address[] memory, uint256[] memory) {
        return (campaigns[_id].donators, campaigns[_id].donations);
    }

    // Get all Campaigns
    // - this function is public and that is use to view
    // - returning array of Campaign
    function getCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns); // [{}, {}, {}, ...]

        for (uint i = 0; i < numberOfCampaigns; i++) {
            Campaign storage item = campaigns[i];

            allCampaigns[i] = item;
        }
        return allCampaigns;
    }
}
