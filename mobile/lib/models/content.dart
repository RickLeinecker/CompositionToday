class ContentType {
  final int id;
  final String uid;
  final String? userID;
  final Object? imageFilePathArray;
  final String? contentText;
  final String? location;
  final Object? likes;
  final String? audioFilePath;
  final String? sheetMusicFilePath;
  final String? websiteLink;
  final Object? contentTags;
  final String? contentName;
  final String? timestamp;
  final String? description;

  ContentType({
    required this.id,
    required this.uid,
    this.userID,
    this.imageFilePathArray,
    this.contentText,
    this.location,
    this.likes,
    this.audioFilePath,
    this.sheetMusicFilePath,
    this.websiteLink,
    this.contentTags,
    this.contentName,
    this.timestamp,
    this.description,
  });

  factory ContentType.fromJson(Map<String, dynamic> parsedJson) => ContentType(
        id: parsedJson['id'],
        uid: parsedJson['uid'],
        userID: parsedJson['userID'],
        imageFilePathArray: parsedJson['imageFilePathArray'],
        contentText: parsedJson['contentText'],
        location: parsedJson['location'],
        likes: parsedJson['likes'],
        audioFilePath: parsedJson['audioFilePath'],
        sheetMusicFilePath: parsedJson['sheetMusicFilePath'],
        websiteLink: parsedJson['websiteLink'],
        contentTags: parsedJson['contentTags'],
        contentName: parsedJson['contentName'],
        timestamp: parsedJson['timestamp'],
        description: parsedJson['description'],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "uid": uid,
        "userID": userID,
        "imageFilePathArray": imageFilePathArray,
        "contentText": contentText,
        "location": location,
        "likes": likes,
        "audioFilePath": audioFilePath,
        "sheetMusicFilePath": sheetMusicFilePath,
        "websiteLink": websiteLink,
        "contentTags": contentTags,
        "contentName": contentName,
        "timestamp": timestamp,
        "description": description,
      };
}
