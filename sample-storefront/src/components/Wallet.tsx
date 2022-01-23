import { Box } from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EthAddress from "./EthAddress";
import { useWallet } from "./WalletContext";

const Wallet: React.FC = () => {
	const { selectWallet, logoutWallet, address } = useWallet();

	const logout = () => {
		console.log("logging out");
		logoutWallet();
	};

	return (
		<>
			{address ? (
				<>
					<EthAddress address={address} networkId={4} />

					<Box
						onClick={logout}
						display={["none", "block"]}
						sx={{ cursor: "pointer" }}
					>
						<ExitToAppIcon />
					</Box>
				</>
			) : (
				<Box onClick={selectWallet} sx={{ cursor: "pointer" }}>
					Connect Wallet
				</Box>
			)}
		</>
	);
};

export default Wallet;
