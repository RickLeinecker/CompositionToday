import 'dart:html';
import 'dart:io';
import 'dart:convert';
import 'dart:async';
import 'package:composition_today/models/generic_handler.dart';
import 'package:composition_today/models/user.dart';
import 'package:http/http.dart' as http;
import 'package:flutter/material.dart';

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
    throw Exception('Failed to create user.');
  }
}
