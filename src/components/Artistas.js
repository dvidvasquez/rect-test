import * as React from 'react'
import { getArtistas } from '../api/artists'
import { getAlbumsByArtist } from '../api/albums'
import { getSongsByAlbums } from '../api/songs'

class Artistas extends React.Component{
	constructor(props){
		super(props)
		this.state={
			artistas: [],
			artista: [],
			albums: [],
			album: [],
			songs: [],
			song: [],
			tempAlbum:[],
			isFetch: true,
			view: ''
		}
	}

	verArtistas = () =>{
		const { artistas } = this.state
			 	return this.state.artistas.pop(),
				  this.state.artistas.map((artista) => 
					<div key={artista.id} className="artista" onClick={() => this.albumsQuery(artista)}>
						<span>{artista.name}</span>
						<img src={artista.image} alt={artista.name}/>
					</div>
				)
	}

	verAlbums = () =>{
		const { albums } = this.state
		return <>
			<div className="head-artist">
				<div className="row">
					<div className="col-md-2 offset-md-5">
						<img src={this.state.artista.image} alt={this.state.artista.name}/>
						<h4>{this.state.artista.name}</h4>
						<span><i className="fas fa-star"></i>{this.state.artista.popularity}</span>
					</div>
				</div>
			</div>
			<div className="albums-container">
				<div className="col-md-8 offset-md-2">
					<p className="title">Álbumes</p>
					{
						this.state.albums.map((albums) =>
							<div className="row album" key={albums.id} onClick={() => this.songsQuery(albums)}>
								<div className="col-md-1">
									<img src={albums.image} alt={albums.name}/>
								</div>
								<div className="col-md-10">
									<p className="nombre">{albums.name}</p>
									<p className="canciones">Canciones: {albums.total_tracks}</p>
								</div>
								<div className="col-md-1">
									<p className="play"><i className="fas fa-play"></i></p>
								</div>
							</div>
						)
					}
				</div>		
			</div>
			</>
	}

	minutos = (ms) =>{
		const minutes = Math.floor(ms / 60000);
	  	const seconds = ((ms % 60000) / 1000).toFixed(0);
	  	return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
	}

	totalMinutos = () =>{
		var ms = 0;
		const { songs } = this.state
		this.state.songs.songs.map((songs) => {
			ms += parseInt(songs.duration_ms)
		})
		const total = this.minutos(ms)
		return total
	}

	verCanciones = () =>{
		const { songs } = this.state
		return <>
			<div className="head-album">
				<div className="row">
					<div className="col-md-2">
						<img src={this.state.album.image} alt={this.state.album.name}/>
					</div>
					<div className="col-md-2 my-auto">
						<h5>{this.state.album.name}</h5>
						<p className="info">
							Álbum • {this.state.album.name} <br/> 
							{this.state.album.total_tracks} Canciones • {this.totalMinutos()}
						</p>
					</div>
				</div>
			</div>
			<div className="body-album">
				<h5>Canciones</h5>
				<div className="canciones">
				{
					this.state.songs.songs.map((songs,i) =>
					<div className="row cancion" key={songs.id} onClick={() => this.playSong(songs)}>
						<div className="col-md-1">
							<p>{i+1}</p>
						</div>
						<div className="col-md-10">
							<p>{songs.name}</p>
						</div>
						<div className="col-md-1">
							<p>{this.minutos(songs.duration_ms)}</p>
						</div>
					</div>
					)
				}
				</div>
			</div>
		</>
	}

	cancionesAleatoriasArtista = () =>{
		const numAlbums = this.state.albums.length 
		const albumrRam = Math.floor((Math.random() * numAlbums) + 0)
		const albumId = this.state.albums[albumrRam].id;
		this.songByArtist(albumId)
		// const canciones = this.state.songs.find( e => e.album === albumId)
		// for (var i = 0; i <= num; i++) {
		// }

	}

	repCancion = () =>{
		return <>
			<div className="head-artist">
				<div className="row">
					<div className="col-md-2 offset-md-5">
						<img src={this.state.artista.image} alt={this.state.artista.name}/>
						<h4>{this.state.artista.name}</h4>
						<span><i className="fas fa-star"></i>{this.state.artista.popularity}</span>
					</div>
				</div>
			</div>
			<div className="bar">
				<div className="col-md-8 offset-md-2 link-album">
					<p onClick={() => this.albumsQuery(this.state.artista)}>Álbumes</p>
				</div>
			</div>
			{
				(function(){this.cancionesAleatoriasArtista()})
			}
		</>
	}

	async componentDidMount (){
		const responseJson = await getArtistas()
		this.setState({artistas: responseJson, isFetch: false, view: 'artista'})
	}

	albumsQuery = async (art) => {
		const responseJson = await getAlbumsByArtist(art.id)
		this.setState({artista: art, albums: responseJson[0].albums, isFetch: false, view: 'album'})
	}

	songsQuery = async (alb) => {
		const responseJson = await getSongsByAlbums(alb.id)
		this.setState({album: alb, songs: responseJson[0], isFetch: false, view: 'songs'})
	}

	songByArtist = async (id) => {
		const responseJson = await getSongsByAlbums(id)
		this.setState({tempAlbum: responseJson[0]})
	}

	playSong = (sng) =>{
		this.setState({song: sng, view: 'song'})
	}

	cargarVista = () =>{
		switch(this.state.view){
			case 'artista': return this.verArtistas(); break;
			case 'album': return this.verAlbums(); break;
			case 'songs': return this.verCanciones(); break;
			case 'song': return this.repCancion(); break;
		}
	}

	render(){
		const { isFetch } = this.state
		if(this.state.isFetch){
			return "Cargando..."
		}
		return (
			<>
			<section className="container-fluid">
			{
				
				this.cargarVista()
				
			}
			</section>
			</>
		)
	}
}

 

export default Artistas;
