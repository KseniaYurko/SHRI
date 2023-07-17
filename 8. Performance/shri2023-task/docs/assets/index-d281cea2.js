import{R as c,j as e,c as g}from"./vendor-221d27ba.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const n of s)if(n.type==="childList")for(const h of n.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&r(h)}).observe(document,{childList:!0,subtree:!0});function l(s){const n={};return s.integrity&&(n.integrity=s.integrity),s.referrerPolicy&&(n.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?n.credentials="include":s.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(s){if(s.ep)return;s.ep=!0;const n=l(s);fetch(s.href,n)}})();function N(){let[t,a]=c.useState(!1),[l,r]=c.useState(!1);const s=c.useCallback(()=>{l||r(!0),a(!t)},[l,r,t,a]);return e.jsxs("header",{className:"header",children:[e.jsx("a",{href:"/",className:"header__logo","aria-label":"Яндекс.Дом"}),e.jsx("button",{className:"header__menu","aria-expanded":t?"true":"false",onClick:s,children:e.jsx("span",{className:"header__menu-text a11y-hidden",children:t?"Закрыть меню":"Открыть меню"})}),e.jsxs("ul",{className:"header__links"+(t?" header__links_opened":"")+(l?" header__links-toggled":""),children:[e.jsx("li",{className:"header__item",children:e.jsx("a",{className:"header__link header__link_current",href:"/","aria-current":"page",children:"Сводка"})}),e.jsx("li",{className:"header__item",children:e.jsx("a",{className:"header__link",href:"/devices",children:"Устройства"})}),e.jsx("li",{className:"header__item",children:e.jsx("a",{className:"header__link",href:"/scripts",children:"Сценарии"})})]})]})}const o=c.memo(function(t){const a=c.useRef(),{onSize:l}=t;return c.useEffect(()=>{const r=a.current.offsetWidth,s=a.current.offsetHeight;l&&l({width:r,height:s})},[a,l]),e.jsx("li",{ref:a,className:"event"+(t.slim?" event_slim":""),children:e.jsxs("button",{className:"event__button",children:[e.jsx("span",{className:`event__icon event__icon_${t.icon}`,role:"img","aria-label":t.iconLabel}),e.jsx("h4",{className:"event__title",children:t.title}),t.subtitle&&e.jsx("span",{className:"event__subtitle",children:t.subtitle})]})})}),d={all:{title:"Все",items:[{icon:"light2",iconLabel:"Освещение",title:"Xiaomi Yeelight LED Smart Bulb",subtitle:"Включено"},{icon:"light",iconLabel:"Освещение",title:"D-Link Omna 180 Cam",subtitle:"Включится в 17:00"},{icon:"temp",iconLabel:"Температура",title:"Elgato Eve Degree Connected",subtitle:"Выключено до 17:00"},{icon:"light",iconLabel:"Освещение",title:"LIFX Mini Day & Dusk A60 E27",subtitle:"Включится в 17:00"},{icon:"light2",iconLabel:"Освещение",title:"Xiaomi Mi Air Purifier 2S",subtitle:"Включено"},{icon:"light",iconLabel:"Освещение",title:"Philips Zhirui",subtitle:"Включено"},{icon:"light",iconLabel:"Освещение",title:"Philips Zhirui",subtitle:"Включено"},{icon:"light2",iconLabel:"Освещение",title:"Xiaomi Mi Air Purifier 2S",subtitle:"Включено"}]},kitchen:{title:"Кухня",items:[{icon:"light2",iconLabel:"Освещение",title:"Xiaomi Yeelight LED Smart Bulb",subtitle:"Включено"},{icon:"temp",iconLabel:"Температура",title:"Elgato Eve Degree Connected",subtitle:"Выключено до 17:00"}]},hall:{title:"Зал",items:[{icon:"light",iconLabel:"Освещение",title:"Philips Zhirui",subtitle:"Выключено"},{icon:"light2",iconLabel:"Освещение",title:"Xiaomi Mi Air Purifier 2S",subtitle:"Выключено"}]},lights:{title:"Лампочки",items:[{icon:"light",iconLabel:"Освещение",title:"D-Link Omna 180 Cam",subtitle:"Включится в 17:00"},{icon:"light",iconLabel:"Освещение",title:"LIFX Mini Day & Dusk A60 E27",subtitle:"Включится в 17:00"},{icon:"light2",iconLabel:"Освещение",title:"Xiaomi Mi Air Purifier 2S",subtitle:"Включено"},{icon:"light",iconLabel:"Освещение",title:"Philips Zhirui",subtitle:"Включено"}]},cameras:{title:"Камеры",items:[{icon:"light2",iconLabel:"Освещение",title:"Xiaomi Mi Air Purifier 2S",subtitle:"Включено"}]}};for(let t=0;t<6;++t)d.all.items=[...d.all.items,...d.all.items];const b=Object.keys(d);function p(){const t=c.useRef(),a=c.useRef(!1),[l,r]=c.useState(""),[s,n]=c.useState(!1);c.useEffect(()=>{!l&&!a.current&&(a.current=!0,r(new URLSearchParams(location.search).get("tab")||"all"))},[l,a,r]);const h=c.useCallback(i=>{r(i.target.value)},[r]);let m=[];const f=i=>{m=[...m,i]};c.useEffect(()=>{const u=m.reduce((_,j)=>_+j.width,0)>t.current.offsetWidth;u!==s&&n(u)},[m,t,s,n]);const x=c.useCallback(()=>{const i=t.current.querySelector(".section__panel:not(.section__panel_hidden)");i&&i.scrollTo({left:i.scrollLeft+400,behavior:"smooth"})},[t]);return e.jsxs("main",{className:"main",children:[e.jsxs("section",{className:"section main__general",children:[e.jsx("h2",{className:"section__title section__title-header section__main-title",children:"Главное"}),e.jsxs("div",{className:"hero-dashboard",children:[e.jsxs("div",{className:"hero-dashboard__primary",children:[e.jsx("h3",{className:"hero-dashboard__title",children:"Привет, Геннадий!"}),e.jsx("p",{className:"hero-dashboard__subtitle",children:"Двери и окна закрыты, сигнализация включена."}),e.jsxs("ul",{className:"hero-dashboard__info",children:[e.jsxs("li",{className:"hero-dashboard__item",children:[e.jsx("div",{className:"hero-dashboard__item-title",children:"Дома"}),e.jsxs("div",{className:"hero-dashboard__item-details",children:["+23",e.jsx("span",{className:"a11y-hidden",children:"°"})]})]}),e.jsxs("li",{className:"hero-dashboard__item",children:[e.jsx("div",{className:"hero-dashboard__item-title",children:"За окном"}),e.jsxs("div",{className:"hero-dashboard__item-details",children:["+19",e.jsx("span",{className:"a11y-hidden",children:"°"}),e.jsx("div",{className:"hero-dashboard__icon hero-dashboard__icon_rain",role:"img","aria-label":"Дождь"})]})]})]})]}),e.jsxs("ul",{className:"hero-dashboard__schedule",children:[e.jsx(o,{icon:"temp",iconLabel:"Температура",title:"Philips Cooler",subtitle:"Начнет охлаждать в 16:30"}),e.jsx(o,{icon:"light",iconLabel:"Освещение",title:"Xiaomi Yeelight LED Smart Bulb",subtitle:"Включится в 17:00"}),e.jsx(o,{icon:"light",iconLabel:"Освещение",title:"Xiaomi Yeelight LED Smart Bulb",subtitle:"Включится в 17:00"})]})]})]}),e.jsxs("section",{className:"section main__scripts",children:[e.jsx("h2",{className:"section__title section__title-header",children:"Избранные сценарии"}),e.jsxs("ul",{className:"event-grid",children:[e.jsx(o,{slim:!0,icon:"light2",iconLabel:"Освещение",title:"Выключить весь свет в доме и во дворе"}),e.jsx(o,{slim:!0,icon:"schedule",iconLabel:"Расписание",title:"Я ухожу"}),e.jsx(o,{slim:!0,icon:"light2",iconLabel:"Освещение",title:"Включить свет в коридоре"}),e.jsx(o,{slim:!0,icon:"temp2",iconLabel:"Температура",title:"Набрать горячую ванну",subtitle:"Начнётся в 18:00"}),e.jsx(o,{slim:!0,icon:"temp2",iconLabel:"Температура",title:"Сделать пол тёплым во всей квартире"})]})]}),e.jsxs("section",{className:"section main__devices",children:[e.jsxs("div",{className:"section__title",children:[e.jsx("h2",{className:"section__title-header",children:"Избранные устройства"}),e.jsx("select",{className:"section__select",defaultValue:"all",onInput:h,children:b.map(i=>e.jsx("option",{value:i,children:d[i].title},i))}),e.jsx("ul",{role:"tablist",className:"section__tabs",children:b.map(i=>e.jsx("li",{role:"tab","aria-selected":i===l?"true":"false",tabIndex:i===l?"0":void 0,className:"section__tab"+(i===l?" section__tab_active":""),id:`tab_${i}`,"aria-controls":`panel_${i}`,onClick:()=>r(i),children:d[i].title},i))})]}),e.jsxs("div",{className:"section__panel-wrapper",ref:t,children:[b.map(i=>e.jsx("div",{role:"tabpanel",className:"section__panel"+(i===l?"":" section__panel_hidden"),"aria-hidden":i===l?"false":"true",id:`panel_${i}`,"aria-labelledby":`tab_${i}`,children:e.jsx("ul",{className:"section__panel-list",children:d[i].items.map((u,_)=>e.jsx(o,{...u,onSize:f},_))})},i)),s&&e.jsx("div",{className:"section__arrow",onClick:x})]})]})]})}const L=g.createRoot(document.getElementById("app"));L.render(e.jsxs(e.Fragment,{children:[e.jsx(N,{}),e.jsx(p,{})]}));