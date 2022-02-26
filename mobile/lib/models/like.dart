class LikeType {
  final int likeID;
  final String likeType;
  final int likeTypeID;
  final bool isLiked;
  LikeType({
    required this.likeID,
    required this.likeType,
    required this.likeTypeID,
    required this.isLiked,
  });
  factory LikeType.fromJson(Map<String, dynamic> parsedJson) => LikeType(
        likeID: parsedJson['likeID'],
        likeType: parsedJson['likeType'],
        likeTypeID: parsedJson['likeTypeID'],
        isLiked: parsedJson['isLiked'],
      );
  Map<String, dynamic> toJson() => {
        "likeID": likeID,
        "likeType": likeType,
        "likeTypeID": likeTypeID,
        "isLiked": isLiked,
      };
}
