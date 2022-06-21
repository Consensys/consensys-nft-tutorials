import axios from "axios";
import { apiBaseUrl } from "../config";

const createApiInstance = (options = {}) => {
	return axios.create({
		baseURL: apiBaseUrl,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

const apiInstance = createApiInstance();

export default apiInstance;
