import React from 'react';
// eslint-disable-next-line
//import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { withRouter } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'
import axios from "axios";
import TopicPreview from "./../Topic/TopicPreview"

class SearchPage extends React.Component {
    LOADING = 1;
    READY = 2;

    constructor(props){
        
        super(props);
        this.state = {
            currentStage: this.LOADING,
            keyword: this.props.match.params.keyword,
            topics: null
        }
    }

    fetchKeyword = (url) => {
        return ((String)(url).substring(8,url.length));
    }
    loadResource = async(keyword) => {
        await this.setState(() => ({
            currentStage: this.LOADING
        }))

        const url = "/api/profile/Get/keyword/"+keyword;
        const res = await axios.get(url);
        
        await this.setState(() => ({
            topics: res.data,
            currentStage: this.READY
        }))
    }
    componentWillUnmount() {

    }
    async componentDidMount() {
        this.loadResource(this.props.match.params.keyword);
        this.props.history.listen(async(route)=>{
            if (route.pathname.substring(0,7) !== "/Search"){
                return;
            }
            const newKey = (String)(this.fetchKeyword(route.pathname));
            this.loadResource(newKey);
        })


    }
    render() {

        if (this.state.currentStage === this.LOADING){
            return (
                <div style={{marginLeft: "45%",  marginTop: "25%"}}>
                    <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height="100"	
                    width="100"
                    />
                </div>
            );
        }

        const len = this.state.topics.length;
        const keyword = this.props.match.params.keyword;
        return (
            
            <div className="mt-3">
                <Container>
                    <Row>
                        <Col sm={2}></Col>
                        <Col sm={8}>
                            <Alert variant={len !== 0 ? "success" : "danger"} style={{
                                textAlign: "center",
                                marginBottom: "0",
                                paddingBottom: "2px",
                                wordWrap: "break-word"
                            }}>
                                <Alert.Heading>
                                    {   len !== 0 ?
                                        'Search result of "'+keyword+'"'
                                        : 'Opps ,no topics containing "'+keyword+'" can be found.'
                                    }

                                </Alert.Heading>
                            </Alert>
                            <div>
                            {
                                this.state.topics.map((topic,index) => 
                                    (
                                        <TopicPreview 
                                        key={index}
                                        topic={topic}
                                        />
                                    )
                                )
                            }
                            </div>
                        </Col>
                        <Col sm={2}></Col>
                    </Row>
                </Container>
            </div>
        )

    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default withRouter(connect(mapStateToProps)(SearchPage));