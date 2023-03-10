import axios from 'axios';

axios.defaults.baseURL = 'http://127.0.0.1:5000';
axios.defaults.headers.common['content-type'] = 'application/json';
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';


const tokenConfig = (token) => ({
	headers: {
		'Authorization': token,
	},
});

export function validate_token(token) {
	return axios.post('/api/is_token_valid', { token: token });
}

export function get_github_access() {
	window.open('/github-login', '_blank');
}

export function create_user(email, password) {
	return axios.post('api/create_user', {
		email,
		password,
	});
}

export function get_token(email, password) {
	return axios.post('api/get_token', {
		email,
		password,
	});
}

export function has_github_token(token) {
	return axios.get('api/has_github_token', tokenConfig(token));
}

export function data_about_user(token) {
	return axios.get('api/user', tokenConfig(token));
}