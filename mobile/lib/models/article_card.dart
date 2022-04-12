import 'package:composition_today/models/generic_card.dart';
import 'package:composition_today/services/rich_text.dart';
import 'package:flutter/material.dart';
import 'package:flutter_html/flutter_html.dart';

// ignore: must_be_immutable
class ArticleCard extends StatefulWidget {
  Map<String, dynamic> item = {};
  bool profilePicIsNull = false;
  bool isContentEdited = false;
  ArticleCard({
    Key? key,
    required this.item,
    required this.profilePicIsNull,
    required this.isContentEdited,
  }) : super(key: key);

  @override
  State<ArticleCard> createState() => _ArticleCardState();
}

class _ArticleCardState extends State<ArticleCard> {
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.symmetric(horizontal: 12.0, vertical: 8.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        children: [
          GenericCardHead(
              item: widget.item,
              profilePicIsNull: widget.profilePicIsNull,
              isContentEdited: widget.isContentEdited),
          const Divider(
            thickness: 0.5,
            color: Colors.black,
          ),
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Flexible(
                flex: 5,
                fit: FlexFit.loose,
                child: Padding(
                  padding: const EdgeInsets.all(8.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.item['contentName'],
                        style: const TextStyle(
                          fontSize: 18.0,
                          fontWeight: FontWeight.bold,
                        ),
                      ),
                      Text(widget.item['contentText']),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const Divider(
            thickness: 0.5,
            color: Colors.black,
          ),
          GenericCardTail(item: widget.item),
        ],
      ),
    );
  }
}
