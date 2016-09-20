import React, { Component } from 'react';

var style = {
    display:"block"
};

export default class SearchBook extends Component {

    constructor(props) {
        super(props);
        this.onInputChange = this.onInputChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {book: '', category: 'bookName'};

    }

    onInputChange(event){

        this.setState({book: event.target.value})
    }
    onSelectChange(event){
        this.setState({category: event.target.value})
    }


    onFormSubmit(event){
        event.preventDefault();
        this.setState({book: ''})
        this.setState({category: 'bookName'})
        this.props.handle({searchVal:this.state.book, category: this.state.category});
    }

    render() {

        return (

            <form style={style} onSubmit={this.onFormSubmit} className="input-group">
                <div className="col-md-8">
                    <input
                        placeholder="Search Book"
                        className="form-control"
                        value={this.state.book}
                        onChange={this.onInputChange}
                    />
                </div>
                <div className="col-md-2">
                    <select className="form-control"
                            onChange={this.onSelectChange}
                            value={this.state.category}>
                        <option value="bookName">Book Name</option>
                        <option value="authors">Author</option>
                        <option value="category">Category</option>
                        <option value="location">Location</option>
                        <option value="publishYear">Year of publish</option>
                    </select>
                </div>
                <div className="col-md-1">
                    <span className="input-group-btn">
                        <button type="submit" className="btn btn-secondary">Submit</button>
                    </span>
                </div>
            </form>


        );
    }
}