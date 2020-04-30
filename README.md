## GitHub Streaks

Check streak on GitHub from CLI with `ghs` command.

### Requirements

- Node.js v12.16.3 or later


### Usage

#### Check ongoing streak

```sh
ghs [username]
```


#### Check your longest streak

```
ghs --longest [username]
# or search with date range
ghs --longest --since=YYYY-MM-DD --until=YYYY-MM-DD [username]
```


### Development

#### Initialization

```sh
git clone git@github.com:progfay/github-streaks.git
cd github-streaks
npm install
```


#### Build

```sh
npm run build
```


#### Lint

```sh
npm run lint
# or
npm run lint:fix
```


#### Test

```sh
npm test
```


#### Debug

- Use [`npm link`](https://docs.npmjs.com/cli/link.html) .
