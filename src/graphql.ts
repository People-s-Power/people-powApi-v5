
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface CreateOrgInput {
    name: string;
    email: string;
    phone: string;
    description: string;
    website: string;
}

export interface UpdateInput {
    name: string;
    linkedIn: string;
    facebook: string;
    orgId: string;
    email: string;
    phone: string;
    instagram: string;
    twitter: string;
    country: string;
    state: string;
    city: string;
    website: string;
}

export interface UploadImageInput {
    uploadImage: string;
    orgId: string;
}

export interface CreateOperator {
    userId: string;
    role: string;
    orgId: string;
}

export interface DeleteOperator {
    orgId: string;
    userId: string;
}

export interface EndorsementInput {
    petition?: Nullable<string>;
    body?: Nullable<string>;
}

export interface PetitionInput {
    id?: Nullable<string>;
    title?: Nullable<string>;
    video?: Nullable<string>;
    image?: Nullable<string>;
    aim?: Nullable<string>;
    target?: Nullable<string>;
    body?: Nullable<string>;
    slug?: Nullable<string>;
    status?: Nullable<string>;
    author?: Nullable<string>;
    addedFrom?: Nullable<string>;
}

export interface UserInput {
    id?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    createdAt?: Nullable<Date>;
    isActive?: Nullable<boolean>;
    name?: Nullable<string>;
}

export interface Advert {
    _id?: Nullable<string>;
    caption: string;
    message: string;
    email: string;
    duration: string;
    link: string;
    action: string;
    audience?: Nullable<string>;
    image: string;
    shares: number;
    likes: number;
    authorId: string;
    author: Author;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export interface IQuery {
    adverts(page?: Nullable<number>, limit?: Nullable<number>, filter?: Nullable<string>): Advert[] | Promise<Advert[]>;
    advert(advertId?: Nullable<string>): Advert | Promise<Advert>;
    myAdverts(authorId: string): Advert[] | Promise<Advert[]>;
    events(page?: Nullable<number>, limit?: Nullable<number>, filter?: Nullable<string>): Event[] | Promise<Event[]>;
    event(eventId: string): Event | Promise<Event>;
    authorEvents(authorId: string, page?: Nullable<number>, limit?: Nullable<number>, filter?: Nullable<string>): Event[] | Promise<Event[]>;
    interestedEvent(authorId: string): Event[] | Promise<Event[]>;
    getOrganzations(): Organization[] | Promise<Organization[]>;
    getOrganzation(id: string): Organization | Promise<Organization>;
    getUserOrganizations(id: string): Organization[] | Promise<Organization[]>;
    getEndorsementsByPetition(petition_id?: Nullable<string>): Nullable<Nullable<Endorsement>[]> | Promise<Nullable<Nullable<Endorsement>[]>>;
    getEndorsements(): Nullable<Nullable<Endorsement>[]> | Promise<Nullable<Nullable<Endorsement>[]>>;
    getPetitions(limit?: Nullable<number>): Nullable<Nullable<Petition>[]> | Promise<Nullable<Nullable<Petition>[]>>;
    getPetitionsOtherRegion(limit?: Nullable<number>): Nullable<Nullable<Petition>[]> | Promise<Nullable<Nullable<Petition>[]>>;
    getPetition(slug?: Nullable<string>): Nullable<Petition> | Promise<Nullable<Petition>>;
    myPetition(): Nullable<Nullable<Petition>[]> | Promise<Nullable<Nullable<Petition>[]>>;
    getPetitionNotice(): Nullable<Nullable<PetitionNotice>[]> | Promise<Nullable<Nullable<PetitionNotice>[]>>;
    getActivePetitions(): Nullable<Nullable<Petition>[]> | Promise<Nullable<Nullable<Petition>[]>>;
    getActivePetitionsOtherRegion(): Nullable<Nullable<Petition>[]> | Promise<Nullable<Nullable<Petition>[]>>;
    getPosts(limit?: Nullable<number>): Post[] | Promise<Post[]>;
    getPost(id: string): Post | Promise<Post>;
    myPosts(): Post[] | Promise<Post[]>;
    getUsers(search?: Nullable<string>, limit?: Nullable<number>, skip?: Nullable<number>, accountType?: Nullable<string>, role?: Nullable<string>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getStaffs(search?: Nullable<string>, limit?: Nullable<number>, skip?: Nullable<number>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    me(token?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    auth(): Nullable<User> | Promise<Nullable<User>>;
    getUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    getStaff(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    getLimitedUsers(limit?: Nullable<number>, skip?: Nullable<number>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    countUsers(): Nullable<number> | Promise<Nullable<number>>;
    countLawyers(): Nullable<number> | Promise<Nullable<number>>;
    countPaidCases(): Nullable<number> | Promise<Nullable<number>>;
    searchUsers(text?: Nullable<string>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getLawyers(search?: Nullable<string>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getTopLawyers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getTopReps(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    getMyUsers(search?: Nullable<string>): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    seedUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    victories(page?: Nullable<number>, limit?: Nullable<number>, filter?: Nullable<string>): Nullable<Victory>[] | Promise<Nullable<Victory>[]>;
    victory(id: string): Nullable<Victory> | Promise<Nullable<Victory>>;
    myVictories(authorId: string): Nullable<Victory>[] | Promise<Nullable<Victory>[]>;
}

export interface IMutation {
    createdAd(caption: string, message: string, email: string, duration: string, link: string, action: string, audience: string, imageFile: string): Advert | Promise<Advert>;
    createdAdOrg(caption: string, message: string, email: string, duration: string, link: string, action: string, audience: string, imageFile: string, authorId: string): Advert | Promise<Advert>;
    updateAd(caption: string, message: string, email: string, duration: string, link: string, action: string, audience: string, imageFile: string, advertId: string, authorId: string): Advert | Promise<Advert>;
    deleteAd(advertId: string): Nullable<Advert> | Promise<Nullable<Advert>>;
    createEvent(name: string, description: string, time: string, startDate: string, endDate: string, imageFile: string, type: string): Event | Promise<Event>;
    createEventOrg(name: string, description: string, time: string, startDate: string, endDate: string, imageFile: string, type: string, authorId: string): Event | Promise<Event>;
    updateEvent(name: string, description: string, time: string, startDate: string, endDate: string, imageFile: string, type: string, eventId: string, authorId: string): Event | Promise<Event>;
    interested(eventId: string, authorId: string, authorImg: string, name: string): Event | Promise<Event>;
    deleteEvent(eventId: string): Nullable<string> | Promise<Nullable<string>>;
    createOrg(input: CreateOrgInput): Organization | Promise<Organization>;
    updateOrganization(input: UpdateInput): Organization | Promise<Organization>;
    updateImage(input: UploadImageInput): Organization | Promise<Organization>;
    addOperator(input: CreateOperator): Organization | Promise<Organization>;
    deleteOperator(input: DeleteOperator): Organization | Promise<Organization>;
    createEndorsement(input?: Nullable<EndorsementInput>): Nullable<Endorsement> | Promise<Nullable<Endorsement>>;
    deleteEndorsement(id?: Nullable<string>): Nullable<Endorsement> | Promise<Nullable<Endorsement>>;
    addPetition(input?: Nullable<PetitionInput>): Nullable<Petition> | Promise<Nullable<Petition>>;
    deletePetition(id?: Nullable<string>): Nullable<Petition> | Promise<Nullable<Petition>>;
    updatePetition(input?: Nullable<PetitionInput>): Nullable<Petition> | Promise<Nullable<Petition>>;
    deleteAllCampNotice(): Nullable<boolean> | Promise<Nullable<boolean>>;
    createPost(body?: Nullable<string>, imageFile?: Nullable<string>): Post | Promise<Post>;
    updatePost(body?: Nullable<string>, postId?: Nullable<string>, authorId?: Nullable<string>): Post | Promise<Post>;
    updateImg(imageFile?: Nullable<string>, postId?: Nullable<string>, authorId?: Nullable<string>): Post | Promise<Post>;
    deletePost(postId?: Nullable<string>, authorId?: Nullable<string>): Nullable<Post> | Promise<Nullable<Post>>;
    registerWithEmail(input?: Nullable<UserInput>): Nullable<User> | Promise<Nullable<User>>;
    loginWithEmail(email?: Nullable<string>, password?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    deleteUser(id?: Nullable<string>): Nullable<User> | Promise<Nullable<User>>;
    deleteManyUser(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
    updateUser(input?: Nullable<UserInput>): Nullable<User> | Promise<Nullable<User>>;
    createVictory(body: string, authorId: string): Victory | Promise<Victory>;
    updateVictory(body: string, authorId?: Nullable<string>): Victory | Promise<Victory>;
    removeVictory(id: string): Nullable<Victory> | Promise<Nullable<Victory>>;
}

export interface Event {
    _id?: Nullable<string>;
    name: string;
    description: string;
    time: string;
    image: string;
    type: string;
    audience?: Nullable<string>;
    startDate: string;
    endDate: string;
    interested: Interested[];
    shares: number;
    likes: number;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    authorId: string;
    author: Author;
}

export interface Interested {
    authorId: string;
    authorImg: string;
    name: string;
}

export interface Organization {
    _id: string;
    image: string;
    author: string;
    name: string;
    email: string;
    description: string;
    phone: string;
    followers: Nullable<string>[];
    following: Nullable<string>[];
    followersCount: number;
    followingCount: number;
    operators: Nullable<Ioperators>[];
    facebook: string;
    linkedIn: string;
    instagram: string;
    twitter: string;
    country: string;
    city: string;
    website: string;
}

export interface Ioperators {
    userId?: Nullable<string>;
    role?: Nullable<string>;
}

export interface File {
    filename: string;
    mimetype: string;
    encoding: string;
}

export interface Endorsement {
    id?: Nullable<string>;
    author?: Nullable<User>;
    petition?: Nullable<Petition>;
    body?: Nullable<string>;
    likes?: Nullable<Nullable<string>[]>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export interface Petition {
    id?: Nullable<string>;
    title?: Nullable<string>;
    image?: Nullable<string>;
    excerpt?: Nullable<string>;
    aim?: Nullable<string>;
    target?: Nullable<string>;
    body?: Nullable<string>;
    slug?: Nullable<string>;
    status?: Nullable<string>;
    authorId?: Nullable<string>;
    authorName?: Nullable<string>;
    authorImg?: Nullable<string>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    addedFrom?: Nullable<string>;
    numberOfPaidViewsCount?: Nullable<number>;
    numberOfPaidEndorsementCount?: Nullable<number>;
    endorsements?: Nullable<Nullable<Endorsement>[]>;
    likes?: Nullable<Nullable<string>[]>;
    promoted?: Nullable<boolean>;
    views?: Nullable<Nullable<string>[]>;
    category?: Nullable<string>;
    region?: Nullable<string>;
}

export interface View {
    user?: Nullable<string>;
}

export interface PetitionNotice {
    id?: Nullable<string>;
    action?: Nullable<string>;
    author?: Nullable<User>;
    data?: Nullable<Petition>;
    createdAt?: Nullable<Date>;
    read?: Nullable<boolean>;
}

export interface Post {
    _id?: Nullable<string>;
    body: string;
    petition: Petition;
    author: Author;
    likes: number;
    comments: Comment[];
    shares: number;
    isPetition?: Nullable<boolean>;
    image: string;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
}

export interface Author {
    _id?: Nullable<string>;
    name?: Nullable<string>;
    email?: Nullable<string>;
    image?: Nullable<string>;
}

export interface Comment {
    author: string;
    body: string;
}

export interface User {
    id?: Nullable<string>;
    name?: Nullable<string>;
    accountType?: Nullable<string>;
    image?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    otherName?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    emailToken?: Nullable<string>;
    emailVerified?: Nullable<boolean>;
    isActive?: Nullable<boolean>;
    country?: Nullable<string>;
    state?: Nullable<string>;
    city?: Nullable<string>;
    role?: Nullable<string>;
    phone?: Nullable<string>;
    address?: Nullable<string>;
    reps?: Nullable<Nullable<User>[]>;
    suppervisor?: Nullable<User>;
    orgOperating: string[];
    lastSeen?: Nullable<Date>;
    reportCount?: Nullable<number>;
    bankName?: Nullable<string>;
    accountNumber?: Nullable<string>;
    accountName?: Nullable<string>;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    myUsers?: Nullable<Nullable<User>[]>;
}

export interface Victory {
    _id: string;
    body: string;
    image: string;
    author: Author;
    shares: number;
    likes: number;
    createdAt?: Nullable<Date>;
    updatedAt?: Nullable<Date>;
    authorId: string;
}

export type Upload = any;
type Nullable<T> = T | null;
