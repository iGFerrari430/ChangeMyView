import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
class TopicPreview extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {
            dummy: null,
            topicId: "dummy",
            showNotYetModal: false
        };
    }

    twitterOnClick = () => {
        this.setState(() => ({
            showNotYetModal: true
        }))
    }

    handleNotYetModalClose = () => {
        this.setState(() => ({
            showNotYetModal: false
        }))
    }
    renderNotYetModal = () => (
        <div>
            <Modal 
            show={this.state.showNotYetModal}
            onHide = {this.handleNotYetModalClose}
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Coming soon...</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This functionality will come soon. We apologize for the inconvenience.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleNotYetModalClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
    render() {
        const {title,plainTextContent,Hotness,postDate,userName} = this.props.topic;
        const isAuthed = this.props.auth.isLoggedin;
        return (
            <div>
            {this.state.showNotYetModal && this.renderNotYetModal()}
            <div className="Preview">
                <div className="row">
                    <div className="col-9">
                        <h3>{title}</h3>
                        <div className="topicContent">
                            <p>{plainTextContent}</p>
                        </div>
                        <Link to=
                            {isAuthed ? "/viewTopic/"+this.props.topic._id : "/login"}
 
                        >
                            <button type="button" className="btn btn-outline-info">
                                {isAuthed ? "View" : "Log in to view"}
                            </button>
                        </Link>
                    </div>

                    <div className="Hotness col-3" style={{overflow: "scroll"}}>
                        <Link to={isAuthed ? "/Profile/"+userName : "/Login"} style={{color: "black"}}>
                            <div style={{marginBottom: "2px"}}><i className="far fa-user"></i> <strong>{userName}</strong></div>
                        </Link>
                        
                        <div style={{fontStyle: "italic",marginBottom: "10px"}}>{moment(postDate).fromNow()}</div>
                        <div style={{marginBottom: "10px"}}>Hotness: <strong>{Hotness}</strong></div>

                    </div>
                </div>
            </div>

            <div className="SocialShare">
                <div>
                    <span className="ShareAdjust">
                        share this topic:
                        <i className="Adjust fab fa-twitter-square fa-lg" onClick={this.twitterOnClick}></i>
                        <i className="Adjust fab fa-facebook-f fa-lg" onClick={this.twitterOnClick}></i>
                        <i className="Adjust fab fa-instagram fa-lg" onClick={this.twitterOnClick}></i>
                        <i className="Adjust fab fa-weixin fa-lg" onClick={this.twitterOnClick}></i>

                    </span>
                </div>
            </div>
            </div>
            
            
            
        );
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(TopicPreview);