import { ENDPOINTS } from '../../constants';
import { httpGet, httpPost } from '../../utils';

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  language: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  user: User;
  accessToken: string;
}

// The backend wraps payloads in `body` and sends the session token as `loginToken`
interface UserResponse {
  body: { user: User };
  loginToken?: string;
}

const toAuthResult = (response: UserResponse): AuthResult => ({
  user: response.body.user,
  accessToken: response.loginToken ?? '',
});

export const register = async (input: RegisterInput): Promise<AuthResult> =>
  toAuthResult(await httpPost<UserResponse>(ENDPOINTS.users.register, input));

export const login = async (input: LoginInput): Promise<AuthResult> =>
  toAuthResult(await httpPost<UserResponse>(ENDPOINTS.users.login, input));

export const fetchMe = async (): Promise<User> => (await httpGet<UserResponse>(ENDPOINTS.users.me)).body.user;
