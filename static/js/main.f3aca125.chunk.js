(this["webpackJsonpreact-barcode-detector-example"]=this["webpackJsonpreact-barcode-detector-example"]||[]).push([[0],{12:function(e,t,n){"use strict";n.r(t);n(7);var r=n(0),o=n.n(r),a=n(3),c=n.n(a),i=n(1),u=n(5),l=n(4),d=n.n(l),h=[100,200,300,400,500],f=function(e){var t=e.width,n=e.height,a=e.off,c=void 0!==a&&a,i=e.freq,l=void 0===i?200:i,h=e.videoStyle,f=e.rageMode,s=void 0!==f&&f,m=e.onDetect,v=void 0===m?console.log:m,g=e.onError,b=void 0===g?console.error:g,p=e.onProcess,E=Object(u.a)(e,["width","height","off","freq","videoStyle","rageMode","onDetect","onError","onProcess"]),O=Object(r.useRef)(null),j=Object(r.useRef)(null),y=Object(r.useRef)(s),F=Object(r.useCallback)((function(){if(!c){if(O.current&&j.current&&O.current.readyState===O.current.HAVE_ENOUGH_DATA){j.current.hidden=!1;var e=j.current.getContext("2d");if(!e)return;var t=function(t,n,r){e.beginPath(),e.moveTo(t.x,t.y),e.lineTo(n.x,n.y),e.lineWidth=4,e.strokeStyle=r,e.stroke()};j.current.height=O.current.videoHeight,j.current.width=O.current.videoWidth,e.drawImage(O.current,0,0,j.current.width,j.current.height);var n=e.getImageData(0,0,j.current.width,j.current.height),r=d()(n.data,n.width,n.height,{inversionAttempts:"dontInvert"});if(p)return p(r);r&&(t(r.location.topLeftCorner,r.location.topRightCorner,"#FF3B58"),t(r.location.topRightCorner,r.location.bottomRightCorner,"#FF3B58"),t(r.location.bottomRightCorner,r.location.bottomLeftCorner,"#FF3B58"),t(r.location.bottomLeftCorner,r.location.topLeftCorner,"#FF3B58"),v(r.data))}y.current&&requestAnimationFrame(F)}}),[s]);return Object(r.useEffect)((function(){navigator.mediaDevices.getUserMedia({video:{facingMode:"environment",frameRate:10,height:n,width:t},audio:!1}).then((function(e){O.current&&(O.current.srcObject=e)})).catch((function(e){b(e)}))}),[]),Object(r.useEffect)((function(){if(y.current=s,y.current){var e=requestAnimationFrame(F);return function(){return cancelAnimationFrame(e)}}var t,n=setInterval((function(){t=requestAnimationFrame(F)}),l);return function(){clearInterval(n),cancelAnimationFrame(t)}}),[l,s]),o.a.createElement("div",Object.assign({},E),o.a.createElement("video",{hidden:!0,playsInline:!0,ref:O,width:t,height:n,style:h,autoPlay:!0}),o.a.createElement("canvas",{ref:j,width:t,height:n,hidden:!0}))},s=function(e){return e<100?100:e},m=function(){var e=Object(r.useState)(!1),t=Object(i.a)(e,2),n=t[0],a=t[1],c=Object(r.useState)(200),u=Object(i.a)(c,2),l=u[0],d=u[1],m=Object(r.useState)(null),v=Object(i.a)(m,2),g=v[0],b=v[1];return o.a.createElement("div",null,o.a.createElement("div",null,o.a.createElement(f,{onDetect:b,rageMode:n,freq:s(l),style:{width:"100%"}})),o.a.createElement("label",null,"RageMode:",o.a.createElement("input",{type:"checkbox",checked:n,onChange:function(e){return a(e.target.checked)}})),o.a.createElement("label",null,"Freq",o.a.createElement("select",{value:l,disabled:n,onChange:function(e){return d(s(parseInt(e.target.value)))}},h.map((function(e){return o.a.createElement("option",{value:e,key:e},e)})))),o.a.createElement("input",{type:"text",value:"".concat(g),onChange:function(e){return e.preventDefault()}}))};c.a.render(o.a.createElement(m,null),document.getElementById("root"))},6:function(e,t,n){e.exports=n(12)},7:function(e,t,n){}},[[6,1,2]]]);
//# sourceMappingURL=main.f3aca125.chunk.js.map