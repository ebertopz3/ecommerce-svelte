import type { IAuth, IAuthResponse } from '../interfaces/auth';
import type { IApiResponse } from '../interfaces/api-response';
import { postFetch } from './base.services';
import { settingsUri } from './setting-endpoint';

export const authUser = async (data: IAuth): Promise<IApiResponse<IAuthResponse>> => {
	return postFetch<IAuthResponse, IAuth>(settingsUri.user.auth, data);
};