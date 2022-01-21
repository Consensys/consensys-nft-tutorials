import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ItemsList from "../components/ItemsList";

const HomePage = () => (
	<Container sx={{ p: 24 }}>
		<Box sx={{ my: 4 }}>
			<Typography variant="h2" align="center" gutterBottom>
				THE EGG drop
			</Typography>
			<ItemsList />
		</Box>
	</Container>
);

export default HomePage;
