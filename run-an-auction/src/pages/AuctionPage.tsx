import { Typography, Box, Alert, Grid } from "@mui/material";
import AuctionContainer from "../components/AuctionContainer";
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
				{isSuccess && item ? (
					<Grid
						container
						spacing={8}
						justifyContent="space-between"
						alignItems="center"
					>
						<Grid key={`${item.id}-preview`} item sm={5} xs={12}>
							<ItemPreview item={item} />
						</Grid>
						<Grid key={`${item.id}-auction-container`} item sm={7} xs={0}>
							<AuctionContainer item={item} />
						</Grid>
					</Grid>
				) : (
					<Alert severity="info">No items to display.</Alert>
				)}
			</Box>
		</Page>
	);
};

export default AuctionPage;
