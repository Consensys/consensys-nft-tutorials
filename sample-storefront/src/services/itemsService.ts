import { useQuery } from "react-query";
import { collectionId, organizationId } from "../config";
import apiInstance from "../utils/api";

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
			console.log("OrgId: ", organizationId);
			console.log("collectionId:  ", collectionId);
			if (!organizationId || !collectionId) {
				return;
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
