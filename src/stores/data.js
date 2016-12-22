import { observable , computed , action } from 'mobx'

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
        this.data.push(data)

    @action reset = () =>
        this.data = []

}

const dataStore = new DataActions

export { dataStore }
