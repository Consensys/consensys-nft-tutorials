import { Alert, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useItems } from "../services/itemsService";
import { Item } from "../utils/types";

const ItemsList = () => {
	const { items, status } = useItems();

	return (
		<>
			{status === "error" && (
				<Alert severity="error">Error loading items.</Alert>
			)}
			{status === "success" && (
				<Grid
					container
					spacing={12}
					justifyContent="space-between"
					alignItems="center"
				>
					{(items || []).length === 0 && (
						<Alert severity="info">No items to display.</Alert>
					)}
					{(items || []).map((item: Item) => (
						<Grid key={item.id} item sm={4} xs={12}>
							Item
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
};

export default ItemsList;
