import { action, computed, observable, runInAction } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { IContact } from '../models/contact';
import { RootStore } from './rootStore';


export default class ContactStore {
	rootStore: RootStore;
	constructor(rootStore: RootStore) {
		this.rootStore = rootStore;
	}

	@observable contactRegistry = new Map();
	@observable loadingInitial = false;
	@observable contact: IContact | null = null;
	@observable submitting = false;
	@observable target = '';

	@computed get contactsByDate() {
		return Array.from(this.contactRegistry.values()).sort(
			(a, b) => b.date!.getTime() - a.date!.getTime()
		);
	}

	@action loadContacts = async () => {
		this.loadingInitial = true;
		try {
			const contacts = await agent.Contacts.list();
			runInAction('loading contacts', () => {
				contacts.forEach((contact) => {
					contact.date = new Date(contact.date);
					this.contactRegistry.set(contact.id, contact);
				});
				this.loadingInitial = false;
			});
		} catch (error) {
			console.log(error);
			runInAction('load contacts error', () => {
				this.loadingInitial = false;
			});
		}
	};

	@action loadContact = async (id: string) => {
		let contact = this.getContact(id);
		if (contact) {
			this.contact = contact;
			return contact;
		} else {
			this.loadingInitial = true;
			try {
				contact = await agent.Contacts.details(id);
				runInAction('getting single contact', () => {
					contact.date = new Date(contact.date);
					this.contact = contact;
					this.contactRegistry.set(contact.id, contact);
					this.loadingInitial = false;
				});
				return contact;
			} catch (error) {
				console.log(error);
				runInAction('get single contact error', () => {
					this.loadingInitial = false;
				});
			}
		}
	};

	// helper function for getting single contact
	getContact = (id: string) => {
		return this.contactRegistry.get(id);
	};

	@action clearContact = () => {
		this.contact = null;
	};

	@action createContact = async (contact: IContact) => {
		this.submitting = true;
		try {
			await agent.Contacts.create(contact);
			runInAction('creating contact', () => {
				this.contactRegistry.set(contact.id, contact);
				this.submitting = false;
			});
		} catch (error) {
			console.log(error.response);
			toast.error('Problem në ruajtjen e të dhënave');
			runInAction('creating contact error', () => {
				this.submitting = false;
			});
		}
	};

	@action deleteContact = async (
		id: string
	) => {
		this.submitting = true;
		try {
			await agent.Contacts.delete(id);
			runInAction('delete contact', () => {
				this.contactRegistry.delete(id);
				this.submitting = false;
			});
		} catch (error) {
			console.log(error);
			runInAction('delete contact error', () => {
				this.submitting = false;
			});
		}
	};
}
