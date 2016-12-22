import React from 'react'
import Routes from '../routes'
import { render } from 'react-dom'
import { setupDataStore } from '../stores/data'

const hasWindow = typeof window==='undefined' ? false : true

class ClientRouter {
    route({ route }) {

        const Route = Routes[route].path

        document.getElementsByTagName('title')[0].innerHTML = Routes[route].title

        render(<Route {...window.initialProps} /> , document.getElementById('content'))
    }
}

const router = new ClientRouter

if (hasWindow) {
    setupDataStore(require(`../clientApp`))
    // bootstrapping the client router with a listener for popstate and the initial route
    window.addEventListener( 'popstate' , event => router.route({ route : window.location.pathname }) )
    router.route({ route : window.location.pathname })
}
export { router }
