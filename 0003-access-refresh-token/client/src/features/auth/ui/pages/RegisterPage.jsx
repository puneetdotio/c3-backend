import { useNavigate } from "react-router";
import useApi from "../../api/useApi";
import { useAuthContext } from "../../state/context/AuthProvider";
import { useState } from "react";

const RegisterPage = () => {
	const api = useApi();
	const authContext = useAuthContext();

	const navigate = useNavigate();

	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function handleSubmit(e) {
		e.preventDefault();

		const response = await api.post("/auth/register", {
			name,
			email,
			password,
		});

		console.log(response.data);

		authContext.setAcceessToken(response.data.accessToken);
		authContext.setUser(response.data.user);

		navigate("/profile");
	}

	return (
		<div>
			<h1>Registration</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
					className="border p-2 rounded-sm"
				/>
				<input
					type="email"
					placeholder="john@doe.com"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="border p-2 rounded-sm"
				/>
				<input
					type="password"
					placeholder="********"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="border p-2 rounded-sm"
				/>
				<button className="border p-2 bg-blue-200 rounded-sm">Register</button>
			</form>
		</div>
	);
};

export default RegisterPage;
