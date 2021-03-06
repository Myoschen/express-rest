# express-rest

![Heroku](https://pyheroku-badge.herokuapp.com/?app=safe-garden-46978&style=flat-square)
![GitHub](https://img.shields.io/github/license/willy14620/express-rest?style=flat-square)

> Build a Restful api from scratch with Express, PostgreSQL

## Installation

```shell
# Clone all project
git clone https://github.com/willy14620/express-rest.git

# Install dependencies
npm ci
```

## Usage

```shell
# Bundle with webpack (development)
npm run build

# Bundle with webpack (production)
npm run build:prod

# Run on localhost
npm run start

# Unit test
npm run test
```

> If you want to run it on your computer, you have to modify the database connection url (In [index.module.js](/src/server/modules/index.module.js) file).

## API Resource

### Deploy with Heroku

  Base URL: [https://safe-garden-46978.herokuapp.com/api](https://safe-garden-46978.herokuapp.com/api)

### Article

| Method     | URI                       | Description            |
|------------|---------------------------|------------------------|
| **GET**    | /api/articles             | Get all articles       |
| **GET**    | /api/articles/personal    | Get someone's articles |
| **POST**   | /api/articles             | Add new article        |
| **PUT**    | /api/articles/:article_id | Update article         |
| **DELETE** | /api/articles/:article_id | Delete article         |

### User

| Method     | URI                 | Description   |
|------------|---------------------|---------------|
| **GET**    | /api/users          | Get all users |
| **POST**   | /api/users          | Add new user  |
| **POST**   | /api/users/login    | User login    |
| **PUT**    | /api/users/:user_id | Update user   |
| **DELETE** | /api/users/:user_id | Delete user   |

## Reference

[從無到有，打造一個漂亮乾淨俐落的 RESTful API](https://ithelp.ithome.com.tw/users/20107247/ironman/1312)
