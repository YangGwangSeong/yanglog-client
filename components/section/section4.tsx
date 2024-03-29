import Image from 'next/image';
import Link from 'next/link';
import Author from '../_child/author';
import Spinner from '../_child/spinner';
import Error from '../_child/error';
import fetcher from '../../lib/fetcher';
import { FC } from 'react';
import { PostType } from '@/shared/interfaces/home.interface';

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

const section4: FC<{ popular: PostType[] }> = popular => {
	const { popular: data } = popular;

	return (
		<section className="container mx-auto md:px-20 py-16">
			<div className="grid lg:grid-cols-2">
				<div className="item">
					<h1 className="font-bold text-5xl py-12 text-center">Business</h1>
					<div className="flex flex-col gap-6">
						{/* { Post() } */}
						{data && data[0] ? <Post data={data[0]}></Post> : null}
						{data && data[1] ? <Post data={data[1]}></Post> : null}
						{data && data[2] ? <Post data={data[2]}></Post> : null}
					</div>
				</div>
				<div className="item">
					<h1 className="font-bold text-5xl py-12 text-center">Travel</h1>
					<div className="flex flex-col gap-6">
						{/* { Post() } */}
						{data && data[3] ? <Post data={data[3]}></Post> : null}
						{data && data[4] ? <Post data={data[4]}></Post> : null}
						{data && data[5] ? <Post data={data[5]}></Post> : null}
					</div>
				</div>
			</div>
		</section>
	);
};
const Post: FC<{ data: PostType }> = ({ data }) => {
	const { id, title, subtitle, description, category, img, published, author } =
		data;

	return (
		<div className="flex gap-5">
			<div className="image flex flex-col justify-start">
				<Link href={`/posts/${id}`}>
					<a>
						<Image
							src={img || '/'}
							className="rounded"
							width={300}
							height={250}
							alt={'/'}
						></Image>
					</a>
				</Link>
			</div>
			<div className="info flex justify-center flex-col">
				<div className="cat">
					<Link href={`/posts/${id}`}>
						<a className=" text-orange-600 hover:text-orange-800">
							{category || null}
						</a>
					</Link>
					<Link href={`/posts/${id}`}>
						<a className=" text-gray-800 hover:text-gray-600">
							- {published.slice(0, 7) || null}
						</a>
					</Link>
				</div>
				<div className="title">
					<Link href={`/posts/${id}`}>
						<a className=" text-xl font-bold text-gray-800 hover:text-gray-600">
							{title || null}
						</a>
					</Link>
				</div>
				{author ? <Author author={author}></Author> : null}
			</div>
		</div>
	);
};

export default section4;
