import 'dart:async';
import 'package:composition_today/shared/loading.dart';
import 'package:geocoding/geocoding.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter/material.dart';

// ignore: must_be_immutable
class DisplayMap extends StatefulWidget {
  String location = "";
  DisplayMap({Key? key, required this.location}) : super(key: key);

  @override
  State<DisplayMap> createState() => _DisplayMapState();
}

class _DisplayMapState extends State<DisplayMap> {
  final Completer<GoogleMapController> _controller = Completer();

  @override
  Widget build(BuildContext context) {
    Future<LatLng> _getLatLang() async {
      final address = await locationFromAddress(widget.location);
      var latitude = address.first.latitude;
      var longitude = address.first.longitude;
      return LatLng(latitude, longitude);
    }

    return FutureBuilder<LatLng>(
        future: _getLatLang(),
        builder: (context, snapshot) {
          if (snapshot.hasData) {
            LatLng coordinates = snapshot.data!;
            return Column(
              crossAxisAlignment: CrossAxisAlignment.center,
              mainAxisSize: MainAxisSize.min,
              children: [
                SizedBox(
                    width: 350,
                    height: 200,
                    child: GoogleMap(
                        mapType: MapType.normal,
                        initialCameraPosition: CameraPosition(
                          target: coordinates,
                          zoom: 14.4746,
                        ),
                        onMapCreated: (GoogleMapController controller) {
                          _controller.complete(controller);
                        })),
              ],
            );
          } else {
            return Loading();
          }
        });
    /**/
  }
}
