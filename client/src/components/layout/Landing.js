import React from 'react';
import TopicPreview from '../Topic/TopicPreview'
export default class Landing extends React.Component {
    constructor(props) {
        super(props);
        
        let dummyTopic1 = {
            title: "My Name is Yinfei Wang",
            content:" I am from University of Harbin buddism!",
            hotness: 100
        };

        let dummyTopic2 = {
            title: "My name is SB",
            content: "I am shabi",
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
        );
    }
}