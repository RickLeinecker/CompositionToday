import 'package:url_launcher/url_launcher.dart';

launchUrl(String url) async {
  if (await canLaunch(url)) {
    await launch(url, forceWebView: false, forceSafariVC: false);
  } else {
    throw 'Could not launch $url';
  }
}
