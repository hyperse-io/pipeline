"use strict";(self.webpackChunk_hyperse_track_docs=self.webpackChunk_hyperse_track_docs||[]).push([[120],{8126:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>r,default:()=>a,frontMatter:()=>i,metadata:()=>l,toc:()=>d});var o=n(2540),s=n(3023);const i={sidebar_position:5},r="CSS",l={id:"css",title:"CSS",description:"Like any component, if you want to override a component's styles using custom classes, you can use the className prop.",source:"@site/docs/css.md",sourceDirName:".",slug:"/css",permalink:"/pipeline/docs/css",draft:!1,unlisted:!1,editUrl:"https://github.com/hyperse-io/pipeline/docs/css.md",tags:[],version:"current",sidebarPosition:5,frontMatter:{sidebar_position:5},sidebar:"tutorialSidebar",previous:{title:"TypeScript",permalink:"/pipeline/docs/typescript"},next:{title:"Playground",permalink:"/pipeline/docs/playground"}},c={},d=[{value:"Example with styled-component / emotion",id:"example-with-styled-component--emotion",level:2}];function p(e){const t={a:"a",code:"code",h1:"h1",h2:"h2",p:"p",pre:"pre",table:"table",tbody:"tbody",td:"td",th:"th",thead:"thead",tr:"tr",...(0,s.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h1,{id:"css",children:"CSS"}),"\n",(0,o.jsxs)(t.p,{children:["Like any component, if you want to override a component's styles using custom classes, you can use the ",(0,o.jsx)(t.code,{children:"className"})," prop."]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-jsx",children:'<MuiColorInput className="my-class-name" />\n'})}),"\n",(0,o.jsxs)(t.p,{children:["Then, you can use the differents global class names (see below) to target an element of ",(0,o.jsx)(t.code,{children:"MuiColorInput"}),"."]}),"\n",(0,o.jsxs)(t.table,{children:[(0,o.jsx)(t.thead,{children:(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.th,{children:"Global class"}),(0,o.jsx)(t.th,{children:"Description"})]})}),(0,o.jsxs)(t.tbody,{children:[(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:".MuiColorInput-TextField"})}),(0,o.jsx)(t.td,{children:"Styles applied to the root element."})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:".MuiColorInput-Button"})}),(0,o.jsxs)(t.td,{children:["Styles applied to the ",(0,o.jsx)(t.a,{href:"https://mui.com/material-ui/api/button/",children:"Button"})," component"]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:".MuiColorInput-Popover"})}),(0,o.jsxs)(t.td,{children:["Styles applied to the ",(0,o.jsx)(t.a,{href:"https://mui.com/material-ui/api/popover/",children:"Popover"})," component"]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:".MuiColorInput-ColorSpace"})}),(0,o.jsx)(t.td,{children:"Styles applied to the ColorSpace component"})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:".MuiColorInput-HueSlider"})}),(0,o.jsxs)(t.td,{children:["Styles applied to the Hue ",(0,o.jsx)(t.a,{href:"https://mui.com/material-ui/api/slider/",children:"Slider"})]})]}),(0,o.jsxs)(t.tr,{children:[(0,o.jsx)(t.td,{children:(0,o.jsx)(t.code,{children:".MuiColorInput-AlphaSlider"})}),(0,o.jsxs)(t.td,{children:["Styles applied to the Alpha ",(0,o.jsx)(t.a,{href:"https://mui.com/material-ui/api/slider/",children:"Slider"})]})]})]})]}),"\n",(0,o.jsxs)(t.p,{children:["For example: target the ",(0,o.jsx)(t.code,{children:".MuiColorInput-HueSlider"})," global class name to customize the Hue Slider."]}),"\n",(0,o.jsx)(t.h2,{id:"example-with-styled-component--emotion",children:"Example with styled-component / emotion"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-jsx",children:"import { styled } from 'styled-component'; // or emotion\nimport { MuiColorInput } from 'mui-color-input';\n\nconst MuiColorInputStyled = styled(MuiColorInput)`\n  & .MuiColorInput-AlphaSlider {\n    margin-top: 10px;\n  }\n`;\n\nfunction MyComponent() {\n  return <MuiColorInputStyled />;\n}\n"})})]})}function a(e={}){const{wrapper:t}={...(0,s.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(p,{...e})}):p(e)}},3023:(e,t,n)=>{n.d(t,{R:()=>r,x:()=>l});var o=n(3696);const s={},i=o.createContext(s);function r(e){const t=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function l(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),o.createElement(i.Provider,{value:t},e.children)}}}]);