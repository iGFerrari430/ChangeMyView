import React from 'react';
import TopicPreview from '../Topic/TopicPreview'
import Editor from '../Topic/Editor'
// eslint-disable-next-line
import { BrowserRouter,Route, Switch, Link, NavLink } from 'react-router-dom'; // Route, Switch, Link, NavLink
export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        
        let dummyTopic1 = {
            title: "My Name is Yinfei Wang",
            content:" I am from University of Harbin buddism!",
            hotness: 100
        };

        let dummyTopic2 = {
            title: "I drew 3 more anime portraits of DOTA2 female heroes!",
            content:"I would say okasa lhids is a complete trash.Please do not consider using however willing your own risks",
            hotness: "100"
        }

        let dummyList = [];
        dummyList.push(dummyTopic1);
        dummyList.push(dummyTopic2)
        this.state = {
            user: null,
            TopicList: dummyList
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
                            <Link to="/topic">
                                <button type="button" className="btn btn-info">Create Topic</button>
                            </Link>
                        </div>
                    </div>
  
                </div>
            </div>
        );
    }
}