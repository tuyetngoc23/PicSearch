/* eslint-disable array-callback-return */
import React, { Component } from 'react'
import axios from 'axios'

class PictureSearch extends Component {
    state = {
        query: '',
        results: []
    }
    handleInputChange = (event) => {
        const { value } = event.target;

        this.setState({ query: value })

        // console.log(event.target);
        // console.log(this.state);
    }
    onSearchSubmit = async (event) => {
        event.preventDefault();

        const { query } = this.state;

        const reponse = await axios.get('https://api.unsplash.com/search/photos', {
            params: { query },
            headers: {
                Authorization: 'Client-ID S1di0ezWrjZ4t3Q1anzyrlLqh22Ppe2kJhZKtBbaQJg'
            }
        })

        console.log(reponse.data.results);

        const newResults = reponse.data.results.map(item => {
            return {
                id: item.id,
                atlDes: item.alt_description,
                smallUrl: item.urls.small

            }
        });
       
        this.setState({ results: newResults });
        console.log(this.state.results);
    }
    render() {
        return (
            <div>
                <div className="ui segment container" style={{ marginTop: 50 }}>
                    <form className="ui form" onSubmit={this.onSearchSubmit}>
                        <div className="field">
                            <div className="ui icon input">
                                <input type="text" placeholder="Search..."
                                    onChange={this.handleInputChange} />
                                <i className="circular search link icon" />
                            </div>
                        </div>
                    </form>
                </div>
                <div className="ui divider" />
                <div className="ui four column grid container">
                    
                    {
                        this.state.length > 0 && this.state.results.map((item) => {
                            <div key={item.id} className="column">
                                <div className="ui card">
                                    <div className="image">
                                        <img src={item.smallUrl} alt={item.atlDes} />
                                    </div>
                                </div>
                            </div>
                        })

                    }
                    {this.state.length < 0 && <h3>No image</h3>}
                </div>
            </div>

        )
    }
}

export default PictureSearch
