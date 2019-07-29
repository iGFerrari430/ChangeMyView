import React from 'react';
import ReactHtmlParser from 'react-html-parser';

export default class TopicDetail extends React.Component {
    /* Topic Format: 
        {
            title: string,
            content: string,
            hotness: number
        }
    */
            /*

        Information include: 
        {
            title: str,
            content_rich: str,
            argument: [{  //论点Object
                arg_point: string, // 论点内容
                arg_author: string, // 论点提供者
                interpretations: [{ // 论证object
                    Author: string // 论证作者
                    interpretationContent: string, // 论证内容
                    createDate: datetime,
                    interpId: objectId
                    comments: [{
                        commentId: objectId,
                        createDate: datetime,
                        Author: string // 评论作者
                        commentContent: 评论内容
                    }]
                }]

            }]
        }
        */

    constructor(props)
    {
        super(props)
        console.log(this.props.history.location);
        const topic = this.props.history.location.query.topic;
        console.log("topic is: ",topic);
        /*Connect backend to get the information of the post! */

        this.state = {
            dummy: null,
            topicObject: null,// this stores the object of topic. The format is as the above comment.
            IsLoggedIn: "",
            currentStage: this.stages.PICK_POINT,
            info: {
                userPick: null,
                commentArray: null,

            },

            // Following dedicated to PICK stage handles.
            pickButtonValue: "Hide Content" // alternative: "Show Content"

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
        PICK_POINT: "pick_point",
        VIEW_OPPOSITE: "view_opposite",
        SUMMARY: "summary"
    }
    
    onPickToggleClick = () => {
        console.log("Kawhi Leonard");
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
   
    renderPickPoint = () => {
        const dummyPoints = ["dafeige","minliaoli","xiaowenzhu","dsjlsd","dssdsd","dsdssdfdsf"];
        return (
            <div>
            <div className="Detail_pick_wrapper AddMargin">
                <div className="Detail_Pick_Topic">
                    <h2>This is the place that title is supposed to show. Be ready that 
                    title may actually Take up LOOOTs of space! 
                    </h2>
                    <div className="Detail_Pick_Topic_Info row">
                        <div className="col-md-8 cdx">
                            {"Hoteness:  "+100+" "}
                            <span>Contributor: Batian Diao</span>
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
                            {this.renderDummyValue()}
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
                        dummyPoints.map((point, index) =>
                        // Only do this if items have no stable IDs
                        <button 
                        key={index} 
                        onClick={() => this.handlePointPick(index)} 
                        className="btn btn-secondary btn-lg AddMargin">
                            {point}
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
        console.log(stage);
        if (stage === this.stages.PICK_POINT){
            mainContent = this.renderPickPoint();
        }else if (stage === this.stages.VIEW_OPPOSITE) {
            mainContent = this.renderViewOpposite();
        }else if (stage === this.stages.SUMMARY) {
            mainContent = this.renderSummary();
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