import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProviders from "./AppProviders";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";

export default function App() {
	return (
		<AppProviders>
			<Router basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route key="home" path="/" element={<HomePage />} />
					<Route key="item" path={`/items/:itemId`} element={<ItemPage />} />
				</Routes>
			</Router>
		</AppProviders>
	);
}
