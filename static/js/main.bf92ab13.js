/*! For license information please see main.bf92ab13.js.LICENSE.txt */
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  
  @media (max-width: 768px) {
    padding: 10px;
  }
`,N1=P1.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 20px 0;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
  min-height: 150px;
  max-height: 200px;
  overflow-y: auto;
  position: relative;
  font-size: 24px;
  
  @media (max-width: 768px) {
    font-size: 18px;
    padding: 15px;
    min-height: 120px;
  }
`,I1=P1.span`
  padding: 4px 8px;
  border-radius: 4px;
  color: ${e=>{switch(e.status){case"correct":return"#52c41a";case"incorrect":return"#f5222d";case"current":return"#1890ff";default:return"#8c8c8c"}}};
  background-color: ${e=>"current"===e.status?"#e6f7ff":"transparent"};
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${e=>"current"===e.status?"#bae7ff":"transparent"};
  }
`,T1=P1.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin: 20px 0;
`,A1=P1(ZZ)`
  text-align: center;
  
  .ant-card-body {
    padding: 12px;
  }
  
  @media (max-width: 768px) {
    .ant-card-body {
      padding: 8px;
    }
  }
`,R1=P1.div`
  .ant-input {
    font-size: 24px;
    padding: 12px;
    height: auto;
    
    @media (max-width: 768px) {
      font-size: 18px;
      padding: 8px;
    }
  }
`,_1=P1(Ky)`
  @media (max-width: 768px) {
    margin-top: 10px;
  }
`,{Title:D1,Text:z1}=sp,{Option:B1}=Av,L1=[{value:15,label:"15 gi\xe2y"},{value:30,label:"30 gi\xe2y"},{value:45,label:"45 gi\xe2y"},{value:60,label:"60 gi\xe2y"}],H1=()=>{const[e,n]=(0,t.useState)("vietnamese"),[r,o]=(0,t.useState)([]),[i,a]=(0,t.useState)(0),[l,c]=(0,t.useState)(""),[s,u]=(0,t.useState)(!1),[d,f]=(0,t.useState)(60),[p,h]=(0,t.useState)(d),[m,v]=(0,t.useState)(!1),[g,y]=(0,t.useState)(0),[b,x]=(0,t.useState)(0),[w,S]=(0,t.useState)({}),[C,k]=(0,t.useState)(!1),E=(0,t.useRef)(null),[O,$]=(0,t.useState)(!1),[j,P]=(0,t.useState)([]),[M,N]=(0,t.useState)(!1),[I,T]=(0,t.useState)("last10"),A=(0,t.useCallback)((()=>{const t=BQ[e],n=[];for(let e=0;e<20;e++){const e=Math.floor(Math.random()*t.length);n.push({text:t[e],status:"waiting"})}return n}),[e]);(0,t.useEffect)((()=>{if(!s||!m)return;const e=setInterval((()=>{h((t=>t<=1?(u(!1),k(!0),clearInterval(e),0):t-1))}),1e3);return()=>clearInterval(e)}),[s,m]),(0,t.useEffect)((()=>{var e;s&&(null===(e=E.current)||void 0===e||e.focus())}),[s]),(0,t.useEffect)((()=>{const e=localStorage.getItem("typingHistory");e&&P(JSON.parse(e))}),[]);const R=g+b>0?Math.round(g/(g+b)*100):0,_=Math.round(g/(d-p||1)*60),D=(0,t.useCallback)((()=>{const e=new Date;let t=[...j];switch(I){case"hourly":t=j.filter((t=>kY(EY(t.date),_Y(e,24))));break;case"daily":t=j.filter((t=>kY(EY(t.date),zY(e,30))));break;case"monthly":t=j.filter((t=>kY(EY(t.date),LY(e,12))));break;case"last10":t=j.slice(0,10)}let n=t.map((e=>{const t=EY(e.date);let n="";switch(I){case"hourly":n=DQ(t,"HH:mm");break;case"daily":n=DQ(t,"dd/MM");break;case"monthly":n=DQ(t,"MM/yyyy");break;case"last10":n=DQ(t,"HH:mm dd/MM")}return{date:n,wpm:e.wpm,accuracy:e.accuracy,rawDate:e.date}}));return"monthly"!==I&&"daily"!==I||(n=Object.values(n.reduce(((e,t)=>(e[t.date]?(e[t.date].wpm=Math.round((e[t.date].wpm*e[t.date].count+t.wpm)/(e[t.date].count+1)),e[t.date].accuracy=Math.round((e[t.date].accuracy*e[t.date].count+t.accuracy)/(e[t.date].count+1)),e[t.date].count+=1):e[t.date]={date:t.date,wpm:t.wpm,accuracy:t.accuracy,count:1,rawDate:t.rawDate},e)),{}))),n.sort(((e,t)=>EY(e.rawDate).getTime()-EY(t.rawDate).getTime())).map((e=>{let{rawDate:t,...n}=e;return n}))}),[j,I]),z=(0,t.useCallback)((()=>{if(C&&g+b>0&&!M){const t=[{date:(new Date).toISOString(),wpm:_,accuracy:R,correctWords:g,incorrectWords:b,language:e,duration:d},...j].slice(0,100);P(t),localStorage.setItem("typingHistory",JSON.stringify(t)),N(!0)}}),[g,b,_,R,e,d,j,C,M]);return(0,t.useEffect)((()=>{C&&z()}),[C,z]),(0,t0.jsx)(M1,{children:(0,t0.jsxs)(Tg,{direction:"vertical",style:{width:"100%"},size:"large",children:[(0,t0.jsxs)("div",{style:{textAlign:"center"},children:[(0,t0.jsx)(D1,{level:1,children:"Typing Speed Test"}),(0,t0.jsx)(D1,{level:5,children:"Prod by Quang Bui"}),(0,t0.jsxs)(Tg,{wrap:!0,children:[(0,t0.jsxs)(Av,{value:e,onChange:e=>n(e),style:{width:120},disabled:s,children:[(0,t0.jsx)(B1,{value:"vietnamese",children:"Ti\u1ebfng Vi\u1ec7t"}),(0,t0.jsx)(B1,{value:"english",children:"English"})]}),(0,t0.jsx)(Av,{value:d,onChange:e=>f(e),style:{width:120},disabled:s,children:L1.map((e=>(0,t0.jsx)(B1,{value:e.value,children:e.label},e.value)))}),(0,t0.jsx)(Ky,{type:"primary",onClick:()=>{var e;const t=A();t[0].status="current",o(t),a(0),c(""),u(!0),h(d),v(!1),y(0),x(0),S({}),k(!1),N(!1),null===(e=E.current)||void 0===e||e.focus()},disabled:s,children:s?"\u0110ang ch\u1ea1y...":"B\u1eaft \u0111\u1ea7u"}),(0,t0.jsx)(_1,{onClick:()=>$(!0),children:"L\u1ecbch s\u1eed"})]})]}),(0,t0.jsx)($b,{percent:Math.round((d-p)/d*100),status:"active",strokeWidth:50,strokeColor:{"0%":"#108ee9","100%":"#87d068"},showInfo:!1}),(0,t0.jsxs)(T1,{children:[(0,t0.jsx)(A1,{children:(0,t0.jsxs)(Vu,{title:"Th\u1eddi gian c\xf2n l\u1ea1i",children:[(0,t0.jsxs)(D1,{level:4,children:[p,"s"]}),(0,t0.jsx)(z1,{type:"secondary",children:"Th\u1eddi gian"})]})}),(0,t0.jsx)(A1,{children:(0,t0.jsxs)(Vu,{title:"S\u1ed1 t\u1eeb g\xf5 \u0111\xfang",children:[(0,t0.jsx)(D1,{level:4,children:g}),(0,t0.jsx)(z1,{type:"secondary",children:"T\u1eeb \u0111\xfang"})]})}),(0,t0.jsx)(A1,{children:(0,t0.jsxs)(Vu,{title:"S\u1ed1 t\u1eeb g\xf5 sai",children:[(0,t0.jsx)(D1,{level:4,children:b}),(0,t0.jsx)(z1,{type:"secondary",children:"T\u1eeb sai"})]})}),(0,t0.jsx)(A1,{children:(0,t0.jsxs)(Vu,{title:"Words Per Minute",children:[(0,t0.jsx)(D1,{level:4,children:_}),(0,t0.jsx)(z1,{type:"secondary",children:"WPM"})]})}),(0,t0.jsx)(A1,{children:(0,t0.jsxs)(Vu,{title:"T\u1ef7 l\u1ec7 g\xf5 \u0111\xfang",children:[(0,t0.jsxs)(D1,{level:4,children:[R,"%"]}),(0,t0.jsx)(z1,{type:"secondary",children:"\u0110\u1ed9 ch\xednh x\xe1c"})]})})]}),(0,t0.jsx)(N1,{children:(()=>{if(!s&&0===i)return r.slice(0,6);const e=Math.max(0,i-5),t=Math.min(r.length,i+6);return r.slice(e,t)})().map(((e,t)=>(0,t0.jsx)(I1,{status:e.status,children:e.text},`${e.text}-${t}`)))}),(0,t0.jsx)(R1,{children:(0,t0.jsx)(Jb,{ref:E,value:l,onChange:e=>{s&&(m||v(!0),c(e.target.value))},onKeyDown:e=>{if(s&&(" "===e.key||"Enter"===e.key)){if(e.preventDefault(),""===l.trim())return;const t=r[i],n=l.trim()===t.text;((e,t)=>{S((n=>{const r=n[e]||{word:e,attempts:0,correct:0,incorrect:0,accuracy:0},o={...r,attempts:r.attempts+1,correct:r.correct+(t?1:0),incorrect:r.incorrect+(t?0:1)};return o.accuracy=o.correct/o.attempts*100,{...n,[e]:o}}))})(t.text,n),o((e=>{const t=[...e];return t[i].status=n?"correct":"incorrect",i>=t.length-10&&t.push(...A()),i<t.length-1&&(t[i+1].status="current"),t})),n?y((e=>e+1)):x((e=>e+1)),a((e=>e+1)),c("")}},disabled:!s,placeholder:s?"G\xf5 t\u1eeb \u1edf \u0111\xe2y...":"Nh\u1ea5n 'B\u1eaft \u0111\u1ea7u' \u0111\u1ec3 ch\u01a1i",size:"large"})}),!s&&g>0&&(0,t0.jsx)(n0,{wordStats:w}),(0,t0.jsxs)(Xw,{title:"L\u1ecbch s\u1eed g\xf5 ph\xedm",open:O,onCancel:()=>$(!1),footer:null,width:800,children:[(0,t0.jsxs)("div",{style:{marginBottom:20},children:[(0,t0.jsx)(D1,{level:4,children:"Bi\u1ec3u \u0111\u1ed3 ti\u1ebfn tri\u1ec3n"}),(()=>{const e=D();return(0,t0.jsxs)(t0.Fragment,{children:[(0,t0.jsx)("div",{style:{marginBottom:16},children:(0,t0.jsxs)(kg.Group,{value:I,onChange:e=>T(e.target.value),children:[(0,t0.jsx)(kg.Button,{value:"last10",children:"10 l\u1ea7n g\u1ea7n nh\u1ea5t"}),(0,t0.jsx)(kg.Button,{value:"hourly",children:"24 gi\u1edd qua"}),(0,t0.jsx)(kg.Button,{value:"daily",children:"30 ng\xe0y qua"}),(0,t0.jsx)(kg.Button,{value:"monthly",children:"12 th\xe1ng qua"})]})}),(0,t0.jsx)(vN,{width:"100%",height:300,children:(0,t0.jsxs)(JG,{data:e,children:[(0,t0.jsx)(gY,{strokeDasharray:"3 3"}),(0,t0.jsx)(HG,{dataKey:"date",angle:-45,textAnchor:"end",height:60,interval:0}),(0,t0.jsx)(ZG,{yAxisId:"left",name:"WPM"}),(0,t0.jsx)(ZG,{yAxisId:"right",orientation:"right",name:"Accuracy"}),(0,t0.jsx)(yI,{content:e=>{let{active:t,payload:n,label:r}=e;return t&&n&&n.length?(0,t0.jsxs)("div",{style:{backgroundColor:"white",padding:"10px",border:"1px solid #ccc"},children:[(0,t0.jsx)("p",{children:`Th\u1eddi gian: ${r}`}),(0,t0.jsx)("p",{style:{color:"#1890ff"},children:`WPM: ${n[0].value}`}),(0,t0.jsx)("p",{style:{color:"#52c41a"},children:`\u0110\u1ed9 ch\xednh x\xe1c: ${n[1].value}%`})]}):null}}),(0,t0.jsx)(IT,{}),(0,t0.jsx)(aG,{yAxisId:"left",type:"monotone",dataKey:"wpm",stroke:"#1890ff",name:"WPM",dot:{r:4},activeDot:{r:6}}),(0,t0.jsx)(aG,{yAxisId:"right",type:"monotone",dataKey:"accuracy",stroke:"#52c41a",name:"\u0110\u1ed9 ch\xednh x\xe1c (%)",dot:{r:4},activeDot:{r:6}})]})})]})})()]}),(0,t0.jsx)(lM,{dataSource:j,columns:[{title:"Ng\xe0y",dataIndex:"date",render:e=>DQ(new Date(e),"dd/MM/yyyy HH:mm")},{title:"WPM",dataIndex:"wpm",sorter:(e,t)=>e.wpm-t.wpm},{title:"\u0110\u1ed9 ch\xednh x\xe1c",dataIndex:"accuracy",render:e=>`${e.toFixed(1)}%`,sorter:(e,t)=>e.accuracy-t.accuracy},{title:"Ng\xf4n ng\u1eef",dataIndex:"language"},{title:"Th\u1eddi gian",dataIndex:"duration",render:e=>`${e}s`}],pagination:{pageSize:10},scroll:{x:"max-content"}})]})]})})},{Header:F1,Content:W1}=fi,K1=()=>(0,t0.jsx)(fi,{children:(0,t0.jsx)(W1,{style:{padding:"50px"},children:(0,t0.jsx)(H1,{})})}),V1=e=>{e&&e instanceof Function&&n.e(453).then(n.bind(n,6453)).then((t=>{let{getCLS:n,getFID:r,getFCP:o,getLCP:i,getTTFB:a}=t;n(e),r(e),o(e),i(e),a(e)}))};o.createRoot(document.getElementById("root")).render((0,t0.jsx)(t.StrictMode,{children:(0,t0.jsx)(K1,{})})),V1()})()})();
//# sourceMappingURL=main.bf92ab13.js.map