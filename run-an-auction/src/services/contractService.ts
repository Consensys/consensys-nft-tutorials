import { useQuery } from "react-query";
import apiInstance from "../utils/api";
import find from "lodash/find";

export interface PlatformContract {
	address: string;
	name: string;
	network_id: number;
}

export const fetchContracts = async () => {
	const { data } = await apiInstance.get(`/v2/public/contracts`);
	return data;
};

export const usePlatformContract = (
	contractName: string,
	networkId: number
) => {
	const { status, data } = useQuery(
		["contractByName", contractName, networkId],
		async () => {
			const contracts = await fetchContracts();
			const contract = find(contracts, (c: any) => {
				return c.name === contractName && c.network_id === networkId;
			});
			return contract;
		}
	);

	return {
		contract: (data as PlatformContract) || undefined,
		status,
	};
};
