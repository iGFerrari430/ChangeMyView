import React, { Component } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import '../../styles/draft.css';
import $ from 'jquery';
import { findDOMNode } from 'react-dom';

var script = document.createElement('script');
script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);

export default class EditorConvertToHTML extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
    }

    var x = document.getElementsByClassName("toolbar");
    console.log(x);
  }

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };
  onSubmit = () => {
    console.log("from Editor: Hello,World!");
  }
  render() {
    const { editorState } = this.state;
    return (
      <div className="container-fluid row">
        <div className="col-md-2"></div>
        <div className="col-md-6">
          <Editor
            editorState={editorState}
            wrapperClassName="wholeWrapper"
            editorClassName="editor"
            toolbarClassName="toolbar"
            onEditorStateChange={this.onEditorStateChange}
            placeholder="Topic goes here."
          />
          <button onSubmit={this.onSubmit} className="btn btn-success">Submit for review</button>
        </div>
        <div className="Policy col-md-2">
          Here: Supposed to show All the policies.
        </div>
        <div className="col-md-2"></div>

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