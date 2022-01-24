import apiInstance from "../utils/api";
import querystring from "querystring";

export const fetchContracts = async (chainId: number) => {
	const networkParams = querystring.encode({
		network_id: chainId,
	});
	const { data } = await apiInstance.get(
		`/v2/public/contracts?${networkParams}`
	);
	return data;
};
