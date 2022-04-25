class UserData {
  final int? id;
  final String? uid;
  final String? firstName;
  final String? lastName;
  final String? username;
  final String? email;
  final int? isPublisher;
  final String? userProfileID;
  List<Map<String, dynamic>>? selectedTags;

  UserData(
      {this.id,
      this.uid,
      this.firstName,
      this.lastName,
      this.username,
      this.email,
      this.isPublisher,
      this.userProfileID,
      this.selectedTags});

  factory UserData.fromJson(Map<String, dynamic> parsedJson) => UserData(
      id: parsedJson['id'],
      uid: parsedJson['uid'],
      firstName: parsedJson['firstName'],
      lastName: parsedJson['lastName'],
      username: parsedJson['username'],
      email: parsedJson['email'],
      isPublisher: parsedJson['isPublisher'],
      userProfileID: parsedJson['userProfileID']);

  Map<String, dynamic> toJson() => {
        "id": id,
        "uid": uid,
        "firstName": firstName,
        "lastName": lastName,
        "username": username,
        "email": email,
        "isPublisher": isPublisher,
        "userProfileID": userProfileID,
      };
}
