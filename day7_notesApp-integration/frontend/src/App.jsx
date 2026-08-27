import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import NoteCard from "./components/NoteCard";

const App = () => {
	const [formValues, setFormValues] = useState({
		title: "",
		description: "",
	});
	const [updateNoteId, setUpdateNoteId] = useState(null);
	const [allNotes, setAllNotes] = useState([]);

	const handleChange = (e) => {
		setFormValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	let getAllNotes = async () => {
		try {
			let res = await axios.get(`http://localhost:3000/notes/allNotes`);
			console.log(res);
			setAllNotes(res.data.data);
		} catch (error) {
			console.log("error in get all notes api ", error);
		}
	};

	useEffect(() => {
		getAllNotes();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (updateNoteId) {
			// api call for update note
			let res = await axios.put(
				`http://localhost:3000/notes/${updateNoteId}`,
				formValues,
			);
			console.log(res);
			setUpdateNoteId(null);
		} else {
			// api call for create note
			let res = await axios.post(
				`http://localhost:3000/notes/create`,
				formValues,
			);
			console.log(res);
		}

		setFormValues({
			title: "",
			description: "",
		});

		getAllNotes();
	};

	const deleteNote = async (id) => {
		try {
			let res = await axios.delete(`http://localhost:3000/notes/${id}`);
			console.log(res);
			getAllNotes();
		} catch (error) {
			console.log("Error in delete note", error);
		}
	};

	const noteForUpdate = async (note) => {
		console.log(note);
		setUpdateNoteId(note._id);
		setFormValues({
			title: note.title,
			description: note.description,
		});
	};

	return (
		<div className="h-screen p-5 flex flex-col gap-5">
			<h1 className="text-3xl font-semibold">Notes App</h1>

			<form
				onSubmit={handleSubmit}
				className="flex flex-col w-70 border gap-5  p-4 rounded"
			>
				<input
					onChange={handleChange}
					value={formValues.title}
					className="p-2 outline-none text-xl rounded border"
					type="text"
					placeholder="Title"
					name="title"
				/>
				<input
					onChange={handleChange}
					value={formValues.description}
					className="p-2 outline-none text-xl rounded border"
					type="text"
					placeholder="Description"
					name="description"
				/>
				<button className="bg-blue-600 hover:bg-blue-500 font-semibold p-2 rounded text-white cursor-pointer">
					{updateNoteId ? "Update Note" : "Add Note"}
				</button>
			</form>

			<div className="flex flex-wrap gap-4">
				{allNotes.map((val) => {
					return (
						<NoteCard
							key={val._id}
							note={val}
							noteForUpdate={noteForUpdate}
							deleteNote={deleteNote}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default App;
