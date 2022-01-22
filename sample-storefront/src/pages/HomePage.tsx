import ItemsList from "../components/ItemsList";
import { Container, Typography, Box } from "@mui/material";

const HomePage = () => (
	<Container sx={{ py: 24 }}>
		<Box sx={{ my: 4 }}>
			<Typography variant="h2" align="center" gutterBottom>
				THE EGG drop
			</Typography>
			<ItemsList />
		</Box>
	</Container>
);

export default HomePage;
