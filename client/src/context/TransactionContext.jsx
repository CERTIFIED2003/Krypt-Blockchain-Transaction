import { createContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { contractABI, contractAddress } from "../utils/constants";
import toast from "react-hot-toast";

export const TransactionContext = createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionsContract = new ethers.Contract(contractAddress, contractABI, signer);

    return transactionsContract;
};

export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({
        addressTo: "",
        amount: "",
        keyword: "",
        message: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [sendSuccess, setSendSuccess] = useState(false);
    const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));

    const handleFormChange = (e, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: e.target.value
        }));
    };

    const checkIfWalletIsConnected = async () => {
        try {
            if (!ethereum) return toast.error("Please install MetaMask Extension!");
            const accounts = await ethereum.request({ method: "eth_accounts" });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);

                // Get All Transactions
            }
            else {
                toast.error("No Accounts found!");
            }
        }
        catch (error) {
            console.log(error);
            throw new Error("No Ethereum object.");
        }
    };

    const connectWallet = async () => {
        try {
            if (!ethereum) return toast.error("Please install MetaMask Extension!");
            const accounts = await ethereum.request({ method: "eth_requestAccounts" });
            setCurrentAccount(accounts[0]);
        }
        catch (error) {
            console.log(error);
            throw new Error("No Ethereum object.");
        }
    };

    const sendTransaction = async () => {
        try {
            if (!ethereum) return toast.error("Please install MetaMask Extension!");

            const { addressTo, amount, keyword, message } = formData;
            const transactionContract = getEthereumContract();
            const convertedAmount = ethers.utils.parseEther(amount);

            await ethereum.request({
                method: "eth_sendTransaction",
                params: [{
                    from: currentAccount,
                    to: addressTo,
                    gas: '0x5208', // Equivalent to 21000 GWEI -> 0.000021 Ether
                    value: convertedAmount._hex,
                }]
            });

            const transactionHash = await transactionContract.addToBlockchain(addressTo, convertedAmount, keyword, message);

            setIsLoading(true);
            console.log(`Loading - ${transactionHash.hash}`);
            await transactionHash.wait();
            setIsLoading(false);
            console.log(`Success - ${transactionHash.hash}`);

            const transactionCount = await transactionContract.getTransactionsCount();
            setTransactionCount(transactionCount.toNumber());
            setSendSuccess(true);
        }
        catch (error) {
            console.log(error);
            throw new Error("No Ethereum object.");
        }
    };

    useEffect(() => {
        checkIfWalletIsConnected()
    }, []);

    return (
        <TransactionContext.Provider
            value={{
                connectWallet,
                currentAccount,
                formData,
                handleFormChange,
                sendTransaction,
                isLoading,
                sendSuccess,
                setSendSuccess
            }}
        >
            {children}
        </TransactionContext.Provider>
    );
}