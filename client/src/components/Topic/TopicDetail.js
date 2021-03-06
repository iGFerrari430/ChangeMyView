import React from 'react';
import draftToHtml from 'draftjs-to-html';
import {Link} from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import axios from "axios";
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import moment from 'moment';

import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

class TopicDetail extends React.Component {

    constructor(props)
    {
        super(props);

        /*Connect backend to get the information of the post! */
        this.state = {
            topicObject: null,// this stores the object of topic. The format is as the above comment.
            IsLoggedIn: this.props.auth.isLoggedin,
            currentStage: this.stages.LOADING,
            info: {
                userPick: null,
                commentArray: null,

            },
            IsUserFinished: null,
            
            propIndex: -1,
            argIndex: -1,
            userStand: -1,
            xpGained: 0,
            honorGained: 0,
            listenRecorder: null,
            // Following dedicated to PICK stage handles.
            pickButtonValue: "Hide Content", // alternative: "Show Content"
            commentContent: "",
            isSubmittingComment: false,

            userHistory: null,
            showViewedModal: false, // control the modal that tells the user he/she has viewed the modal in past 7 days
            showModal: false, // control the modal that let the user pick whether to start over or continue from last time's record
            showAgainModal: false, // control the modal that tells the user it has been 7 days since last time's record so he/she can gain from this topic again.
            IsProcessingAction: false

            //The following is 

        }
    }
    stages = {
        LOADING: "Loading",
        PICK_POINT: "pick_point",
        VIEW_OPPOSITE: "view_opposite",
        SUMMARY: "summary",
        LACK_CONTENT: "LACK_CONTENT",
        VIEW_AGAIN: "VIEW_AGAIN",
        QUERY: "QUERY"
    }
    /* this function loads the topic, and retrieve users'history 
    to decide what to render. */
    async componentDidMount() {
        
        try{
            const body = {
                tId: this.props.match.params.topicId
            };
            // get the topic object.
            const res = await axios.get("/api/posts/Get/specificTopic/"+this.props.match.params.topicId);

            //initialize the listen/persuade counter (for each proposition)
            let listenRecorder = [];
            const length = res.data.proposition.length;
            for (let i=0; i<length; i++){
                listenRecorder.push([0,0]);
            }

            // fetch user's view progress, if there is any
            const historyURL = "/api/posts/Get/userHistory/"+body.tId+"/"+this.props.auth.user.userName;
            let userHistory = await axios.get(historyURL);
            userHistory = userHistory.data;

            await this.setState(() => ({
                listenRecorder,
                topicObject: res.data
            }))
            // when the user viewed the topic but haven't finished,
            // recover the status from the time he left last time
            if (userHistory && !userHistory.isFinished && userHistory.userStand !== -1){
                const oldRecorder = userHistory.listenRecorder;
                for (let i=0; i<oldRecorder.length; i++){
                    listenRecorder[i][0] = oldRecorder[i][0];
                    listenRecorder[i][1] = oldRecorder[i][1];
                }

                await this.setState(() => ({
                    listenRecorder,
                    IsUserFinished: userHistory.isFinished,
                    propIndex: userHistory.propIndex,
                    argIndex: userHistory.argIndex,
                    honorGained: userHistory.tempHonor,
                    xpGained: userHistory.tempExperience,
                    currentStage: this.stages.QUERY,
                    showViewedModal: userHistory.isFinished ? true : false,
                    showModal: userHistory.isFinished ? false : true,
                    userStand: userHistory.userStand
                }))
                // since the history is sent to server everytime user click "persuade" or "listen"
                // the next Item of the saved history is where the user actually was last time
                const PropArg = this.findNextItem();
                if (PropArg){
                    await this.setState(() => ({
                        propIndex: PropArg[0],
                        argIndex: PropArg[1]
                    }))
                }

            }else{ // when the user does not have a history, or has finished viewing it last time
                
                // determine whether it had been more than 7 days since last times' record.
                // if it is, the user will be able to gain xp/honor from this topic again. else the user can 
                // go through this topic but cannot gain any xp/honor.
                if (userHistory.isFinished){
                    let end = moment(new Date());
                    let start = moment(userHistory.isFinished);
                    let elapsed = end.diff(start,'seconds');
                    if (elapsed > 604800){
                        userHistory.isFinished = null;
                        const body = {
                            user_id: this.props.auth.user._id,
                            topic_id: this.state.topicObject._id,
                            isFinished: null,
                            
                            propIndex: -1,
                            argIndex: -1,
                            tempHonor: 0,
                            tempExperience: 0,
                            listenRecorder,
                            userStand: -1
                        }
                        this.setState(() => ({
                            showAgainModal: true
                        }))
                        axios.post("/api/posts/Post/userHistory",body);
                    }
                }

                
                this.setState(() => ({
                    currentStage: this.stages.PICK_POINT,
                    IsUserFinished: userHistory ? userHistory.isFinished : null,
                    showViewedModal: userHistory.isFinished ? true : false //Show the appropriate popup/modal when applicable
                }))
            }      
            
        }catch(err){
            console.log(err);
        }    
        
    }
    handleViewedModalClose = () => {
        this.setState(() => ({
            showViewedModal: false
        }))
    }
    handleAgainClose = () => {
        this.setState(() => ({
            showAgainModal: false
        }))
    }

    // tells the user it has been 7 days since last time's record so he/she can gain from this topic again.
    renderAgainModal = () => (
        <div>
            <Modal 
            show={this.state.showAgainModal}
            onHide = {this.handleAgainClose}
            centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>View Again Notice</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    It has been more than 7 days since you last participated in this topic. Therefore,
                    You are able to view the topic and gain experience and honor again!
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleAgainClose}>
                        Continue
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );

    // tell the user viewed the topic in the pst 7 days so he/she cannot gain from this topic in this cooldown time.
    renderViewedModal = () => {
        const showViewedModal = this.state.showViewedModal;
        const end = moment(this.state.IsUserFinished).add(7,'days');
        const start = moment(new Date());

        const cooldownTime = end.from(start, true)
        return (
            <div>
                <Modal 
                show={showViewedModal}
                onHide = {this.handleViewedModalClose}
                centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Notice</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        You have finished viewing this topic in the past 
                        7 Days. You will now be able to view it again, but
                        you won't receive additional Experience or honor until 
                        the 7 day cooldown time has elapsed.<br/>
                        Cooldown Time: <strong>{cooldownTime}</strong>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={this.handleViewedModalClose}>
                            OK,I got it
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
        
    }

    // when the user has unfinished record of this post, let him/her choose whether to continue or start over.
    renderChoiceModal = () => (
            <div>
                <Modal
                show={this.state.showModal}
                centered
                >
                    <Modal.Header>
                        <Modal.Title>Action Needed</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        We've detected you have view history of this post.<br/> 
                        Would you like to reload from last times' progress?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => this.onClickChoice(0)}>
                            Resume From Last Time
                        </Button>
                        <Button variant="primary" onClick={() => this.onClickChoice(1)}>
                            Start Over
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
    )

    onClickChoice = async(index) => {
        if (index === 1){
            let listenRecorder = [];
            const length = this.state.topicObject.proposition.length;
            for (let i=0; i<length; i++){
                listenRecorder.push([0,0]);
            }
            await this.setState(() => ({
                IsUserFinished: null,
                argIndex: -1,
                propIndex: -1,
                honorGained: 0,
                xpGained: 0,
                userStand: -1,
                listenRecorder,
                currentStage: this.stages.PICK_POINT

            }))
        }else{
            this.setState(() => ({
                currentStage: this.stages.VIEW_OPPOSITE
            }))
        }

        this.setState(() => ({
            showModal: false
        }))
    }
    onPickToggleClick = () => {
        let newValue = '';
        if (this.state.pickButtonValue === "Hide Content"){
            newValue = "Show Content";
        }else {
            newValue = "Hide Content";
        }

        this.setState(() => ({ pickButtonValue: newValue }));
    }

    onViewAction = async(actionInd) => {
        let xpGained = this.state.xpGained;
        let honorGained = this.state.honorGained;
        let record = this.state.listenRecorder;
        let propInd = this.state.propIndex;
        let hasFinished = (this.state.IsUserFinished) ? true : false;

        xpGained += (hasFinished ? 0 : 10);


        if (actionInd === 2){
            honorGained += hasFinished ? 0 : 1;
            record[propInd][1]++;
        }else{
            record[propInd][0]++;
        }
        
        const PropArg = this.findNextItem(); // find the next proposition/argument page to view
        if (!hasFinished){
            await this.setState(() => ({
                IsProcessingAction: true
            }))

            const body = {
                user_id: this.props.auth.user._id,
                topic_id: this.state.topicObject._id,
                isFinished: PropArg ? null : new Date(),
                propIndex: this.state.propIndex,
                argIndex: this.state.argIndex,
                tempHonor: honorGained,
                tempExperience: xpGained,
                listenRecorder: record,
                userStand: this.state.userStand
            }

            const res = await axios.post("/api/posts/Post/userHistory",body);
        }

        if (PropArg){
            this.setState(() => ({
                propIndex: PropArg[0],
                argIndex: PropArg[1],
                xpGained,
                honorGained,
                listenRecorder: record
            }))
        }else{
            // Game over. so, Post xp,honor and hotness to database
            // And then, wrap up and go to summary page.
            const body = {
                userName: this.props.auth.user.userName,
                experienceGained: xpGained,
                honorGained: honorGained
            }
            const body2 = {
                topicId: this.state.topicObject._id,
                adder: 1
            }
            axios.post("/api/posts/Post/addHonorAndExp",body);
            axios.post("/api/posts/Post/addHotness",body2);

            this.setState(() => ({
                xpGained,
                honorGained,
                currentStage: this.stages.SUMMARY,
                listenRecorder: record
            }))

            
        }
        
        await this.setState(() => ({
            IsProcessingAction: false
        }))
    }

    IsArgExist = () => {
        const propList = this.state.topicObject.proposition;
        for (let i=0; i<propList.length; i++){
            if (i === this.state.userStand){
                continue;
            }
            if (propList[i].argument.length !== 0){
                return true;
            }
        }

        return false;
    }
    findNextItem = () => {
        let propList = this.state.topicObject.proposition;
        let currProp = this.state.propIndex;
        let currArg = this.state.argIndex+1;
        let finished = false;
        let found = false;
        while(!finished){
            if (currProp === -1){
                currProp = 0;
                currArg = 0;
            }else if (currProp === this.state.userStand){
                currProp++;
                currArg = 0;
            }else{
                if(currProp >= propList.length){
                    finished = true;
                }else if (currArg >= propList[currProp].argument.length){
                    currProp++;
                    currArg = 0;
                }else{
                    finished = true;
                    found = true;
                }
            }
        }
        if (found){
            return [currProp,currArg];
            
        }else{
            return null;
        }
    }
    handlePointPick = async(index) => {
        const ind = index;
        await this.setState(() => ({
            userStand: ind
        }))
        if (this.IsArgExist()){
            const propArg = this.findNextItem();
            this.setState(() => ({
                currentStage: this.stages.VIEW_OPPOSITE,
                propIndex: propArg[0],
                argIndex: propArg[1]
            }))
        }else{
            this.setState(() => ({
                currentStage: this.stages.LACK_CONTENT
            }))
        }

    }

    renderLoading = () => {
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
    renderLackContent = () => {

        const titleStyle={
            marginLeft: "0px",
            marginRight: "0px",
            marginTop: "5%",
            paddingTop: "1%",
            paddingLeft: "2%",
            paddingRight: "2%",
            paddingBottom: "2%",
            backgroundColor: "#E2E2E2",
            borderTop: "1px solid black",
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
            borderRadius: "10px 10px 0 0"

        }

        const titleTextStyle={
            wordWrap: "break-word"
        }

        const bodyStyle={
            marginTop: "0px",
            paddingLeft: "2%",
            paddingRight: "2%",
            marginLeft: "0px",
            marginRight: "0px",
            paddingBottom: "2%",
            textAlign: "center",
            backgroundColor: "#F6F6F6",
            borderBottom: "1px solid black",
            borderLeft: "1px solid black",
            borderRight: "1px solid black",
            borderRadius: "0 0 10px 10px"
        }
        

        const bodyTextStyle1 = {
            fontSize: "150%",
            marginBottom: "5%"
        }

        const bodyTextStyle2 = {
            
            marginTop: "10%",
            marginBottom: "3%",
            fontSize: "175%"
        }

        const button1Style = {
            marginRight: "10px",
            fontSize: "100%",
            
        }

        const button2Style = {
            marginLeft: "10px",
            fontSize: "100%"
        }
        
        const topic = this.state.topicObject;
        let editLink = "/EditArgumentProp/"+topic._id+"/"+this.state.userStand;
        return (
            <div className="row">
                <div className="col-md-2"></div>
                <div className="col-md-8">
                    <div className="row" style={titleStyle} >
                        <div className="col-md-8" style={titleTextStyle}>
                            <h2>{topic.title}</h2>
                        </div>
                        <div className="col-md-4">
                            <br/>
                            <div>Hotness: {topic.Hotness}</div>
                            <div>Topic Contributor: {topic.userName}</div>
                        </div>
                    </div>
                    <div style={bodyStyle}>
                        <div style={bodyTextStyle1}>
                            This topic lacks content at this time.
                        </div>
                        <div style={bodyTextStyle2}>
                            You Can:
                        </div>
                        <Link to={editLink}>
                            <button style={button1Style} className="btn btn-outline-info">
                                Contribute to this topic
                            </button>
                        </Link>

                        <Link to="/">
                            <button className="btn btn-outline-info">
                                View Other Topics
                            </button>
                         </Link>
                    </div>

                </div>
                <div className="col-md-2"></div>
                
            </div>
        );
    }

    renderPickPoint = () => {
        const topic = this.state.topicObject;
        const bodyStyle = {
            fontSize: "20px"
        }
        const showStyle = {
            borderRadius: "10px 10px 0 0"
        }

        const hideStyle = {
            borderRadius: "10px"
        }
        return (
            <div>
            <div className="row">
                <div className="col-md-1"></div>
                <div className="Detail_pick_wrapper col-md-10">
                    <div className="Detail_Pick_Topic" style={this.state.pickButtonValue==="Hide Content" ? showStyle : hideStyle}>
                        <h2>
                            {topic.title}
                        </h2>
                        <div className="Detail_Pick_Topic_Info row">
                            <div className="col-md-8 cdx">
                                {"Hotness:  "+" "}<strong>{topic.Hotness}</strong>
                                <span>       Contributor: <strong>{topic.userName}</strong></span>
                            </div>

                            <div className="col-md-4 rightAlign">
                                <button onClick={this.onPickToggleClick} className="btn btn-link">
                                    {this.state.pickButtonValue}
                                </button>
                            </div>
                        </div>
                    </div>

                    {
                        (this.state.pickButtonValue === "Hide Content") && 
                        <div className="Detail_pick_topic_main_wrap" style={bodyStyle}>
                            <div className="Detail_pick_Topic_main">
                                {ReactHtmlParser(draftToHtml(JSON.parse(topic.richTextContent)))}
                                {/*topic.richTextContent*/}
                            </div>
                        </div>

                    }
    
                </div>
                <div className="col-md-1"></div>
            </div>
            <div className="Detail_pick_Query midAlign">
                <h2>What is your Point of View?</h2>
            </div>
            <div className="Detail_pick_wrap_me">
                <div className="Detail_pick_midMargin">
                    {
                        topic.proposition.map((point, index) =>
                        // Only do this if items have no stable IDs
                        <button 
                        key={index} 
                        onClick={() => this.handlePointPick(index)} 
                        className="btn btn-outline-dark btn-lg AddMargin">
                            {point.content}
                        </button>
                        )
                    }
                </div>
            </div>
            
                
            </div>
        );
    }
    
    renderViewOpposite = () => {
        // none dummy contents begin here 
        const userStatus = this.state.IsLoggedIn;
        const textPlaceholder = userStatus ? "Type your comment!" : "Please log in!";
        const topic = this.state.topicObject;
        const propInd = this.state.propIndex;
        const argInd = this.state.argIndex;
        const wordBreaker = {
            wordBreak: "break-word"
        }
        const argTitleStyle = {
            fontSize: "20px",
            fontWeight: "bold"
        }
        return (
            <div className="Detail_Oppo_Wrapper">
                <div className="Detail_Oppo_Head row no-gutters">
                    <div className="col-md-8">
                        <h2>{topic.title}</h2>
                        <h3>Proposition {propInd+1}/{topic.proposition.length}: {topic.proposition[propInd].content}</h3>
                    </div>

                    <div className="col-md-4">
                        <br/>
                        <div>Topic Hoteness: {topic.Hotness}</div>
                        <div>Topic Contributor: <i className="far fa-user"></i>{" "}<strong>{topic.userName}</strong></div>
                    </div>
                    

                </div>
                <div className="Detail_Oppo_Main">
                    <div className="row no-gutters">
                        <div className="col-sm-7 Detail_Oppo_Main_Arg">
                            <div className="Detail_Oppo_Main_Arg_User">
                                <div style={argTitleStyle}>{topic.proposition[propInd].argument[argInd].title}</div>
                                <div>
                                    <i className="far fa-user"></i> <strong>{topic.proposition[propInd].argument[argInd].userName}</strong>
                                </div>
                                <br/>
                            </div>

                            <div>
                                {ReactHtmlParser(draftToHtml(JSON.parse(topic.proposition[propInd].argument[argInd].richTextContent)))}
                            </div>
                        </div>

                        <div className="col-sm-5">
                            <div className="Detail_Oppo_Main_Comments">
                            {
                                (topic.proposition[propInd].argument[argInd].comment.length === 0) && 
                                <div style={{textAlign: "center", marginLeft: "5px", marginRight: "5px",marginTop:"10px"}}>
                                    {"no comment yet :("}
                                </div>
                            }
                            {
                                topic.proposition[propInd].argument[argInd].comment.map((comment, index) => {
    
                                    return (
                                        <div key={index} className="Detail_Oppo_Main_Comment">
                                            <div className="comment_Info">
                                                <p><i className="far fa-user"></i> <strong>{comment.userName}</strong>  <i>{moment(comment.postDate).fromNow()}</i></p>
                                            </div>
                                            <p>{comment.content}</p>
                                        </div>
    
                                    ); 
    
                                })
                            }
                            </div>

                        </div>

                    </div>
                </div>
                <div className="Detail_Oppo_Action">
                    <div className="row">
                        <div className="col-md-7 Detail_Oppo_Action_Attitude">
                            <button className="btn btn-primary Detail_margin1" disabled={!userStatus || this.state.IsProcessingAction} onClick={() => this.onViewAction(1)}>
                                {this.state.IsProcessingAction ? "saving.." : "Listen"}
                            </button>
                            <button className="btn btn-secondary" disabled={!userStatus || this.state.IsProcessingAction} onClick={() => this.onViewAction(2)}>
                                {this.state.IsProcessingAction ? "saving.." : "Persuaded"}
                            </button>
                        </div>

                        <div className="col-md-5">
                            <textarea className="Detail_Oppo_commentArea" disabled={!userStatus} placeholder={textPlaceholder} onChange={this.onCommentChange} value={this.state.commentContent}/>
                            <Button variant="success" 
                            block disabled={!userStatus || this.state.isSubmittingComment} 
                            onClick={this.onSubmitComment}
                            >
                                {this.state.isSubmittingComment ? "Submitting..." : "Submit your comment"}
                                {true && <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true"/>}
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
    onCommentChange = (e) => {
        const val = e.target.value;
        this.setState(() => ({
            commentContent: val
        }))
    }
    onSubmitComment = async() => {
        const propInd = this.state.propIndex;
        const argInd = this.state.argIndex;
        const topic = this.state.topicObject;

        let post_id = this.props.auth.user.userName;
        let post_date = new Date();
        let topic_id = topic._id;
        let proposition_id = topic.proposition[propInd]._id;
        let argument_id = topic.proposition[propInd].argument[argInd]._id;
        let content = this.state.commentContent;

        const body = {
            post_id,
            post_date,
            topic_id,
            proposition_id,
            argument_id,
            comment_content: content
        }

        try{
            await this.setState(() => ({
                isSubmittingComment: true
            }))

            const res = await axios.post("/api/posts/Post/comment",body);
            topic.proposition[propInd].argument[argInd].comment.push({
                content,
                userName: post_id,
                postDate: post_date
            })

            await this.setState(() => ({
                isSubmittingComment: false,
                topicObject: topic,
                commentContent: ""
            }))
        }catch(err){
            console.log("Comment submit on error: ",err.response.data);
            await this.setState(() => ({
                isSubmittingComment: false,
            }))
        }

    }
    handleSummaryAction = async(index) => {
        console.log("Handle Summary Action");
    }
    renderSummary = () => {
        const summary = this.state.listenRecorder;
        const title = "Does Obesity equal to unhealthiness?";
        const topic = this.state.topicObject;
        let editLink = "/EditArgumentProp/"+topic._id+"/"+this.state.userStand;
        return (
            <div className="Detail_Summary">
                <div className="Detail_Summary_Content">
                    <div className="midAlign">
                        <h1>Summary</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-8 ">
                            <h3>{topic.title}</h3>
                        </div>
                        <div className="col-md-4 rightAlign">
                            Hotness: {topic.Hotness}
                        </div>
                    </div>
                    <div className="Detail_Summary_Content_gains">
                    {
                        summary.map((comment, index) => {
                            return (
                                    (index !== this.state.userStand) && 
                                    <div key={index}>
                                        You have listened to proposition {index+1} <strong>{comment[0]}</strong> times, and been persuaded <strong>{comment[1]}</strong> times
                                    </div>
                            );
                        })
                    }
                    <div>
                        <br/>
                        You earned <strong>{this.state.xpGained}</strong> experience and <strong>{this.state.honorGained}</strong> honors in total!
                    </div>
                    </div>
                </div>
                <div className="Detail_Summary_Action">
                    <h2 className="midAlign">You Can:</h2>
                    <div className="row Detail_Summary_Action_Button">
                        <div className="col-md-4 midAlign">
                            <Link to={editLink}>
                                <button className="btn btn-lg btn-outline-primary">Contribute</button>
                            </Link>
                        </div>
                        <div className="col-md-4 midAlign">
                            <Link to="/">
                                <button className="btn btn-lg btn-outline-primary">Persuaded</button>
                            </Link>
                            
                        </div>
                        <div className="col-md-4 midAlign"> 
                            <Link to="/">
                                <button className="btn btn-lg btn-outline-primary">well, nvm..</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleChange = e => {
        let newStage = this.state.currentStage;
        if (e.target.value === "PickPoint"){
            newStage = this.stages.PICK_POINT;
        }else if (e.target.value === "ViewOpposite"){
            newStage = this.stages.VIEW_OPPOSITE;
        }else {
            newStage = this.stages.SUMMARY;
        }

        this.setState(() => ({
            currentStage: newStage
        }))
    }

    render() {
        let mainContent = null;
        const stage = this.state.currentStage;
        if (stage === this.stages.PICK_POINT){
            mainContent = this.renderPickPoint();
        }else if (stage === this.stages.VIEW_OPPOSITE) {
            mainContent = this.renderViewOpposite();
        }else if (stage === this.stages.SUMMARY) {
            mainContent = this.renderSummary();
        }else if (stage === this.stages.LOADING) {
            mainContent = this.renderLoading();
        }else if (stage === this.stages.LACK_CONTENT){
            mainContent = this.renderLackContent();
        }else if (stage === this.stages.QUERY){
            mainContent = this.renderChoiceModal();
        }

        return (
            
            <div className="container">
                {this.renderViewedModal()}
                {this.renderAgainModal()}
                {mainContent && mainContent}
            </div>
        

        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(TopicDetail);