import { QueryClientProvider, QueryClient } from "react-query";
import { setupWallets, WalletProvider } from "./components/WalletContext";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();
setupWallets();

/**
 * Setup all the global providers here
 */
const AppProviders = ({ children }: any) => (
	<QueryClientProvider client={queryClient}>
		<WalletProvider>{children}</WalletProvider>
		<ReactQueryDevtools initialIsOpen />
	</QueryClientProvider>
);

export default AppProviders;
