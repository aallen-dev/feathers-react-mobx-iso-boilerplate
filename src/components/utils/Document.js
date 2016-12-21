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
            <script type="text/javascript" key="propsScript"  src="/static-assets/js/initialProps.js" />
            <script type="text/javascript" key="vendorScript" src="/static-assets/js/vendor.js" />
            <script type="text/javascript" key="bundleScript" src="/static-assets/js/index.js" />
        </body>
    </html>

export { Document }
