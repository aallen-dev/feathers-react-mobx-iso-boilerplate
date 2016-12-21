import React , { Component } from 'react'
import { router } from '../../lib/router'

class Link extends Component {
    _route = (event) => {

        event.preventDefault()

        const { to } = this.props

        router.route({route : to})
        window.history.pushState('' , '' , to)
    }
    render() {
        const { to , ...props } = this.props
        return <a onClick={this._route} {...{ href:to , ...props }} />
    }
}

export { Link }
