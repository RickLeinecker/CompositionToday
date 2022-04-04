import 'dart:convert';
import 'dart:async';
import 'package:composition_today/models/content.dart';
import 'package:composition_today/models/tag.dart';
import 'package:composition_today/models/user.dart';
import 'package:http/http.dart' as http;

const _baseUrl = "http://compositiontoday.net/api/";
Future<UserData> createUser(String uid, String username, String email) async {
  final response = await http.post(
    Uri.parse(_baseUrl + "createUser"),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: jsonEncode(<String, String>{
      'uid': uid,
      'username': username,
      'email': email,
    }),
  );
  if (response.statusCode == 201) {
    return UserData.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to create user. ${response.statusCode}');
  }
}

Future<UserData> getLoggedInUser(String uid) async {
  final response = await http.post(
    Uri.parse(_baseUrl + "getLoggedInUser"),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: jsonEncode(<String, String>{
      'uid': uid,
    }),
  );
  if (response.statusCode == 200) {
    return UserData.fromJson(jsonDecode(response.body));
  } else {
    throw Exception('Failed to get user. ${response.statusCode}');
  }
}

Future<List<Map<String, dynamic>>> getHomefeedContentInBatches(
    List<String> contentTypeArray,
    List<Map<String, dynamic>> tagArray,
    String sortBy,
    int startIndex,
    int endIndex) async {
  final response = await http.post(
    Uri.parse(_baseUrl + "getHomefeedContentInBatches"),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
    body: jsonEncode(<String, dynamic>{
      'contentTypeArray': contentTypeArray,
      'tagArray': tagArray,
      'sortBy': sortBy,
      'startIndex': startIndex,
      'endIndex': endIndex,
    }),
  );
  if (response.statusCode == 200) {
    return List<Map<String, dynamic>>.from(jsonDecode(response.body)['result']);
  } else if (response.statusCode == 404) {
    throw Exception('Failed to load content from API. ${response.statusCode}');
  } else {
    throw Exception('API call timed out. ${response.statusCode}');
  }
}

Future<List<Map<String, dynamic>>> getTags() async {
  final response = await http.get(
    Uri.parse(_baseUrl + "getTags"),
    headers: <String, String>{
      'Content-Type': 'application/json; charset=UTF-8'
    },
  );

  if (response.statusCode == 200) {
    return List<Map<String, dynamic>>.from(jsonDecode(response.body)['result']);
  } else if (response.statusCode == 404) {
    throw Exception('Failed to load tags from API. ${response.statusCode}');
  } else {
    throw Exception('API call timed out. ${response.statusCode}');
  }
}

/*Future<List<Map<String,dynamic>>> createLike(
  String uid,

) async {

}*/