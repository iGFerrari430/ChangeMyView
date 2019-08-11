import React from 'react';
import TopicPreview from '../Topic/TopicPreview';
import EditTopic from '../Topic/EditTopic';
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'
import axios from "axios";
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import moment from 'moment';
// eslint-disable-next-line
import { BrowserRouter,Route, Switch, Link, NavLink } from 'react-router-dom'; // Route, Switch, Link, NavLink

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "vava",
            TopicList: [],
            stage: 0,
            isLoggedin: this.props.auth.isLoggedin,
            totalPage: -1,
            currPage: 1000
        }
    }

    async componentDidMount() {
        try{
            const res = await axios.get("/api/posts/Get/getPageNum");
            this.setState(() => ({
                totalPage: res.data
            }))
            if (res.data !== 0){
                this.fetchPages(1);
            }else{
                this.setState(() => ({
                    stage: 1
                }))
            }
        }catch(err){
            this.setState(() => ({
                TopicList: []
            }))
        }
    }
    async fetchPages(index){
        if (index <= 0 || index > this.state.totalPage){
            return;
        }

        await this.setState(() => ({
            stage: 0
        }))

        const res = await axios.get("/api/posts/Get/getPageTopics/"+index);
        await this.setState(() => ({
            currPage: index,
            TopicList: res.data,
            stage: 1
        }))

        
    }
    render() {
        const currPage = this.state.currPage;
        const disabler1 = (currPage-1 <= 0)
        if (this.state.stage === 0){
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
        }else{
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9">
                            {
                                this.state.TopicList.map((topic,index) => 
                                    (
                                        <TopicPreview 
                                        key={index}
                                        topic={topic}
                                        />
                                    )
                                )
                            }
                            <div className="row">
                                <div className="col-lg-4 rightAlign  mt-3">
                                    <Button variant="outline-secondary"
                                     size="lg" 
                                     block 
                                     disabled={(currPage-1 <= 0)}
                                     onClick={() => this.fetchPages(currPage-1)}
                                     >
                                        Previous Page
                                    </Button>
                                </div>
                                <div className="col-lg-4  mt-3">
                                    <Alert variant="info" style={{
                                        textAlign: "center",
                                        fontSize: "20px",
                                        wordWrap: "break-word",
                                        marginBottom: "0",
                                        height: "48px",
                                        paddingTop:"8px"
                                    }}
                                    >
                                        Page {currPage}/{this.state.totalPage}
                                    </Alert>
                                </div>
                                <div className="col-lg-4  mt-3">
                                    <Button
                                     variant="outline-secondary"
                                      size="lg"
                                       block 
                                       disabled={(currPage+1 > this.state.totalPage)}
                                        onClick={() => this.fetchPages(currPage+1)}
                                       >
                                        Next Page
                                    </Button>
                                </div>
                            </div>

                        </div>
    
                        <div className="col-xl-3">
                            <div className="CreatePost">
                                <p className="Hand">Share new ideas to the community!</p>
                                <Link to={this.props.auth.isLoggedin ? "/topic" : "/login"}>
                                    <button type="button" className="btn btn-info" style={{wordWrap: "break-word"}}>{this.props.auth.isLoggedin ? "Create Topic" : "Log in to Create Post" }</button>
                                </Link>
                            </div>
                        </div>
      
                    </div>
                </div>
            );
        }

    }
}

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps)(Landing);