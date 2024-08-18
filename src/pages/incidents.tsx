import { useState } from 'react';
import { incidentAbi } from '../assets/abis/IncidentReport';
import { useAccount, useWriteContract } from "wagmi";
import Loader from "@/components/ui/loader";
import { useToast } from "@/components/ui/use-toast";
import { rainbowkitConfig } from "@/config/rainbowkitConfig";
import { waitForTransactionReceipt } from "wagmi/actions";
import Button from '@/components/ui/button';


const IncidentPage = () => {
  const { address } = useAccount();

  const { toast } = useToast();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState<boolean>(false);


  const handleChange = (event: any) => {
    setText(event.target.value);
  };

  const { writeContractAsync } = useWriteContract();

  const ReportIncident = async () => {

    setLoading(true);
    try {
      const txHash = await writeContractAsync({
        abi: incidentAbi,
        address: "0xf43A836Fc651972Db751Eb033D5B78D37718ad72",
        functionName: "reportIncident",
        args: [text],
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

  return (
    <section style={{ width: "100%", height: "100vh" }}>
      <div style={{ background: "#626262", height: "1px" }}></div>
      <h1 className="text-center" style={{ paddingTop: "20px" }}>
        Report Your Incident Application
      </h1>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            color:"black"
          }}
        >
          <label htmlFor="textInput">Enter your Report Here:</label>
          <textarea
            id="textInput"
            value={text}
            onChange={handleChange}
            rows={10}
            cols={50}
          />
          <br />
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "30px" }}>
          <Button disabled={loading || !address} onClick={ReportIncident}>
            {loading ? <Loader /> : "Report Incident"}
          </Button>
        </div>
      </div>
    </section>
  )
}

export default IncidentPage