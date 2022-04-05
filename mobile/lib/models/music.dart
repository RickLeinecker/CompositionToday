class MusicType {
  final String username;
  final String profilePicPath;
  final String displayName;
  final int id;
  final String uid;
  final int? userID;
  final String contentText;
  final String contentName;
  final String? timestamp;
  final String? audioFilepath;
  final String? audioFilename;
  final String? sheetMusicFilepath;
  final String? sheetMusicFilename;
  final String? description;
  final int likeCount;
  final bool isLikedByLoggedInUser;
  final String tagArray;

  MusicType({
    required this.username,
    required this.profilePicPath,
    required this.displayName,
    required this.id,
    required this.uid,
    this.userID,
    required this.contentText,
    required this.contentName,
    this.timestamp,
    this.audioFilepath,
    this.audioFilename,
    this.sheetMusicFilepath,
    this.sheetMusicFilename,
    this.description,
    required this.likeCount,
    required this.isLikedByLoggedInUser,
    required this.tagArray,
  });

  factory MusicType.fromJson(Map<String, dynamic> parsedJson) => MusicType(
      username: parsedJson['username'],
      profilePicPath: parsedJson['profilePicPath'],
      displayName: parsedJson['displayName'],
      id: parsedJson['id'],
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
      likeCount: parsedJson['likeCount'],
      isLikedByLoggedInUser: parsedJson['isLikedByLoggedInUser'],
      tagArray: parsedJson['tagArray']);
  Map<String, dynamic> toJson() => {
        "username": username,
        "profilePicPath": profilePicPath,
        "displayName": displayName,
        "id": id,
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
        "likeCount": likeCount,
        "isLikedByLoggedInUser": isLikedByLoggedInUser,
        "tagArray": tagArray,
      };
}
