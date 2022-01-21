import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AppProviders from "./AppProviders";
import HomePage from "./pages/HomePage";

export default function App() {
	return (
		<AppProviders>
			<Router basename={process.env.PUBLIC_URL}>
				<Routes>
					<Route key="home" path="/" element={<HomePage />} />
				</Routes>
			</Router>
		</AppProviders>
	);
}
