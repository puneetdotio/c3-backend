import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const App = () => {
	const { register, handleSubmit } = useForm();

  const submitHandler = async (data) => {
    console.log(data)

    const formData = new FormData();

    formData.append("name", data.name)
    formData.append("email", data.email)

    for (let i = 0; i < data.images.length; i++){
      formData.append("images", data.images[i])
    }

    await axios.post(`http://localhost:3000/user/create`, formData, {
      withCredentials: true,
    })
  }
  
	return (
		<div>
			<form onSubmit={handleSubmit(submitHandler)}>
				<input
					{...register("name")}
					type="text"
					placeholder="enter your name"
				/>
				<br />
				<input
					{...register("email")}
					type="email"
					placeholder="enter your email"
				/>
				<br />
				<input
					{...register("images")}
					type="file"
					placeholder="enter your profile pic"
				/>
				<br />
				<button>Submit</button>
			</form>
		</div>
	);
};

export default App;
