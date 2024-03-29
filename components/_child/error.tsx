import React, { FC } from 'react';
import Image from 'next/image';

const error: FC = () => {
	return (
		<div className="text-center py-10">
			<h1 className="text-3xl font-bold text-orange-600 py-10">Error</h1>
			<Image
				src={'/images/error.jpg'}
				width={600}
				height={400}
				alt={'/'}
			></Image>
		</div>
	);
};

export default error;
