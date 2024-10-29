import { http, createConfig, WagmiProvider, useConnect, useAccount, useBalance, useSendTransaction } from 'wagmi'
import {  mainnet} from 'wagmi/chains'
import { injected} from 'wagmi/connectors'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'


const queryClient = new QueryClient();
export const config= createConfig({
   chains: [mainnet],
   connectors : [injected()],
   transports :{
   [mainnet.id] : http()},
})

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
      <WalletConnector/>
      <SendEth/>
      <MyAddress/>
      </QueryClientProvider>
      </WagmiProvider>
    
  )
}

function MyAddress(){          // this function returns the balance and address of the account. while using the custom function... see their documentation and see the function return type to see what it returns...
  const { address} = useAccount();
  const balance = useBalance({address});
  return (
  
    <div>
      {address}
      {balance?.data?.value}
    </div>
    
  )
}

function WalletConnector(){
  const { connectors , connect } = useConnect();

  return (
    <>
      {connectors.map((connector) => (
        <button
          key={connector.uid}
          onClick={() => {
            connect({ connector });
          }}
        >
          {connector.name}
        </button>
      ))}
    </>
  );  
}

function SendEth() {
    const {data:hash ,sendTransaction } = useSendTransaction();

   function sendEth(){
    sendTransaction({
      to : documentgetElementById("address").value,
      value : "10000000000000",// send 0.1 eth.
    })
  }

  return (
    <>
    <input id="address" type='text' placeholder='address...'/>
    <button onClick={SendEth}>send 0.1 eth</button>
    </>
  )
}

export default App
