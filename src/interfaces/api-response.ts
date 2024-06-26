export interface IApiResponse<M> {
	data: M;
	error: string;
	statusCode: number;
	success: boolean;
	message: string;
}