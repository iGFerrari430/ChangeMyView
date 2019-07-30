import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { connect } from 'react-redux';
import moment from 'moment';
// eslint-disable-next-line
import htmlToDraft from 'html-to-draftjs';
import axios from "axios";
import '../../styles/draft.css';
// eslint-disable-next-line
import ReactHtmlParser from 'react-html-parser';

class TopicEditor extends Component {
  constructor(props)
  {
    super(props);
    console.log(props);
    const str = '{"blocks":[{"key":"54u14","text":"MAC OS X ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"ce22u","text":"IOS 13","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"1imab","text":"cdx","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"b8ice","text":"vds","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"ru07","text":"vdssd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"b3o16","text":"sdaf","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}';
    const raw = JSON.parse(str);
    // eslint-disable-next-line
    const contentState = convertFromRaw(raw);
    this.state = {
      editorState: EditorState.createEmpty(), //EditorState.createWithContent(contentState)
      title: '',
      proposition1: '',
      proposition2: '',
      submitState: 0,
      error: ''
    }

    //get plain text: 
    //const myText = this.state.editorState.getCurrentContent().getPlainText();
  }

  onFinish = async(e) => {
    if(this.state.title.trim().length === 0){
      this.setState(() => ({
        error: 'Error: Title cannot be empty',
        submitState: 0
      }))

      return;
    }
    else if(this.state.proposition1.trim().length === 0){
      this.setState(() => ({
        error: 'Error: proposition 1 cannot be empty',
        submitState: 0
      }))

      return;
    }
    else if(this.state.proposition2.trim().length === 0){
      this.setState(() => ({
        error: 'Error: proposition 2 cannot be empty',
        submitState: 0
      }))

      return;
    }
    else if (this.state.submitState === 0){
      this.setState(() => ({
        submitState: 1,
        error: ''
      }))

      return;
    }

    this.setState(() => ({
      error: ''
    }))

    const rawState = convertToRaw(this.state.editorState.getCurrentContent());

    const htmlText = draftToHtml(rawState);

    this.setState(() => ({
      dummy: htmlText
    }))

    const rich_tc = JSON.stringify(rawState);
    const plain_tc = this.state.editorState.getCurrentContent().getPlainText();
    const title = this.state.title;
    const userName = this.props.auth.user.userName;
    const postDate = new Date();
    const proposition1 = this.state.proposition1;
    const proposition2 = this.state.proposition2;

    const body = {
      rich_tc,
      plain_tc,
      title,
      userName,
      postDate,
      proposition1,
      proposition2
    }

    //console.log("Type of plain: ",typeof(plainTextContent));
    //console.log(plainTextContent);
    //console.log(postTime);
    //console.log(richTextContent);
    //const res = await axios.post("/api/auth/Register",body);
    try{
      const res = await axios.post("/api/posts/Post/Topic",body);
      console.log(res.data);
      this.props.history.push('/');
      
    }catch(err){
      this.setState(() => ({
        error: "There is some server error. Try again or check your internet"
      }))
    }
    /*
    moment(Date);
    const momentTime = moment(postTime);
    console.log(momentTime);*/
    //var day = moment(postTime);
    //console.log(ve);

    //console.log(JSON.parse(ve));

  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  onProp1Change = e => {
    const val = e.target.value
    this.setState(() => ({
      proposition1: val
    }))
  }
  onProp2Change = e => {
    const val = e.target.value
    this.setState(() => ({
      proposition2: val
    }))
  }
  onTitleChange = e => {
    console.log("title changed");
    const val = e.target.value;
    this.setState(() => ({ title: val }));
  }

  onSaveDraft = () => {
    console.log("save draft...");
  }
  render() {
    const { editorState } = this.state;
    return (
      <div className="container-fluid row no-gutters">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="row no-gutters">
            <div className="col-12">
              <div className="EditTitle">Create a new Topic</div>
            </div>
          </div>

          <div className="row no-gutters">

            <div className="col-xl-9">

              <input type="text" className="form-control Blacken titleMargin" id="TopicTitle" value={this.state.title} onChange={this.onTitleChange} placeholder="Topic Title goes here."  />
              <Editor
                editorState={editorState}
                wrapperClassName="wholeWrapper"
                editorClassName="editor"
                toolbarClassName="toolbar"
                onEditorStateChange={this.onEditorStateChange}
                placeholder="Topic Content goes here."
              />
              <div className="EditTopic_propositions">
                <div className="form-group">
                  <label htmlFor="proposition1">Proposition 1</label>
                  <input type="text" className="form-control Blacken" style={{marginBottom: 0}}value={this.state.proposition1} onChange={this.onProp1Change} id="proposition1" placeholder="Please create the first proposition for your Topic" required/>
                </div>
              </div>
              <div className="EditTopic_propositions">
                <div className="form-group">
                  <label htmlFor="proposition2">Proposition 2</label>
                  <input type="text" className="form-control Blacken" style={{marginTop: 0}} value={this.state.proposition2} onChange={this.onProp2Change} id="proposition2" placeholder="Please create the first proposition for your Topic" required/>
                </div>
              </div>
              {
                this.state.error && 
                <div className="alert alert-danger" role="alert">
                  {this.state.error}
                </div>
              }

              <div className="row no-gutters">
                <div className="col-12 rightAlign">
                  <button onClick={this.onSaveDraft} className="btn btn-outline-secondary buttonMargin">Save Draft</button>
                  <button onClick={this.onFinish} className="btn btn-outline-primary ">{(this.state.submitState === 0) ? "Submit for review" : "Confirm Submit"}</button>
                </div>
                
              </div>
            </div>

            <div className="col-xl-3">
              <div className="PolicyBox">
                <h3>Notes</h3>

                <ol className="Edit-ol" >
                  <li>Make sure no similar topic exists. Reapted topic will be removed.</li>
                  <li>Absolutely no politics topic may be allowed. Violators will be permanently banned.</li>
                  <li>Topics need to benefit the entire community instead of yourself only.</li>
                  <li>Take full advantage of the rich text editor to make your topic clearer.</li>
                  <li>Please initialize 2 propositions for your topic. You can always add more later on.</li>
                  <li> <div style={{textDecoration: "underline"}}>Example:</div> <div>Topic: Does obesity equal to unhealthiness</div> <div>Proposition 1: No</div> <div>Proposition 2: Yep</div></li>
                </ol>


              </div>
            </div>

           
          </div>
          <br/>
          <br/>
         
        </div>
        <div className="col-md-2">
          {/*this.state.dummy && <div><p>DEMO CONTENT:(TO REMOVE)</p>{ReactHtmlParser(this.state.dummy)}</div>*/}
        </div>

        {/*
        
        <textarea
          disabled
          value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
        />
        */
        }

      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(TopicEditor);