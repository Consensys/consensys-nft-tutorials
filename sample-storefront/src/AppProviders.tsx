import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

/**
 * Setup all the global providers here
 */
const AppProviders = ({ children }: any) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default AppProviders;
