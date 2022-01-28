class ExperienceType {
  final int? id;
  final int? userID;
  final String? contentText;
  final String? contentName;
  final String? timestamp;
  final String? description;
  final DateTime? fromDate;
  final DateTime? toDate;
  final bool? isDateCurrent;

  ExperienceType({
    this.id,
    this.userID,
    this.contentText,
    this.contentName,
    this.timestamp,
    this.description,
    this.fromDate,
    this.toDate,
    this.isDateCurrent,
  });

  factory ExperienceType.fromJson(Map<String, dynamic> parsedJson) =>
      ExperienceType(
        id: parsedJson['id'],
        userID: parsedJson['userID'],
        contentText: parsedJson['contentText'],
        contentName: parsedJson['contentName'],
        timestamp: parsedJson['timestamp'],
        description: parsedJson['description'],
        fromDate: parsedJson['fromDate'],
        toDate: parsedJson['toDate'],
        isDateCurrent: parsedJson['isDateCurrent'],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "userID": userID,
        "contentText": contentText,
        "contentName": contentName,
        "timestamp": timestamp,
        "description": description,
        "fromDate": fromDate,
        "toDate": toDate,
        "isDateCurrent": isDateCurrent,
      };
}
