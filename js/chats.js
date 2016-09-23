function createListItem(user) {
	
}

$(document).ready(function() {

	var token;
	
	if (typeof(Storage) !== 'undefined') {
		token = localStorage.getItem('Auth');
		console.log(token);
		var email = localStorage.getItem('email');
		var $p = $('#user');
		$p.text('Logged in as ' + email);
	}

	if (token) {
		console.log('getting chats...');
		getChats(token).then(function (conversations) {
			conversations.forEach(function (conversation) {
				createListItem()
			});
			console.log(conversations);
		});
	}

});