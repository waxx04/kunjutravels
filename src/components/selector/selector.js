/**
 * Created by intellicar-rinas on 22/10/17.
 */
import React, {Component} from 'react';
import Dom from '../../helpers/Dom';
import './selector.css';

class Selector extends Component {

    constructor(){
        super();

        this.getParams = () => {

            let name = this.refs.name.value;
            let contact_no = this.refs.number.value;
            let start_at = this.refs.date.value;
            let packageid = this.props.selected && this.props.selected.id;
            return { name, contact_no, start_at, packageid }
        }

    }

    render() {
        return (
            <div className={Dom.Class({'active': this.props.selected.active}, "Selector")}>
                <div className="s-close" onClick={this.props.close}>x</div>
                <div className="s-head">Book Now</div>
                <div className="s-name">{this.props.selected.packagename}</div>
                <div className="s-desc">{this.props.selected.description}</div>
                {/*<div className="s-date">{this.props.selected.fromDate} to {this.props.selected.toDate}</div>*/}
                <div className="s-cost">{this.props.selected.cost} Rs</div>
                {
                    this.props.selected.booked ? (
                        <div className="s-form">
                            <div className="s-name">Thank you for Booking</div>
                            <div className="s-desc">Our executive will call you to confirm the trip</div>
                        </div>
                    ) : (
                        <div className="s-form">
                            <input ref="name" placeholder="Your Name"/>
                            <input ref="number" type="number" placeholder="Your Contact Number"/>
                            <input ref="date" type="date" placeholder="Date"/>
                            <button onClick={()=>this.props.book(this.getParams())}>Book Now</button>
                        </div>
                    )
                }
            </div>
        )
    }

}

export default Selector;