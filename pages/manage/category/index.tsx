import Spinner from '@/components/_child/spinner';
import Error from '@/components/_child/error';
import Category from '@/components/sceens/manage/category/Category';
import { CategoryService } from '@/services/category/category.service';
import { CategoryInfo } from '@/shared/interfaces/category.interface';
import { GetStaticProps, NextPage } from 'next';
import React from 'react';
import { QueryClient, dehydrate, useQuery } from 'react-query';

const CategoryPage: NextPage = () => {
	const { data, isLoading, isError } = useQuery(
		['categories'],
		async () => await CategoryService.getCategory(),
	);

	if (isLoading) {
		return <Spinner></Spinner>;
	}
	if (isError) {
		return <Error></Error>;
	}

	if (!data) {
		return null;
	}

	return <Category {...data}></Category>;
};

export default CategoryPage;

export const getStaticProps: GetStaticProps = async context => {
	const queryClient = new QueryClient();

	await queryClient.prefetchQuery<CategoryInfo[]>(
		['categories'],
		async () => await CategoryService.getCategory(),
	);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
