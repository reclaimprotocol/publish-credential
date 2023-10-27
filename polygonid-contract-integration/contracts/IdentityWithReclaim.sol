// SPDX-License-Identifier: GPL-3.0
pragma solidity 0.8.16;

import {OwnableUpgradeable} from "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import {IState} from "./interfaces/IState.sol";
import {IReclaim} from "./interfaces/IReclaim.sol";
import {ClaimBuilder} from "./lib/ClaimBuilder.sol";
import {IdentityLib} from "./lib/IdentityLib.sol";
import {IdentityBase} from "./lib/IdentityBase.sol";


// /**
//  * @dev Contract managing onchain identity with Reclaim
//  */
contract IdentityWithReclaim is IdentityBase, OwnableUpgradeable {
    using IdentityLib for IdentityLib.Data;


    // This empty reserved space is put in place to allow future versions
    // of the State contract to inherit from other contracts without a risk of
    // breaking the storage layout. This is necessary because the parent contracts in the
    // future may introduce some storage variables, which are placed before the State
    // contract's storage variables.
    // (see https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable#storage-gaps)
    // slither-disable-next-line shadowing-state
    // slither-disable-next-line unused-state
    uint256[500] private __gap;

    function initialize(address _stateContractAddr, address _reclaimContractAddr) public override initializer {
        super.initialize(_stateContractAddr, _reclaimContractAddr);
        __Ownable_init();
    }

    function addClaimHashAndTransit(uint256 hashIndex, uint256 hashValue, IReclaim.Proof calldata reclaimProof) public {
        require(Reclaim.verifyProof(reclaimProof), "Invalid reclaim proof");
        identity.addClaimHash(hashIndex, hashValue);
        identity.transitState();
    }

    /**
     * @dev Calculate IdentityState
     * @return IdentityState
     */
    function calcIdentityState() public view virtual returns (uint256) {
        return identity.calcIdentityState();
    }

    function newClaimData() public pure virtual returns (ClaimBuilder.ClaimData memory) {
        ClaimBuilder.ClaimData memory claimData;
        return claimData;
    }

    /**
     * @dev Builds claim
     * @param claimData - claim data
     * @return binary claim
     */
    function buildClaim(
        ClaimBuilder.ClaimData calldata claimData
    ) public pure virtual returns (uint256[8] memory) {
        return ClaimBuilder.build(claimData);
    }
}
