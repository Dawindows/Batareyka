module.exports = function() {
	
	var data = { users: [] }
	
	for (var i = 0; i < 1000; i++) {
		data.users.push( { id: i, name: 'userok' + i, age: i } )		
	}
	
	return data;
}