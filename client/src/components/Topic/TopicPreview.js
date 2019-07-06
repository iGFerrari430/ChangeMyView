import React from 'react';
import {Link} from 'react-router-dom';
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
        const {title,content,hotness} = this.props.topic;
        return (
            <div>
            <div className="Preview">
                <div className="row">
                    <div className="col-9">
                        <h3>{title}</h3>
                        <div className="topicContent">
                            <p>{content}</p>
                        </div>
                        <Link to={"/viewTopic/"+this.state.topicId}>
                            <button type="button" className="btn btn-outline-info">View</button>
                        </Link>
                    </div>

                    <div className="Hotness col-3">
                        <i className="fas fa-fire"></i>{hotness}
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