var token;

$(document).ready(function() {
	var $emailInput = $('#emailInput');
	$emailInput.val('musta@random.com');
	var $passwordInput = $('#passwordInput');
	$passwordInput.val('randomPass');

	$('#login').click(function() {
		console.log('Testing');

		if ($emailInput.val() === "" || $passwordInput.val() === "") {
			notie.alert(3, 'Please enter email and password', 2.5);
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
			notie.alert(3, 'Login failed', 2.5);
			console.log(e);
		})

	});

	$('#create').click(function () {
		createUser({
			email: $emailInput.val(),
			password: $passwordInput.val()
		}).then(function (userDetails) {
			console.log('Success!');
			notie.alert(1, 'Create Success!', 2);
		}, function (e) {
			console.log(e.errors[0].message);
		})
	})


});