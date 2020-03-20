import * as React from 'react'
import { getAlbumsByArtist } from '../api/albums'

class Albums extends React.Component{
	constructor(props){
		super(props)

		this.state={
			albums: [],
			isFetch: true
		}
	}

	render(){
		const artista = this.props.idArtista
		console.log(artista)
		return(
			console.log(artista)
		)
	}


}

export default Albums;
