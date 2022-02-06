class EventType {
  final int? id;
  final int? userID;
  final String? contentName;
  final String? timestamp;
  final String? description;
  final DateTime? fromDate;
  final DateTime? toDate;
  final String? imageFilepath;
  final String? imageFilename;

  EventType({
    this.id,
    this.userID,
    this.contentName,
    this.timestamp,
    this.description,
    this.fromDate,
    this.toDate,
    this.imageFilepath,
    this.imageFilename,
  });
  factory EventType.fromJson(Map<String, dynamic> parsedJson) => EventType(
        id: parsedJson['id'],
        userID: parsedJson['userID'],
        contentName: parsedJson['contentName'],
        timestamp: parsedJson['timestamp'],
        description: parsedJson['description'],
        fromDate: parsedJson['fromDate'],
        toDate: parsedJson['toDate'],
        imageFilepath: parsedJson['imageFilepath'],
        imageFilename: parsedJson['imageFilename'],
      );
  Map<String, dynamic> toJson() => {
        "id": id,
        "userID": userID,
        "contentName": contentName,
        "timestamp": timestamp,
        "description": description,
        "fromDate": fromDate,
        "toDate": toDate,
        "imageFilepath": imageFilepath,
        "imageFilename": imageFilename,
      };
}
