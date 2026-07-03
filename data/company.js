/*company.js*/

const company={

    name:"STARFORGE",
    ceoName:"MOON",
    ceoId:"",
    currentPage:"dashboard",
    money:5000,
    reputation:0,
    AP:12,
    CP:8,
    currentPage:"dashboard",
    traineeLimit:8,
    month:1,
    currentDate:new Date(2026,5,29),
    trainees:[],
    groups:[],
    auditionHistory:[],
    auditionCandidates:[],
    scoutCandidates:[],

};

function saveCompany(){

const saves=

JSON.parse(

localStorage.getItem("starforgeSaves")

||"[]"

);


const saveData={

id:company.ceoId,

name:company.name,

ceoName:company.ceoName,

month:company.month||1,

saveDate:new Date().toLocaleString("ko-KR"),

saveTimestamp:Date.now(),

data:JSON.parse(JSON.stringify(company))

};


const index=

saves.findIndex(

s=>s.id===company.ceoId

);


if(index>=0){

saves[index]=saveData;

}else{

saves.push(saveData);

}


localStorage.setItem(

"starforgeSaves",

JSON.stringify(saves)

);

}


function loadCompany(saveId){

const saves=

JSON.parse(

localStorage.getItem("starforgeSaves")

||"[]"

);


const save=

saves.find(

s=>s.id===saveId

);


if(!save)return false;


Object.assign(

company,

save.data

);

if(typeof company.currentDate==="string"){

company.currentDate=

new Date(

company.currentDate

);

}


return true;

}


function getAllSaves(){

return JSON.parse(

localStorage.getItem("starforgeSaves")

||"[]"

);

}


function resetCompany(){

company.name="STARFORGE";

company.ceoName="MOON";

company.ceoId="";

company.currentPage="dashboard";

company.money=5000;

company.reputation=0;

company.AP=12;

company.CP=8;

company.traineeLimit=8;

company.month=1;

company.currentDate=new Date(2026,5,29);

company.trainees=[];

company.groups=[];

company.auditionHistory=[];

company.auditionCandidates=[];

company.scoutCandidates=[];

}

function deleteSave(saveId){

const saves=JSON.parse(localStorage.getItem("starforgeSaves")||"[]");

const newSaves=saves.filter(save=>save.id!==saveId);

localStorage.setItem("starforgeSaves",JSON.stringify(newSaves));

}