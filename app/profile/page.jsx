'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const myProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const [posts, setPosts] = useState([]);

	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			'Are you sure you want to delete this prompt?'
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: 'DELETE',
				});

				const filteredPosts = posts.filter((p) => p._id !== post._id);
				setPosts(filteredPosts);
			} catch (error) {
				console.log(error);
			}
		}
		router.push(`/delete-prompt?id=${post._id}`);
	};

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(
				`/api/users/${session?.user._id}/posts`
			);
			const data = await response.json();

			setPosts(data);
		};

		if (session?.user._id) fetchPosts();
	}, []);

	return (
		<Profile
			name="My"
			desc="Welcome to your profile page"
			data={posts}
			handleEdit={() => {}}
			handleDelete={handleDelete}
		/>
	);
};

export default myProfile;
