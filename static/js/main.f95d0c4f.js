/*! For license information please see main.f95d0c4f.js.LICENSE.txt */
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`,hZ=fZ.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  height: 150px;
  overflow-y: auto;
  position: relative;
  font-size: 24px; // Increased font size
`,mZ=fZ.span`
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 24px; // Increased font size
  color: ${e=>{switch(e.status){case"correct":return"#52c41a";case"incorrect":return"#f5222d";case"current":return"#1890ff";default:return"#8c8c8c"}}};
  background-color: ${e=>"current"===e.status?"#e6f7ff":"transparent"};
  transition: all 0.2s ease;
`,vZ=fZ.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
  margin: 20px 0;
`,gZ=fZ(KS)`
  text-align: center;
  .ant-card-body {
    padding: 12px;
  }
`,yZ=fZ.div`
  .ant-input {
    font-size: 24px;
    padding: 12px;
    height: auto;
  }
`,{Title:bZ,Text:xZ}=cp,{Option:wZ}=Mv,SZ=()=>{const[e,n]=(0,t.useState)("vietnamese"),[r,o]=(0,t.useState)([]),[i,a]=(0,t.useState)(0),[l,c]=(0,t.useState)(""),[s,u]=(0,t.useState)(!1),[d,f]=(0,t.useState)(60),[p,h]=(0,t.useState)(!1),[m,v]=(0,t.useState)(0),[g,y]=(0,t.useState)(0),[b,x]=(0,t.useState)({}),w=(0,t.useRef)(null),S=(0,t.useCallback)((()=>{const t=Ob[e],n=[];for(let e=0;e<20;e++){const e=Math.floor(Math.random()*t.length);n.push({text:t[e],status:"waiting"})}return n}),[e]);(0,t.useEffect)((()=>{if(!s||!p)return;const e=setInterval((()=>{f((t=>t<=1?(u(!1),clearInterval(e),0):t-1))}),1e3);return()=>clearInterval(e)}),[s,p]),(0,t.useEffect)((()=>{var e;s&&(null===(e=w.current)||void 0===e||e.focus())}),[s]);const C=m+g>0?Math.round(m/(m+g)*100):0,k=Math.round(m/(60-d||1)*60);return(0,zY.jsx)(pZ,{children:(0,zY.jsxs)(Bv,{direction:"vertical",style:{width:"100%"},size:"large",children:[(0,zY.jsxs)("div",{style:{textAlign:"center"},children:[(0,zY.jsx)(bZ,{level:3,children:"Typing Speed Test"}),(0,zY.jsxs)(Bv,{children:[(0,zY.jsxs)(Mv,{value:e,onChange:e=>n(e),style:{width:120},disabled:s,children:[(0,zY.jsx)(wZ,{value:"vietnamese",children:"Ti\u1ebfng Vi\u1ec7t"}),(0,zY.jsx)(wZ,{value:"english",children:"English"})]}),(0,zY.jsx)(vy,{type:"primary",onClick:()=>{var e;const t=S();t[0].status="current",o(t),a(0),c(""),u(!0),f(60),h(!1),v(0),y(0),x({}),null===(e=w.current)||void 0===e||e.focus()},disabled:s,children:s?"\u0110ang ch\u1ea1y...":"B\u1eaft \u0111\u1ea7u"})]})]}),(0,zY.jsx)(Jy,{percent:Math.round(d/60*100),status:"active",strokeWidth:50,strokeColor:{"0%":"#108ee9","100%":"#87d068"},showInfo:!1}),(0,zY.jsxs)(vZ,{children:[(0,zY.jsx)(gZ,{children:(0,zY.jsxs)(Ku,{title:"Th\u1eddi gian c\xf2n l\u1ea1i",children:[(0,zY.jsxs)(bZ,{level:4,children:[d,"s"]}),(0,zY.jsx)(xZ,{type:"secondary",children:"Th\u1eddi gian"})]})}),(0,zY.jsx)(gZ,{children:(0,zY.jsxs)(Ku,{title:"S\u1ed1 t\u1eeb g\xf5 \u0111\xfang",children:[(0,zY.jsx)(bZ,{level:4,children:m}),(0,zY.jsx)(xZ,{type:"secondary",children:"T\u1eeb \u0111\xfang"})]})}),(0,zY.jsx)(gZ,{children:(0,zY.jsxs)(Ku,{title:"S\u1ed1 t\u1eeb g\xf5 sai",children:[(0,zY.jsx)(bZ,{level:4,children:g}),(0,zY.jsx)(xZ,{type:"secondary",children:"T\u1eeb sai"})]})}),(0,zY.jsx)(gZ,{children:(0,zY.jsxs)(Ku,{title:"Words Per Minute",children:[(0,zY.jsx)(bZ,{level:4,children:k}),(0,zY.jsx)(xZ,{type:"secondary",children:"WPM"})]})}),(0,zY.jsx)(gZ,{children:(0,zY.jsxs)(Ku,{title:"T\u1ef7 l\u1ec7 g\xf5 \u0111\xfang",children:[(0,zY.jsxs)(bZ,{level:4,children:[C,"%"]}),(0,zY.jsx)(xZ,{type:"secondary",children:"\u0110\u1ed9 ch\xednh x\xe1c"})]})})]}),(0,zY.jsx)(hZ,{children:(()=>{if(!s&&0===i)return r.slice(0,6);const e=Math.max(0,i-5),t=Math.min(r.length,i+6);return r.slice(e,t)})().map(((e,t)=>(0,zY.jsx)(mZ,{status:e.status,children:e.text},`${e.text}-${t}`)))}),(0,zY.jsx)(yZ,{children:(0,zY.jsx)(Eb,{ref:w,value:l,onChange:e=>{s&&(p||h(!0),c(e.target.value))},onKeyDown:e=>{if(s&&(" "===e.key||"Enter"===e.key)){if(e.preventDefault(),""===l.trim())return;const t=r[i],n=l.trim()===t.text;((e,t)=>{x((n=>{const r=n[e]||{word:e,attempts:0,correct:0,incorrect:0,accuracy:0},o={...r,attempts:r.attempts+1,correct:r.correct+(t?1:0),incorrect:r.incorrect+(t?0:1)};return o.accuracy=o.correct/o.attempts*100,{...n,[e]:o}}))})(t.text,n),o((e=>{const t=[...e];return t[i].status=n?"correct":"incorrect",i>=t.length-10&&t.push(...S()),i<t.length-1&&(t[i+1].status="current"),t})),n?v((e=>e+1)):y((e=>e+1)),a((e=>e+1)),c("")}},disabled:!s,placeholder:s?"G\xf5 t\u1eeb \u1edf \u0111\xe2y...":"Nh\u1ea5n 'B\u1eaft \u0111\u1ea7u' \u0111\u1ec3 ch\u01a1i",size:"large"})}),!s&&m>0&&(0,zY.jsx)(BY,{wordStats:b})]})})},{Header:CZ,Content:kZ}=di,EZ=()=>(0,zY.jsx)(di,{children:(0,zY.jsx)(kZ,{style:{padding:"50px"},children:(0,zY.jsx)(SZ,{})})}),OZ=e=>{e&&e instanceof Function&&n.e(453).then(n.bind(n,6453)).then((t=>{let{getCLS:n,getFID:r,getFCP:o,getLCP:i,getTTFB:a}=t;n(e),r(e),o(e),i(e),a(e)}))};o.createRoot(document.getElementById("root")).render((0,zY.jsx)(t.StrictMode,{children:(0,zY.jsx)(EZ,{})})),OZ()})()})();
//# sourceMappingURL=main.f95d0c4f.js.map