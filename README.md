# To Do application

An adaptive ToDo list website written in React using TypeScript. The application supports authentication via Firebase, translation with i18n and can switch theme. It also has a lot of media queries for each component.

TBD: Settings page

## Installation

1. Create a new web cloud app project on Firebase: https://console.firebase.google.com/
2. Go to the Authentication page and enable authentication using Email/Passowrd
3. Init Firestore database and insert this rule:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
  	match /users/{uid}/{document=**} {
    	allow read, write: if request.auth.uid == uid;
    }
  }
}
```

4. Create a `.env` file in the root of the React project and write the API keys. An example of filling is in the `.env.example` file
5. The project is completely ready! Write `npm start`

## Usage

TODO: Write usage instructions

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Credits

All credits go to karisDev

## License

This project is licensed under DBAD public license. You can see it [here](LICENSE.md)
