"use client";

import { motion } from "framer-motion";
import { Gauge, TrendingUp, Trophy, Wallet } from "lucide-react";
import { Badge } from "~~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~~/components/ui/card";

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Value Locked",
      value: "$1,240,500",
      change: "+5.2%",
      icon: TrendingUp,
    },
    {
      title: "Active Pools",
      value: "12",
      change: "",
      icon: Wallet,
    },
    {
      title: "REP Earned",
      value: "18,420 REP",
      change: "+2.1%",
      icon: Trophy,
    },
    {
      title: "APY Range",
      value: "8% - 24%",
      change: "",
      icon: Gauge,
    },
  ];

  const activity = [
    { type: "Swap", pair: "INTUITS → tTRUST", time: "2m ago", status: "confirmed" },
    { type: "Stake", pair: "tTRUST", time: "15m ago", status: "pending" },
    { type: "Add Liquidity", pair: "tTRUST/REP", time: "1h ago", status: "confirmed" },
  ];

  return (
    <div className="px-6 py-8 mx-auto max-w-6xl">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">RWA DeFi Dashboard</h1>
        <p className="text-base-content/70">Intuition Testnet · Overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card>
              <CardHeader className="flex items-center justify-between">
                <CardTitle className="text-base">{s.title}</CardTitle>
                <s.icon className="h-5 w-5 text-base-content/60" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{s.value}</div>
                {s.change && <div className="text-sm text-success mt-1">{s.change} from last week</div>}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-xl border border-base-300 h-48 grid place-items-center text-base-content/60">
              Coming soon: charts and analytics
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activity.map((a, idx) => (
                <div key={idx} className="flex items-center justify-between rounded-lg border border-base-300 p-3">
                  <div>
                    <div className="font-medium">{a.type}</div>
                    <div className="text-sm text-base-content/70">{a.pair}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-base-content/60">{a.time}</span>
                    <Badge
                      className={a.status === "pending" ? "border-warning text-warning" : "border-success text-success"}
                    >
                      {a.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
