import React from "react";

const NoteCard = ({ note, noteForUpdate, deleteNote }) => {
	return (
		<div className="w-[30%] border p-3 flex flex-col gap-4 rounded">
			<h1 className="font-semibold">{note.title}</h1>
			<p className="text-s">
				{note.description.length > 20
					? note.description.substring(0, 50)
					: note.description}
			</p>
			<div className="flex justify-between">
				<button onClick={() => noteForUpdate(note)} className="p-2 bg-yellow-600 text-white rounded cursor-pointer font-semibold hover:bg-yellow-500">Update</button>
				<button onClick={() => deleteNote(note._id)} className="p-2 bg-red-600 text-white rounded cursor-pointer font-semibold hover:bg-red-500">Delete</button>
			</div>
		</div>
	);
};

export default NoteCard;
