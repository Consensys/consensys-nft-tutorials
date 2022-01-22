import { Box, styled } from "@mui/material";
import { useMemo } from "react";
import theme from "../theme";

interface EthAddressProps {
	address: string;
	networkId: number;
	full?: boolean;
}

const AddressDisplay = styled(Box)`
	cursor: pointer;
	font-size: 2rem;
	font-weight: 400;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	&:hover {
		color: ${theme.palette.secondary.main};
	}
`;

const EthAddress = ({
	address = "",
	networkId = 1,
	full = false,
}: EthAddressProps) => {
	const displayedAddress = useMemo(() => {
		if (full || !address) return address;
		return `${address.slice(0, 2 + 4)}...${address.slice(0 - 4)}`;
	}, [address, full]);

	const openExplorer = () => {
		let url = "";
		switch (networkId) {
			default:
				url = "https://etherscan.io/address/" + address;
				break;
			case 4:
				url = "https://rinkeby.etherscan.io/address/" + address;
				break;
			case 137:
				url = "https://polygonscan.com/address/" + address;
				break;
		}
		if (url) {
			window.open(url);
		}
	};

	return (
		<AddressDisplay onClick={openExplorer}>{displayedAddress}</AddressDisplay>
	);
};

export default EthAddress;
