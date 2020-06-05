import React, {Component} from 'react';

class Footer extends Component{
    render() {
        return (
            <footer className="page-footer font-small d-flex align-items-center justify-content-center" style={{color: "white", backgroundColor: "black", height: "50px"}}>
                <div className="text-center">
                    Coded by Jiehao Luo
                </div>
            </footer>
        )
    }
}

export default Footer;
