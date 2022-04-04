class EventType {
  final String username;
  final String profilePicPath;
  final String displayName;
  final int id;
  final String uid;
  final int? userID;
  final String contentName;
  final String? timestamp;
  final String? description;
  final DateTime fromDate;
  final DateTime toDate;
  final String? imageFilepath;
  final String? imageFilename;
  final String? location;
  final bool mapsEnabled;
  final int likeCount;
  final bool isLikedByLoggedInUser;
  final bool isEdited;
  final String tagArray;

  EventType({
    required this.username,
    required this.profilePicPath,
    required this.displayName,
    required this.id,
    required this.uid,
    this.userID,
    required this.contentName,
    this.timestamp,
    this.description,
    required this.fromDate,
    required this.toDate,
    this.imageFilepath,
    this.imageFilename,
    this.location,
    required this.mapsEnabled,
    required this.likeCount,
    required this.isLikedByLoggedInUser,
    required this.isEdited,
    required this.tagArray,
  });
  factory EventType.fromJson(Map<String, dynamic> parsedJson) => EventType(
        username: parsedJson['username'],
        profilePicPath: parsedJson['profilePicPath'],
        displayName: parsedJson['displayName'],
        id: parsedJson['id'],
        uid: parsedJson['uid'],
        userID: parsedJson['userID'],
        contentName: parsedJson['contentName'],
        timestamp: parsedJson['timestamp'],
        description: parsedJson['description'],
        fromDate: parsedJson['fromDate'],
        toDate: parsedJson['toDate'],
        imageFilepath: parsedJson['imageFilepath'],
        imageFilename: parsedJson['imageFilename'],
        location: parsedJson['location'],
        mapsEnabled: parsedJson['mapsEnabled'],
        likeCount: parsedJson['likeCount'],
        isLikedByLoggedInUser: parsedJson['isLikedByLoggedInUser'],
        isEdited: parsedJson['isEdited'],
        tagArray: parsedJson['tagArray'],
      );
  Map<String, dynamic> toJson() => {
        "username": username,
        "profilePicPath": profilePicPath,
        "displayName": displayName,
        "id": id,
        "uid": uid,
        "userID": userID,
        "contentName": contentName,
        "timestamp": timestamp,
        "description": description,
        "fromDate": fromDate,
        "toDate": toDate,
        "imageFilepath": imageFilepath,
        "imageFilename": imageFilename,
        "location": location,
        "mapsEnabled": mapsEnabled,
        "likeCount": likeCount,
        "isLikedByLoggedInUser": isLikedByLoggedInUser,
        "isEdited": isEdited,
        "tagArray": tagArray,
      };
}
