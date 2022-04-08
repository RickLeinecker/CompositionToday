import 'package:composition_today/models/generic_card.dart';
import 'package:composition_today/services/audio.dart';
import 'package:composition_today/services/time.dart';
import 'package:composition_today/services/web.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:like_button/like_button.dart';

class MusicCard extends StatefulWidget {
  Map<String, dynamic> item = {};
  bool profilePicIsNull = false;
  bool isContentEdited = false;
  MusicCard({
    Key? key,
    required this.item,
    required this.profilePicIsNull,
    required this.isContentEdited,
  }) : super(key: key);

  @override
  State<MusicCard> createState() => _MusicCardState();
}

class _MusicCardState extends State<MusicCard> {
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
                fit: FlexFit.tight,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      widget.item['contentName'],
                      style: TextStyle(
                        fontSize: 16.0,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    Text(
                      widget.item['contentText'],
                      style: TextStyle(
                        fontSize: 16.0,
                      ),
                    ),
                    Text(
                      widget.item['description'],
                      style: TextStyle(
                        color: Colors.grey[500],
                      ),
                    ),
                    widget.item['sheetMusicFilepath'] != null
                        ? TextButton(
                            child: Text('Open sheet music'),
                            onPressed: () async {
                              await launchUrl(
                                  widget.item['sheetMusicFilepath']);
                            })
                        : Text(''),
                    widget.item['audioFilepath'] != null
                        ? Audio(
                            audioFilepath: widget.item['audioFilepath'],
                          )
                        : Text(''),
                  ],
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
