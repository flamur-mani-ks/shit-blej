import { action, computed, observable, runInAction } from 'mobx';
import {SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import { history } from '../..';
import agent from '../api/agent';
import { createAttendee } from '../common/util/util';
import { IBlog } from '../models/blog';
import { RootStore } from './rootStore';


export default class BlogStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable blogRegistry = new Map();
	@observable loadingInitial = false;
	@observable blog: IBlog | null = null;
	@observable submitting = false;
	@observable target = '';

	@computed get blogsByDate() {
		return Array.from(this.blogRegistry.values()).sort(
			(a, b) => b.date!.getTime() - a.date!.getTime()
		);
	}

	// @computed get blogsByDate() {
	// 	return this.groupBlogsByCategory(Array.from(this.blogRegistry.values()));
	// }

	// helper function for grouping blogs by category
	// groupBlogsByCategory (blogs: IBlog[]){
	// 	return Object.entries(blogs.reduce((blogs, blog) => {
	// 		const category = blog.category;
	// 		blogs[category] = blogs[category] ? [...blogs[category], blog] : [blog];
	// 		return blogs;
	// 	}, {} as {[key: string]: IBlog[]}));
	// }

	@action loadBlogs = async () => {
		this.loadingInitial = true;
		const user = this.rootStore.userStore.user!;
		try {
			const blogs = await agent.Blogs.list();
			runInAction('loading blogs', () => {
				blogs.forEach((blog) => {
					blog.date = new Date(blog.date);
					if(user){
					blog.isOwner = blog.attendees.some(
						a => a.username === user.username && a.isOwner
					)
					}else{
						blog.isOwner = false;
					}
					this.blogRegistry.set(blog.id, blog);
				});
				this.loadingInitial = false;
			});
		} catch (error) {
			console.log(error);
			runInAction('load blogs error', () => {
				this.loadingInitial = false;
			});
		}
	};

	@action loadBlog = async (id: string) => {
		let blog = this.getBlog(id);
		const user = this.rootStore.userStore.user!;
		if (blog) {
			this.blog = blog;
			return blog;
		} else {
			this.loadingInitial = true;
			try {
				blog = await agent.Blogs.details(id);
				runInAction('getting single blog', () => {
					blog.date = new Date(blog.date);
					if(user){
						blog.isOwner = blog.attendees.some(
							(a: any) => a.username === user.username && a.isOwner
						)
						}else{
							blog.isOwner = false;
						}
					this.blog = blog;
					this.blogRegistry.set(blog.id, blog);
					this.loadingInitial = false;
				});
				return blog;
			} catch (error) {
				console.log(error);
				runInAction('get single blog error', () => {
					this.loadingInitial = false;
				});
			}
		}
	};

	// helper function for getting single blog
	getBlog = (id: string) => {
		return this.blogRegistry.get(id);
	};

	@action clearBlog = () => {
		this.blog = null;
	};

	@action createBlog = async (blog: IBlog) => {
		this.submitting = true;
		try {
			await agent.Blogs.create(blog);
			const attendee = createAttendee(this.rootStore.userStore.user!);
			let attendees = [];
			attendees.push(attendee);
			blog.attendees = attendees;
			runInAction('creating blog', () => {
				this.blogRegistry.set(blog.id, blog);
				this.submitting = false;
			});
			history.push(`/blogs/${blog.id}`);
		} catch (error) {
			console.log(error.response);
			toast.error('Problem në ruajtjen e të dhënave');
			runInAction('creating blog error', () => {
				this.submitting = false;
			});
		}
	};

	@action editBlog = async (blog: IBlog) => {
		this.submitting = true;
		try {
			await agent.Blogs.update(blog);
			runInAction('edit blog', () => {
				this.blogRegistry.set(blog.id, blog);
				this.blog = blog;
				this.submitting = false;
			});
			history.push(`/blogs/${blog.id}`);
		} catch (error) {
			console.log(error.response);
			toast.error('Problem në ruajtjen e ndryshimeve');
			runInAction('edit blog error', () => {
				this.submitting = false;
			});
		}
	};

	@action deleteBlog = async (
		event: SyntheticEvent<HTMLButtonElement>,
		id: string
	) => {
		this.submitting = true;
		this.target = event.currentTarget.name;
		try {
			await agent.Blogs.delete(id);
			runInAction('delete blog', () => {
				this.blogRegistry.delete(id);
				this.submitting = false;
				this.target = '';
			});
			
		} catch (error) {
			console.log(error);
			runInAction('delete blog error', () => {
				this.submitting = false;
				this.target = '';
			});
		}
	};

	@action deleteBlogFromAdmin = async (
		id: string
	) => {
		this.submitting = true;
		try {
			await agent.Blogs.delete(id);
			runInAction('delete blog', () => {
				this.blogRegistry.delete(id);
				this.submitting = false;
			});
			
		} catch (error) {
			console.log(error);
			runInAction('delete blog error', () => {
				this.submitting = false;
			});
		}
	};
}