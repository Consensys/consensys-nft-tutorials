import ItemsList from "../components/ItemsList";
import { Typography, Box } from "@mui/material";
import Page from "../components/Page";

const HomePage = () => (
	<Page>
		<Box sx={{ my: 4 }}>
			<Typography variant="h2" align="center" gutterBottom>
				THE EGG drop
			</Typography>
			<ItemsList />
		</Box>
	</Page>
);

export default HomePage;
