import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import {
  Avatar,
  Box,
  Button,
  Container,
  MenuItem,
  TextField,
  Typography
} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import jwtDecode from 'jwt-decode';
import {
  ChangeEvent, Fragment, KeyboardEvent,
  useCallback,
  useEffect,
  useState
} from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import api from '../api.js';
import loginLogo from '../icons/loginLogo.svg';

// axios.defaults.baseURL = 'http://jisangdev.iptime.org:805/api'
const Login = () => {
	const [btnText, setBtnText] = useState('Login with sellmate');
	const [inputVal, setInputVal] = useState('');
	const [error, setError] = useState(false);

	interface User {
		email: string;
		name: string;
		nick_name: string;
		picture: string;
		uid: string;
		floor: string;
		type: string;
		access_token: string;
	}
	const [user, setUser] = useState<User>({
		email: '',
		name: '',
		nick_name: '',
		picture: '',
		uid: '',
		floor: '3',
		type: 'basic',
		access_token: '',
	});
	const [errorMsg, setErrorMsg] = useState<string>('');
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInputVal(event.target.value);
		setUser((val) => ({ ...val, nick_name: event.target.value }));
		setErrorMsg('');
		setError(false);
	};

	const navigate = useNavigate();
	const getLoginData = () => {
    let tokenObj: any = {};
		return new Promise(() => {
			api
				.post(`auth/login?email=${user.email}&uid=${user.uid}`)
				.then((res: any) => {
					tokenObj = res.data;
					// TODO: useState가 promise 안에서 바로 바뀌지 않는 문제가 있음
					const userDataWithToken = { ...user, ...res.data };
					setUser(() => userDataWithToken);
				})
				.catch((error: any) => {
          setError(true);
          setErrorMsg(error.response.data.detail);
				})
				.finally(() => {
          if (tokenObj.access_token) {
            setError(() => false);
            setErrorMsg(() => '');
            localStorage.setItem('user', JSON.stringify({ ...user, access_token: tokenObj.access_token }));
            navigate('/');
          }
        });
		});
	};

	const getJoinData = () => {
		return new Promise(() => {
			api
				.post('auth/join', JSON.stringify(user))
				.then((res: any) => {
					setUser(() => ({ ...user, ...res.data }));
				})
				.catch((error) => {
          setError(true);
          setErrorMsg(error.response.data.detail);
				})
				.finally(() => {
          setTimeout(() => {
            setError(false);
            setErrorMsg('');
            getLoginData();
          }, 500)
				});
		});
	};

	const onClickLogin = async () => {
		if (btnText !== '입장') {
			// 구글 로그인
			const googleLoginUrl = 'https://accounts.google.com/o/oauth2/v2/auth?';
			const payload = {
				client_id:
					'613413749609-rd34eq6q0irj1fjpqsp8m6b5ekd3d9v4.apps.googleusercontent.com',
				scope: 'openid profile email',
				// TODO: env 파일 분리 필요
				redirect_uri: 'http://localhost:3000/login',
				response_type: 'id_token',
				nonce:
					Math.random().toString(36).substring(2, 15) +
					Math.random().toString(36).substring(2, 15),
			};
			const queryString = new URLSearchParams(payload).toString();
			window.location.assign(googleLoginUrl + queryString);
			return;
		}
		// 구글 로그인 되면 입장으로 바꾸고 닉 + 층수 선택 후 입장 클릭 시 메인 이동
		if (!inputVal) {
			setError(true);
			setErrorMsg('닉네임을 입력해주세요');
		} else {
			// TODO: redux 사용 필요
			// api 메서드 컴포넌트 필요
			getJoinData();
		}
	};

	const checkRedirectUrl = useCallback(() => {
		const hashedParam: any = new URLSearchParams(
			window.location.hash.substr(1)
		);
		const idToken = hashedParam.get('id_token');

		if (idToken) {
			const { email, name, sub, picture }: any = jwtDecode(idToken);
			setBtnText('입장');
			setUser((val) => ({ ...val, email, name, picture, uid: sub }));
		}
	}, []);
  
	useEffect(() => {
		checkRedirectUrl();
	}, [checkRedirectUrl]);

  const floorOptions = [
		{ name: '3층', value: '3' },
		{ name: '5층', value: '5' },
		{ name: '11층', value: '11' },
	];
	const [floorValue, setFloorValue] = useState('3');

	const onEnterLogin = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			onClickLogin();
		}
	};
  const onChangeFloor = (event: SelectChangeEvent<string>) => {
    setFloorValue(event.target.value);
		setUser((val) => ({ ...val, floor: event.target.value }));
  }

	return (
		<Container
			sx={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'space-between',
			}}>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					height: '100%',
					justifyContent: 'center',
				}}>
				<Avatar
					src={loginLogo}
					variant='rounded'
					sx={{
						width: '348px',
						height: '47px',
						marginBottom: btnText === '입장' ? '80px' : '60px',
					}}
				/>
				{btnText === '입장' && (
          <Fragment>
					<Wrapper>
						<TextField
							variant='outlined'
							placeholder='닉네임을 입력해주세요!'
							error={error}
							defaultValue={inputVal}
							onChange={handleInputChange}
							onKeyPress={onEnterLogin}
							sx={{
								mb: !error ? '24px' : '0px',
                mr: '15px',
								width: '252px',
								height: '66px',
								justifyContent: 'center',
								'& > .MuiOutlinedInput-root': {
									height: '100%',
									borderRadius: '16px',
									borderColor: '#E0E0E0',
									p: '20px 24px',
									'& > .MuiOutlinedInput-input': {
										height: '24px',
										p: '0',
									},
								},
							}}
						/>
            <Select
              onChange={onChangeFloor}
              value={floorValue}
              sx={{ height: '66px', p: '8px 16px 8px 10px', '& > .MuiInputBase-input': { p: 0 }, border: '1px solid #E0E0E0', borderRadius: '16px', 'fieldset': { display: 'none' } }}
              IconComponent={() => (
                <KeyboardArrowDownRoundedIcon
                  sx={{ color: '#8C8C8C', fontSize: '16px' }}
                />
              )}>
              {floorOptions.map((floor, idx) => (
                <MenuItem sx={{p: 0, 'ul': {p: 0}}} key={idx} value={floor.value}>
                  {floor.name}
                </MenuItem>
              ))}
            </Select>
					</Wrapper>
          {error && (
            <Typography
              variant='caption'
              sx={{
                color: 'red',
                fontSize: '14px',
                fontWeight: 400,
                mb: '24px',
              }}>
              {errorMsg}
            </Typography>
          )}
          </Fragment>
				)}
				<Button
					variant='contained'
					onClick={onClickLogin}
					disableElevation
					id='loginBtn'
					sx={{
						color: 'white',
						backgroundColor: '#00BAF4',
						fontSize: '16px',
						fontWeight: 600,
						width: '368px',
						height: '66px',
						borderRadius: '16px',
						textTransform: 'none',
						p: '20px 24px',
						'&:hover': {
							backgroundColor: '#9CE2F8',
						},
					}}>
					{btnText}
				</Button>
			</Box>
			<Typography
				variant='caption'
				display='block'
				align='center'
				noWrap
				sx={{ color: '#C8C8C8', marginBottom: '85px' }}>
				Copyright © Since 2022 Sellmate Ltd. All right reserved.
			</Typography>
		</Container>
	);
};
export default Login;
const Wrapper = styled.div`
display: flex;

`