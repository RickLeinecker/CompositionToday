export type User = {
    id: number;
    uid?: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    isPublisher?: number;
    userProfileID?: number;
};

export type UserProfile = {
    userID: number;
    displayName?: string;
    bio?: string;
    websiteLink?: string;
    location?: string;
    privacySetting?: number;
    profilePicPath?: string;
}

export type ContentType = {
    id: number;
    userID: string;
    imageFilePathArray?: object;
    contentText?: string;
    location?: string;
    likes?: object;
    audioFilePath?: string;
    sheetMusicFilePath?: string;
    websiteLink?: string;
    contentTags?: object;
    contentName?: string;
    timestamp?: string;
    description?: string;
}

export type ExperienceType = {
    id: number;
    userID: number;
    contentText: string;
    contentName: string;
    timestamp: string;
    description?: string;
    fromDate?: Date;
    toDate?: Date;
    isDateCurrent: boolean;
}

export type ArticleType = {
    id: number;
    userID: number;
    contentText: string;
    contentName: string;
    timestamp: string;
}

export type MusicType = {
    username: string;
    profilePicPath: string;
    displayName: string;
    
    id: number;
    userID: number;
    contentText: string;
    contentName: string;
    timestamp?: string;
    audioFilepath?: string;
    audioFilename?: string;
    sheetMusicFilepath?: string;
    sheetMusicFilename?: string;
    description?: string;
}

export type EventType = {
    id: number;
    userID: number;
    contentName: string;
    timestamp?: string;
    description?: string;
    fromDate?: Date;
    toDate?: Date;
    imageFilepath?: string;
    imageFilename?: string;
    location?: string;
    mapsEnabled: boolean
}

/**
 * Example
 * @property data: JSON.stringify({contentType: "experience"})
 * @property methodType: "POST"
 * @property path: "getContentByType"
 */
export type GenericHandlerType = {
    data: string | FormData;
    methodType: string;
    path: string;
}

/**
 * Example
 * @property path: "getContentByType"    
 */
export type GenericGetHandlerType = {
    path: string;
}   

export type TagType = {
    id: number;
    tagName: string;
}


