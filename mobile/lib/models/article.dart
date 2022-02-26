class ArticleType {
  final String username;
  final String profilePicPath;
  final String displayName;
  final int id;
  final String uid;
  final int? userID;
  final String contentText;
  final String contentName;
  final String timestamp;
  final int likeCount;
  final bool isLikedByLoggedInUser;

  ArticleType({
    required this.username,
    required this.profilePicPath,
    required this.displayName,
    required this.id,
    required this.uid,
    this.userID,
    required this.contentText,
    required this.contentName,
    required this.timestamp,
    required this.likeCount,
    required this.isLikedByLoggedInUser,
  });

  factory ArticleType.fromJson(Map<String, dynamic> parsedJson) => ArticleType(
        username: parsedJson['username'],
        profilePicPath: parsedJson['profilePicPath'],
        displayName: parsedJson['displayName'],
        id: parsedJson['id'],
        uid: parsedJson['uid'],
        userID: parsedJson['userID'],
        contentText: parsedJson['contentText'],
        contentName: parsedJson['contentName'],
        timestamp: parsedJson['timestamp'],
        likeCount: parsedJson['likeCount'],
        isLikedByLoggedInUser: parsedJson['isLikedByLoggedInUser'],
      );

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
        "likeCount": likeCount,
        "isLikedByLoggedInUser": isLikedByLoggedInUser,
      };
}
