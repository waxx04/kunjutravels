/**
 * Created by intellicar-rinas on 22/10/17.
 */
import React, {Component} from 'react'
import './adminPanel.css';
import $http from '../../helpers/$http';
import {API_HOST} from '../../constants';

class AdminPanel extends Component {

    state = {
        packages:[],
        bookings:[]
    };

    constructor(){
        super();

        this.getPackage = () => {
            $http.post(API_HOST + '/api/getpackages', {})
                .then(resp=>{
                    this.setState({packages: resp.data.data});
                    // console.log(resp);
                }, resp=> {
                    // console.log(resp);
                })
        };

        this.createPackage = () => {
            $http.post(API_HOST + '/api/createpackage', {
                packagename: this.refs.name.value,
                description: this.refs.desc.value,
                cost: parseInt(this.refs.cost.value) || 0,
            })
                .then(resp=>{
                    this.clearInputs();
                    this.getPackage();
                }, resp=>{
                    this.clearInputs();
                })

            this.clearInputs = () => {
                this.refs.name.value = "";
                this.refs.desc.value = "";
                this.refs.cost.value = "";
            }
        }

        this.getBookingList = () => {
            $http.post(API_HOST + "/api/getbookings", {})
                .then(resp=>{
                    console.log(resp.data.data);
                    this.setState({bookings: resp.data.data});
                }, resp=>{
                    console.log("Failed Niggha");
                })
        }

        this.getBookingList()

    }

    componentDidMount(){
        this.getPackage();
    }

    render(){
        return (
            <div className="AdminPanel">
                <div className="ap-container">
                    <div className="apc-content">
                        <div className="apcc-head">Booking List</div>
                        <div className="apcc-body">
                            <div className="p-items -ultra">
                                {
                                    this.state.bookings.map((item, index)=> {
                                        return (
                                            <div className="p-item" key={index} onClick={()=>this.props.click(item)}>
                                                <div className="pi-name">{item.name}: {item.contact_no}</div>
                                                <div className="pi-date">{item.packagename}: {item.start_at}</div>
                                                <div className="pi-desc">{item.description}</div>
                                                <div className="pi-cost">{item.cost} Rs</div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ap-container">
                    <div className="apc-content">
                        <div className="apcc-head">Package List</div>
                        <div className="apcc-body">
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
                            <div className="apcc-form">
                                <input placeholder="Package Name" ref="name"/>
                                <input placeholder="Cost of package" type="number" ref="cost"/>
                                <textarea ref="desc"></textarea>
                                <button onClick={this.createPackage}>Create Package</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default AdminPanel;