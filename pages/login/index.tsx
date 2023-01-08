import { AxiosError } from 'axios';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import React from 'react';
import { useMutation } from 'react-query';
import { useRecoilState } from 'recoil';
import { saveToStorage } from '../../api/axiosInstance';
import { loginUser } from '../../api/userService';
import { loginAtom } from '../../atoms/loginAtom';
import ToastMessage from '../../components/toast';
import { LoginToken, User } from '../../interfaces/user';

const Login: NextPage = () => {
	const router = useRouter();
	const [loginState, setLoginState] = useRecoilState(loginAtom);

	const [inputs, setInputs] = React.useState<User>({
		email: '',
		password: '',
	});

	const { email, password } = inputs;

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		setInputs({
			...inputs,
			[name]: value,
		});
	};

	interface toastFunc {
		(type: 'success' | 'error' | 'info' | 'warning', message: string): void;
	}

	const notify: toastFunc = React.useCallback((type, message) => {
		ToastMessage({ type, message });
	}, []);

	const loginMutation = useMutation<LoginToken, AxiosError, User>(
		({ email, password }) => loginUser({ email, password }),
		{
			onMutate: variable => {
				//console.log("onMutate", variable);
				//variable : {loginId: 'xxx', password; 'xxx'}
			},
			onSuccess: data => {
				//console.log("onsuccess",data);
				//if(typeof window !== 'undefined') {
				//    return window.localStorage.setItem("accessToken",data.accessToken);
				//}
				// 로그인 성공 했을때 토큰은 로컬 스토리지에 저장.
				saveToStorage('accessToken', data.accessToken);
				setLoginState({ loginState: true });
				// accessToken으로 해당 회원 조회해서 recoil에 담자.

				router.push('/');
			},
			onError: error => {
				if (error.response?.status === 404) {
					notify('error', '유저가 존재하지 않습니다');
				}
			},
		},
	);

	const handleSubmit = (e: React.SyntheticEvent) => {
		e.preventDefault();
		const target = e.target as typeof e.target & {
			email: { value: string };
			password: { value: string };
		};
		const email = target.email.value;
		const password = target.password.value;

		loginMutation.mutate({ email, password });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="container">
				<div>
					<input
						className="border-solid border border-black"
						name="email"
						type="text"
						onChange={handleChange}
						value={email}
					></input>
				</div>
				<div>
					<input
						className="border-solid border border-black"
						name="password"
						type="text"
						onChange={handleChange}
						value={password}
					></input>
				</div>
				<div>
					<button className="bg-blue-500 text-white p-2" type="submit">
						로그인
					</button>
				</div>
			</div>
		</form>
	);
};

export default Login;
