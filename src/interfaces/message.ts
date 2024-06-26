export interface IMessage {
	type: 'error' | 'success' | 'info' | 'warning' | null,
	message: string,
	title?: string,
	isOpen: boolean
}