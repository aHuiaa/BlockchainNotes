F:
cd F:\大三\第二学期\综合项目实训\2019年2月27日\blockchain\private_chain\node1
geth --identity "node1" --rpc --rpcport 1111 --rpccorsdomain "*" --datadir "./" --port 8888  --ipcpath "geth\geth1.ipc" --networkid 10 --rpcapi eth,web3,admin,personal,net