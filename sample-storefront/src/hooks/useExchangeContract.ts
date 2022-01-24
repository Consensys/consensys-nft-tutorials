import { BytesLike, ContractTransaction } from "ethers";
import { find } from "lodash";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useWallet } from "../components/WalletContext";
import { TreumExchange, TreumExchange__factory } from "../contracts";
import { fetchContracts } from "../services/contractService";
import { TRANSACTION_SUCCESS } from "../utils/constants";
import { checkDeployment } from "../utils/contractHelpers";
import { Order } from "../utils/types";

const useExchangeContract = () => {
	const {
		address,
		network,
		web3Provider,
		selectWallet,
		notify,
		isRightNetwork,
	} = useWallet();

	const { data: contracts } = useQuery(["contracts", network], () =>
		fetchContracts(network!)
	);
	const [exchangeContract, setExchangeContract] = useState<TreumExchange>();

	useEffect(() => {
		async function loadContract() {
			if (!contracts) {
				return;
			}

			const ec = find(contracts, (c) => c.name === "TreumExchange");

			if (web3Provider && ec?.address) {
				const isContract = await checkDeployment(web3Provider, ec.address);
				if (!isContract) {
					if (isRightNetwork()) {
						throw new Error(
							"The provided TreumEnglishAuction address is not a contract"
						);
					}

					selectWallet();
					return;
				}

				const contract = TreumExchange__factory.connect(
					ec.address,
					web3Provider.getSigner()
				);
				setExchangeContract(contract);
			}
		}
		loadContract();
	}, [contracts, web3Provider, isRightNetwork, selectWallet]);

	function handleEmitter(res: ContractTransaction, cb: any) {
		const { emitter } = notify.hash(res.hash);

		emitter.on("txConfirmed", (tx: any) => {
			console.log("tx:", tx);
			if (tx.status === "confirmed") {
				console.log("network", network);

				if (cb) {
					return cb({ ...tx });
				}
			}
			return TRANSACTION_SUCCESS;
		});

		emitter.on("txSent", () => {});
		emitter.on("all", () => false);
	}

	const fillOrder = async (
		fillAmount: number,
		order: Order,
		signature: BytesLike,
		isNativeToken: boolean,
		cb?: any
	) => {
		if (!address || !web3Provider || !network) {
			selectWallet();
			return;
		}

		if (exchangeContract) {
			const orderToFullfil = {
				...order,
			};

			console.log("fillAmount", fillAmount);
			console.log("order", orderToFullfil);
			console.log("signature", signature);

			const res = await exchangeContract.fill(
				fillAmount,
				orderToFullfil,
				signature
			);

			handleEmitter(res, cb);
		}
	};

	return {
		fillOrder,
		address: Boolean(exchangeContract) ? exchangeContract!.address : undefined,
	};
};

export default useExchangeContract;
