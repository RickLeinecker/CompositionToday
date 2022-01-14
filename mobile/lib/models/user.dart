class MyUser {
  final String? uid;

  MyUser({this.uid});
}

class UserData {
  final int? id;
  final String? uid;
  final String? firstName;
  final String? lastName;
  final String? username;
  final String? email;
  final String? role;
  final String? userProfileID;

  UserData(
      {this.id,
      this.uid,
      this.firstName,
      this.lastName,
      this.username,
      this.email,
      this.role,
      this.userProfileID});
}
