"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, ArrowLeftRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~~/components/ui/card";
import { Dialog } from "~~/components/ui/dialog";
import { Input } from "~~/components/ui/input";

const TOKENS = ["INTUITS", "tTRUST", "REP"] as const;

type Token = (typeof TOKENS)[number];

export default function SwapPage() {
  const [fromToken, setFromToken] = useState<Token>("INTUITS");
  const [toToken, setToToken] = useState<Token>("tTRUST");
  const [amount, setAmount] = useState<string>("");
  const [openWarn, setOpenWarn] = useState(false);
  const [confirming, setConfirming] = useState(false);
  const [success, setSuccess] = useState(false);

  const rate = useMemo(() => {
    if (fromToken === toToken) return 1;
    // Mock rates
    const map: Record<string, number> = {
      "INTUITS:tTRUST": 0.92,
      "tTRUST:INTUITS": 1 / 0.92,
      "INTUITS:REP": 0.5,
      "REP:INTUITS": 2,
      "tTRUST:REP": 0.6,
      "REP:tTRUST": 1 / 0.6,
    };
    return map[`${fromToken}:${toToken}`] || 1;
  }, [fromToken, toToken]);

  const outAmount = useMemo(() => {
    const a = parseFloat(amount || "0");
    if (!a) return "";
    return (a * rate).toFixed(4);
  }, [amount, rate]);

  const slippage = 0.015; // 1.5%

  const showWarning = useMemo(() => slippage > 0.01 && !!outAmount, [outAmount]);

  const onConfirm = async () => {
    if (showWarning) {
      setOpenWarn(true);
      return;
    }
    setConfirming(true);
    await new Promise(r => setTimeout(r, 1300));
    setConfirming(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  const proceedSwap = async () => {
    setOpenWarn(false);
    setConfirming(true);
    await new Promise(r => setTimeout(r, 1300));
    setConfirming(false);
    setSuccess(true);
    setTimeout(() => setSuccess(false), 1500);
  };

  const flip = () => {
    setFromToken(toToken);
    setToToken(fromToken);
  };

  return (
    <div className="px-6 py-8 mx-auto max-w-lg w-full">
      <Card>
        <CardHeader>
          <CardTitle>Swap</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* From */}
            <div>
              <div className="mb-2 text-sm">From</div>
              <div className="flex gap-3">
                <select
                  className="select select-bordered w-32"
                  value={fromToken}
                  onChange={e => setFromToken(e.target.value as Token)}
                >
                  {TOKENS.map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <Input placeholder="0.0" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
            </div>

            {/* Switch */}
            <div className="flex justify-center">
              <button className="btn btn-ghost" onClick={flip}>
                <ArrowLeftRight className="h-5 w-5" />
              </button>
            </div>

            {/* To */}
            <div>
              <div className="mb-2 text-sm">To</div>
              <div className="flex gap-3">
                <select
                  className="select select-bordered w-32"
                  value={toToken}
                  onChange={e => setToToken(e.target.value as Token)}
                >
                  {TOKENS.map(t => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <Input value={outAmount} readOnly placeholder="0.0" />
              </div>
              {outAmount && (
                <div className="mt-2 text-sm text-base-content/70">
                  Rate: 1 {fromToken} ≈ {rate.toFixed(4)} {toToken}
                </div>
              )}
              {outAmount && (
                <div className="mt-1 text-xs text-warning">Estimated slippage: {(slippage * 100).toFixed(2)}%</div>
              )}
            </div>

            <motion.div whileTap={{ scale: 0.98 }}>
              <Button className="w-full" onClick={onConfirm} disabled={!amount || confirming}>
                {confirming && <Loader2 className="h-4 w-4 animate-spin" />}
                {confirming ? "Swapping..." : "Confirm Swap"}
              </Button>
            </motion.div>

            {success && (
              <div className="flex items-center justify-center gap-2 text-success">
                <CheckCircle2 className="h-5 w-5" />
                <span>Swap successful</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={openWarn} onClose={() => setOpenWarn(false)}>
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 text-warning mt-1" />
          <div>
            <div className="font-semibold">High Slippage</div>
            <div className="text-sm opacity-80 mt-1">
              Slippage is {(slippage * 100).toFixed(2)}%. Do you still want to proceed?
            </div>
            <div className="mt-4 flex gap-2">
              <Button variant="outline" onClick={() => setOpenWarn(false)}>
                Cancel
              </Button>
              <Button onClick={proceedSwap}>Proceed</Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
