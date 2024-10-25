"use strict";(self.webpackChunk_hyperse_pipeline_docs=self.webpackChunk_hyperse_pipeline_docs||[]).push([[990],{464:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>u,frontMatter:()=>a,metadata:()=>c,toc:()=>s});var n=o(2540),i=o(3023);const a={sidebar_position:2},r="Color validation",c={id:"color-validation",title:"Color validation",description:"Maybe you need to validate the color value and check that it's correct. To do that, just import matchIsValidColor from the package and use this function, it will return a boolean.",source:"@site/docs/color-validation.md",sourceDirName:".",slug:"/color-validation",permalink:"/pipeline/docs/color-validation",draft:!1,unlisted:!1,editUrl:"https://github.com/hyperse-io/pipeline/docs/color-validation.md",tags:[],version:"current",sidebarPosition:2,frontMatter:{sidebar_position:2},sidebar:"tutorialSidebar",previous:{title:"Getting Started",permalink:"/pipeline/docs/getting-started"},next:{title:"API Reference",permalink:"/pipeline/docs/api-reference"}},l={},s=[];function d(e){const t={code:"code",h1:"h1",header:"header",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.header,{children:(0,n.jsx)(t.h1,{id:"color-validation",children:"Color validation"})}),"\n",(0,n.jsxs)(t.p,{children:["Maybe you need to validate the color value and check that it's correct. To do that, just import ",(0,n.jsx)(t.code,{children:"matchIsValidColor"})," from the package and use this function, it will return a ",(0,n.jsx)(t.code,{children:"boolean"}),"."]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-jsx",children:"import React from 'react';\nimport { MuiColorInput, matchIsValidColor } from 'mui-color-input';\n\nconst MyComponent = () => {\n  const [value, setValue] = React.useState('#ffffff');\n\n  const handleChange = (newValue) => {\n    matchIsValidColor(newValue); // boolean\n  };\n\n  return <MuiColorInput value={value} onChange={handleChange} />;\n};\n"})})]})}function u(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},3023:(e,t,o)=>{o.d(t,{R:()=>r,x:()=>c});var n=o(3696);const i={},a=n.createContext(i);function r(e){const t=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function c(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(a.Provider,{value:t},e.children)}}}]);