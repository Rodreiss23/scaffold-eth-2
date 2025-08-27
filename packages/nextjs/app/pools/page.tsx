"use client";

import { useState } from "react";
import { Droplets, Minus, Plus } from "lucide-react";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~~/components/ui/card";
import { Dialog } from "~~/components/ui/dialog";
import { Input } from "~~/components/ui/input";

const pools = [
  { pair: "INTUITS/tTRUST", apr: "12.4%", tvl: "$420k", vol24h: "$38k" },
  { pair: "tTRUST/REP", apr: "18.2%", tvl: "$210k", vol24h: "$21k" },
  { pair: "INTUITS/REP", apr: "9.8%", tvl: "$160k", vol24h: "$12k" },
];

export default function PoolsPage() {
  const [modal, setModal] = useState<{ type: "add" | "remove"; pair: string } | null>(null);
  const [amount, setAmount] = useState("");

  const close = () => {
    setModal(null);
    setAmount("");
  };

  return (
    <div className="px-6 py-8 mx-auto max-w-6xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">Liquidity Pools</h1>
          <p className="text-base-content/70">Provide liquidity and earn fees.</p>
        </div>
        <Droplets className="h-7 w-7 text-base-content/60" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {pools.map(p => (
          <Card key={p.pair}>
            <CardHeader>
              <CardTitle>{p.pair}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-base-content/70">APR</div>
                  <div className="font-semibold">{p.apr}</div>
                </div>
                <div>
                  <div className="text-base-content/70">TVL</div>
                  <div className="font-semibold">{p.tvl}</div>
                </div>
                <div>
                  <div className="text-base-content/70">24h Vol</div>
                  <div className="font-semibold">{p.vol24h}</div>
                </div>
              </div>
              <div className="mt-5 flex gap-2">
                <Button className="flex-1" onClick={() => setModal({ type: "add", pair: p.pair })}>
                  <Plus className="h-4 w-4" /> Add
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => setModal({ type: "remove", pair: p.pair })}>
                  <Minus className="h-4 w-4" /> Remove
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!modal} onClose={close}>
        {modal && (
          <div>
            <div className="text-lg font-semibold">{modal.type === "add" ? "Add Liquidity" : "Remove Liquidity"}</div>
            <div className="text-sm text-base-content/70">Pool: {modal.pair}</div>
            <div className="mt-4">
              <Input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
              <div className="mt-4 flex gap-2">
                <Button variant="outline" onClick={close}>
                  Cancel
                </Button>
                <Button onClick={close}>{modal.type === "add" ? "Confirm Add" : "Confirm Remove"}</Button>
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
