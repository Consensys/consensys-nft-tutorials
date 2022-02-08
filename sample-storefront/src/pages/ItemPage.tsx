import { Typography, Box, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import ItemDetails from "../components/ItemDetails";
import Page from "../components/Page";
import PurchaseAction from "../components/PurchaseAction";
import { useItem } from "../services/itemService";

const ItemPage = () => {
	const { itemId } = useParams();
	const { item, isError, isSuccess } = useItem(itemId!);

	return (
		<>
			{isError && <Alert severity="error">Error loading items.</Alert>}
			{isSuccess && (
				<Page>
					<Box sx={{ my: 4 }}>
						{item.listing && <PurchaseAction item={item} />}
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
