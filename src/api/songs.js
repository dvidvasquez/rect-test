export async function getSongsByAlbums(id){
	const response = await fetch('https://i8rmpiaad2.execute-api.us-east-1.amazonaws.com/dev/api/songs?album='+id)
	const responseJson = await response.json()
	return responseJson
}

export default {
	getSongsByAlbums
}