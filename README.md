# content-filter-example

To run the example;
1. clone or download this repo.
2. extract the zipped repo file.
3. in the extracted repo directory run the commands below in order
`npm install`
`node app`

4. To try it (Postman)[https://www.getpostman.com/] or the cURL command below can be used
```
curl -X PUT -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
  "something": "the value of something key",
  "$*malicous": "test"
}' "http://localhost:1337/"
```

## And read the code of `app.js` file
