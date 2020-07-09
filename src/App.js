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
            fetch(`https://pokeapi.co/api/v2/pokemon/${search_value.toLowerCase()}`)
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

    renderPokemonScreen = () => {
        if (this.state.pokemon) {
           return (
               <>
                   <h2 className="pokemon-name">{this.state.pokemon ? this.state.pokemon.name : '' }</h2>
                   <img
                        className="pokemon-sprite"
                        src={this.state.pokemon ? this.state.pokemon.sprites.front_default : ''}
                        alt=""
                    />
                   <form onSubmit={(e) => {this.fetchPokemon(e)}}>
                       {this.state.isLoading
                           ? <p>IsLoading</p>
                           : <PokemonSearchInput
                               id={"pokemon_search"}
                               data={this.state.pokemonList}/>
                       }
                   </form>
                </>
           )
        } else {
            return (
                <>
                    <h2 className="search-pokemon">Search a pokemon</h2>
                    <span className="search-pokemon-arrow"></span>
                    <form onSubmit={(e) => {this.fetchPokemon(e)}}>
                        {this.state.isLoading
                            ? <p>IsLoading</p>
                            : <PokemonSearchInput
                                id={"pokemon_search"}
                                data={this.state.pokemonList}/>
                        }
                    </form>
                </>
            )
        }
    }

    render() {
        return (
            <div className="App">
                <div className="pokedex">
                    <div className="pokedex-top">
                        <div className="pokedex-led _blue"></div>
                        <div className="pokedex-led _red"></div>
                        <div className="pokedex-led _yellow"></div>
                        <div className="pokedex-led _green"></div>
                    </div>
                    <div className="pokedex-main">
                        <div className="pokedex-left">

                        </div>
                        <div className="pokedex-screen-outline">
                            <div className="pokedex-screen top-screen">
                                {this.renderPokemonScreen()}

                            </div>
                        </div>
                        <div className="pokedex-right">

                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default App;
