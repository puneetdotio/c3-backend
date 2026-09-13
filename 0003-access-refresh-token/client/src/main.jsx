import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./app/routes/AppRoutes.jsx";
import AuthProvider from "./features/auth/state/context/AuthProvider.jsx";

createRoot(document.getElementById("root")).render(
	<AuthProvider>
		<AppRoutes />
	</AuthProvider>,
);
