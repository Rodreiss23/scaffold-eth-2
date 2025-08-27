"use client";

import { useState } from "react";
import { CheckCircle2, Gauge, Loader2 } from "lucide-react";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~~/components/ui/card";
import { Input } from "~~/components/ui/input";

export default function StakePage() {
  const [amount, setAmount] = useState("");
  const [pending, setPending] = useState<"stake" | "unstake" | null>(null);
  const [success, setSuccess] = useState<string>("");

  const simulate = async (type: "stake" | "unstake") => {
    setPending(type);
    await new Promise(r => setTimeout(r, 1200));
    setPending(null);
    setSuccess(type === "stake" ? "Staked successfully" : "Unstaked successfully");
    setTimeout(() => setSuccess(""), 1500);
  };

  return (
    <div className="px-6 py-8 mx-auto max-w-lg">
      <div className="mb-6 flex items-center gap-3">
        <Gauge className="h-6 w-6" />
        <div>
          <h1 className="text-2xl font-bold">Stake tTRUST</h1>
          <p className="text-base-content/70">APY range: 8% - 24%</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Stake</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} />
            <div className="text-sm text-base-content/70">
              Estimated daily REP: {amount ? (parseFloat(amount) * 0.02).toFixed(4) : "0.0000"}
            </div>
            <div className="flex gap-2">
              <Button className="flex-1" disabled={!amount || !!pending} onClick={() => simulate("stake")}>
                {pending === "stake" && <Loader2 className="h-4 w-4 animate-spin" />}Stake
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                disabled={!amount || !!pending}
                onClick={() => simulate("unstake")}
              >
                {pending === "unstake" && <Loader2 className="h-4 w-4 animate-spin" />}Unstake
              </Button>
            </div>
            {success && (
              <div className="flex items-center justify-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                <span>{success}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
