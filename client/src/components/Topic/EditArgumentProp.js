import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
import axios from "axios";
import { connect } from 'react-redux';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import {Link} from 'react-router-dom';
import draftToHtml from 'draftjs-to-html';
class EditArgumentProp extends Component {
    LOADING = -100;
    READY = -101;
    SUCCESS = -102;
    constructor(props){
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            title: "",
            newProp: "",
            stage: this.LOADING,
            topicObject: null,
            userStand: -1,
            choice: "",
            argError: "",
            propError: "",
            processing: false
        }

        console.log(props);
    }
    onEditorStateChange = (editorState) => {
        this.setState({
          editorState,
        });
    };
    onTitleChange = e => {
        const val = e.target.value;
        this.setState(() => ({ title: val }));
    }
    onPropChange = e => {
        const val = e.target.value;
        this.setState(() => ({
            newProp: val
        }))
    }
    async componentDidMount() {
        try{
            console.log("Did Mount from editArgProp");
            const res = await axios.get("/api/posts/Get/specificTopic/"+this.props.match.params.topicId);
            this.setState(() => ({
                topicObject: res.data,
                userStand: parseInt(this.props.match.params.userStand),
                stage: this.READY,
                choice: "AddArg"
            }))

            console.log("post is: ",res.data);
        }catch(err){
            console.log(err.data);
        }    
        
    }
    renderAddProp = () => {
        const inputStyle = {
            marginTop: "8%",
            marginBottom: "2%"
        }
        return (
            <div>

                <div style={inputStyle}>
                    <input type="text"
                    className="form-control Blacken titleMargin" 
                    id="PropTitle" 
                    value={this.state.newProp} 
                    onChange={this.onPropChange} 
                    placeholder="new Proposition Title goes here." 
                    />
                </div>
                
                {
                    this.state.propError && 
                    <div className="alert alert-danger" role="alert">
                    {this.state.propError}
                    </div>
                }
                <button type="button" 
                className="btn btn-outline-success btn-lg btn-block" 
                onClick={this.onPropFinish}
                disabled={this.state.processing}
                >
                    {this.state.processing ? "Processing your request" : "Submit your new proposition to this topic!"}
                </button>

            </div>
        );
    }

    onArgFinish = async(e) => {
        if (this.state.title.trim().length === 0){
            await this.setState(() => ({
                argError: 'Error: Title cannot be empty',
            }))
        
            return;
        }
        const rawState = convertToRaw(this.state.editorState.getCurrentContent());

        // /Post/argument
        // const {topic_title, proposition_id, 
        //argument_title, argument_plaintext, 
        //argument_richtext} = req.body
        const topic = this.state.topicObject;
        const body = {
            topicId: topic._id,
            proposition_id: topic.proposition[this.state.userStand]._id,
            argument_title: this.state.title,
            argument_plaintext: this.state.editorState.getCurrentContent().getPlainText(),
            argument_richtext: JSON.stringify(rawState)
        }

        try{
            await this.setState(() => ({
                processing: true
            }))
            const res = await axios.post("/api/posts/Post/argument",body);
            this.setState(() => ({
                stage: this.SUCCESS
            }))
        }catch(err){
            await this.setState(() => ({
                processing: false
            }))
            this.setState(() => ({
                argError: err.response.data
            }))
        }
    }

    onPropFinish = async(e) => {
        if (this.state.newProp.trim().length === 0){
            await this.setState(() => ({
                propError: "Error: proposition is empty"
            }))

            return;
        }
        
        const body = {
            topicId: this.state.topicObject._id,
            content: this.state.newProp
        }
        console.log("body is: ",body);
        try {
            await this.setState(() => ({
                processing: true
            }))
            const res = await axios.post("/api/posts/Post/proposition",body);
            this.setState(() => ({
                stage: this.SUCCESS
            }))
        }catch(err){
            await this.setState(() => ({
                processing: false
            }))
            console.log(err.response.data);
            this.setState(() => ({
                propError: err.response.data
              }))
        }

        // /Post/proposition
        // const {topic_title, content} = req.body
    }

    renderAddArg = () => {
        const outerWrapper = {
            marginTop: "10px"
        }
        console.log("state choice: "+this.state.choice)
        const topic = this.state.topicObject;
        return (
            <div style={outerWrapper}>
                <h3>Your proposition: {topic.proposition[this.state.userStand].content}</h3>
                <input type="text" className="form-control Blacken titleMargin" id="TopicTitle" value={this.state.title} onChange={this.onTitleChange} placeholder="Argument Title goes here."  />
                <Editor
                    editorState={this.state.editorState}
                    wrapperClassName="wholeWrapper"
                    editorClassName="editor"
                    toolbarClassName="toolbar"
                    onEditorStateChange={this.onEditorStateChange}
                    placeholder="Argument Content goes here."
                />
                {
                    this.state.argError && 
                    <div className="alert alert-danger" role="alert">
                      {this.state.argError}
                    </div>
                }
                <button type="button" 
                className="btn btn-outline-success btn-lg btn-block" 
                onClick={this.onArgFinish}
                disabled={this.state.processing}>
                    {this.state.processing ? "Processing your request" : "Submit your argument of your standPoint now!"}
                    
                </button>
            </div>
        );
    }
    handleChange = e => {
        
        const val = e.target.value;
        console.log(val);
        this.setState(() => ({
            choice: val
        }))
    }
    render() {
        const wrapperStyle = {
            marginTop: "20px",
            paddingLeft: "2%",
            paddingRight: "2%",
            paddingTop: "3%",
            backgroundColor: "#F6F6F6",
            paddingBottom: "2%",
            border: "1px solid black",
            borderRadius: "10px"
        }
        
        const topic = this.state.topicObject;
        if (this.state.stage === this.LOADING){
            return (
                <div style={{marginLeft: "45%",  marginTop: "25%"}}>
                    <Loader
                    type="ThreeDots"
                    color="#00BFFF"
                    height="100"	
                    width="100"
                    />
                </div>
            )
        }
        else if (this.state.stage === this.READY)
            return(
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div style={wrapperStyle}>
                            <h2>{topic.title}</h2>
                            <br/>
                            <h4>Please select your action below: </h4>
                            <select className="form-control" onChange={this.handleChange}>
                                <option name="choice" value="AddArg" >Add an argument for my backed proposition</option>
                                <option name="choice" value="AddProp">Add a brand new Proposition for the topic</option>
                            </select>
                            {this.state.choice === "AddArg" ? this.renderAddArg() : this.renderAddProp()}
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
            );
        else {
            return (
                <div className="container">
                    <div className="row">
                        <div className="col-md-2"></div>
                        <div style={wrapperStyle} className="col-md-8">
                            <h3>Nice Work! We will take your work from here. Your contribution will be posted shortly.</h3>
                            <br/>
                            <Link to="/"><button className="btn btn-primary btn-lg">Back to Main Page</button></Link>
                        </div>
                        <div className="col-md-2"></div>
                    </div>
                   
                   
                </div>
            );
        }
    }

}

const mapStateToProps = state => ({
    auth: state.auth
});
  
export default connect(mapStateToProps)(EditArgumentProp);