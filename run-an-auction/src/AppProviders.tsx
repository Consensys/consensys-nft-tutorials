import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { setupWallets, WalletProvider } from "./components/WalletContext";

const queryClient = new QueryClient();
setupWallets();

const AppProviders = ({ children }: any) => (
	<QueryClientProvider client={queryClient}>
		<WalletProvider>{children}</WalletProvider>
		<ReactQueryDevtools initialIsOpen />
	</QueryClientProvider>
);

export default AppProviders;
