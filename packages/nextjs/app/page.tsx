"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex min-h-screen flex-col">
        {/* Gradient Hero */}
        <section className="relative isolate overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
          <div className="relative mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="text-center">
              <p className="mb-3 text-sm uppercase tracking-widest opacity-80">REPTUITION</p>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                Stake TRUST. Earn REP.
              </h1>
              <p className="mt-5 text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                A simple, gas-efficient staking experience on Intuition Testnet.
              </p>
              <div className="mt-8 flex items-center justify-center gap-3">
                <Link href="/debug" passHref className="btn btn-primary btn-lg normal-case">
                  Open dApp
                </Link>
                <Link href="/blockexplorer" passHref className="btn btn-outline btn-lg normal-case">
                  View Explorer
                </Link>
              </div>
              <div className="mt-8 flex items-center justify-center">
                <div className="rounded-xl bg-white/10 px-5 py-3 backdrop-blur">
                  <span className="mr-2 text-white/70">Connected:</span>
                  <Address address={connectedAddress} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="bg-base-100">
          <div className="mx-auto max-w-6xl px-6 py-14 md:py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              <div className="rounded-2xl border border-base-300 bg-base-200 p-6">
                <h3 className="text-lg font-semibold">Stake TRUST</h3>
                <p className="mt-2 opacity-80">Deposit native TRUST and start accruing REP instantly.</p>
                <Link href="/debug" className="btn btn-sm btn-primary mt-4">
                  Stake Now
                </Link>
              </div>
              <div className="rounded-2xl border border-base-300 bg-base-200 p-6">
                <h3 className="text-lg font-semibold">Earn REP</h3>
                <p className="mt-2 opacity-80">Claim REP rewards at a fixed emission rate per stake.</p>
                <Link href="/debug" className="btn btn-sm btn-secondary mt-4">
                  Claim Rewards
                </Link>
              </div>
              <div className="rounded-2xl border border-base-300 bg-base-200 p-6">
                <h3 className="text-lg font-semibold">Explore</h3>
                <p className="mt-2 opacity-80">Audit transactions and logs on the built-in explorer.</p>
                <Link href="/blockexplorer" className="btn btn-sm btn-outline mt-4">
                  Open Explorer
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
