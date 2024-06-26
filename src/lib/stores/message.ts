import { writable } from 'svelte/store';
import type { IMessage } from '../../interfaces/message';

const defaultMessage: IMessage = {
	message: '',
	type: null,
	title: '',
	isOpen: false
};
export const message = writable<IMessage>(defaultMessage);

export function setMessage(msg: IMessage) {
	message.set(msg);
}

export function resetMessage() {
	message.set(defaultMessage);
}