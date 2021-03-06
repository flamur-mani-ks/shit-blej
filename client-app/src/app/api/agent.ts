import axios, { AxiosResponse } from 'axios';
import { IProduct, IProductsEnvelope } from '../models/product';
import { history } from '../..';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from '../models/user';
import { IPhoto, IProfile } from '../models/profile';
import { IJob } from '../models/job';
import { IContact } from '../models/contact';
import { IBlog } from '../models/blog';
import { ICity } from '../models/city';
import { IProductCategory } from '../models/productCategory';
import { IJobCategory } from '../models/jobCategory';
import { IBlogCategory } from '../models/blogCategory';
import { ITeamMember } from '../models/teamMember';
import { ITeamMemberPosition } from '../models/teamMemberPosition';

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(
	(config) => {
		const token = window.localStorage.getItem('jwt');
		if (token) config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(undefined, (error) => {
	if (error.message === 'Network Error' && !error.response) {
		toast.error('Network error - make sure API is running!');
	}
	const { status, data, config } = error.response;
	if (status === 404) {
		history.push('/notfound');
	}
	if (
		status === 400 &&
		config.method === 'get' &&
		data.errors.hasOwnProperty('id')
	) {
		history.push('/notfound');
	}
	if (status === 500) {
		toast.error('Server error - check the terminal for more info');
	}
	throw error.response;
});

const responseBody = (response: AxiosResponse) => response.data;

const sleep = (ms: number) => (response: AxiosResponse) =>
	new Promise<AxiosResponse>((resolve) =>
		setTimeout(() => resolve(response), ms)
	);

const requests = {
	get: (url: string) => axios.get(url).then(sleep(1000)).then(responseBody),
	post: (url: string, body: {}) =>
		axios.post(url, body).then(sleep(1000)).then(responseBody),
	put: (url: string, body: {}) =>
		axios.put(url, body).then(sleep(1000)).then(responseBody),
	del: (url: string) => axios.delete(url).then(sleep(1000)).then(responseBody),
	postForm: (url: string, file: Blob) => {
		let formData = new FormData();
		formData.append('File', file);
		return axios
			.post(url, formData, {
				headers: { 'Content-type': 'multipart/form-data' },
			})
			.then(responseBody);
	},
};

const Products = {
	list: (params: URLSearchParams): Promise<IProductsEnvelope> =>
		axios
			.get('/products', { params: params })
			.then(sleep(1000))
			.then(responseBody),
	details: (id: string) => requests.get(`/products/${id}`),
	create: (product: IProduct) => requests.post('/products/', product),
	update: (product: IProduct) =>
		requests.put(`/products/${product.id}`, product),
	delete: (id: string) => requests.del(`/products/${id}`),
};

const User = {
	current: (): Promise<IUser> => requests.get('/user'),
	login: (user: IUserFormValues): Promise<IUser> =>
		requests.post(`/user/login`, user),
	register: (user: IUserFormValues): Promise<IUser> =>
		requests.post(`/user/register`, user),
};

const Profiles = {
	get: (username: string): Promise<IProfile> =>
		requests.get(`/profiles/${username}`),
	uploadPhoto: (photo: Blob): Promise<IPhoto> =>
		requests.postForm(`/photos`, photo),
	setMainPhoto: (id: string) => requests.post(`/photos/${id}/setMain`, {}),
	deletePhoto: (id: string) => requests.del(`/photos/${id}`),
	updateProfile: (profile: Partial<IProfile>) =>
		requests.put(`/profiles`, profile),
	listProducts: (username: string) =>
		requests.get(`/profiles/${username}/products`),
	listJobs: (username: string) => requests.get(`/profiles/${username}/jobs`),
	listBlogs: (username: string) => requests.get(`/profiles/${username}/blogs`),
	listAllProfiles: (): Promise<IProfile[]> => requests.get('/profiles'),
	deleteProfile: (username: string) => requests.del(`/profiles/${username}`),
	follow: (username: string) =>
		requests.post(`/profiles/${username}/follow`, {}),
	unfollow: (username: string) => requests.del(`/profiles/${username}/follow`),
	listFollowings: (username: string, predicate: string) =>
		requests.get(`/profiles/${username}/follow?predicate=${predicate}`),
};

const Jobs = {
	list: (): Promise<IJob[]> => requests.get('/jobs'),
	details: (id: string) => requests.get(`/jobs/${id}`),
	create: (job: IJob) => requests.post('/jobs', job),
	update: (job: IJob) => requests.put(`/jobs/${job.id}`, job),
	delete: (id: string) => requests.del(`/jobs/${id}`),
};

const Contacts = {
	list: (): Promise<IContact[]> => requests.get('/contacts'),
	details: (id: string) => requests.get(`/contacts/${id}`),
	create: (job: IContact) => requests.post('/contacts', job),
	delete: (id: string) => requests.del(`/contacts/${id}`),
};

const Blogs = {
	list: (): Promise<IBlog[]> => requests.get('/blogs'),
	details: (id: string) => requests.get(`/blogs/${id}`),
	create: (job: IBlog) => requests.post('/blogs', job),
	update: (job: IBlog) => requests.put(`/blogs/${job.id}`, job),
	delete: (id: string) => requests.del(`/blogs/${id}`),
};

const Cities = {
	list: (): Promise<ICity[]> => requests.get('/cities'),
	create: (city: ICity) => requests.post('/cities', city),
	update: (city: ICity) => requests.put(`/cities/${city.id}`, city),
	delete: (id: string) => requests.del(`/cities/${id}`),
};

const ProductCategories = {
	list: (): Promise<IProductCategory[]> => requests.get('/productCategories'),
	create: (productCategory: IProductCategory) =>
		requests.post('/productCategories', productCategory),
	update: (productCategory: IProductCategory) =>
		requests.put(`/productCategories/${productCategory.id}`, productCategory),
	delete: (id: string) => requests.del(`/productCategories/${id}`),
};

const JobCategories = {
	list: (): Promise<IJobCategory[]> => requests.get('/jobCategories'),
	create: (jobCategory: IJobCategory) =>
		requests.post('/jobCategories', jobCategory),
	update: (jobCategory: IJobCategory) =>
		requests.put(`/jobCategories/${jobCategory.id}`, jobCategory),
	delete: (id: string) => requests.del(`/jobCategories/${id}`),
};

const BlogCategories = {
	list: (): Promise<IBlogCategory[]> => requests.get('/blogCategories'),
	create: (blogCategory: IBlogCategory) =>
		requests.post('/blogCategories', blogCategory),
	update: (blogCategory: IBlogCategory) =>
		requests.put(`/blogCategories/${blogCategory.id}`, blogCategory),
	delete: (id: string) => requests.del(`/blogCategories/${id}`),
};

const TeamMembers = {
	list: (): Promise<ITeamMember[]> => requests.get('/teamMembers'),
	create: (teamMember: ITeamMember) =>
		requests.post('/teamMembers', teamMember),
	update: (teamMember: ITeamMember) =>
		requests.put(`/teamMembers/${teamMember.id}`, teamMember),
	delete: (id: string) => requests.del(`/teamMembers/${id}`),
};

const TeamMemberPositions = {
	list: (): Promise<ITeamMemberPosition[]> => requests.get('/teamMemberPositions'),
	create: (teamMemberPosition: ITeamMemberPosition) =>
		requests.post('/teamMemberPositions', teamMemberPosition),
	update: (teamMemberPosition: ITeamMemberPosition) =>
		requests.put(`/teamMemberPositions/${teamMemberPosition.id}`, teamMemberPosition),
	delete: (id: string) => requests.del(`/teamMemberPositions/${id}`),
};


export default {
	Products,
	User,
	Profiles,
	Jobs,
	Contacts,
	Blogs,
	Cities,
	ProductCategories,
	BlogCategories,
	JobCategories,
	TeamMembers,
	TeamMemberPositions
};
