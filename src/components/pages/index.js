import React from 'react'

import { Provider } from 'mobx-react'

import { Data } from '../DataList'
import { Link } from '../utils/Link'

import { dataStore } from '../../stores/data'


module.exports = () =>
    <div>
        home sweet home
        <div>
            <Link to="/notHome">not home</Link>
            <Provider {...{ dataStore }}>
                <Data />
            </Provider>
        </div>
    </div>
