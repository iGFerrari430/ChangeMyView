import React from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import axios from "axios";
import moment from 'moment';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom';
//import Alert from 'react-bootstrap/Alert'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Table from 'react-bootstrap/Table'
class SearchPage extends React.Component {
    LOADING = 1;
    READY = 2;

    constructor(props){
        super(props);
        this.state = {
            currStage: this.LOADING,
            userProfile: null
        }
    }

    async componentDidMount() {
        const user = this.props.match.params.userName;
        const res = await axios.get("/api/profile/Get/userProfileInfo/"+user);
        console.log(res);
        await this.setState(() => ({
            
            userProfile: res.data,
            currStage: this.READY
        }))
    }
    render() {
        if (this.state.currStage === this.LOADING){
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

        const currUser = this.props.auth.user.userName;
        const thisUser = this.props.match.params.userName
        const {arguHistory,basicInfo,viewHistory} = this.state.userProfile;
        const joinTime = moment(basicInfo.registerDate).format("MMMM Do, YYYY")
        return (
            <div className="mt-3">
                <Container>
                    <Row>
                        <Col lg={2}></Col>
                        <Col lg={8}>
                            <Jumbotron style={{paddingTop: "10px",border: "1px solid black", borderRadius: "10px"}}>
                                <h1 style={{textAlign: "center"}}>{thisUser} 's Profile</h1>
                                <h3>Basic Information</h3>
                                <ul>
                                    <li>
                                        Time Joining ChangeMyView: <strong>{joinTime}</strong>
                                    </li>
                                    <li>
                                        Accumulated Experience: <strong>{basicInfo.experience}</strong>
                                    </li>
                                    <li>
                                        Accumulated Honor: <strong>{basicInfo.honor}</strong>
                                    </li>
                                </ul>
                                <h3>View History</h3>
                                <Table bordered hover style={{backgroundColor: "white", "borderColor": "black"}}>
                                    <thead style={{backgroundColor: "white"}}>
                                        <tr>
                                            <th style={{textAlign: "center"}}>Topic Title</th>
                                            <th style={{textAlign: "center"}}>Status</th>
                                        </tr>
                                    </thead>
                                    {
                                        viewHistory.map((topic,index) => (
                                            <tbody style={{backgroundColor: "white"}}>
                                                <tr>
                                                    <td style={{textAlign: "center"}}>
                                                        <Link to={"/viewTopic/"+topic.topic_id}>
                                                            {topic.topic_id}
                                                        </Link>
                                                    </td>

                                                    <td style={{textAlign: "center"}}>
                                                        {topic.isFinished ? "Finished" : "In Progress"}
                                                    </td>
                                                </tr>
                                            </tbody>
                                        ))
                                    }
                                </Table>
                            </Jumbotron>
                        </Col>
                        <Col lg={2}></Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(SearchPage);