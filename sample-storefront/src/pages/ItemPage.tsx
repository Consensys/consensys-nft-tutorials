import { Typography, Box, Alert } from "@mui/material";
import { useParams } from "react-router-dom";
import ItemDetails from "../components/ItemDetails";
import Page from "../components/Page";
import PurchaseAction from "../components/PurchaseAction";
import { useItem } from "../services/itemService";
import { QUERY_STATUS } from "../utils/constants";

const ItemPage = () => {
	const { itemId } = useParams();
	const { item, status } = useItem(itemId!);

	return (
		<>
			{status === QUERY_STATUS.error && (
				<Alert severity="error">Error loading items.</Alert>
			)}
			{status === QUERY_STATUS.success && (
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
