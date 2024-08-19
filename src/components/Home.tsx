"use client"
import { useEffect, useState } from 'react';
import DataTable from './DataTable';
import { PropagateLoader } from 'react-spinners';
import toast, { Toaster } from 'react-hot-toast';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import Loader from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { rainbowkitConfig } from "@/config/rainbowkitConfig";
import { waitForTransactionReceipt } from "wagmi/actions";
import Button from '@/components/ui/button';
import acutionAbi from '../assets/abis/auction.json';
import erc20Abi from '../assets/abis/erc20.json';
import Address from '../assets/address.json';

const HeroSection = () => {
    const { address } = useAccount();
    const { toast } = useToast();
    let [loading, setLoading] = useState(false);
    let [aloading, setaLoading] = useState(false);

    let [bloading, setbLoading] = useState(false);
    // const [address, setAddress] = useState('');
    const [balance, setBalance] = useState('');

    const { writeContractAsync } = useWriteContract();
    const [openBidSection, setOpenBidSection] = useState(false);

    // create auction state start
    const [minBid, setMinBid] = useState('');
    const [description, setDescription] = useState('');
    const [placeBidAmount, setPlaceBidAmount] = useState('');
    const [bidApproved, setBidApporved] = useState(false);
    const [auctionCounter, setAucitonCounter] = useState('');

    console.log(minBid, description, address, auctionCounter);

    // hooks 


    const shortnetAddress = (address: any) => `${address?.slice(0, 5)}...${address?.length - 4}`;

    // write function Start
    const createAuction = async () => {
        setLoading(true);
        try {
            const txHash = await writeContractAsync({
                abi: acutionAbi,
                // @ts-ignore
                address: Address.auction,
                functionName: "createAuction",
                args: [description, minBid],
            });
            await waitForTransactionReceipt(rainbowkitConfig, {
                confirmations: 1,
                hash: txHash,
            });
            setLoading(false);
            toast({
                title: "Successfully Reported Incident",
                description: "Refresh the page to see changes",
            });

        } catch (e) {
            toast({
                title: "Error",
                description: "Failed to Report",
                variant: "destructive",
            });
            setLoading(false);
            console.error(e);
        }
    }

    const approveBid = async () => {

        setLoading(true);
        try {
            const txHash = await writeContractAsync({
                abi: erc20Abi,
                // @ts-ignore
                address: Address.erc20,
                functionName: "approve",
                args: [Address.auction, placeBidAmount],
            });
            await waitForTransactionReceipt(rainbowkitConfig, {
                confirmations: 1,
                hash: txHash,
            });
            setLoading(false);
            toast({
                title: "Successfully Reported Incident",
                description: "Refresh the page to see changes",
            });

        } catch (e) {
            toast({
                title: "Error",
                description: "Failed to Report",
                variant: "destructive",
            });
            setLoading(false);
            console.error(e);
        }
    }

    const placeBid = async () => {

        setLoading(true);
        try {
            const txHash = await writeContractAsync({
                abi: acutionAbi,
                // @ts-ignore
                address: Address.auction,
                functionName: "placeBid",
                args: [Address.auction, placeBidAmount],
            });
            await waitForTransactionReceipt(rainbowkitConfig, {
                confirmations: 1,
                hash: txHash,
            });
            setLoading(false);
            toast({
                title: "Successfully Reported Incident",
                description: "Refresh the page to see changes",
            });

        } catch (e) {
            toast({
                title: "Error",
                description: "Failed to Report",
                variant: "destructive",
            });
            setLoading(false);
            console.error(e);
        }
    }
    // write function end 

    // Read functions Start 
    // const getMTKBalance = async () => {
    //     try {
    //         if (!window.ethereum) return alert("No Account Found");
    //         const accounts = await window.ethereum.request({
    //             method: "eth_accounts",
    //         })

    //         //   const contract = await erc20Contract();
    //         //   const transaction = await contract?.balanceOf(accounts[0]);
    //         // await transaction.wait();
    //         // console.log(transaction);
    //         //   setBalance(Number(transaction).toString())

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const { data: tokenBalance, isLoading:balanceLoading, isError:isbalanceFetchError, refetch:fetchBalance } = useReadContract({
        abi: erc20Abi,
        // @ts-ignore
        address: Address.erc20,
        functionName: "balanceOf",
        args: [address],
    });

    const { data:AuctionCounter, isLoading:auctionCounterLoading, isError:counterError, refetch:fetchCounter } = useReadContract({
        abi: acutionAbi,
        // @ts-ignore
        address: Address.auction,
        functionName: "auctionCounter",
    });

  
    // Read function End



    // handlers
    const handleMinBidChange = (e: any) => {
        setMinBid(e.target.value);
    };

    const handleDescriptionChange = (e: any) => {
        setDescription(e.target.value);
    };

    const placeBidAmountChange = (e: any) => {
        setPlaceBidAmount(e.target.value)
    }


    const checkIfWalletConnected = async () => {
        try {

            if (!window.ethereum) return alert("No Account Found");
            const accounts = await window.ethereum.request({
                method: "eth_accounts",
            })

            if (accounts.length) {
                // setAddress(accounts[0]);

                // const web3modal = new Web3Modal();
                // const connection = await web3modal.connect();
                // const provider = new ethers.providers.Web3Provider(connection);
                // const getBalance = await provider.getBalance(accounts[0]);
                // const bal = ethers.utils.formatEther(getBalance);
            } else {
                alert("No Account Found")
            }

        } catch (error) {
            console.log(error);
        }
    }

    const connectWallet = async () => {
        try {

            if (!window.ethereum) return alert("No Account Found");
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            })

            if (accounts.length) {
                // setAddress(accounts[0]);

                // const web3modal = new Web3Modal();
                // const connection = await web3modal.connect();
                // const provider = new ethers.providers.Web3Provider(connection);
                // const getBalance = await provider.getBalance(accounts[0]);
                // const bal = ethers.utils.formatEther(getBalance);
            } else {
                alert("No Account Found")
            }

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className="bg-white pb-6 sm:pb-8 lg:pb-12">
            <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
                <header className="mb-4 flex items-center justify-between py-4 md:py-8">
                    {/* <!-- logo - start --> */}
                    <a href="/" className="inline-flex items-center gap-2.5 text-2xl font-bold text-black md:text-3xl" aria-label="logo">
                        <svg width="95" height="94" viewBox="0 0 95 94" className="h-auto w-6 text-indigo-500" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M96 0V47L48 94H0V47L48 0H96Z" />
                        </svg>

                        WinBid
                    </a>
                    {/* <!-- logo - end --> */}
                    {/* <!-- buttons - start --> */}
                    <div className='flex items-center  gap-3'>
                        <button className="rounded-lg bg-gray-200 shadow-md px-8 py-2 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block">{address ? tokenBalance : "0"} MTK</button>
                        <ConnectButton

                            showBalance={false}
                            chainStatus={{ smallScreen: "none", largeScreen: "icon" }}
                        />
                        {/* <button onClick={connectWallet} className="rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base lg:inline-block">{address ? shortnetAddress(address) : "ConnectWallet"}</button> */}
                    </div>
                    {/* <!-- buttons - end --> */}
                </header>
                <section className={`min-h-96 relative overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-30 px-10 md:px-12   ${openBidSection ? "" : "min-h-96 relative flex flex-1 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gray-100 py-16 shadow-lg md:py-20 xl:py-48  "} `}>
                    {/* <!-- image - start --> */}
                    <img src="https://images.unsplash.com/photo-1618004652321-13a63e576b80?auto=format&q=75&fit=crop&w=1500" loading="lazy" alt="Photo by Fakurian Design" className="absolute inset-0 h-full w-full object-cover object-center" />
                    {/* <!-- image - end --> */}

                    {/* <!-- overlay - start --> */}
                    <div className="absolute inset-0 bg-indigo-500 mix-blend-multiply"></div>
                    {/* <!-- overlay - end --> */}

                    {/* <!-- text start --> */}
                    {
                        openBidSection ? (
                            <div className="grid gap-6 sm:grid-cols-2">
                                {/* <!-- product - start --> */}
                                <div className="group relative flex h-80 items-center justify-center overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg ">
                                    {/* <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-gray-800 via-transparent to-transparent opacity-50"></div> */}
                                    <div className='mb-5 flex flex-col items-center justify-center'>
                                        <div>
                                            <p className="mb-2  inline-block text-sm text-gray-800 sm:text-base">Minimum Bid *</p>
                                            <input
                                                value={minBid}
                                                onChange={handleMinBidChange}
                                                type='number'
                                                className="w-full  rounded border border-gray-300 bg-gray-200 px-6 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                                            />
                                        </div>

                                        <div className="mt-2">
                                            <p className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                                                Car Description *
                                            </p>
                                            <textarea
                                                name="message"
                                                value={description}
                                                onChange={handleDescriptionChange}
                                                className="h-20 w-full rounded border border-gray-300 bg-gray-200 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                                            ></textarea>
                                            {
                                                loading ? (
                                                    <div className=' w-full mt-5 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-4 pb-7 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base'>
                                                        <PropagateLoader color='#ffffff' />
                                                    </div>
                                                ) : (
                                                    <button onClick={createAuction} className=" w-full mt-5 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base">
                                                        Create Auction
                                                    </button>
                                                )
                                            }
                                        </div>
                                    </div>

                                </div>
                                {/* <!-- product - end --> */}

                                {/* <!-- product - start --> */}
                                <div className="group relative flex h-80 items-center justify-center overflow-hidden rounded-lg bg-gray-100 p-4 shadow-lg">

                                    <div className='mb-36 flex flex-col items-center justify-center'>
                                        <div>
                                            <label htmlFor="text" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Bid Amount *</label>
                                            <input
                                                name="text"
                                                value={placeBidAmount}
                                                onChange={placeBidAmountChange}
                                                className="w-full rounded border border-gray-300 bg-gray-200 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
                                            />
                                        </div>
                                        {
                                            bidApproved ? (
                                                bloading ? (
                                                    <div className=' w-full mt-5 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-4 pb-7 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base'>
                                                        <PropagateLoader color='#ffffff' />
                                                    </div>
                                                ) : (
                                                    <button onClick={placeBid} className=" w-full mt-5 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base">
                                                        Place Bid
                                                    </button>
                                                )
                                            ) : (
                                                aloading ? (
                                                    <div className=' w-full mt-5 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-4 pb-7 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base'>
                                                        <PropagateLoader color='#ffffff' />
                                                    </div>
                                                ) : (
                                                    <button onClick={approveBid} className=" w-full mt-5 flex items-center justify-center gap-2 rounded-lg bg-blue-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-blue-300 transition duration-100 hover:bg-blue-600 focus-visible:ring active:bg-blue-700 md:text-base">
                                                        Approve Bid
                                                    </button>
                                                )
                                            )
                                        }

                                    </div>
                                </div>
                                {/* <!-- product - end --> */}
                            </div>
                        ) : (
                            <>
                                <div className="relative flex flex-col items-center p-4 sm:max-w-xl">
                                    <p className="mb-4 text-center text-lg text-indigo-200 sm:text-xl md:mb-8">Very proud to introduce</p>
                                    <h1 className="mb-8 text-center text-4xl font-bold text-white sm:text-5xl md:mb-12 md:text-6xl">Empowering Auctions with ERC20 Precision</h1>

                                    <div className="flex w-full flex-col gap-2.5 sm:flex-row sm:justify-center">
                                        <a href="#" className="inline-block rounded-lg bg-indigo-500 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-indigo-300 transition duration-100 hover:bg-indigo-600 focus-visible:ring active:bg-indigo-700 md:text-base" onClick={() => setOpenBidSection(!openBidSection)}>Start now</a>

                                        <a href="#" className="inline-block rounded-lg bg-gray-200 px-8 py-3 text-center text-sm font-semibold text-gray-500 outline-none ring-indigo-300 transition duration-100 hover:bg-gray-300 focus-visible:ring active:text-gray-700 md:text-base">Take tour</a>
                                    </div>
                                </div>
                            </>

                        )
                    }
                    {/* <!-- text end --> */}

                    {
                        openBidSection && <DataTable />
                    }
                </section>
                <Toaster />

            </div>
        </div>
    );
};

export default HeroSection;
