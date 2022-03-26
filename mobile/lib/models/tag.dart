class TagType {
  final int id;
  final String tagName;
  bool isChecked;

  TagType({
    required this.id,
    required this.tagName,
    required this.isChecked,
  });

  factory TagType.fromJson(Map<String, dynamic> parsedJson) => TagType(
        id: parsedJson['id'],
        tagName: parsedJson['tagName'],
        isChecked: false,
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "tagName": tagName,
      };
}
