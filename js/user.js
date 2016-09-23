var UserOperation = {
	CREATE: 1,
	LOGIN: 2
}

Object.freeze(UserOperation);

var URL = 'https://musta-message-api.herokuapp.com/users';
var xhr = new XMLHttpRequest();

function user(operation, userObject) {
	return new Promise(function(resolve, reject) {
		xhr.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				if (operation === UserOperation.CREATE) {
					return resolve(JSON.parse(this.responseText));
				} else if (operation === UserOperation.LOGIN) {
					return resolve({
						user: JSON.parse(this.responseText),
						token: this.getResponseHeader('Auth')
					});
				}
			}
		}

		var url = URL;
		if (operation === UserOperation.LOGIN) {
			url += '/login';
		}

		xhr.open('POST', url, true);
		xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
		xhr.send(JSON.stringify(userObject));
	});
}