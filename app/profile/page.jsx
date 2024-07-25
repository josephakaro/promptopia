'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const myProfile = () => {
	const { data: session } = useSession();
	const router = useRouter();

	const [posts, setPosts] = useState([]);

	const handleEdit = () => {
		// router.push(`/update-prompt?id=${post._id}`);
	};
	const handleDelete = async () => {
		// router.push(`/delete-prompt?id=${post._id}`);
	};

	useEffect(() => {
		const getPosts = async () => {
			const response = await fetch(
				`/api/users/${session?.user.id}/posts`
			);
			const data = await response.json();

			// setPosts(data);
			console.log(data);
		};

		getPosts();
	}, []);

	return (
		<Profile
			name="My"
			desc="Welcome to your profile page"
			data={posts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default myProfile;
