/**
 * Created by intellicar-rinas on 22/10/17.
 */
import React, {Component} from 'react';
import './packages.css';
import $http from '../../helpers/$http';
import {API_HOST} from '../../constants';

class Packages extends Component {

    state = {
        packages: []
    };

    componentDidMount() {


        this.getPackage = () => {
            $http.post(API_HOST + '/api/getpackages', {})
                .then(resp=>{
                    this.setState({packages: resp.data.data});
                    // console.log(resp);
                }, resp=> {
                    // console.log(resp);
                })
        }

        this.getPackage();

    }

    render() {
        return (
            <div className="Packages">
                <div className="p-head">Our Packages</div>
                <div className="p-items">
                    {
                        this.state.packages.map((item, index)=> {
                            return (
                                <div className="p-item" key={index} onClick={()=>this.props.click(item)}>
                                    <div className="pi-name">{item.packagename}</div>
                                    <div className="pi-desc">{item.description}</div>
                                    {/*<div className="pi-date">{item.fromDate} to {item.toDate}</div>*/}
                                    <div className="pi-cost">{item.cost} Rs</div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }

}

export default Packages;