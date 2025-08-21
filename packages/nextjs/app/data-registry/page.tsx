"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

const DataRegistryPage: NextPage = () => {
  const { address } = useAccount();
  const [dataInput, setDataInput] = useState("");

  const { data: nextRecordId } = useScaffoldReadContract({
    contractName: "DataRegistry",
    functionName: "nextRecordId",
  });

  const { writeContractAsync: writeDataRegistry } = useScaffoldWriteContract({ contractName: "DataRegistry" });

  const { data: events } = useScaffoldEventHistory({
    contractName: "DataRegistry",
    eventName: "DataSubmitted",
    watch: true,
  });

  const handleSubmit = async () => {
    if (!dataInput) return;
    await writeDataRegistry({ functionName: "submitData", args: [dataInput] });
    setDataInput("");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto flex flex-col gap-6">
      <h1 className="text-2xl font-bold">Data Registry</h1>

      <div className="bg-base-200 rounded-xl p-4 flex flex-col gap-3">
        <div className="text-sm opacity-70">Connected:</div>
        <Address address={address} />
        <div className="mt-2">Next Record ID: {nextRecordId?.toString?.() ?? "-"}</div>
      </div>

      <div className="bg-base-200 rounded-xl p-4 flex flex-col gap-3">
        <label htmlFor="data-input" className="text-sm">
          Submit data
        </label>
        <input
          id="data-input"
          className="input input-bordered w-full"
          placeholder="Enter any text..."
          value={dataInput}
          onChange={e => setDataInput(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleSubmit} disabled={!dataInput}>
          Submit
        </button>
      </div>

      <div className="bg-base-200 rounded-xl p-4">
        <div className="font-semibold mb-2">Recent submissions</div>
        <div className="flex flex-col gap-2">
          {events
            ?.slice()
            ?.reverse()
            ?.map(evt => (
              <div key={`${evt.blockNumber}-${evt.logIndex}`} className="bg-base-100 rounded-lg p-3">
                <div className="text-sm opacity-70">ID: {evt.args.id?.toString?.()}</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="opacity-70">Submitter:</span>
                  <Address address={evt.args.submitter} />
                </div>
                <div className="mt-1 break-words">{evt.args.data as string}</div>
              </div>
            ))}
          {!events?.length && <div className="opacity-70">No submissions yet.</div>}
        </div>
      </div>
    </div>
  );
};

export default DataRegistryPage;
