var firebase = require("firebase/app");
require("firebase/auth");
require("firebase/database");

var config = {
    apiKey: "AIzaSyDfPuxNav3inT1JeWvzWRQk-AHvdCwpqqw",
    authDomain: "aurelistophe.firebaseapp.com",
    databaseURL: "https://aurelistophe.firebaseio.com",
    storageBucket: "aurelistophe.appspot.com",
    messagingSenderId: "164238200047"
};
firebase.initializeApp(config);

import React, { Component } from 'react';
import {render} from 'react-dom';
import ReactFireMixin from 'reactfire';
import reactMixin from 'react-mixin';
import moment from 'moment';

class WeddingDaySchedule extends Component {

    formattedDay(dayStr) {
        return dayStr;
    }

    formattedTime(element) {
        var eventDateStr = element.date;
        var eventDate = moment(eventDateStr).format('DD/MM/YYYY HH:mm');
        return eventDate.toString();
    }

    componentWillMount() {

        var day = this.props.day;

        console.log(day);

        var ref = firebase.database().ref('/')
            .orderByChild('date')
            .startAt(day + 'T00:00:00+02.00')
            .endAt(day + 'T23:59:59+02.00');
        this.bindAsArray(ref, 'items');
    }

    render() {

        var self = this;

        return (
            <div>

                <h2>{self.formattedDay(this.props.day)}</h2>

                {
                    this.state.items.map(function (element) {
                        return (
                            <div key={element.date}>
                                <h3>{element.title}</h3>

                                <p>{self.formattedTime(element)}</p>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

reactMixin(WeddingDaySchedule.prototype, ReactFireMixin);

class App extends Component {

    render() {
        return (
            <div>
                <WeddingDaySchedule day="2017-04-29" />
                <WeddingDaySchedule day="2017-04-30" />
            </div>
        )
    }
}

render(<App />, document.getElementById('wed-app'));
