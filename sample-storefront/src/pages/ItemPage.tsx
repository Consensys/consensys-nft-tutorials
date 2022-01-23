import { Typography, Box, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import ItemDetails from "../components/ItemDetails";
import Page from "../components/Page";
import { useItem } from "../services/itemsService";

const ItemPage = () => {
	const { itemId } = useParams();
	const { item, status } = useItem(itemId!);

	return (
		<>
			{status === "error" && (
				<Alert severity="error">Error loading items.</Alert>
			)}
			{status === "success" && (
				<Page>
					<Box sx={{ my: 4 }}>
						<Typography variant="h2" align="center" gutterBottom>
							<ItemDetails item={item} />
						</Typography>
					</Box>
				</Page>
			)}
		</>
	);
};

export default ItemPage;
