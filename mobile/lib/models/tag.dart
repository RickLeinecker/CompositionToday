class TagType {
  final int id;
  final String tagName;
  final String? imageFilepath;
  bool? isChecked = false;

  TagType({
    required this.id,
    required this.tagName,
    this.imageFilepath,
    this.isChecked,
  });

  factory TagType.fromJson(Map<String, dynamic> parsedJson) => TagType(
        id: parsedJson['id'],
        tagName: parsedJson['tagName'],
        imageFilepath: parsedJson['imageFilepath'],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "tagName": tagName,
        "imageFilepath": imageFilepath,
        "isChecked": isChecked == false ? true : false,
      };
}
