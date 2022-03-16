import { Typography, Box, Alert, Grid } from "@mui/material";
import ItemPreview from "../components/ItemPreview";
import Page from "../components/Page";
import { useItem } from "../services/itemService";

const AuctionPage = () => {
	const { item, isError, isSuccess } = useItem();

	return (
		<Page>
			<Box sx={{ my: 4 }}>
				<Typography variant="h2" align="center" gutterBottom>
					THE EGG drop
				</Typography>

				{isError && <Alert severity="error">Error loading items.</Alert>}
				{isSuccess && (
					<Grid
						container
						spacing={8}
						justifyContent="space-between"
						alignItems="center"
					>
						{!item && <Alert severity="info">No items to display.</Alert>}
						{item && (
							<Grid key={item.id} item sm={4} xs={12}>
								<ItemPreview item={item} />
							</Grid>
						)}
					</Grid>
				)}
			</Box>
		</Page>
	);
};

export default AuctionPage;
