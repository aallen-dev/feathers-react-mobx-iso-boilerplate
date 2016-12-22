import { observable , computed , action } from 'mobx'
import { useStaticRendering } from 'mobx-react'

let dataService

class DataObservables {
    @observable data = []

    @observable filter = ''

    @computed get dataMatch () {
        const { data , filter } = this
        return filter ? data.filter( datum => datum.text.match(filter) ) : []
    }
}
class DataActions extends DataObservables {
    @action create = ({ data }) =>
        dataService.create(data)

    @action reset = () =>
        dataService.find()
            .then( ({ data }) =>
                data.forEach( datum =>
                    dataService.remove(datum)))

}
class DataServiceListeners extends DataActions {
    add = ({ data }) =>
        this.data.push(data)

    patch = ({ data }) =>
        this.data.replace(this.data.map( item =>
            data._id==item._id ? data : item))

    remove = ({ data }) =>
        this.data.replace(this.data.filter( item =>
            data._id!==item._id))

    setInitialState = ({ data }) =>
        this.data.replace(data)
}

const dataStore = new DataServiceListeners

const setupDataStore = (app , isServer) => {

    dataService = app.service('api/data')

    isServer
        ? useStaticRendering(true)
        : dataService
            .on('created' , data =>
                dataStore.add({ data }))
            .on('patched' , data =>
                dataStore.patch({ data }))
            .on('removed' , data =>
                dataStore.remove({ data }))

    return dataService.find()
        .then( ({ data }) =>
            dataStore.setInitialState({ data }))
        //.catch(e=>console.log(e.toString()))
}

export { dataStore , setupDataStore }
