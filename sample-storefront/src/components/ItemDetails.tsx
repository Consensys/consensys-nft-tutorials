import {
	Card,
	CardContent,
	CardMedia,
	Grid,
	List,
	ListItem,
	Typography,
	Box,
} from "@mui/material";
import { Item } from "../utils/types";
import placeholderImg from "../img/placeholderImg.png";
import isNil from "lodash/isNil";
import pickBy from "lodash/pickBy";

interface ItemDetailsProps {
	item: Item;
}

const EXCLUDED_ATTRIBUTES = [
	"title",
	"description",
	"image_url",
	"is_digital_twin",
];

const ItemDetails = ({ item }: ItemDetailsProps) => {
	const { attributes, token_contract, listing } = item;

	console.log(attributes, token_contract, listing);

	const customAttributes = pickBy(
		attributes,
		(val, key) =>
			!EXCLUDED_ATTRIBUTES.includes(key) && !isNil(val) && val !== ""
	);

	return (
		<Grid container spacing={4} justifyContent="space-between">
			<Grid key="image" item sm={4} xs={12}>
				<Card sx={{ my: 8, height: 600 }}>
					<CardContent sx={{ p: 8 }}>
						<Typography
							gutterBottom
							variant="subtitle1"
							component="div"
							align="center"
							sx={{ fontWeight: "light" }}
						>
							{attributes.title}
						</Typography>
					</CardContent>
					<CardMedia
						component="img"
						image={attributes.image_url || placeholderImg}
						alt={attributes.title}
						sx={{ height: 300 }}
					/>
				</Card>
			</Grid>
			<Grid key="attributes" item sm={4} xs={12}>
				<Card sx={{ my: 8, height: 600 }}>
					<CardContent sx={{ p: 4, height: 1 }}>
						{Object.keys(customAttributes).map((k) => (
							<Box>
								<Box sx={{ width: 1 }}>
									<Typography variant="overline">{k}</Typography>
								</Box>
								<Box sx={{ width: 1 }}>
									<Typography variant="h4">{customAttributes[k]}</Typography>
								</Box>
							</Box>
						))}
					</CardContent>
				</Card>
			</Grid>
			<Grid key="token-information" item sm={4} xs={12}>
				<Card sx={{ my: 8, height: 600 }}>
					<CardContent sx={{ p: 4, height: 1 }}>
						<Typography
							gutterBottom
							variant="caption"
							component="div"
							align="center"
						></Typography>
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default ItemDetails;
