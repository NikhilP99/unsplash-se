import React, {Component} from 'react'
import {connect} from 'react-redux'
import {search} from './store/search/actions'

import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'

import './styles/home.css'


class Home extends Component{
    state = {
        query: ""
    }

    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    onSearch = async () => {
        await this.props.search(this.state.query)
    }

    render(){
        return(
            <Container>
                <input type="text" className="search-bar" value={this.state.query} onChange={(e)=>{this.handleChange(e)}} placeholder="Search..." />

                <button onClick={this.onSearch} >Search</button>

                <p>{this.state.query}</p>
            </Container>
        )
    }
}


const mapStateToProps = ({search}) => {
    return {
        search
    }
}

const mapDispatchToProps = {
    search: search
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)