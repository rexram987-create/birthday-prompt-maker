const labels={
 type:{cake:"עוגת יום הולדת חגיגית ומעוצבת",card:"כרטיס ברכה מקושט",flowers:"ברכת יום הולדת חגיגית עם פרחים",balloons:"סצנת יום הולדת עם בלונים ומתנות",nature:"ברכת יום הולדת חגיגית בטבע"},
 style:{"3d":"בסגנון תלת־ממדי (3D), מפורט ואיכותי",photo:"בסגנון פוטוריאליסטי",illustration:"בסגנון איורי עשיר",elegant:"בסגנון אלגנטי ועדין",cartoon:"בסגנון מצויר וחגיגי"},
 bg:{transparent:"על רקע שקוף לחלוטין, ללא אלמנטים נוספים ברקע",garden:"בגן פורח וחגיגי",studio:"ברקע סטודיו חגיגי ונקי",sky:"עם רקע של שמיים בהירים ונעימים",custom:"עם רקע המתאים באופן טבעי למוטיב שנבחר"}
};
const form=document.querySelector("#promptForm"),out=document.querySelector("#result"),box=document.querySelector("#resultBox"),status=document.querySelector("#status");
form.addEventListener("submit",e=>{e.preventDefault();const name=document.querySelector("#name").value.trim(),theme=document.querySelector("#theme").value.trim(),type=document.querySelector("#type").value,style=document.querySelector("#style").value,bg=document.querySelector("#background").value,ratio=document.querySelector("#ratio").value;
const themeText=theme? ` המוטיב המרכזי יהיה "${theme}". שלב בעיצוב קישוטים ואלמנטים חזותיים הקשורים למוטיב, באופן חגיגי והרמוני.`:"";
const cakeRule=type==="cake"&&theme?" אם מופיעים פריטים הקשורים למוטיב, הצג אותם כקישוטי עוגה אכילים או דקורטיביים ולא כחפצים אמיתיים.":"";
out.value=`צור תמונה ביחס ${ratio} של ${labels.type[type]} עבור ${name}. ${labels.style[style]}.${themeText}${cakeRule} על היצירה יופיע בצורה ברורה וקריאה הכיתוב: "ל${name} היקר/ה, יום הולדת שמח!". ${labels.bg[bg]}. הקפד שהיצירה המרכזית תופיע בשלמותה, ללא חיתוך, עם קומפוזיציה נקייה וחגיגית.`;
box.hidden=false;status.textContent="";out.focus()});
document.querySelector("#copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText(out.value);status.textContent="ההנחיה הועתקה ✓"}catch{out.select();document.execCommand("copy");status.textContent="ההנחיה הועתקה ✓"}});
if("serviceWorker" in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("/sw.js"));