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
  final bool? isEdited;

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
    this.isEdited,
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
      };
}
