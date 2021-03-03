import React, {Component} from 'react'
import {connect} from 'react-redux'
import {search, load_more} from './store/search/actions'

import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'

import './styles/home.css'

class Home extends Component{
    state = {
        query: "",
    }

    handleChange = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    onSearch = async (e) => {
        e.preventDefault()
        await this.props.search(this.state.query)
    }

    loadMore = async () => {
        await this.props.load_more(this.state.query,this.props.results.current_page + 1)
    }

    render(){
        let images = []
        if(this.props.results.total && this.props.results.results.length){
            images = this.props.results.results.map(obj => {
                return(
                    <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 result-card" key={obj.id}>
                        <img src={obj.url} alt={obj.id} className="result-image" />
                    </div>
                )
            })
        }
        
        return(
            <Container>
                <Form className="search" onSubmit={this.onSearch}>
                    <Form.Row>
                        <Col xs={10}>
                            <Form.Control
                                className="search-bar "
                                placeholder="Search"
                                value={this.state.query} 
                                onChange={(e)=>{this.handleChange(e)}}
                            />
                        </Col>
                        <Col xs={2}>
                            <Button type="submit" variant="dark" className="search-button">
                                Search
                            </Button>
                        </Col>
                    </Form.Row>
                </Form>

                {this.props.results.total ? (
                    <>
                        <h5>{this.props.results.total} results found</h5>

                        <Row>
                            {images}
                        </Row>

                        <Row>
                            <div className="col text-center load-more">
                                <Button type="submit" variant="dark" className="load_more" onClick={this.loadMore}>
                                    Load More
                                </Button>
                            </div>
                        </Row>

                    </>
                ):(<> </>)}

            </Container>
        )
    }
}


const mapStateToProps = ({results}) => {
    return {
        results
    }
}

const mapDispatchToProps = {
    search: search,
    load_more: load_more
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)