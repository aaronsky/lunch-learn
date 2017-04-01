import React, { Component } from 'react';

import Navigation from 'lunchlearn/js/utilities/navigation';
import PageHome from 'lunchlearn/js/pages/home';

export default class LunchLearnApp extends Component {
    
    render() {
        const props = {
            initialRoute: {
                id: PageHome.id,
                title: PageHome.title,
                index: 0
            }
        }
        return (
            <Navigation {...props} />
        );
    }
}