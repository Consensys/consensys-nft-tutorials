import { BigNumber, constants, ContractTransaction } from "ethers";
import { MaxUint256 } from "@ethersproject/constants";
import { useCallback, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { useWallet } from "../components/WalletContext";
import { TRANSACTION_SUCCESS } from "../utils/constants";
import { ERC20Token } from "../utils/types";
import { useTokenContract } from "./useTokenContract";
import { useTokenAllowance } from "./useTokenAllowance";

export enum ApprovalState {
	UNKNOWN = "UNKNOWN",
	NOT_APPROVED = "NOT_APPROVED",
	APPROVED = "APPROVED",
	PENDING = "PENDING",
}

// add 20%
export function calculateGasMargin(value: BigNumber): BigNumber {
	return value.mul(BigNumber.from(10000 + 2000)).div(BigNumber.from(10000));
}

// returns a variable indicating the state of the approval and a function which approves if necessary or early returns
export function useApproveCallback(
	token?: ERC20Token,
	amountToApprove?: any,
	spender?: string,
	queryOptions?: any
): {
	approvalState: ApprovalState;
	approve: () => Promise<void>;
	removeApproval: () => Promise<void>;
} {
	const { address: account, notify } = useWallet();
	const [isPending, setIsPending] = useState<Boolean>(false);
	const queryClient = useQueryClient();

	const handleEmitter = useCallback(
		(res: ContractTransaction, cb: any) => {
			const { emitter } = notify.hash(res.hash);

			emitter.on("txConfirmed", (tx: any) => {
				console.log("tx:", tx);
				if (tx.status === "confirmed") {
					if (cb) {
						return cb({ ...tx });
					}
				}
				return TRANSACTION_SUCCESS;
			});

			emitter.on("txSent", () => {});
			emitter.on("all", () => false);
		},
		[notify]
	);

	const currentAllowance = useTokenAllowance(
		token,
		account ?? undefined,
		spender,
		queryOptions
	);
	// check the current approval status
	let approvalState: ApprovalState = useMemo(() => {
		// if native token then don't need to approve
		if (token?.address === constants.AddressZero) return ApprovalState.APPROVED;

		// we might not have enough data to know whether or not we need to approve
		if (!amountToApprove || !spender) return ApprovalState.UNKNOWN;
		if (!currentAllowance) return ApprovalState.UNKNOWN;

		if (isPending) return ApprovalState.PENDING;

		return BigNumber.from(currentAllowance).lt(amountToApprove)
			? ApprovalState.NOT_APPROVED
			: ApprovalState.APPROVED;
	}, [amountToApprove, currentAllowance, spender, token, isPending]);

	const tokenContract = useTokenContract(token?.address);

	const approve = useCallback(async (): Promise<void> => {
		if (approvalState !== ApprovalState.NOT_APPROVED) {
			console.error("Unnecessary approval");
			return;
		}
		if (!token) {
			console.error("Missing token");
			return;
		}

		if (!tokenContract) {
			console.error("No tokeContract");
			return;
		}

		if (!amountToApprove) {
			console.error("Missing amount to approve");
			return;
		}

		if (!spender) {
			console.error("Missing spender");
			return;
		}

		let useExact = false;
		const estimatedGas = await tokenContract.estimateGas
			.approve(spender, MaxUint256)
			.catch(() => {
				// general fallback for tokens who restrict approval amounts
				useExact = true;
				return tokenContract.estimateGas.approve(
					spender,
					amountToApprove.toString()
				);
			});

		try {
			const tx = await tokenContract.approve(
				spender,
				useExact ? amountToApprove.toString() : MaxUint256,
				{
					gasLimit: calculateGasMargin(estimatedGas),
				}
			);
			setIsPending(true);
			handleEmitter(tx, () => {
				setIsPending(false);
				queryClient.setQueryData(
					["approval", token?.address, account, spender],
					amountToApprove
				);
				return TRANSACTION_SUCCESS;
			});
		} catch (e) {
			console.debug("Failed to approve token", e);
			throw e;
		}
	}, [
		approvalState,
		token,
		tokenContract,
		amountToApprove,
		spender,
		handleEmitter,
		account,
		queryClient,
	]);

	const removeApproval = useCallback(async (): Promise<void> => {
		if (approvalState !== ApprovalState.APPROVED) {
			console.error("Unnecessary remove approval");
			return;
		}
		if (!token) {
			console.error("Missing token");
			return;
		}

		if (!tokenContract) {
			console.error("No tokeContract");
			return;
		}

		if (!spender) {
			console.error("Missing spender");
			return;
		}

		const estimatedGas = await tokenContract.estimateGas.approve(spender, 0);

		try {
			const tx = await tokenContract.approve(spender, 0, {
				gasLimit: calculateGasMargin(estimatedGas),
			});
			setIsPending(true);
			handleEmitter(tx, () => {
				queryClient.setQueryData(
					["approval", token?.address, account, spender],
					BigNumber.from(0)
				);
				setIsPending(false);
			});
		} catch (e) {
			console.debug("Failed to remove approval", e);
			throw e;
		}
	}, [
		approvalState,
		token,
		tokenContract,
		spender,
		handleEmitter,
		account,
		queryClient,
	]);

	return { approvalState, approve, removeApproval };
}
