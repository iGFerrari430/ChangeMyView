import React from 'react';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'
import { withRouter } from 'react-router-dom'
class SearchBar extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputValue: ""
            
        }

        
    }

    handleChange = (e) => {
        const val = e.target.value;
        this.setState(() => ({
            inputValue: val
        }))
    }

    onSearch = async() => {
        let keyword = this.state.inputValue.trim();
        if (!keyword){
            return;
        }
        const url = "/Search/"+keyword;
        await this.setState(() => ({
            inputValue: ""
        }))
        this.props.history.push(url);
    }

    render(){
        return  (
            <div>
                <InputGroup>
                    <FormControl
                    placeholder="Search Topic"
                    value={this.state.inputValue}
                    onChange={this.handleChange}
                    />
                    <InputGroup.Append>
                        <button onClick={this.onSearch} style={{cursor: "pointer"}}>
                            <span style={{
                                fontSize: "20px",
                                marginLeft: "3px", 
                                marginRight: "3px"
                            }}>
                                <i className="fas fa-search"></i>
                            </span>
                        </button>
                    </InputGroup.Append>
                </InputGroup>
        
            </div>
        )
    }
}

export default withRouter(SearchBar);