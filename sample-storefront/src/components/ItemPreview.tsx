import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { Item } from "../utils/types";
import placeholderImg from "../img/placeholderImg.png";
import { getDisplayPrice } from "../utils/market";
import { usePaymentToken } from "../services/tokenService";

interface ItemPreviewProps {
	item: Item;
}

const ItemPreview = ({ item }: ItemPreviewProps) => {
	const { attributes, token_contract, listing } = item;

	const price = getDisplayPrice(listing.data.order);

	const { tokens: paymentTokens } = usePaymentToken(token_contract.network_id);

	const paymentToken = paymentTokens.find(
		(t) => t.address === listing.data.order.takerToken.token
	);

	return (
		<Card sx={{ my: 8, height: 600 }}>
			<CardActionArea sx={{ height: 1 }}>
				<CardMedia
					component="img"
					image={attributes.image_url || placeholderImg}
					alt={attributes.title}
					sx={{ height: 300 }}
				/>

				<CardContent>
					<Typography
						gutterBottom
						variant="caption"
						component="div"
						align="center"
					>
						{attributes.title}
					</Typography>
					<Typography
						gutterBottom
						variant="caption"
						component="div"
						align="center"
					>
						{price} {paymentToken?.symbol}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ItemPreview;
