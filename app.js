/*
		To perform this example a request should be made by using Postman or cURL

		A sample PUT request cURL command:

		curl -X PUT -H "Content-Type: application/json" -H "Cache-Control: no-cache" -d '{
	    "something": "the value of something key",
	    "$*malicous": "test"
		}' "http://localhost:1337/"
*/

var express = require('express')
var bodyParser = require('body-parser')
var filter = require('content-filter')

var app = express()
var port = 1337

app.use(bodyParser.json({limit: '5mb'}))
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }))

/* Writing the coming data onto the console */
app.use("*", function(req, res, next){
	if(!req.body || Object.keys(req.body).length == 0) return res.send("req.body doesn't include any data.")
	// console.log("req.body object before the filtering: ", req.body)
	next()
})

/* Filter Options */
let filterOptions = {
	// typeList:['object','string'],
	// urlBlackList:['&&'],
	// urlMessage: 'A forbidden expression has been found in URL: ',
	// bodyBlackList:['$ne'],
	// bodyMessage: 'A forbidden expression has been found in form data: ',
	// methodList:['POST', 'PUT', 'DELETE'],
	// caseSensitive: true, // when true '$NE' word in the body data cannot be catched
	// checkNames: false, // when false the object property names (AKA key) would not be evaluated
	dispatchToErrorHandler: true, // if this parameter is true, the Error Handler middleware below works
	appendFound: true // appending found forbidden characters to the end of default or user defined error messages
}

/* Applying the filter */
app.use(filter(filterOptions))

/* Results After Filtering */
app.use("*", function(req, res, next){
	console.log("A request has passed the content-filter successfully.")
	console.log("The request method is: ", req.method)
	console.log("req.originalUrl value: ", req.originalUrl)
	// console.log("req.body object: ", req.body)

	var resMessage = "The route hit to this URL: " + req.originalUrl;
	res.send(resMessage)
})

/* Actually 404 error handling is not needed because of handling the all coming URL by using app.use("*",..) */
// app.use('*', function(req,res){
// 	res.status(404).send("URL has not been found.")
// })

/* Error Handling */
app.use(function (err, req, res, next){
	console.log("A new error has fallen to the error handler")
	console.log("Status: ", err.status)
	console.log("Code: ", err.code)
	console.log("Message: ", err.message)
	/* In this part you can render an Error page by using a view engine (JS template engine) | send HTML code of an error page | send a custom message as response */
	// res.status(err.status).render("403")
	// res.status(err.status).send(generatedErrorHTML)
	res.status(err.status).send("A forbidden character was found!")
})

app.listen(port, function() {
	console.log('content-filter-example is listening HTTP port ' + port)
})
