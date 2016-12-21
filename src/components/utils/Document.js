import React from 'react'

const Document = ({ App , title }) =>
    <html>
        <head>
            <meta charSet="UTF-8" />
            <title>
                { title }
            </title>
        </head>
        <body>
            <react id="content" {...App} />
        </body>
    </html>

export { Document }
