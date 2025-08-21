// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

/**
 * @title DataRegistry
 * @notice A simple on-chain registry where users can submit and store arbitrary string data.
 * Each submission is assigned an auto-incrementing identifier.
 */
contract DataRegistry {
    struct Record {
        address submitter;
        uint256 timestamp;
        string data;
    }

    // Incremental identifier for records
    uint256 public nextRecordId = 0;

    // id => Record
    mapping(uint256 => Record) private idToRecord;

    // submitter => list of their record ids
    mapping(address => uint256[]) private submitterToRecordIds;

    event DataSubmitted(uint256 indexed id, address indexed submitter, string data);

    /**
     * @notice Submit a new string record to the registry.
     * @param _data Arbitrary string payload to store on-chain.
     * @return recordId The id assigned to the stored record.
     */
    function submitData(string calldata _data) external returns (uint256 recordId) {
        recordId = nextRecordId;
        idToRecord[recordId] = Record({submitter: msg.sender, timestamp: block.timestamp, data: _data});
        submitterToRecordIds[msg.sender].push(recordId);
        nextRecordId += 1;

        emit DataSubmitted(recordId, msg.sender, _data);
    }

    /**
     * @notice Get a record by id.
     */
    function getRecord(uint256 _id) external view returns (address submitter, uint256 timestamp, string memory data) {
        Record storage r = idToRecord[_id];
        return (r.submitter, r.timestamp, r.data);
    }

    /**
     * @notice Get all record ids submitted by an address.
     */
    function getRecordIdsBySubmitter(address _submitter) external view returns (uint256[] memory) {
        return submitterToRecordIds[_submitter];
    }
}

