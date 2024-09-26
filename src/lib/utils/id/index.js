import { customAlphabet } from 'nanoid';
export const nanoid = customAlphabet('123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz');

/**
 * @typedef {Object} Prefixes
 * @property {string} session
 * @property {string} user
 */

/** @type {Readonly<Prefixes>} */
const prefixes = {
	session: 'session',
	user: 'user'
};

/**
 * Generates a new ID with a specified prefix
 * @param {keyof Prefixes}
 * @return {string}
 */
export function new_id(prefix) {
	return [prefixes[prefix], nanoid(16)].join('-');
}
