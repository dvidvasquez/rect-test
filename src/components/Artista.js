import * as React from 'react'
import PropTypes from 'prop-types'



const Artista = ({name,image,id}) => (
	<div className="artista" onClick={() => console.log(id)}>
		<span>{name}</span>
		<img src={image} alt={name}/>
	</div>
)

Artista.propTypes = {
	name: PropTypes.string,
	image: PropTypes.string,
	id: PropTypes.number
}

export default Artista