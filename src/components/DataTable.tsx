"use client"
// @ts-nocheck
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { auctionContract } from '@/services/Services';
import { Toaster } from 'react-hot-toast';
import { useReadContract } from 'wagmi';
import acutionAbi from '../assets/abis/auction.json';
import Address from '../assets/address.json';







const DataTable = () => {
  // console.log("this is data", data[0].carDetails);



  const { data: Data } = useReadContract({
    abi: acutionAbi,
    // @ts-ignore
    address: Address.auction,
    functionName: "fetchAllAuctions",
  });

  console.log("data", Data);






  return (
    <>
      <Table className='bg-white text-black mt-6 rounded-lg shadow-lg'>
        <TableHeader>
          <TableRow>
            <TableHead className="">Car Details</TableHead>
            <TableHead>Car ID</TableHead>
            <TableHead>End Timestamp</TableHead>
            <TableHead>Finalized</TableHead>
            <TableHead>Highest Bid</TableHead>
            <TableHead>Highest Bider</TableHead>
            <TableHead>Minimum Bid</TableHead>
            <TableHead className="text-right">Seller</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {
            // @ts-ignore
            Data.map((data: any) => (
              <TableRow key={data[1]}>
                <TableCell >{data.carDetails}</TableCell>
                <TableCell >{Number(data.carId)}</TableCell>
                <TableCell >{Number(data.endTime)}</TableCell>
                <TableCell >{(data.finalized).toString()}</TableCell>
                <TableCell >{Number(data.highestBid)}</TableCell>
                <TableCell >{data.highestBidder}</TableCell>
                <TableCell >{Number(data.minBid)}</TableCell>
                <TableCell >{data.seller}</TableCell>
              </TableRow>
            ))}
        </TableBody>

      </Table>
      <Toaster />
    </>
  )
}

export default DataTable