// var request = require('request');
var url = 'https://musta-message-api.herokuapp.com/users';
var xhr = new XMLHttpRequest();
var returnString;

// var UserOperation = {
// 	CREATE: 1,
// 	LOGIN, 2
// }

// function user(userOperation, userObject) {
// 	// body...
// }

function login(userObject) {
	// return new Promise(function(resolve, reject) {
	// 	request.post({
	// 		url: url + '/login',
	// 		json: true,
	// 		body: JSON.stringify(userObject)
	// 	}, function(error, response, body) {
	// 		if (error) {
	// 			reject(error);
	// 		} else {
	// 			resolve(body);
	// 		}
	// 	});
	// });
	return new Promise(function(resolve, reject) {
		console.log(userObject);
		xhr.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				return resolve({
					user: JSON.parse(this.responseText),
					token: this.getResponseHeader('Auth')
				});
			} else if (this.readyState === 4) {
				return reject(this.responseText);
			}
		}
		xhr.open("POST", url + '/login', true);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		xhr.send(JSON.stringify(userObject));

	});

}


function createUser(userObject) {
	return new Promise(function(resolve, reject) {

		console.log(userObject);
		xhr.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				return resolve(JSON.parse(this.responseText))
			} else if (this.readyState === 4) {
				return reject(JSON.parse(this.responseText));
			}
		}

		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		console.log(JSON.stringify(userObject));
		xhr.send(JSON.stringify(userObject));

	})
}