class MusicType {
  final String username;
  final String profilePicPath;
  final String displayName;
  final int likeCount;
  final bool isLikedByLoggedInUser;
  final String tagArray;
  final int id;
  final bool isEdited;
  final String uid;
  final int? userID;
  final String contentText;
  final String contentName;
  final String timestamp;
  final String? audioFilepath;
  final String? audioFilename;
  final String? sheetMusicFilepath;
  final String? sheetMusicFilename;
  final String? imageFilepath;
  final String? imageFilename;
  final String? description;

  MusicType({
    required this.username,
    required this.profilePicPath,
    required this.displayName,
    required this.likeCount,
    required this.isLikedByLoggedInUser,
    required this.tagArray,
    required this.id,
    required this.isEdited,
    required this.uid,
    this.userID,
    required this.contentText,
    required this.contentName,
    required this.timestamp,
    this.audioFilepath,
    this.audioFilename,
    this.sheetMusicFilepath,
    this.sheetMusicFilename,
    this.imageFilepath,
    this.imageFilename,
    this.description,
  });

  factory MusicType.fromJson(Map<String, dynamic> parsedJson) => MusicType(
      username: parsedJson['username'],
      profilePicPath: parsedJson['profilePicPath'],
      displayName: parsedJson['displayName'],
      likeCount: parsedJson['likeCount'],
      isLikedByLoggedInUser: parsedJson['isLikedByLoggedInUser'],
      tagArray: parsedJson['tagArray'],
      id: parsedJson['id'],
      isEdited: parsedJson['isEdited'],
      uid: parsedJson['uid'],
      userID: parsedJson['userID'],
      contentText: parsedJson['contentText'],
      contentName: parsedJson['contentName'],
      timestamp: parsedJson['timestamp'],
      audioFilepath: parsedJson['audioFilepath'],
      audioFilename: parsedJson['audioFilename'],
      sheetMusicFilepath: parsedJson['sheetMusicFilepath'],
      sheetMusicFilename: parsedJson['sheetMusicFilename'],
      description: parsedJson['description'],
      imageFilepath: parsedJson['imageFilepath'],
      imageFilename: parsedJson['imageFilename']);
  Map<String, dynamic> toJson() => {
        "username": username,
        "profilePicPath": profilePicPath,
        "displayName": displayName,
        "likeCount": likeCount,
        "isLikedByLoggedInUser": isLikedByLoggedInUser,
        "tagArray": tagArray,
        "id": id,
        "isEdited": isEdited,
        "uid": uid,
        "userID": userID,
        "contentText": contentText,
        "contentName": contentName,
        "timestamp": timestamp,
        "audioFilepath": audioFilepath,
        "audioFilename": audioFilename,
        "sheetMusicFilepath": sheetMusicFilepath,
        "sheetMusicFilename": sheetMusicFilename,
        "description": description,
        "imageFilepath": imageFilepath,
        "imageFilename": imageFilename,
      };
}
