import React from 'react'
import { GlobalStyles, FontPenrose } from '@muya-ui/theme-light';
import { Link, Routes<% if (!isProd) {%>, useDataServer<%}%> } from 'docz'
<% if (!isProd) {%>import { hot } from 'react-hot-loader'<%}%>
import Theme from '<%- theme %>'

import { imports } from './imports'
import database from './db.json'
<% if (wrapper) {%>import Wrapper from '<%- wrapper %>'<%}%>
import { ThemeConfigContext } from '@muya-ui/baozheng-docz-theme'
import { apiPropsMap, apiTypeMap } from 'api/apiData'
import Nav from 'api/Nav.tsx'

const parametersLogic = code => {
  if (!code) return null
  const html = '<div id="root"></div>';

  let content = code
  content = content.replace(/mountNode\)/g, 'document.getElementById("root"))');
  content = `import ReactDOM from 'react-dom';\n` + content;

  return ({
    files: {
      'package.json': {
        content: {
          title: "Muya-UI demo",
          devDependencies: {
            "react-scripts": "latest",
            '@types/react-dom': 'latest',
            '@types/react': 'latest',
            '@types/styled-components': 'latest'
          },
          dependencies: {
            react: 'latest',
            'react-dom': 'latest',
            'styled-components': 'latest',
            'typescript': 'latest',
            '@muya-ui/core': 'latest',
            '@muya-ui/theme-light': 'latest',
            '@muya-ui/theme-dark': 'latest',
            '@muya-ui/utils': 'latest',
          },
        },
      },
      'index.tsx': {
        content,
        isBinary: false,
      },
      'index.html': {
        content: html,
        isBinary: false,
      },
      'tsconfig.json': {
        content: {
          "compilerOptions": {
            "target": "es5",
            "lib": [
              "dom",
              "dom.iterable",
              "esnext"
            ],
            "allowJs": true,
            "skipLibCheck": true,
            "esModuleInterop": true,
            "allowSyntheticDefaultImports": true,
            "strict": true,
            "forceConsistentCasingInFileNames": true,
            "module": "esnext",
            "moduleResolution": "node",
            "resolveJsonModule": true,
            "isolatedModules": true,
            "noEmit": true,
            "jsx": "preserve"
          }
        }
      },
    },
  })
}

const Root = () => {
  <% if (!isProd && websocketUrl) {%>useDataServer('<%- websocketUrl %>')<%}%>
  const data = { props: apiPropsMap, type: apiTypeMap, codeSandboxPars: parametersLogic, navs: Nav }
  return (
    <Theme
      <% if (wrapper) {%>wrapper={Wrapper}<%}%>
      linkComponent={Link}
      db={database}
      >
        <ThemeConfigContext.Provider value={data}>
          <FontPenrose />
          <GlobalStyles resetScrollBar={true} />
          <Routes imports={imports} />
        </ThemeConfigContext.Provider>
    </Theme>
  )
}

<% if (!isProd) {%>export default hot(module)(Root)<%}%>
<% if (isProd) {%>export default Root<%}%>
