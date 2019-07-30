import React from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import ReactHtmlParser from 'react-html-parser';
import axios from "axios";
import TopicPreview from './TopicPreview';
import Loader from 'react-loader-spinner';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
export default class TopicDetail extends React.Component {

    constructor(props)
    {
        super(props);

        /*Connect backend to get the information of the post! */
        this.state = {
            topicObject: null,// this stores the object of topic. The format is as the above comment.
            IsLoggedIn: "",
            currentStage: this.stages.LOADING,
            info: {
                userPick: null,
                commentArray: null,

            },
            IsUserFinished: false,
            propIndex: -1,
            argIndex: -1,
            userStand: null,
            xpGained: 0,
            honorGained: 0,
            // Following dedicated to PICK stage handles.
            pickButtonValue: "Hide Content" // alternative: "Show Content"

        }
    }

    async componentDidMount() {
        try{
            const body = {
                tId: this.props.match.params.topicId
            };

            console.log("W T F");
            const res = await axios.get("/api/posts/Get/specificTopic/"+this.props.match.params.topicId);
            this.setState(() => ({
                    topicObject: res.data,
                    currentStage: this.stages.PICK_POINT
            }))
        }catch(err){
            console.log(err.data);
        }    
        
    }
    renderDummyValue = () => {
        const dummyParagraph = '<h1><span style="font-family: Times New Roman;"><strong>wdsaj;a;fda;sfdadsl;kasf</strong></span></h1><p>WTFWTFWTFWTFDSJIOAFASDJOJIOADFOIJ;ASFJI;ASDFJASFDAJFDJADFS;ADFSK;LZ;ASDZDSFLKLKZDSF</p><p>AAAAAASFASDLKADFSJAKLJASDKLJASFJDLKLASJ;AD;AD;AKSF;ASD;ADASAJSLF;AJKDSAJ;ASJDFAKFDCKNASHJFJSCBVUDSHEWCUUBIAUS FIOCULIRALSIDFURHSCUHDSFACDGKJFAHCUHJDSFAHCFAJKCHSCAFLHCSDFADDSHFASCKSDHDSLCSHFDKSHFSDHHDSKHFSDKHDSKFHSDJHDSJKHFSJHDFKSHJFDHSKHDFJSKHSJDKJFSJFKWHF</p><ul><li>sjdkskldsd</li><li>sdfjklsdfsdflkj</li><li>sdfjkldsfjlsdljk</li><li>sadfjajsfksd</li></ul><ol><li>dfsjklsdflkjjlkdsf</li><li>sdfjkllkjdfsjlkfsd</li><li>sfdjjosdfojisdf</li><li>sdfjiofsdjiofsd</li></ol><p></p><p></p>'
        return (
            
            
            <div>
                {ReactHtmlParser(dummyParagraph)}
            </div>
        )
    }
    stages = {
        LOADING: "Loading",
        PICK_POINT: "pick_point",
        VIEW_OPPOSITE: "view_opposite",
        SUMMARY: "summary",
        LACK_CONTENT: "LACK_CONTENT"
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
    handlePointPick = (index) => {
        console.log(index);
    }
    renderTopicBody = () => {

    }
    renderLoading = () => {
        return (
            <div style={{marginLeft: "45%",  marginTop: "25%"}}>
                <Loader
                type="Ball-Triangle"
                color="#00BFFF"
                height="100"	
                width="100"
                />
            </div>
        );
    }
    renderPickPoint = () => {
        console.log("state is: ",this.state);
        const topic = this.state.topicObject;

        const dummyPoints = ["dafeige","minliaoli","xiaowenzhu","dsjlsd","dssdsd","dsdssdfdsf"];
        return (
            <div>
            <div className="Detail_pick_wrapper AddMargin">
                <div className="Detail_Pick_Topic">
                    <h2>
                        {topic.title}
                    </h2>
                    <div className="Detail_Pick_Topic_Info row">
                        <div className="col-md-8 cdx">
                            {"Hoteness:  "+topic.Hotness+" "}
                            <span>Contributor: {topic.userName}</span>
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
                    <div className="Detail_pick_topic_main_wrap">
                        <div className="Detail_pick_Topic_main">
                            {ReactHtmlParser(draftToHtml(JSON.parse(topic.richTextContent)))}
                        </div>
                    </div>

                }
 
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
                        className="btn btn-secondary btn-lg AddMargin">
                            {topic.plainTextContent}
                        </button>
                        )
                    }
                </div>
            </div>
            
                
            </div>
        );
    }
    // onClick={() => this.handleSort(column)}
    renderViewOpposite = () => {
        const userStatus = this.state.IsLoggedIn;
        const textPlaceholder = userStatus ? "Type your comment!" : "Please log in!";
        const dummyParagraph = '<h1><span style="font-family: Times New Roman;"><strong>wdsaj;a;fda;sfdadsl;kasf</strong></span></h1><p>WTFWTFWTFWTFDSJIOAFASDJOJIOADFOIJ;ASFJI;ASDFJASFDAJFDJADFS;ADFSK;LZ;ASDZDSFLKLKZDSF</p><p>AAAAAASFASDLKADFSJAKLJASDKLJASFJDLKLASJ;AD;AD;AKSF;ASD;ADASAJSLF;AJKDSAJ;ASJDFAKFDCKNASHJFJSCBVUDSHEWCUUBIAUS FIOCULIRALSIDFURHSCUHDSFACDGKJFAHCUHJDSFAHCFAJKCHSCAFLHCSDFADDSHFASCKSDHDSLCSHFDKSHFSDHHDSKHFSDKHDSKFHSDJHDSJKHFSJHDFKSHJFDHSKHDFJSKHSJDKJFSJFKWHF</p><ul><li>sjdkskldsd</li><li>sdfjklsdfsdflkj</li><li>sdfjkldsfjlsdljk</li><li>sadfjajsfksd</li></ul><ol><li>dfsjklsdflkjjlkdsf</li><li>sdfjkllkjdfsjlkfsd</li><li>sfdjjosdfojisdf</li><li>sdfjiofsdjiofsd</li></ol><p></p><p></p>'
        const dummyTitle = "Does Obesity equal to unhealthiness?";
        const dummyPoint = "Nope, not at all";
        const dummyHotness = 105;
        const viewIndex = 1;
        const viewTotal = 3;
        const dummyContributor = "Batian Diao";
        const dummyUser1 = "LeBron James"
        const dummyComments = [{
            author: "Degang Guo",
            content: "You are talking shit.",
            time: "A minute ago"
        }, {
            author: "Jieshi Jiang",
            content: "Nay, don't talk shit. The fact is that you are stupid.",
            time: "23 hours ago"
        }, {
            author: "Yun Ma",
            content: "You are a typical stupid ass. Your account should be permanently banned.",
            time: "1 day ago"
        }, {
            author: "唐纳德·特朗普",
            content: "Nice work bro. i REALLY LIKE YOUR POINT! Make America Great Again!",
            time: "A year ago"
        }, {
            author: "川建国",
            content: "I am happy that Rajon Rondo and Demarcus Cousins are coming to lakers.",
            time: "A century ago"
        }]
        return (
            <div className="Detail_Oppo_Wrapper">
                <div className="Detail_Oppo_Head row no-gutters">
                    <div className="col-md-8">
                        <h2>{dummyTitle}</h2>
                        <h3>ViewPoint {viewIndex}/{viewTotal}: {dummyPoint}</h3>
                    </div>

                    <div className="col-md-4">
                        <br/>
                        <div>Hoteness: {dummyHotness}</div>
                        <div>Point Contributor: {dummyContributor}</div>
                    </div>
                    

                </div>
                <div className="Detail_Oppo_Main">
                    <div className="row no-gutters">
                        <div className="col-sm-7 Detail_Oppo_Main_Arg">
                            <div className="Detail_Oppo_Main_Arg_User">
                                <i className="far fa-user"></i> <strong>{dummyUser1}</strong>
                            </div>

                            <div>
                                {ReactHtmlParser(dummyParagraph)}
                            </div>
                        </div>

                        <div className="col-sm-5">
                            <div className="Detail_Oppo_Main_Comments">
                            {
                                dummyComments.map((comment, index) => {
    
                                    return (
                                        <div key={index} className="Detail_Oppo_Main_Comment">
                                            <div className="comment_Info">
                                                <p><i className="far fa-user"></i> <strong>{comment.author}</strong>  <i>{comment.time}</i></p>
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
                            <button className="btn btn-primary Detail_margin1" disabled={!userStatus}>Listen</button>
                            <button className="btn btn-secondary" disabled={!userStatus}>Persuaded</button>
                        </div>

                        <div className="col-md-5">
                            <textarea className="Detail_Oppo_commentArea" disabled={!userStatus} placeholder={textPlaceholder} />
                            <button className="btn btn-success btn-block" disabled={!userStatus}>Submit your comment</button>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    renderSummary = () => {
        const summary = [[1,2],[4,1],[6,1],[4,2]];
        const title = "Does Obesity equal to unhealthiness?"
        return (
            <div className="Detail_Summary">
                <div className="Detail_Summary_Content">
                    <div className="midAlign">
                        <h1>Summary</h1>
                    </div>
                    <div className="row">
                        <div className="col-md-6 ">
                            <h3>{title}</h3>
                        </div>
                        <div className="col-md-6 rightAlign">
                            Hoteness: {10} Persuaded: {20}
                        </div>
                    </div>
                    <div className="Detail_Summary_Content_gains">
                    {
                        summary.map((comment, index) => {
                            return (
                                <div key={index}>
                                    You have listened to point {index+1} <strong>{comment[0]}</strong> times, and been persuaded <strong>{comment[1]}</strong> times
                                </div>
                            );
                        })
                    }
                    <div>
                        <br/>
                        You earned <strong>100</strong> experience and <strong>30</strong> honors in total!
                    </div>
                    </div>
                </div>
                <div className="Detail_Summary_Action">
                    <h2 className="midAlign">You Can:</h2>
                    <div className="row Detail_Summary_Action_Button">
                        <div className="col-md-4 midAlign">
                            <button className="btn btn-lg btn-primary">Add Argument</button>
                        </div>
                        <div className="col-md-4 midAlign">
                            <button className="btn btn-lg btn-primary">Persuaded</button>
                        </div>
                        <div className="col-md-4 midAlign"> 
                            <button className="btn btn-lg btn-primary">well, nvm..</button>
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
        }

        return (
            <div className="container">
            <div>
                <label > <input type="radio" name='stage' value="PickPoint"
                                onChange={this.handleChange}/>PickPoint Stage</label><br/>
                <label > <input type="radio" name='stage' value="ViewOpposite"
                                onChange={this.handleChange}/>View Opposite Stage</label><br/>
                <label > <input type="radio" name='stage' value="Summary"
                                onChange={this.handleChange}/>Summary Stage</label>
            </div>

                {mainContent}
            </div>
        

        );
    }
}