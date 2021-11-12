import 'package:composition_today/shared/constants.dart';
import 'package:composition_today/shared/loading.dart';
import 'package:flutter/material.dart';
import 'package:composition_today/services/auth.dart';

class Register extends StatefulWidget {
  final Function toggleView;
  Register({required this.toggleView});
  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final AuthService _auth = AuthService();
  final _formKey = GlobalKey<FormState>();
  bool loading = false;
  // text field state
  String name = '';
  String email = '';
  String password = '';
  String error = '';
  Widget build(BuildContext context) {
    return loading
        ? Loading()
        : Scaffold(
            backgroundColor: Colors.grey[100],
            appBar: AppBar(
              backgroundColor: Color(0xffF7B41F),
              elevation: 0.0,
              title: Text('Member Registration'),
              actions: <Widget>[
                TextButton.icon(
                  icon: Icon(Icons.person),
                  label: Text('Login here'),
                  onPressed: () {
                    widget.toggleView();
                  },
                  style: TextButton.styleFrom(
                    primary: Colors.white,
                  ),
                ),
              ],
            ),
            body: Container(
              padding: EdgeInsets.symmetric(vertical: 20.0, horizontal: 50.0),
              child: Form(
                key: _formKey,
                child: Column(
                  children: <Widget>[
                    /*SizedBox(height: 20.0),
                    TextFormField(
                      decoration: textInputDecoration.copyWith(
                        hintText: 'Name',
                        labelText: 'Name',
                        prefixIcon: Icon(
                          Icons.person,
                        ),
                      ),
                      validator: (val) => val!.isEmpty ? 'Enter a name' : null,
                      onChanged: (val) {
                        setState(() => name = val);
                      },
                    ),
                    SizedBox(height: 20.0),
                    TextFormField(
                      decoration: textInputDecoration.copyWith(
                        hintText: 'Username',
                        labelText: 'Username',
                        prefixIcon: Icon(
                          Icons.account_circle,
                        ),
                      ),
                      validator: (val) => val!.isEmpty ? 'Enter a name' : null,
                      onChanged: (val) {
                        setState(() => name = val);
                      },
                    ),*/
                    SizedBox(height: 20.0),
                    TextFormField(
                      decoration: textInputDecoration.copyWith(
                        hintText: 'Email',
                        labelText: 'Email',
                        prefixIcon: Icon(
                          Icons.mail,
                        ),
                      ),
                      validator: (val) =>
                          val!.isEmpty ? 'Enter an email' : null,
                      onChanged: (val) {
                        setState(() => email = val);
                      },
                    ),
                    SizedBox(height: 20.0),
                    TextFormField(
                        decoration: textInputDecoration.copyWith(
                          hintText: 'Password',
                          labelText: 'Password',
                          prefixIcon: Icon(Icons.lock),
                        ),
                        validator: (val) => val!.length < 6
                            ? 'Enter a password 6+ chars long'
                            : null,
                        obscureText: true,
                        onChanged: (val) {
                          setState(() => password = val);
                        }),
                    SizedBox(height: 20.0),
                    ElevatedButton(
                      child: Text(
                        'Register',
                        style: TextStyle(color: Colors.white),
                      ),
                      onPressed: () async {
                        if (_formKey.currentState!.validate()) {
                          setState(() {
                            loading = true;
                          });
                          dynamic result = await _auth
                              .registerWithEmailAndPassword(email, password);
                          if (result == null) {
                            setState(() {
                              error = 'please supply a valid email';
                              loading = false;
                            });
                          }
                        }
                      },
                      style: ElevatedButton.styleFrom(
                        primary: Color(0xff3981FF),
                      ),
                    ),
                    SizedBox(height: 12.0),
                    Text(
                      error,
                      style: TextStyle(color: Colors.red, fontSize: 14.0),
                    )
                  ],
                ),
              ),
            ),
          );
  }
}
