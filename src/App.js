import React from 'react';
import pokemon_list from "./constants/pokemon_list";
import PokemonSearchInput from './components/PokemonSearchInput/PokemonSearchInput'
import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            pokemonList: [],
            pokemon: null
        }
    }

    componentDidMount() {
        this.setState({
            pokemonList: pokemon_list,
            isLoading: false
        })
        /** FOR NOW WE USE A STATIC SEARCH BASE
         *  WE DON'T WANT TO REQUEST THE API TOO MUCH **/
        /*
        fetch('https://pokeapi.co/api/v2/pokemon?limit=10000')
            .then(response=>response.json())
            .then(data => {
                this.setState({
                    pokemonList: data.results,
                    isLoading: false
                })
            })
         */
    }

    fetchPokemon = (e) => {
        e.preventDefault()
        let search_value = e.target.elements.pokemon_search.value
        if(search_value !== '') {
            fetch(`https://pokeapi.co/api/v2/pokemon/${search_value}`)
                .then(response=> {
                    if (response.status !== 200) return false
                    return response.json()
                })
                .then((data) => {
                    if(data) {
                        this.setState({
                            pokemon: data
                        })
                        console.log(data)
                    }
                })
        }
    }

    render() {
        return (
            <div className="App">
                <img src={this.state.pokemon ? this.state.pokemon.sprites.front_default : ''} alt=""/>
                <form onSubmit={(e) => {this.fetchPokemon(e)}}>
                    {this.state.isLoading
                        ? <p>IsLoading</p>
                        : <PokemonSearchInput
                            id={"pokemon_search"}
                            data={this.state.pokemonList}/>
                    }
                </form>
            </div>
        )
    }
}

export default App;
