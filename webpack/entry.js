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
import 'moment/locale/fr';

moment.locale('fr');

class WeddingDaySchedule extends Component {

    formattedDay(dayStr) {
        return moment(dayStr).format('dddd Do MMMM YYYY');
    }

    formattedTime(element) {
        var eventDateStr = element.date;
        var eventDate = moment(eventDateStr).format('HH:mm');
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
            <div style={{padding: '1em', textAlign: 'center'}}>

                <h2 style={{textTransform: 'capitalize'}}>{self.formattedDay(this.props.day)}</h2>

                {
                    this.state.items.map(function (element, num) {
                        // return <WeddingDayEvent date={element.date} title={element.title} url={element.url} />
                        return (
                            <div key={element.date}
                                style={{
                                    border: '1px solid gray',
                                    color: 'white',
                                    marginBottom: '.4em',
                                    padding: '0',
                                    background: 'url(http://lorempixel.com/1280/960/food/' + num + ')',
                                    backgroundPosition: 'center center',
                                    backgroundRepeat: 'no-repeat',
                                }}>

                                <div style={{textShadow: '0px 0px .1em black', textAlign: 'center', background: 'rgba(0,0,0,.5)'}}>
                                    <div>{element.title}</div>
                                    <div>{self.formattedTime(element)}</div>
                                </div>
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
