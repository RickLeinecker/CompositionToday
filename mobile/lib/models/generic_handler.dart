class GenericHandlerType {
  final String data;
  final String methodType;
  final String path;

  GenericHandlerType(
      {required this.data, required this.methodType, required this.path});

  factory GenericHandlerType.fromJson(Map<String, dynamic> parsedJson) =>
      GenericHandlerType(
        data: parsedJson['data'],
        methodType: parsedJson['methodType'],
        path: parsedJson['path'],
      );

  Map<String, dynamic> toJson() => {
        "data": data,
        "methodType": methodType,
        "path": path,
      };
}

class GenericGetHandlerType {
  final String path;

  GenericGetHandlerType({required this.path});

  factory GenericGetHandlerType.fromJson(Map<String, dynamic> parsedJson) =>
      GenericGetHandlerType(
        path: parsedJson['path'],
      );

  Map<String, dynamic> toJson() => {
        "path": path,
      };
}
