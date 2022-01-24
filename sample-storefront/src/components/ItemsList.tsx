import { Alert, Grid, Link } from "@mui/material";
import { useItems } from "../services/itemService";
import { QUERY_STATUS } from "../utils/constants";
import { Item } from "../utils/types";
import ItemPreview from "./ItemPreview";

const ItemsList = () => {
	const { items, status } = useItems();

	return (
		<>
			{status === QUERY_STATUS.error && (
				<Alert severity="error">Error loading items.</Alert>
			)}
			{status === QUERY_STATUS.success && (
				<Grid
					container
					spacing={8}
					justifyContent="space-between"
					alignItems="center"
				>
					{(items || []).length === 0 && (
						<Alert severity="info">No items to display.</Alert>
					)}
					{(items || []).map((item: Item) => (
						<Grid key={item.id} item sm={4} xs={12}>
							<Link href={`/items/${item.id}`} underline="none">
								<ItemPreview item={item} />
							</Link>
						</Grid>
					))}
				</Grid>
			)}
		</>
	);
};

export default ItemsList;
