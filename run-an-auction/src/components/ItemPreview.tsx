import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { Item } from "../utils/types";
import placeholderImg from "../img/placeholderImg.png";

interface ItemPreviewProps {
	item: Item;
}

const ItemPreview = ({ item }: ItemPreviewProps) => {
	const { attributes } = item;

	return (
		<Card sx={{ my: 8, height: 600 }}>
			<CardActionArea sx={{ height: 1 }}>
				<CardMedia
					component="img"
					image={item.media.image.original || placeholderImg}
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
				</CardContent>
			</CardActionArea>
		</Card>
	);
};

export default ItemPreview;
