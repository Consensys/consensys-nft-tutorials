import { useQuery } from "react-query";
import { itemId } from "../config";
import apiInstance from "../utils/api";

export const fetchItem = async (itemId: string) => {
	const { data } = await apiInstance.get(`/v2/public/items/${itemId}`);
	return data;
};

export const useItem = () => {
	const { isError, isSuccess, data } = useQuery(["item", itemId], () => {
		if (!itemId) {
			return Error("Please set itemId in the .env.local file");
		}

		return fetchItem(itemId);
	});

	return {
		item: Boolean(data) ? data : null,
		isError,
		isSuccess,
	};
};
