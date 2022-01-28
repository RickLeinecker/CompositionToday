class TagType {
  final int? id;
  final String? tagName;

  TagType({
    this.id,
    this.tagName,
  });

  factory TagType.fromJson(Map<String, dynamic> parsedJson) => TagType(
        id: parsedJson['id'],
        tagName: parsedJson['tagName'],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "tagName": tagName,
      };
}
