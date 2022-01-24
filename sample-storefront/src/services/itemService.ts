import { useQuery } from "react-query";
import { collectionId, organizationId } from "../config";
import apiInstance from "../utils/api";

const fetchItem = async (itemId: string) => {
	const { data } = await apiInstance.get(`/v2/public/items/${itemId}`);
	return data;
};

export const useItem = (itemId: string) => {
	const { status, data } = useQuery(["item", itemId], () => fetchItem(itemId));

	return Boolean(data)
		? {
				item: data,
				status,
		  }
		: {
				item: null,
				status,
		  };
};

const fetchItems = async (organizationId: string, collectionId: string) => {
	let searchParams = new URLSearchParams();
	searchParams.set("collection_id", collectionId);

	const { data } = await apiInstance.get(
		`/v2/public/${organizationId}/items?${searchParams}`
	);
	return data;
};

export const useItems = () => {
	const { status, data } = useQuery(
		["items", organizationId, collectionId],
		() => {
			if (!organizationId || !collectionId) {
				return Error(
					"Please set organizationId and collectionId in the .env.local file"
				);
			}

			return fetchItems(organizationId, collectionId);
		}
	);

	return Boolean(data)
		? {
				items: data.items,
				status,
		  }
		: {
				items: [],
				status,
		  };
};
