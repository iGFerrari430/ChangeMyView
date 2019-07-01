import React, { Component } from 'react';
import { EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../styles/draft.css';
import ReactHtmlParser from 'react-html-parser';

export default class EditorConvertToHTML extends Component {
  constructor(props)
  {
    const str = '{"blocks":[{"key":"54u14","text":"MAC OS X ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"ce22u","text":"IOS 13","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":6,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"1imab","text":"cdx","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"b8ice","text":"vds","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":3,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"ru07","text":"vdssd","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"ITALIC"}],"entityRanges":[],"data":{}},{"key":"b3o16","text":"sdaf","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":4,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}';
    const raw = JSON.parse(str);
    const contentState = convertFromRaw(raw);
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(), //EditorState.createWithContent(contentState)
      title: '',
      dummy: ''
    }

    var x = document.getElementsByClassName("toolbar");
    console.log(x);

    //get plain text: 
    //const myText = this.state.editorState.getCurrentContent().getPlainText();
  }
  onSubmit = () => {
    console.log("from Editor: Hello,World!");
    const rawState = convertToRaw(this.state.editorState.getCurrentContent());

    const htmlText = draftToHtml(rawState);

    this.setState(() => ({
      dummy: htmlText
    }))

    const ve = JSON.stringify(rawState);
    console.log(ve);

    console.log(JSON.parse(ve));
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
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
            <div className="col-md-9">
              <input type="text" className="form-control Blacken titleMargin" id="TopicTitle" value={this.state.title} onChange={this.onTitleChange} placeholder="Topic Title goes here."  />
              <Editor
                editorState={editorState}
                wrapperClassName="wholeWrapper"
                editorClassName="editor"
                toolbarClassName="toolbar"
                onEditorStateChange={this.onEditorStateChange}
                placeholder="Topic Content goes here."
              />
              <div className="row no-gutters">
                <div className="col-12 rightAlign">
                  <button onClick={this.onSaveDraft} className="btn btn-outline-secondary buttonMargin">Save Draft</button>
                  <button onClick={this.onSubmit} className="btn btn-outline-primary ">Submit for review</button>
                </div>
                
              </div>
            </div>

            <div className="col-md-3">
              <div className="PolicyBox">
                <h3>Notes</h3>

                <ol className="Edit-ol">
                  <li>Make sure no similar topic exists. Reapted topic will be removed.</li>
                  <li>Absolutely no politics topic may be allowed. Violators will be permanently banned.</li>
                  <li>Topics need to benefit the entire community instead of yourself only.</li>
                  <li>Take full advantage of the rich text editor to make your topic clearer.</li>
                </ol>


              </div>
            </div>

           
          </div>

         
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