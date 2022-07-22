import React, { useState, useEffect } from 'react';

import axios from 'axios';

const client = axios.create({
	baseURL: 'https://dummyjson.com/products',
});

const App = () => {
	const [title, setTitle] = useState('');
	const [thumbnail, setBody] = useState('');
	const [posts, setPosts] = useState([]);

	// GET with Axios
	useEffect(() => {
		const fetchPost = async () => {
			try {
				let response = await client.get('?_limit=10');
				setPosts(response.data);
			} catch (error) {
				console.log(error);
			}
		};
		fetchPost();
	}, []);

	// DELETE with Axios
	const deletePost = async (id) => {
		try {
			await client.delete(`${id}`);
			setPosts(
				posts.filter((post) => {
					return post.id !== id;
				})
			);
		} catch (error) {
			console.log(error);
		}
	};

	// handle form submission
	const handleSubmit = (e) => {
		e.preventDefault();
		addPosts(title, thumbnail);
	};

	// POST with Axios
	const addPosts = async (title, thumbnail) => {
		try {
			let response = await client.post('', {
				title: title,
				thumbnail: thumbnail,
			});
			setPosts([response.data, ...posts]);
			setTitle('');
			setBody('');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="app">
			<nav>
				<h1>POSTS APP</h1>
			</nav>
			<div className="add-post-container">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						className="form-control"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<textarea
						name=""
						className="form-control"
						id=""
						cols="10"
						rows="8"
						value={thumbnail}
						onChange={(e) => setBody(e.target.value)}
					></textarea>
					<button type="submit">Add Post</button>
				</form>
			</div>
			<div className="posts-container">
				<h2>All Posts 📫</h2>
				{posts.map((post) => {
					return (
						<div className="post-card" key={post.id}>
							<h2 className="post-title">{post.title}</h2>
							<p className="post-body">{post.thumbnail}</p>
							<div className="button">
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default App;
