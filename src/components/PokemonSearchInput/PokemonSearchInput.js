import React from 'react';
import PropTypes from 'prop-types'
import './style.css'

class PokemonSearchInput extends React.Component {
    onChange = () => {
        let value = document.getElementById(this.props.id).value
        let suggestion =  this.props.data.find((pokemon)=> pokemon.name.match(`^${value}`))
        document.getElementById(this.props.id + '_helper').innerText = (value !== '' && suggestion !== undefined)
            ? suggestion.name
            : ''
    }

    onKeyDown = (e) => {
        let suggestion = document.getElementById(this.props.id + '_helper').innerText
        if (e.keyCode === 39 && suggestion !== '') {
            document.getElementById(this.props.id).value = suggestion
        }
    }

    render() {
        return (
            <div className= "PokemonSearchInput_wrapper">
                <input
                    className = "PokemonSearchInput"
                    id={this.props.id}
                    name='PokemonSearchInput'
                    onChange = {this.onChange}
                    onKeyDown = {(e) => this.onKeyDown(e)}
                    placeholder = 'Search Pokemon'/>
                <div
                    className = "PokemonSearchInput_helper"
                    id={this.props.id + '_helper'}>
                </div>
            </div>
        )
    }
}

PokemonSearchInput.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired
}

export default PokemonSearchInput