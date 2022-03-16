import React, { useState, useEffect, createContext } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";
import Onboard from "bnc-onboard";
import { API } from "bnc-onboard/dist/src/interfaces";
import Notify from "bnc-notify";
import { bncDappId, infuraKey, networkId } from "../config";
import { getItem, removeItem, setItem } from "../utils/localStorage";

interface WalletContextValue {
	onboard: API | null;
	notify: any;
	web3Provider: Web3Provider | null;
	address: string | null;
	network: number | null;
	selectWallet(): any;
	checkWallet(): any;
	logoutWallet(): any;
	isRightNetwork(): boolean;
}

const ALLOWED_CHAIN_IDS = [1, 4, 147];

const chainId = networkId ? parseInt(networkId) : 4;

const wallets: any[] = [];

export const setupWallets = () => {
	if (infuraKey) {
		wallets.push({
			walletName: "walletConnect",
			infuraKey,
			preferred: true,
		});
	}
};

const WalletContext = createContext<WalletContextValue>({
	onboard: null,
	notify: null,
	web3Provider: null,
	address: null,
	network: null,
	selectWallet: () => {},
	checkWallet: () => {},
	logoutWallet: () => {},
	isRightNetwork: () => false,
});

const WalletProvider = ({ children }: any) => {
	const [web3Provider, setWeb3Provider] = useState<Web3Provider | null>(null);
	const [address, setAddress] = useState<string | null>(null);
	const [network, setNetwork] = useState<number | null>(null);

	// -----------------------------------------------------------------------------------
	// Initialize onboard and notify library
	// -----------------------------------------------------------------------------------
	// note: we are not currently doing anything with a user's balance
	// if we wanted to, there is a userWallet that we can use and keep updated
	// via onbard.getState()

	const [onboard, setOnboard] = useState<API | null>(null);
	const [notify, setNotify] = useState<any>(null);

	useEffect(() => {
		const onboard = Onboard({
			dappId: bncDappId,
			networkId: chainId,
			hideBranding: true,
			subscriptions: {
				wallet: (wallet) => {
					if (wallet.provider) {
						const ethersProvider = new ethers.providers.Web3Provider(
							wallet.provider
						);
						setWeb3Provider(ethersProvider);

						// store user preference
						setItem("selectedWallet", wallet.name);
					} else {
						// logging out
						setWeb3Provider(null);
						removeItem("selectedWallet");
					}
				},
				address: (address) =>
					address ? setAddress(ethers.utils.getAddress(address)) : "",
				network: setNetwork,
			},
			walletSelect: {
				wallets: [
					{ walletName: "metamask", preferred: true },
					...(ALLOWED_CHAIN_IDS.includes(chainId) ? wallets : []),
				],
			},
			walletCheck: [{ checkName: "connect" }, { checkName: "network" }],
		});

		const notify = Notify({
			dappId: bncDappId,
			networkId: chainId,
			darkMode: true,
		});

		setOnboard(onboard);
		setNotify(notify);
	}, []);

	// -----------------------------------------------------------------------------------
	// If network changes, the getNetwork call with throw network change error with the
	// previously connected network. This is what the provider is initialized with and
	// is what we want.
	// -----------------------------------------------------------------------------------
	const getProviderNetwork = React.useCallback(async () => {
		try {
			return await web3Provider?.getNetwork();
		} catch (e: any) {
			if (e.network) {
				return e.network;
			}
			return null;
		}
	}, [web3Provider]);

	// -----------------------------------------------------------------------------------
	// Wallet utility functions
	// -----------------------------------------------------------------------------------
	// note: call this before web3 txs and it will run through a series of checks that we
	// can customize during initialization. Defaults to checking to make sure the wallet
	// is connected.
	// https://docs.blocknative.com/onboard#wallet-check-modules
	const checkWallet = React.useCallback(async () => {
		return onboard?.walletCheck();
	}, [onboard]);

	const selectWallet = React.useCallback(async () => {
		const walletSelected = await onboard?.walletSelect();

		if (walletSelected) {
			await onboard?.walletCheck();
		}
	}, [onboard]);

	const logoutWallet = React.useCallback(async () => {
		setAddress(null);
		return onboard?.walletReset();
	}, [onboard]);

	// -----------------------------------------------------------------------------------
	// Load the previous connected wallet so returning users have nice experience
	// only happens once right after the onboard module is initialized
	// -----------------------------------------------------------------------------------
	useEffect(() => {
		const previouslySelectedWallet = getItem("selectedWallet");

		if (previouslySelectedWallet && onboard) {
			onboard.walletSelect(previouslySelectedWallet);
		}
	}, [onboard]);

	// -----------------------------------------------------------------------------------
	// Force re-initialization of wallet on network change
	// -----------------------------------------------------------------------------------
	const reloadWalletOnNetworkChange = React.useCallback(async () => {
		if (!network) return;

		const providerNetwork = await getProviderNetwork();

		// get current wallet info so can auto log back in
		const userState = await onboard?.getState();
		const wallet = userState && userState.wallet;
		if (!wallet || !wallet.name) return;

		// if provider network is different, then the user has changed networks
		if (providerNetwork && providerNetwork.chainId !== network) {
			// reset wallet to trigger a full re-initialization on wallet select
			await onboard?.walletReset();

			// re-select the wallet
			// const walletSelected = await onboard?.walletSelect(wallet.name);
			await onboard?.walletSelect(wallet.name);
		}

		if (providerNetwork && providerNetwork.chainId !== chainId) {
			await onboard?.walletCheck();
		}
	}, [onboard, getProviderNetwork, network]);

	useEffect(() => {
		reloadWalletOnNetworkChange();
	}, [reloadWalletOnNetworkChange]);

	const isRightNetwork = () => network === chainId;

	return (
		<WalletContext.Provider
			value={{
				onboard,
				web3Provider,
				address,
				network,
				selectWallet,
				checkWallet,
				logoutWallet,
				notify,
				isRightNetwork,
			}}
		>
			{children}
		</WalletContext.Provider>
	);
};

const useWallet = () => {
	const context = React.useContext(WalletContext);
	if (context === undefined) {
		throw new Error("useWallet must be used within a WalletProvider");
	}
	return context;
};

export { WalletProvider, useWallet };
