//资源映射
var server = require("./server");
var router = require("./router");
var requestHandles = require("./requestHandler");

var handle = {};
handle["/createAccount"]=requestHandles.createAccount;
handle["/deployContract"]=requestHandles.deployContract;
handle["/createNote"]=requestHandles.createNote;
handle["/getNoteList"]=requestHandles.getNoteList;
handle["/getNote"]=requestHandles.getNote;
handle["/code2Session"]=requestHandles.code2Session;
handle["/getBalance"]=requestHandles.getBalance;
handle["/getNowFormatDate"]=requestHandles.getNowFormatDate;
handle["/add"]=requestHandles.add;
handle["/query"]=requestHandles.query;
handle["/gettopic"]=requestHandles.gettopic;
handle["/add"]=requestHandles.add;
server.start(router.route,handle);