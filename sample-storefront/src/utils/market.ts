import { BigNumber, BigNumberish, logger } from "ethers";
import { PaymentToken } from "../services/tokenService";
import { ERC20Token, Order } from "./types";

let zeros = "0";
while (zeros.length < 256) {
	zeros += zeros;
}

export const formatPrice = (
	order: Order,
	token?: PaymentToken | ERC20Token,
	quantity: number = 1
) => {
	if (order) {
		return `${formatUnits(
			BigNumber.from(order.takerToken.amount).mul(quantity),
			token?.decimals
		)} ${token?.symbol}`;
	}
};

export function formatUnits(
	value: BigNumberish,
	decimals: BigNumberish = 18
): string {
	const multiplier = getMultiplier(decimals);

	// Make sure wei is a big number (convert as necessary)
	value = BigNumber.from(value);

	let fraction = value.mod(multiplier).toString();
	while (fraction.length < multiplier.length - 1) {
		fraction = "0" + fraction;
	}

	// Strip trailing 0
	fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)![1];

	const whole = value.div(multiplier).toString();
	if (multiplier.length === 1) {
		value = whole;
	} else {
		value = whole + "." + fraction;
	}

	return value;
}

function getMultiplier(decimals: BigNumberish): string {
	if (
		typeof decimals === "number" &&
		decimals >= 0 &&
		decimals <= 256 &&
		!(decimals % 1)
	) {
		return "1" + zeros.substring(0, decimals);
	}

	return logger.throwArgumentError(
		"invalid decimal size",
		"decimals",
		decimals
	);
}
