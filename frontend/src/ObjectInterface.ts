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
    conentTags?: object;
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
}

/**
 * Example
 * @property data: JSON.stringify({contentType: "experience"})
 * @property methodType: "POST"
 * @property path: "getContentByType"
 */
export type GenericHandlerType = {
    data: string;
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



