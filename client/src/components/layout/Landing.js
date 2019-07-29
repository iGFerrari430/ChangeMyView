import React from 'react';
import TopicPreview from '../Topic/TopicPreview';
import EditTopic from '../Topic/EditTopic';
import axios from "axios";
import { connect } from 'react-redux';
// eslint-disable-next-line
import { BrowserRouter,Route, Switch, Link, NavLink } from 'react-router-dom'; // Route, Switch, Link, NavLink
/*
        let dummyTopic1 = {
            topicId: undefined,
            title: "My Name is Yinfei Wang",
            content:" I am from University of Harbin buddism!",
            hotness: 100,
            time: undefined,
            author: undefined
        };

        let dummyTopic2 = {
            topicId: undefined,
            title: "I drew 3 more anime portraits of DOTA2 female heroes!",
            content:"I would say okasa lhids is a complete trash.Please do not consider using however willing your own risks",
            hotness: "100",
            time: undefined,
            auther: undefined
        }

        let dummyList = [];
        dummyList.push(dummyTopic1);
        dummyList.push(dummyTopic2)
    */
class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: "vava",
            TopicList: [],
            isLoggedin: this.props.auth.isLoggedin
        }

        console.log("Constructor landing props visit: ",this.props);
    }

    componentDidMount() {
        this.setState((prevState) => ({
            isloggedin: !prevState.isLoggedin
        }))

        console.log("Landing props revisit:",this.props);
    }

    async componentWillMount() {
        try{
            console.log("Begin mounting...")
            const res = await axios.get("/api/posts/Get/allTopics",null);
            console.log("posts: ",res);
            this.setState(() => ({
                TopicList: res.data
            }))
            
            console.log("Mounted!");

        }catch(err){
            this.setState(() => ({
                TopicList: []
            }))
        }
    }
    render() {
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

const mapStateToProps = state => ({
    auth: state.auth
  });
  
export default connect(mapStateToProps)(Landing);