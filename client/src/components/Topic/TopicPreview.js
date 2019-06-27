import React from 'react';

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
            dummy: null
        };
    }

    render() {
        const {title,content,hotness} = this.props.topic;
        return (
            <div>

                    <p>{title}</p>
                    <p>{content}</p>
                    <p>{hotness}</p>

            </div>
        );
    }
}