class CommentType {
  final String username;
  final String profilePicPath;
  final String displayName;
  final int id;
  final int contentID;
  final String commenterUID;
  final String timestamp;
  final String comment;
  final int approved;
  final bool isEdited;
  final int likeCount;
  final bool isLikedByLoggedInUser;

  CommentType({
    required this.username,
    required this.profilePicPath,
    required this.displayName,
    required this.id,
    required this.contentID,
    required this.commenterUID,
    required this.timestamp,
    required this.comment,
    required this.approved,
    required this.isEdited,
    required this.likeCount,
    required this.isLikedByLoggedInUser,
  });
  factory CommentType.fromJson(Map<String, dynamic> parsedJson) => CommentType(
        username: parsedJson['username'],
        profilePicPath: parsedJson['profilePicPath'],
        displayName: parsedJson['displayName'],
        id: parsedJson['id'],
        contentID: parsedJson['contentID'],
        commenterUID: parsedJson['commenterUID'],
        timestamp: parsedJson['timestamp'],
        comment: parsedJson['comment'],
        approved: parsedJson['approved'],
        isEdited: parsedJson['isEdited'],
        likeCount: parsedJson['likeCount'],
        isLikedByLoggedInUser: parsedJson['isLikedByLoggedInUser'],
      );
  Map<String, dynamic> toJson() => {
        "username": username,
        "profilePicPath": profilePicPath,
        "displayName": displayName,
        "id": id,
        "contentID": contentID,
        "commenterUID": commenterUID,
        "timestamp": timestamp,
        "comment": comment,
        "approved": approved,
        "isEdited": isEdited,
        "likeCount": likeCount,
        "isisLikedByLoggedInUser": isLikedByLoggedInUser,
      };
}
