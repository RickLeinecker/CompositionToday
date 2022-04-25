import 'dart:async';
import 'dart:developer';
import 'package:location_geocoder/location_geocoder.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:geocoding/geocoding.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:flutter/material.dart';

class DisplayMap extends StatefulWidget {
  String location;
  DisplayMap({Key? key, required this.location}) : super(key: key);

  @override
  State<DisplayMap> createState() => _DisplayMapState();
}

class _DisplayMapState extends State<DisplayMap> {
  final Completer<GoogleMapController> _controller = Completer();
  @override
  Widget build(BuildContext context) {
    //final _apiKey = dotenv.get('GEO_KEY', fallback: 'GEO_KEY not found');
    //late LocatitonGeocoder geocoder = LocatitonGeocoder(_apiKey);

    /*Future<LatLng> _getLatLang() async {
      final address = await geocoder.findAddressesFromQuery(widget.location);
      LatLng message = address.first.coordinates as LatLng;
      return message;
    }*/

    return Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      mainAxisSize: MainAxisSize.min,
      children: [
        SizedBox(
            width: 350,
            height: 200,
            child: GoogleMap(
                mapType: MapType.normal,
                initialCameraPosition: const CameraPosition(
                    target: LatLng(28.593022, -81.305013), zoom: 14.4746),
                onMapCreated: (GoogleMapController controller) {
                  _controller.complete(controller);
                })),
      ],
    );
  }
}
