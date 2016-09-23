var URL = 'https://musta-message-api.herokuapp.com/conversations';
var xhr = new XMLHttpRequest();

function getChats(token) {
	return new Promise(function(resolve, reject) {
		xhr.onreadystatechange = function() {
			if (this.readyState === 4 && this.status === 200) {
				return resolve(JSON.parse(this.responseText));
			}
		}

		xhr.open('GET', URL, true);
		xhr.setRequestHeader('Auth', token);
		xhr.send();
	});
}