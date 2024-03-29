import useSWR from 'swr';

interface PostsProps {
	id: Number;
	title: string;
	subtitle: string;
	category: string;
	img: string;
	description: string;
	published: string;
	author: {
		name: string;
		img: string;
		designation: string;
	};
}

const baseURL = 'http://localhost:3000/';

const response = async (...args: Parameters<typeof fetch>) =>
	await fetch(...args).then(async res => await res.json());

const Fetcher = (endpoint: string) => {
	const { data, isLoading, error } = useSWR<PostsProps[], Error>(
		`${baseURL}${endpoint}`,
		response,
	);

	return {
		data: data,
		isLoading: isLoading,
		error: error,
	};
};

export const chunk = <T extends unknown>(
	arr: T[],
	chunkSize: number = 1,
	cache: T[][] = [],
) => {
	const tmp = [...arr];
	if (chunkSize <= 0) return cache;
	while (tmp.length) cache.push(tmp.splice(0, chunkSize));
	return cache;
};

export default Fetcher;
