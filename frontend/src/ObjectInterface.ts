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
    likes?: object;
    audioFilePath?: string;
    sheetMusicFilePath?: string;
    websiteLink?: string;
    conentTags?: object;
    contentName?: string;
    timestamp?: string;
}


/**
 * Example
 * data: JSON.stringify({contentType: "experience"}),
 * methodType: "POST",
 * url: "getContentByType",    
*/
export type GenericHandlerObject = {
    data: string;
    methodType: string;
    url: string;
}

/**
 * Example
 * url: "getContentByType",    
*/
export type GenericGetHandlerObject = {
    url: string;
}   



