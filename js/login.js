var token;

$(document).ready(function() {

	$('button[type=submit]').click(function() {
		console.log('Testing');
		var $emailInput = $('#emailInput');
		var $passwordInput = $('#passwordInput');
		// $passwordInput.val('randomPass');

		if ($emailInput.val() === "" || $passwordInput.val() === "") {
			alert('Incorrect credentials');
			return;
		}

		login({
			email: $emailInput.val(),
			password: $passwordInput.val()
		}).then(function(userDetails) {
			console.log('Success!');
			// console.log(userDetails);
			// token = userDetails.token;
			if (typeof(Storage) !== 'undefined') {
				localStorage.setItem('Auth', userDetails.token);
			} else {
				console.log('Unable to use local storage');
			}

			chrome.browserAction.setPopup({
				popup: "chats.html"
			})
			window.location.href = "chats.html";

		}, function(e) {
			console.log(e);
		})

	});


});