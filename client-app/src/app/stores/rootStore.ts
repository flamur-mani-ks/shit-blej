import ProductStore from './productStore';
import UserStore from './userStore';
import { createContext } from 'react';
import { configure } from 'mobx';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';
import JobStore from './jobStore';
import ContactStore from './contactStore';
import BlogStore from './blogStore';

// configure({enforceActions: 'always'});

export class RootStore {
    productStore: ProductStore;
    userStore: UserStore;
    commonStore: CommonStore;
    modalStore: ModalStore;
    profileStore: ProfileStore;
    jobStore: JobStore;
    contactStore: ContactStore;
    blogStore: BlogStore;

    constructor() {
        this.productStore = new ProductStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
        this.jobStore = new JobStore(this);
        this.contactStore = new ContactStore(this);
        this.blogStore = new BlogStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());