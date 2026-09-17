import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import UrlData from "./components/UrlData";

const App = () => {
	const [urls, setUrls] = useState([]);
	const [inputValue, setInputValue] = useState("");
	const [currentUrl, setCurrentUrl] = useState(null);

	const getUrls = async () => {
		try {
			const res = await axios.get("http://localhost:5173/api/url");
			console.log(res.data.data.urls);
			setUrls(res.data.data.urls);
		} catch (error) {
			console.log("Error while fetching the urls data", error);
		}
	};

	const createShortUrl = async () => {
		const response = await axios.post(`http://localhost:5173/api/url`, {
			url: inputValue,
		});

		setCurrentUrl({
			originalUrl: response.data.data.originalUrl,
			shortCode: response.data.data.shortCode,
		});

		getUrls();
	};

	const deleteUrl = async (id) => {
		await axios.delete(`http://localhost:5173/api/url/${id}`);

		getUrls();
	};

	useEffect(() => {
		getUrls();
	}, []);

	return (
		<div className="flex flex-col gap-4 min-h-screen bg-zinc-100 p-6 dark:bg-zinc-950">
			<div className="w-full max-w-4xl p-2 flex  gap-2 bg-zinc-600 mx-auto rounded-xl text-white font-semibold justify-between px-4 mb-5">
				<input
					type="text"
					className="border rounded w-full p-2"
					placeholder="Enter a Long url"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>

				<button className="rounded p-2 bg-orange-600" onClick={createShortUrl}>
					Shorten
				</button>
			</div>

			<div className="mx-auto max-w-3xl">
				{urls.map((val) => {
					return <UrlData deleteUrl={deleteUrl} key={val._id} value={val} />;
				})}
			</div>
		</div>
	);
};

export default App;
