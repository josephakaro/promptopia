'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Form from '@components/Form';

const EditPrompt = () => {
	const router = useRouter();
	const searchParams = useSearchParams();
	const promptId = searchParams.get('id');

	const [submitting, setSubmitting] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});

	useEffect(() => {
		const getPromptDetails = async () => {
			const response = await fetch(`/api/prompt/${promptId}`);
			const data = await response.json();

			setPost({
				prompt: data.prompt,
				tag: data.tag,
			});
		};
		if (promptId) {
			getPromptDetails();
		}
	}, [promptId]);

	return (
		<Form
			type="Edit"
			post={post}
			setPost={setPost}
			submitting={setSubmitting}
			handleSubmit={() => {}}
		/>
	);
};

export default EditPrompt;
