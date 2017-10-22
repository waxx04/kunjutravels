import React, { Component } from 'react';
import Home from './components/home/home';
import Packages from './components/packages/packages';
import Header from './components/header/header';
import Selector from './components/selector/selector';
import AdminPanel from './components/adminPanel/adminPanel';
import {API_HOST} from './constants';
import $http from './helpers/$http';


class App extends Component {

    state = {
        selectedPackage : {}
    };

    constructor(){
        super();

        this.selectPackage = (selectedPackage) => {
            selectedPackage.active = true;
            this.setState({selectedPackage})
        };

        this.close = () => {
            if(this.state.selectedPackage) {
                this.setState({
                    selectedPackage:{...this.state.selectedPackage, active:false, booked:false}
                })
            }
        };

        this.book = (params) => {
            if(this.state.selectedPackage) {

                console.log(params);
                $http.post(API_HOST + '/api/newbooking', params)
                    .then(reps=>{},reps=>{});

                this.setState({
                    selectedPackage:{...this.state.selectedPackage, booked:true}
                })
            }
        };

        this.openAdminPage = () => {
            this.setState({adminPanel:true})
        };

        this.closeAdminPage = () => {
            this.setState({adminPanel:false})
        };

    }

    render() {
        return (
            <div className="App">
                <Header openAdminPage={this.openAdminPage} closeAdminPage={this.closeAdminPage}/>
                {
                    this.state.adminPanel ? (
                        <div>
                            <AdminPanel/>
                        </div>
                    ) : (
                        <div>
                            <Selector selected={this.state.selectedPackage} close={this.close} book={this.book}/>
                            <Home/>
                            <Packages click={this.selectPackage}/>
                        </div>
                    )
                }
            </div>
        );
    }
}

export default App;
