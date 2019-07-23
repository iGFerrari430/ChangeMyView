import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
export default class TopicPreview extends React.Component {
    // The format of props

    /* 

            let dummyTopic = {
            title: "My Name is Yinfei Wang",
            content:" I am from University of Harbin buddism!",
            hotness: 100
        };

    */
    constructor(props)
    {
        super(props)
        this.state = {
            dummy: null,
            topicId: "dummy"
        };
    }

    twitterOnClick = () => {
        console.log("Hello,World!")
    }
    render() {
        const {title,plainTextContent,Hotness,postDate,userName} = this.props.topic;
        return (
            <div>
            <div className="Preview">
                <div className="row">
                    <div className="col-9">
                        <h3>{title}</h3>
                        <div className="topicContent">
                            <p>{plainTextContent}</p>
                        </div>
                        <Link to={"/viewTopic/"+this.state.topicId}>
                            <button type="button" className="btn btn-outline-info">View</button>
                        </Link>
                    </div>

                    <div className="Hotness col-3">
                        <div style={{marginBottom: "2px"}}><i className="far fa-user"></i> <strong>{userName}</strong></div>
                        <div style={{fontStyle: "italic",marginBottom: "10px"}}>{moment(postDate).fromNow()}</div>
                        <div style={{marginBottom: "10px"}}>View: {Hotness}</div>

                    </div>
                </div>
            </div>

            <div className="SocialShare">
                <div>
                    <span className="ShareAdjust">
                        share this topic:
                        <i className="Adjust fab fa-twitter-square fa-lg" onClick={this.twitterOnClick}></i>
                        <i className="Adjust fab fa-facebook-f fa-lg"></i>
                        <i className="Adjust fab fa-instagram fa-lg"></i>
                        <i className="Adjust fab fa-weixin fa-lg"></i>

                    </span>
                </div>
            </div>
            </div>
            
            
            
        );
    }
}