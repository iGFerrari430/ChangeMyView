import React from 'react';
import TopicPreview from '../Topic/TopicPreview';
import EditTopic from '../Topic/EditTopic';
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
            isLoggedin: this.props.auth.isLoggedin
        }

        let end = moment(new Date());
        let start = moment(new Date(2019, 7, 7, 21, 35, 35, 0));


        let elapsed = end.diff(start, 'seconds')
        
        console.log(end.from(start, true))
    }

    async componentDidMount() {
        try{
            const res = await axios.get("/api/posts/Get/allTopics",null);
            this.setState(() => ({
                TopicList: res.data,
                stage: 1
            }))

        }catch(err){
            this.setState(() => ({
                TopicList: []
            }))
        }
    }

    render() {
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
                        <div className="col-sm-9">
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
                        </div>
    
                        <div className="col-sm-3">
                            <div className="CreatePost">
                                <p className="Hand">Share new ideas to the community!</p>
                                <Link to={"/topic"}>
                                    <button type="button" className="btn btn-info" disabled={!this.props.auth.isLoggedin}>{this.props.auth.isLoggedin ? "Create Topic" : "Please Log In" }</button>
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