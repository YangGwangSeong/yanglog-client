import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { getFromStorage } from '../../../api/axiosInstance';
import { checkUser } from '../../../api/userService';
import { loginAtom, resetOptionsLoginAtom } from '../../../atoms/loginAtom';

type AppLayoutProps = {
	children: React.ReactNode;
};

const Root = ({ children }: AppLayoutProps) => {
	const [LoginState, SetLoginState] = useRecoilState(loginAtom);
	// const queryClient = useQueryClient();
	// const previousValue = queryClient.getQueryData('post');
	// console.log(previousValue);
	// useQueryClient와 getQueryData를 이용해서 /posts/[postId].tsx에서 useQuery에 저장된 데이터 가져와짐. 만약 post 에 방문 헀으면
	// 새로고침해서 메인페이지로 오면 당연히 사라짐.

	const accessToken = getFromStorage('accessToken');
	const refreshData = useCallback(async () => {
		const data = await checkUser(accessToken ? accessToken : '');
		return data;
	}, [accessToken]);
	useEffect(() => {
		const fetchData = async () => {
			if (accessToken) {
				const response = await refreshData();
				SetLoginState({
					loginState: response.loginState,
					id: response.id,
					name: response.name,
					email: response.email,
				});
			} else {
				SetLoginState(resetOptionsLoginAtom);
			}
		};
		fetchData();
	}, [SetLoginState, refreshData, accessToken]);

	return <>{children}</>;
};

export default Root;
