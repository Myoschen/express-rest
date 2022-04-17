# express-rest

![heroku-badge](https://heroku-badge.herokuapp.com/?app=safe-garden-46978)

> Build a Restful api from scratch with Express, PostgreSQL

## Usage

```shell
# Clone all project
git clone https://github.com/willy14620/express-rest.git

# Install dependencies
npm ci
```

## Resource

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
