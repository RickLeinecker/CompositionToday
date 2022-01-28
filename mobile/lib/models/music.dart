class MusicType {
  final int? id;
  final int? userID;
  final String? contentText;
  final String? contentName;
  final String? timestamp;
  final String? audioFilepath;
  final String? audioFilename;
  final String? sheetMusicFilepath;
  final String? sheetMusicFilename;
  final String? description;

  MusicType({
    this.id,
    this.userID,
    this.contentText,
    this.contentName,
    this.timestamp,
    this.audioFilepath,
    this.audioFilename,
    this.sheetMusicFilepath,
    this.sheetMusicFilename,
    this.description,
  });

  factory MusicType.fromJson(Map<String, dynamic> parsedJson) => MusicType(
        id: parsedJson['id'],
        userID: parsedJson['userID'],
        contentText: parsedJson['contentText'],
        contentName: parsedJson['contentName'],
        timestamp: parsedJson['timestamp'],
        audioFilepath: parsedJson['audioFilepath'],
        audioFilename: parsedJson['audioFilename'],
        sheetMusicFilepath: parsedJson['sheetMusicFilepath'],
        sheetMusicFilename: parsedJson['sheetMusicFilename'],
        description: parsedJson['description'],
      );
  Map<String, dynamic> toJson() => {
        "id": id,
        "userID": userID,
        "contentText": contentText,
        "contentName": contentName,
        "timestamp": timestamp,
        "audioFilepath": audioFilepath,
        "audioFilename": audioFilename,
        "sheetMusicFilepath": sheetMusicFilepath,
        "sheetMusicFilename": sheetMusicFilename,
        "description": description,
      };
}
