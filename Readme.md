# Bucket

<h1 align="center">
	<br>
	<img width="300" src="https://cdn.rawgit.com/vdemedes/bucket-app/master/media/logo.png" alt="Bucket">
	<br>
	<br>
	<br>
</h1>

Make **interactive readme** for your Node.js projects.
[Check out a live example](http://localhost:3000/vdemedes/what-is-bucket).


## Features

### Live code playground

Impress users by providing code examples, that they can edit, run and instantly see the output.

<img src="media/code.png" width="457">

### Markdown documentation

Guide user through your code using markdown text blocks.

<img src="media/text.png" width="436">

### Require any npm module

All core Node.js module (fs, path, ...) and any module available on npm can also be used in your code.

Just `require()` module you want and Bucket automatically installs it for you under the hood.

### Connect with a GitHub repository *soon*

To avoid writing documentation multiple times, connect your GitHub repository and we will convert Guide.md into interactive bucket on every push.

All markdown code blocks will be transformed into editable code rows in your bucket.


## What is this repository for?

This repository contains a front-end web application, that you use over at https://onbucket.com.
Feel free to contribute ideas/feedback/changes or improvements.


## Getting started

Below are the key commands you need to use to bundle & test this project.

Build both scripts and stylesheets:

```
$ npm run build
```

Build only scripts:

```
$ npm run scripts
```

Build only stylesheets:

```
$ npm run styles
```

Start a server:

```
$ npm start
```

Code style checking with XO is temporarily disabled.


## Tests

```
$ npm test
```


## License

MIT © [Vadim Demedes](https://github.com/vdemedes)
