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
    userID?: number;
    uid: string;
    displayName?: string;
    bio?: string;
    websiteLink?: string;
    location?: string;
    privacySetting?: number;
    profilePicPath?: string;
}

export type ContentType = {
    id: number;
    uid: string;
    userID?: string;
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
    uid: string;
    userID?: number;
    contentText: string;
    contentName: string;
    timestamp: string;
    description?: string;
    fromDate: Date;
    toDate: Date;
    isDateCurrent: boolean;
}

export type ArticleType = {
    username: string;
    profilePicPath: string;
    displayName: string;

    likeCount: number;
    isLikedByLoggedInUser: boolean;
    
    id: number;
    isEdited: boolean;
    uid: string;
    userID?: number;
    contentText: string;
    contentName: string;
    timestamp: string;
}

export type MusicType = {
    username: string;
    profilePicPath: string;
    displayName: string;

    likeCount: number;
    isLikedByLoggedInUser: boolean;
    
    id: number;
    isEdited: boolean;
    uid: string;
    userID?: number;
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
    username: string;
    profilePicPath: string;
    displayName: string;

    likeCount: number;
    isLikedByLoggedInUser: boolean;
    
    id: number;
    isEdited: boolean;
    uid: string;
    userID?: number;
    contentName: string;
    timestamp?: string;
    description?: string;
    fromDate: Date;
    toDate: Date;
    imageFilepath?: string;
    imageFilename?: string;
    location?: string;
    mapsEnabled: boolean
}

export type CommentType = {
    username: string;
    profilePicPath: string;
    displayName: string;

    likeCount: number;
    isEdited: boolean;
    isLikedByLoggedInUser: boolean;
    
    id: number;
    contentID: number;
    commenterUID: string;
    timestamp: string;
    comment: string;
    approved: number;
}

export type LikeType = {
    likeID: number;
    likeType: string;
    likeTypeID: number;
    isLiked: boolean;
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
    imageFilepath?: string;
}

export type composerType = {
    id: number;
    uid: string | null;
    firstName: string;
    lastName: string;
    username: string | null;
    email: string | null;
    isPublisher: number;
    profilePicPath: string | null;
    audioFilename: string | null;
    audioFilepath: string | null;
}

export type genreType = {
    tagName: string;
    imageFilepath: string;
}
