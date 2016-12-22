import React from 'react'
import Routes from '../routes'
import { renderToStaticMarkup , renderToString } from 'react-dom/server'
import { setupDataStore } from '../stores/data'

import { Document } from '../components/utils/Document'

const initialProps = { /*any props needed on initial load*/ }

class ServerRouter {
    route() {
        return (req , res , next) => {

            const { path } = req

            if (path=='/static-assets/js/initialProps.js') {
                res.send(`window.initialProps=${JSON.stringify(initialProps)}`)
                return
            }

            // routing from config file `/src/lib/routes.js`
            if (Routes[path]) {
                setupDataStore(req.app , 'isServer').then( () =>{
                    const Route = Routes[path] ,
                        route = <Route.path {...initialProps} /> ,
                        props = {
                            title : Route.title ,
                            // while the Document is treated as static markup and rendered with `renderToStaticMarkup` the app itself will be
                            // reused on the client side. This requires renderToString to allow react on the client to understand its context.
                            App   : {
                                dangerouslySetInnerHTML : {
                                    __html : renderToString(route)
                                }
                            }
                        }

                    res.send(renderToStaticMarkup(<Document {...props} />))
                })
                // .catch(e=>{console.log(e.toString());res.json({status:'503 Service Unavailable'})})
                return
            }

            next()
        }
    }
}

const router = new ServerRouter

export { router }
