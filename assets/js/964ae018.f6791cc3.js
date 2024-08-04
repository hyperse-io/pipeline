"use strict";(self.webpackChunk_hyperse_track_docs=self.webpackChunk_hyperse_track_docs||[]).push([[443],{9037:(e,n,l)=>{l.r(n),l.d(n,{assets:()=>a,contentTitle:()=>o,default:()=>t,frontMatter:()=>s,metadata:()=>c,toc:()=>d});var r=l(2540),i=l(3023);const s={sidebar_position:3},o="API Reference",c={id:"api-reference",title:"API Reference",description:"This article discusses the API and props of MuiColorInput. Props are defined within MuiColorInputProps.",source:"@site/docs/api-reference.md",sourceDirName:".",slug:"/api-reference",permalink:"/pipeline/docs/api-reference",draft:!1,unlisted:!1,editUrl:"https://github.com/hyperse-io/pipeline/docs/api-reference.md",tags:[],version:"current",sidebarPosition:3,frontMatter:{sidebar_position:3},sidebar:"tutorialSidebar",previous:{title:"Color validation",permalink:"/pipeline/docs/color-validation"},next:{title:"TextField inheritance",permalink:"/pipeline/docs/inheritance"}},a={},d=[{value:"<code>value</code>",id:"value",level:2},{value:"Hex, 8-digit (RGBA) Hex",id:"hex-8-digit-rgba-hex",level:3},{value:"RGB, RGBA",id:"rgb-rgba",level:3},{value:"HSL, HSLA",id:"hsl-hsla",level:3},{value:"HSV, HSVA",id:"hsv-hsva",level:3},{value:"<code>onChange</code>",id:"onchange",level:2},{value:"<code>format</code>",id:"format",level:2},{value:"<code>fallbackValue</code>",id:"fallbackvalue",level:2},{value:"<code>isAlphaHidden</code>",id:"isalphahidden",level:2}];function h(e){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"api-reference",children:"API Reference"}),"\n",(0,r.jsxs)(n.p,{children:["This article discusses the API and props of ",(0,r.jsx)(n.strong,{children:"MuiColorInput"}),". Props are defined within ",(0,r.jsx)(n.code,{children:"MuiColorInputProps"}),"."]}),"\n",(0,r.jsx)(n.h2,{id:"value",children:(0,r.jsx)(n.code,{children:"value"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Type: ",(0,r.jsx)(n.code,{children:"MuiColorInputValue"})]}),"\n",(0,r.jsxs)(n.li,{children:["Required: ",(0,r.jsx)(n.code,{children:"true"})]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"The string parsing is very permissive. It is meant to make typing a color as input as easy as possible. All commas, percentages, parenthesis are optional, and most input allow either 0-1, 0%-100%, or 0-n (where n is either 100, 255, or 360 depending on the value)."}),"\n",(0,r.jsxs)(n.p,{children:["HSL and HSV both require either 0%-100% or 0-1 for the ",(0,r.jsx)(n.code,{children:"S"}),"/",(0,r.jsx)(n.code,{children:"L"}),"/",(0,r.jsx)(n.code,{children:"V"})," properties. The ",(0,r.jsx)(n.code,{children:"H"})," (hue) can have values between 0%-100% or 0-360."]}),"\n",(0,r.jsx)(n.p,{children:"RGB input requires either 0-255 or 0%-100%."}),"\n",(0,r.jsxs)(n.p,{children:["Source : ",(0,r.jsx)(n.a,{href:"https://github.com/scttcper/tinycolor#accepted-string-input",children:"https://github.com/scttcper/tinycolor#accepted-string-input"})]}),"\n",(0,r.jsx)(n.p,{children:"Here are some examples of string input:"}),"\n",(0,r.jsx)(n.h3,{id:"hex-8-digit-rgba-hex",children:"Hex, 8-digit (RGBA) Hex"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'<MuiColorInput value="#000" />\n<MuiColorInput value="000" />\n<MuiColorInput value="#369C" />\n<MuiColorInput value="#f0f0f6" />\n<MuiColorInput value="#f0f0f688" />\n<MuiColorInput value="f0f0f688" />\n'})}),"\n",(0,r.jsx)(n.h3,{id:"rgb-rgba",children:"RGB, RGBA"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'<MuiColorInput value="rgb (255, 0, 0)" />\n<MuiColorInput value="rgb 255 0 0" />\n<MuiColorInput value="rgba (255, 0, 0, .5)" />\n<MuiColorInput value={{ r: 255, g: 0, b: 0 }} />\n'})}),"\n",(0,r.jsx)(n.h3,{id:"hsl-hsla",children:"HSL, HSLA"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'<MuiColorInput value="hsl(0, 100%, 50%)" />\n<MuiColorInput value="hsla(0, 100%, 50%, .5)" />\n<MuiColorInput value="hsl 0 1.0 0.5" />\n<MuiColorInput value={{ h: 0, s: 1, l: 0.5 }} />\n'})}),"\n",(0,r.jsx)(n.h3,{id:"hsv-hsva",children:"HSV, HSVA"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'<MuiColorInput value="hsv(0, 100%, 50%)" />\n<MuiColorInput value="hsva(0, 100%, 50%, .5)" />\n<MuiColorInput value="hsv (0 100% 100%)" />\n<MuiColorInput value={{ h: 0, s: 100, v: 100 }} />\n'})}),"\n",(0,r.jsx)(n.h2,{id:"onchange",children:(0,r.jsx)(n.code,{children:"onChange"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Default: ",(0,r.jsx)(n.code,{children:"undefined"})]}),"\n",(0,r.jsxs)(n.li,{children:["Type: ",(0,r.jsx)(n.code,{children:"(color: string, colors: MuiColorInputColors) => void"})]}),"\n",(0,r.jsxs)(n.li,{children:["Required: ",(0,r.jsx)(n.code,{children:"false"})]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Gets called once the user updates the color value."}),"\n",(0,r.jsxs)(n.p,{children:["The callback gives you ",(0,r.jsx)(n.strong,{children:"2 parameters"}),":"]}),"\n",(0,r.jsxs)(n.ol,{children:["\n",(0,r.jsxs)(n.li,{children:["The new color ",(0,r.jsx)(n.a,{href:"#value",children:"value"})," stringified"]}),"\n",(0,r.jsxs)(n.li,{children:["An object of the color value in different formats stringified (",(0,r.jsx)(n.code,{children:"hex"}),", ",(0,r.jsx)(n.code,{children:"hex8"}),", ",(0,r.jsx)(n.code,{children:"hsl"}),", ",(0,r.jsx)(n.code,{children:"hsv"}),", ",(0,r.jsx)(n.code,{children:"rgb"}),")"]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Example:"}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'const handleChange = (color, colors) => {\n  /**\n  color: "#ffffff"\n  colors: {\n    hex: "#ffffff",\n    hex8: "#ffffffff",\n    hsl: "hsl(0, 0%, 100%)",\n    hsv: "hsv(0, 0%, 100%)",\n    rgb: "rgb(255, 255, 255)"\n  }\n  **/\n};\n\n<MuiColorInput onChange={handleChange} />;\n'})}),"\n",(0,r.jsx)(n.h2,{id:"format",children:(0,r.jsx)(n.code,{children:"format"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Default: ",(0,r.jsx)(n.code,{children:'"rgb"'})]}),"\n",(0,r.jsxs)(n.li,{children:["Type: ",(0,r.jsx)(n.code,{children:"MuiColorInputFormat"})]}),"\n",(0,r.jsxs)(n.li,{children:["Required: ",(0,r.jsx)(n.code,{children:"false"})]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["The format to use for the color ",(0,r.jsx)(n.a,{href:"#value",children:"value"}),". The first parameter of ",(0,r.jsx)(n.code,{children:"onChange"})," respects this format."]}),"\n",(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:"Available formats"}),": ",(0,r.jsx)(n.code,{children:"hex"}),", ",(0,r.jsx)(n.code,{children:"hex8"}),", ",(0,r.jsx)(n.code,{children:"hsl"}),", ",(0,r.jsx)(n.code,{children:"hsv"})," and ",(0,r.jsx)(n.code,{children:"rgb"}),"."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'<MuiColorInput format="hex" />\n<MuiColorInput format="hex8" />\n<MuiColorInput format="rgb" />\n<MuiColorInput format="hsv" />\n<MuiColorInput format="hsl" />\n'})}),"\n",(0,r.jsx)(n.h2,{id:"fallbackvalue",children:(0,r.jsx)(n.code,{children:"fallbackValue"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Default: ",(0,r.jsx)(n.code,{children:'"black"'})]}),"\n",(0,r.jsxs)(n.li,{children:["Type: ",(0,r.jsx)(n.code,{children:"MuiColorInputValue"})]}),"\n",(0,r.jsxs)(n.li,{children:["Required: ",(0,r.jsx)(n.code,{children:"false"})]}),"\n"]}),"\n",(0,r.jsxs)(n.p,{children:["A fallback color ",(0,r.jsx)(n.a,{href:"#value",children:"value"})," in case the user updates the input with an invalid color value."]}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:'<MuiColorInput fallbackValue="#ffffff" />\n<MuiColorInput fallbackValue="#ffffffff" />\n<MuiColorInput fallbackValue="hsv(0, 0%, 100%)" />\n<MuiColorInput fallbackValue="rgb(255, 255, 255)" />\n<MuiColorInput fallbackValue={{ h: 0, s: 100, v: 100 }} />\n'})}),"\n",(0,r.jsx)(n.h2,{id:"isalphahidden",children:(0,r.jsx)(n.code,{children:"isAlphaHidden"})}),"\n",(0,r.jsxs)(n.ul,{children:["\n",(0,r.jsxs)(n.li,{children:["Default: ",(0,r.jsx)(n.code,{children:"false"})]}),"\n",(0,r.jsxs)(n.li,{children:["Type: ",(0,r.jsx)(n.code,{children:"boolean"})]}),"\n",(0,r.jsxs)(n.li,{children:["Required: ",(0,r.jsx)(n.code,{children:"false"})]}),"\n"]}),"\n",(0,r.jsx)(n.p,{children:"Whether to show input controls for a color\u2019s alpha channel."}),"\n",(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:"language-tsx",children:"<MuiColorInput isAlphaHidden />\n"})})]})}function t(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(h,{...e})}):h(e)}},3023:(e,n,l)=>{l.d(n,{R:()=>o,x:()=>c});var r=l(3696);const i={},s=r.createContext(i);function o(e){const n=r.useContext(s);return r.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function c(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:o(e.components),r.createElement(s.Provider,{value:n},e.children)}}}]);