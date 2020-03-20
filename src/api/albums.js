export async function getAlbumsByArtist(id){
	const response = await fetch('https://i8rmpiaad2.execute-api.us-east-1.amazonaws.com/dev/api/albums?artist='+id)
	const responseJson = await response.json()
	return responseJson
}

export default {
	getAlbumsByArtist
}