# content-filter-example

The address of `content-filter` project is https://github.com/efkan/content-filter

To run the example;
 1. Clone or download this repo. <br>
    `git clone https://github.com/efkan/content-filter-example.git && cd content-filter-example`
 2. Run the commands below in order <br>
    (If you've downloaded the master repo firstly extract the zipped repo file and enter extracted folder directory)<br>

    `npm install && node app`

 4. To try it [Postman](https://www.getpostman.com/) or the cURL command below can be used. <br>

    ```
    curl -X PUT -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
      "something": "the value of something key",
      "$*malicous": "test"
    }' "http://localhost:1337/"
    ```

## And look at the code of `app.js` file
