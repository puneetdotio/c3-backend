import React from "react";

const NoteCard = ({ note, noteForUpdate, deleteNote }) => {
	console.log(note);

	return (
		<div className="w-[30%] border p-3 flex flex-col gap-4 rounded-xl">
			<h1>{note.title}</h1>
			<p className="text-s">
				{note.description.length > 20
					? note.description.substring(0, 50)
					: note.description}
			</p>
			<div className="flex justify-between gap-3">
				<button
					onClick={() => noteForUpdate(note)}
					className="p-2 rounded-lg font-semibold bg-yellow-600 hover:bg-yellow-700 cursor-pointer "
				>
					Update
				</button>
				<button onClick={() => deleteNote(note._id)} className="p-2 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer font-semibold">
					Delete
				</button>
			</div>
		</div>
	);
};

export default NoteCard;
