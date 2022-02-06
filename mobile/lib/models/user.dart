class UserData {
  final int? id;
  final String? uid;
  final String? firstName;
  final String? lastName;
  final String? username;
  final String? email;
  final int? isPublisher;
  final String? userProfileID;

  UserData(
      {this.id,
      this.uid,
      this.firstName,
      this.lastName,
      this.username,
      this.email,
      this.isPublisher,
      this.userProfileID});

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

class UserProfile {
  final int? userID;
  final String? displayName;
  final String? bio;
  final String? websiteLink;
  final String? location;
  final int? privacySetting;
  final String? profilePicPath;

  UserProfile(
      {this.userID,
      this.displayName,
      this.bio,
      this.websiteLink,
      this.location,
      this.privacySetting,
      this.profilePicPath});

  factory UserProfile.fromJson(Map<String, dynamic> parsedJson) => UserProfile(
        userID: parsedJson['userID'],
        displayName: parsedJson['displayName'],
        bio: parsedJson['bio'],
        websiteLink: parsedJson['websiteLink'],
        location: parsedJson['location'],
        privacySetting: parsedJson['privacySetting'],
        profilePicPath: parsedJson['profilePicPath'],
      );
  Map<String, dynamic> toJson() => {
        "userID": userID,
        "displayName": displayName,
        "bio": bio,
        "websiteLink": websiteLink,
        "location": location,
        "privacySetting": privacySetting,
        "profilePicPath": profilePicPath,
      };
}
