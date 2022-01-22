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

interface ItemPreviewProps {
	item: Item;
}

const ItemPreview = ({ item }: ItemPreviewProps) => {
	const { attributes, listing } = item;

	const price = getDisplayPrice(listing.data.order);

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
						{price} WETH
					</Typography>
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ItemPreview;
