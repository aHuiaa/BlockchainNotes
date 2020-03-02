pragma solidity ^0.5.1;
pragma experimental ABIEncoderV2;
contract BlockNoteContract{
    // 合约拥有者
    address owner;
    //Note[] notes;
    // 笔记 
    struct Note{
        //string date;//年月 2019-02
        string id;
        string title;//标题 
        string intro;//简介 
        string content;//内容 
    }
    mapping(string => mapping(string => Note) )  notes;
    mapping(string => string[]) ids;
    
    //判断调用者是否合约创建者  
    modifier isOwner(){
        require(msg.sender==owner);
        _;
    }
    
    constructor() public{
        owner = msg.sender;
    }
    
    function addNote (string memory id,string memory date,string memory title,string memory intro,string memory content) public isOwner{
        Note memory n = Note(id,title,intro,content);
        notes[date][id] = n;
        ids[date].push(id);
    }
    
    function getNoteList(string memory date,uint count) public isOwner view returns (Note[] memory) {
        if(ids[date].length<count || count==0){
            count = ids[date].length;
        }
        Note[] memory notes_count = new  Note[](count);
        for(uint i=0;i<count;i++){
            notes_count[i] = notes[date][ids[date][i]];
        }
        return notes_count;
    }
    
    function getNote(string memory date,string memory id) public isOwner view returns (Note memory) {
       
        return notes[date][id];
        
    }
}