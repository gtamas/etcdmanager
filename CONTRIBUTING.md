# How to contribute?

Wanna help out? That's absolutely awesome, thank you! :) We definitely appreciate all contributions. 
In order to contribute any code, please follow the these steps: 

- Fork this project on [Github](https://github.com/etcdmanager)
- Implement your changes and then send us a pull request.

Additionally, please make sure the contribution guidelines below are observed, otherwise unfortunately we won't be able to accept your PR.

## Contribution guidelines

Once your changes are ready:

- Make sure all tests are still super green and everything is jolly good by running the following command.:

```
yarn test:e2e
```

- Your Typescript code should follow the AirBnB JS coding guidelines. If your are not familiar with those, please [see this page](https://github.com/airbnb/javascript) for more info. Or just run the damn linter and make sure it doesn't print any errors or warnings :)

```
yarn lint
```

- Unless they are super trivial, your changes should always be covered by automated tests. We use end to end tests written in [Spectron](https://electronjs.org/spectron) to test the UI. Please don't forget to add these.
- All visible UI elements in templates shall have data-test attributes with uniqe string value. Tests use these atributes as selectors. Name conventions of attributes: name of component + ui operation + type of element. E.g.: data-test="config.settings-actions-submit.v-btn"

## Contributing translations

We would like to make this application available in as many languages as possible. The i18n support is already there, but we definitely need help with translations.

Here is how to help us:

- Clone the project 
- Open **src/i18n/en.json** in your favorite text editor. 
- Translate the text to another language and save it as **src/i18n/xy.json** (where "xy" is the lower case, two letter ISO language code)
- Send a PR :)

That's it!

