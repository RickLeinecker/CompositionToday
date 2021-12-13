export type JSONfileUser = {
    result: Array<User>;
    error: string;
};

export type JSONfileContent = {
    result: Array<Content>;
    error: string;
};

export type User = {
    id: number;
    uid?: string;
    firstName: string;
    lastName: string;
    username?: string;
    email?: string;
    isPublisher: number;
    userProfileId?: number;
};

export type Content = {
    id: number;
    userId: string;
    imageFilePathArray?: object;
    contentText?: string;
    location?: string;
    timestamp?: string;
    likes?: object;
    audioFilePath?: string;
    sheetMusicFilePath?: string;
    websiteLink?: string;
    conentTags?: object;
}


