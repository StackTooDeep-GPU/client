import Web3Modal from "web3modal"
import WalletConnectProvider from "@walletconnect/web3-provider"
import {setAccount, setProvider} from "@/redux/account/accountSlice"

const ethers = require("ethers")
async function getWeb3Modal() {
  const web3Modal = new Web3Modal({
    cacheProvider: false,
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: "366321e5883f42ecaea766cc94c1b431",
        },
      },
    },
  })
  return web3Modal
}

export default async function connect(dispatch) {
  try {
    const web3Modal = await getWeb3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const accounts = await provider.listAccounts()

    dispatch(setAccount(accounts[0]))
    dispatch(setProvider(provider))
    console.log(accounts[0])
    localStorage.setItem("isWalletConnected", "true")
  } catch (err) {
    console.log("error:", err)
  }
}
