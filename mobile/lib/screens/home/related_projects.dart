// ignore_for_file: use_key_in_widget_constructors

import 'package:composition_today/shared/appbar.dart';
import 'package:composition_today/shared/constants.dart';
import 'package:flutter/material.dart';
import 'package:composition_today/services/web.dart';

class RelatedProjects extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.grey[100],
      appBar: MyAppBar(
        title: const Text('Related Projects'),
      ),
      body: Column(
        children: [
          CustomScrollView(
            primary: false,
            shrinkWrap: true,
            slivers: [
              SliverPadding(
                padding: const EdgeInsets.all(20),
                sliver: SliverGrid.count(
                  crossAxisSpacing: 10,
                  mainAxisSpacing: 10,
                  crossAxisCount: 2,
                  children: [
                    Container(
                      decoration: BoxDecoration(
                          color: primaryColor,
                          border: Border.all(color: Colors.white),
                          borderRadius:
                              const BorderRadius.all(Radius.circular(20))),
                      padding: const EdgeInsets.all(8),
                      child: Stack(
                        alignment: Alignment.bottomCenter,
                        children: [
                          IconButton(
                            icon: Image.asset('assets/resized_john_cage.jpg'),
                            iconSize: 500,
                            onPressed: () {
                              launchJohnCage();
                            },
                          ),
                          const Text(
                            'John Cage Tribute',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.white,
                              backgroundColor: primaryColor,
                              fontSize: 18,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      decoration: BoxDecoration(
                          color: primaryColor,
                          border: Border.all(color: Colors.white),
                          borderRadius:
                              const BorderRadius.all(Radius.circular(20))),
                      padding: const EdgeInsets.all(8),
                      child: Stack(
                        alignment: Alignment.bottomCenter,
                        children: [
                          IconButton(
                            icon: Image.asset('assets/microtonality.jpg'),
                            iconSize: 500,
                            onPressed: () {
                              launchMicrotonality();
                            },
                          ),
                          const Text(
                            'Microtonality',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.white,
                              backgroundColor: primaryColor,
                              fontSize: 18,
                            ),
                          ),
                        ],
                      ),
                    ),
                    Container(
                      decoration: BoxDecoration(
                          color: primaryColor,
                          border: Border.all(color: Colors.white),
                          borderRadius:
                              const BorderRadius.all(Radius.circular(20))),
                      padding: const EdgeInsets.all(8),
                      child: Stack(
                        alignment: Alignment.bottomCenter,
                        children: [
                          IconButton(
                            icon: Image.asset('assets/schillinger.jpg'),
                            iconSize: 500,
                            onPressed: () {
                              launchSchillinger();
                            },
                          ),
                          const Text(
                            'Learn Schillinger',
                            textAlign: TextAlign.center,
                            style: TextStyle(
                              color: Colors.white,
                              backgroundColor: primaryColor,
                              fontSize: 18,
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ],
      ),
    );
  }
}
