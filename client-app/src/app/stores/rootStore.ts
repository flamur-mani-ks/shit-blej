import ProductStore from './productStore';
import UserStore from './userStore';
import { createContext } from 'react';
import CommonStore from './commonStore';
import ModalStore from './modalStore';
import ProfileStore from './profileStore';
import JobStore from './jobStore';
import ContactStore from './contactStore';
import BlogStore from './blogStore';
import CityStore from './cityStore';
import BlogCategoryStore from './blogCategoryStore';
import JobCategoryStore from './jobCategoryStore';
import ProductCategoryStore from './productCategoryStore';
import TeamMemberStore from './teamMemberStore';


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
    cityStore: CityStore;
    blogCategoryStore: BlogCategoryStore;
    jobCategoryStore: JobCategoryStore;
    productCategoryStore: ProductCategoryStore;
    teamMemberStore: TeamMemberStore;

    constructor() {
        this.productStore = new ProductStore(this);
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.modalStore = new ModalStore(this);
        this.profileStore = new ProfileStore(this);
        this.jobStore = new JobStore(this);
        this.contactStore = new ContactStore(this);
        this.blogStore = new BlogStore(this);
        this.cityStore = new CityStore(this);
        this.blogCategoryStore = new BlogCategoryStore(this);
        this.jobCategoryStore = new JobCategoryStore(this);
        this.productCategoryStore = new ProductCategoryStore(this);
        this.teamMemberStore = new TeamMemberStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());