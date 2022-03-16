import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProviders from "./AppProviders";
import AuctionPage from "./pages/AuctionPage";

export default function App() {
	return (
		<AppProviders>
			<Router basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route key="home" path="/" element={<AuctionPage />} />
				</Routes>
			</Router>
		</AppProviders>
	);
}
