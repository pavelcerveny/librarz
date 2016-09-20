import React from 'react';
import { Component } from 'react';
import Header from '../components/other/Header.jsx';
import Footer from '../components/other/Footer.jsx';

export default class AppContainer extends Component {
    render() {
        return (
            <div>
                <Header />
                    {this.props.children}
                <Footer />
            </div>
        );
    }
}