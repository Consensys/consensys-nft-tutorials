import axios from "axios";

const createApiInstance = (options = {}) => {
	return axios.create({
		baseURL: process.env.REACT_APP_API_BASE_URL,
		headers: {
			"Content-Type": "application/json",
		},
	});
};

const apiInstance = createApiInstance();

export default apiInstance;
