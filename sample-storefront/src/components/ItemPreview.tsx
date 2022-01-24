import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { Item } from "../utils/types";
import placeholderImg from "../img/placeholderImg.png";
import { usePaymentToken } from "../services/tokenService";
import { formatPrice } from "../utils/market";

interface ItemPreviewProps {
	item: Item;
}

const ItemPreview = ({ item }: ItemPreviewProps) => {
	const { attributes, token_contract, listing } = item;

	const { tokens: paymentTokens } = usePaymentToken(token_contract.network_id);

	const paymentToken = paymentTokens.find(
		(t) => t.address === listing.data.order.takerToken.token
	);

	const price = formatPrice(listing.data.order, paymentToken!);

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
						{price}
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ItemPreview;
