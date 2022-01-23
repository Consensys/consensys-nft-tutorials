import { QueryClientProvider, QueryClient } from "react-query";
import { setupWallets, WalletProvider } from "./components/WalletContext";

const queryClient = new QueryClient();
setupWallets();

/**
 * Setup all the global providers here
 */
const AppProviders = ({ children }: any) => (
	<QueryClientProvider client={queryClient}>
		<WalletProvider>{children}</WalletProvider>
	</QueryClientProvider>
);

export default AppProviders;
