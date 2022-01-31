import { Card, CardContent, Grid, Typography, Box } from "@mui/material";
import { Item } from "../utils/types";
import isNil from "lodash/isNil";
import pickBy from "lodash/pickBy";
import EthAddress from "./EthAddress";
import { isEqual } from "lodash";
import ItemPreview from "./ItemPreview";

interface ItemDetailsProps {
	item: Item;
}

const INCLUDED_KEYS = [
	"Color",
	"Pattern",
	"Rarity",
	"Transparency",
	"address",
	"network_id",
	"symbol",
	"token_type",
];

const ItemDetails = ({ item }: ItemDetailsProps) => {
	const { attributes, token_contract } = item;

	const customAttributes = pickBy(
		attributes,
		(val, key) => INCLUDED_KEYS.includes(key) && !isNil(val) && val !== ""
	);

	const customTokenInfo: any = pickBy(
		token_contract,
		(val, key) => INCLUDED_KEYS.includes(key) && !isNil(val) && val !== ""
	);

	return (
		<Grid container spacing={4} justifyContent="space-between">
			<Grid key="image" item sm={4} xs={12}>
				<ItemPreview item={item} />
			</Grid>
			<Grid key="attributes" item sm={4} xs={12}>
				<Card sx={{ my: 8, height: 600 }}>
					<CardContent sx={{ p: 4, height: 1 }}>
						{Object.keys(customAttributes).map((k) => (
							<Box key={k}>
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
			<Grid key="contract-information" item sm={4} xs={12}>
				<Card sx={{ my: 8, height: 600 }}>
					<CardContent sx={{ p: 4, height: 1 }}>
						{Object.keys(customTokenInfo).map((k) => (
							<Box key={k}>
								<Box sx={{ width: 1 }}>
									<Typography variant="overline">{k}</Typography>
								</Box>
								<Box sx={{ width: 1 }}>
									{isEqual(k, "address") ? (
										<EthAddress
											address={customTokenInfo.address}
											networkId={token_contract.network_id}
										/>
									) : (
										<Typography variant="h4">{customTokenInfo[k]}</Typography>
									)}
								</Box>
							</Box>
						))}
					</CardContent>
				</Card>
			</Grid>
		</Grid>
	);
};

export default ItemDetails;
