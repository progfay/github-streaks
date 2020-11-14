<p align="center">
  <img src="/.github/thumbnail.png">
</p>

```
❯ npx @progfay/github-streaks @progfay

+-------------------+-------------------------+-----------+------+-----+-----+------+---------+
| Category          |    From    ~     To     | Day Count |  Sum | Max | Min | Mean | Std dev |
+-------------------+-------------------------+-----------+------+-----+-----+------+---------+
| All Contributions | 2016-01-01 ~ 2020-12-31 | 1827 days | 4970 |  56 |   0 | 2.72 |    5.51 |
+-------------------+-------------------------+-----------+------+-----+-----+------+---------+
| Current Streak    | 2019-06-10 ~ 2020-09-20 |  469 days | 3202 |  36 |   1 | 6.83 |    6.91 |
+-------------------+-------------------------+-----------+------+-----+-----+------+---------+
| Longest Streak    | 2019-06-10 ~ 2020-09-20 |  469 days | 3202 |  36 |   1 | 6.83 |    6.91 |
+-------------------+-------------------------+-----------+------+-----+-----+------+---------+
```

### Requirements

- Node.js v12.16.3 or later


### Usage

#### Use instantly

```sh
npx @progfay/github-streaks [username]
# or
npm exec @progfay/github-streaks [username]
```

#### Use frequently

```sh
# global install
npm install -g @progfay/github-streaks

# then, call command
ghs [username]
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
