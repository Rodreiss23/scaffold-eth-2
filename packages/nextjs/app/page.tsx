"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col grow pt-10">
        {/* Hero */}
        <div className="px-5 w-full max-w-5xl">
          <h1 className="text-center">
            <span className="block text-2xl md:text-3xl mb-3">Welcome to</span>
            <span className="block text-4xl md:text-6xl font-bold tracking-tight">Scaffold-ETH 2</span>
          </h1>

          <p className="mt-4 text-center text-base md:text-lg text-base-content/80 max-w-2xl mx-auto">
            Build full-stack dApps faster with Next.js, RainbowKit, Wagmi and Hardhat/Foundry.
          </p>

          <div className="mt-6 flex flex-col items-center gap-3">
            <div className="flex justify-center items-center space-x-2 flex-col">
              <p className="my-2 font-medium">Connected Address:</p>
              <Address address={connectedAddress} />
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-3">
              <Link href="/debug" passHref className="btn btn-primary">
                Open Debug Contracts
              </Link>
              <Link href="/blockexplorer" passHref className="btn btn-secondary">
                View Block Explorer
              </Link>
            </div>
          </div>

          <div className="mt-8 text-center text-sm md:text-base">
            <p>
              Get started by editing{" "}
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block px-2 py-1 rounded">
                packages/nextjs/app/page.tsx
              </code>
            </p>
            <p className="mt-2">
              Edit your smart contract{" "}
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block px-2 py-1 rounded">
                YourContract.sol
              </code>{" "}
              in{" "}
              <code className="italic bg-base-300 text-base font-bold max-w-full break-words break-all inline-block px-2 py-1 rounded">
                packages/hardhat/contracts
              </code>
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grow bg-base-300 w-full mt-16 px-8 py-12">
          <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center rounded-3xl">
              <BugAntIcon className="h-10 w-10 mb-3 text-secondary" />
              <h3 className="font-semibold text-lg">Debug Contracts</h3>
              <p className="mt-2 text-base-content/80">
                Tinker with your smart contract using the Debug Contracts tab.
              </p>
              <Link href="/debug" passHref className="btn btn-primary mt-5">
                Go to Debug
              </Link>
            </div>

            <div className="flex flex-col bg-base-100 px-10 py-10 text-center items-center rounded-3xl">
              <MagnifyingGlassIcon className="h-10 w-10 mb-3 text-secondary" />
              <h3 className="font-semibold text-lg">Block Explorer</h3>
              <p className="mt-2 text-base-content/80">
                Explore your local transactions and logs in a friendly explorer.
              </p>
              <Link href="/blockexplorer" passHref className="btn btn-secondary mt-5">
                Open Explorer
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
