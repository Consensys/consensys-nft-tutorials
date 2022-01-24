import { Box, Container } from "@mui/material";
import { useEffect } from "react";
import Wallet from "./Wallet";

interface PageProps {
	title?: string;
	children: any;
}

const Page = ({ title, children }: PageProps) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			<Box display="flex" sx={{ p: 10, justifyContent: "flex-end" }}>
				<Wallet />
			</Box>
			<Container sx={{ py: 8 }}>{children}</Container>
		</>
	);
};

export default Page;
