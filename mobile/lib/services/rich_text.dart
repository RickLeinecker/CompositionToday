import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:contentful_rich_text/contentful_rich_text.dart';
import 'package:json_annotation/json_annotation.dart';

@JsonSerializable()
class ArticleRichText {
  // insert vars that will exist in JSON

  // insert vars that may exist in JSON

  //ArticleRichText({});

  //factory ArticleRichText.fromJson(Map<String,dynamic> json) => _$RichTextFromJson(json);

  //RichText _$RichTextFromJson(Map<String,dynamic> json) => RichText(
  // varName : json['varName'] as dataType,
  //);

  Map<String, dynamic> _$RichTextToJson(RichText instance) => <String, dynamic>{
        // 'varName' : instance.varName,
      };
}
