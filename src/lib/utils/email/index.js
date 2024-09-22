import { dev } from '$app/environment';
import {
	EMAIL_HOST,
	EMAIL_PASSWORD,
	EMAIL_PORT,
	MAILGUN_API_KEY,
	MAILGUN_DOMAIN,
	NOREPLY_EMAIL
} from '$env/static/private';
import nodemailer from 'nodemailer';
import mg from 'nodemailer-mailgun-transport';

/**
 * @typedef {Object} EmailHtmlType
 * @property {string} title
 * @property {string} [style] - Optional style for email
 * @property {string} body
 */

/**
 * @typedef {Object} EmailDataType
 * @property {string} to - The recipient's email address
 * @property {string} subject
 * @property {string} [text] - Optional plain text version of email
 * @property {string} [user] - Optional user in case you want to use "private" email
 * @property {string} [from] - Optional sender's email address
 * @property {EmailHtmlType} html - HTML content of the email
 * @property {string} [reply_to] - Optional reply-to email address
 */

/**
 * Send an email
 * @param {EmailDataType} payload
 * @returns {Promise<void>}
 */
export async function send_mail(payload) {
	const { to, from: _from, subject, text, user, html: _html, reply_to } = payload;
	const from = _from ?? `No Reply <${NOREPLY_EMAIL}>`;
	const { title, style, body } = _html;
	const html = `<!doctype html>
		<html lang="en">
			<head>
				<title>${title}</title>
				<style>
					${style ?? ''}
					body {font-family: sans-serif;}
				</style>
			</head>
			<body>
				${body}			
			</body>
		</html>
	`;

	/**
	 * type {import("nodemailer").TransportOptions}
	 */
	let transport_argument;
	if (user) {
		// pass - use email/password functionality
		transport_argument = {
			host: EMAIL_HOST,
			port: +EMAIL_PORT,
			secure: !dev,
			auth: {
				user: user,
				pass: EMAIL_PASSWORD
			}
		};
	} else if (dev) {
		transport_argument = {
			host: EMAIL_HOST,
			port: EMAIL_PORT
		};
	} else {
		transport_argument = mg({
			auth: {
				api_key: MAILGUN_API_KEY,
				domain: MAILGUN_DOMAIN
			}
		});
	}

	const transporter = nodemailer.createTransport(transport_argument);
	if (dev) {
		try {
			await transporter.sendMail({ from, to, subject, text, html });
		} catch (err) {
			console.log('Sending mail failed. Here is the text content of the message:');
			console.log(text ?? html);
		}
	} else {
		await transporter.sendMail({ from, to, subject, text, html });
	}
}
