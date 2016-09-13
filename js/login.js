$(document).ready(function() {

	var $emailInput = $('#emailInput');
	var $passwordInput = $('#passwordInput');

	if (typeof(Storage) !== 'undefined') {
		var email = localStorage.getItem('email');
		$emailInput.val(email);
	}


	// Login Button
	$('#login').click(function() {
		if ($emailInput.val() === "" || $passwordInput.val() === "") {
			notie.alert(3, 'Please enter email and password', 2.5);
			return;
		}

		user(UserOperation.LOGIN, {
			email: $emailInput.val(),
			password: $passwordInput.val()
		}).then(function(userDetails) {
			console.log('Success!');
			if (typeof(Storage) !== 'undefined') {
				sessionStorage.setItem('Auth', userDetails.token);
				if ($('#remember').checked = true) {
					localStorage.setItem('email', $emailInput.val());
				}
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


	// Create Button
	$('#create').click(function() {
		user(UserOperation.CREATE, {
			email: $emailInput.val(),
			password: $passwordInput.val()
		}).then(function(userDetails) {
			console.log('Success!');
			notie.alert(1, 'Create Success!', 2);
		}, function(e) {
			console.log(e.errors[0].message);
		})
	})


});