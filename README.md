# My Strava App
Just messing around and mapping my runs from Strava. Currently deployed at https://pk-runs.herokuapp.com/

Feel free to map your own runs. Should just need to follow the Setup steps and rename the app b/c it has my initials.

## Setup
### Getting Authorization Token
Navigate to the following website:
```bash
http://www.strava.com/oauth/authorize?client_id=REPLACE_WITH_CLIENT_ID&response_type=code&redirect_uri=http://localhost/exchange_token&approval_prompt=force&scope=activity:read_all
```
You'll get redirected to a website that says "This site can't be reached". In the URL you'll see "code=". The value after the equal is our Authorization Token.
### Getting Access & Refresh Token

```bash
curl -X POST https: //www.strava.com/api/v3/oauth/token \
  -d client_id=REPLACE_WITH_CLIENT_ID \
  -d client_secret=REPLACE_WITH_CLIENT_SECRET \
  -d code=REPLACE_WITH_CODE \
  -d grant_type=authorization_code
```
You should get a JSON response w/ your refresh_token & access_token. Put these in your .env along w/ the Client ID

------

## Tests
None written yet don't @ me

------
## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.