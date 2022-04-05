import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:contentful_rich_text/contentful_rich_text.dart';

class ArticleRichText extends StatelessWidget {
  String articleText = '';
  ArticleRichText({Key? key, required this.articleText}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ContentfulRichText(jsonDecode(articleText)).documentToWidgetTree;
  }
}
