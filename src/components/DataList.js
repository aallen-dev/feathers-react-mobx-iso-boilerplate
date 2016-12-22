import React , { Component } from 'react'

import { inject , observer } from 'mobx-react'

const styles = { segment : { float : 'left' , padding : '10px' } } ,
    DataList = observer( ({ data }) =>
        <ul>
            {data.map( datum =>
                <li key={datum._id}>{datum.text}</li>)}
        </ul>) ,
    Data = inject('dataStore')(observer( ({ dataStore }) => {

        const _addData = ({ target , which }) =>
                which===13 && (dataStore.create({ data : { text : target.value } }) , target.value = '') ,
            _reset = () =>
                dataStore.reset() ,
            _findMatch = ({ target }) =>
                dataStore.filter = target.value

        return  <div>
                    <div style={styles.segment}>
                        <input placeholder="add to list" onKeyDown={_addData} /><br />
                        <button onClick={_reset} >reset</button>
                        <DataList {...{ data : dataStore.data }} />
                    </div>
                    <div style={styles.segment}>
                        <input placeholder="search within list" onChange={_findMatch} value={dataStore.filter} />
                        <DataList {...{ data : dataStore.dataMatch }} />
                    </div>
                </div>
    }))

export { Data }
