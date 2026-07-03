/*main.js*/

let selectedDeleteSaveId=null;
const loadingScreen = document.getElementById("loadingScreen");
const loadingFill = document.getElementById("loadingFill");
const startScreen = document.getElementById("startScreen");
const app = document.getElementById("app");

startBtn.onclick = () => {

    resetCompany();

    const companyInput =
        document.getElementById("companyName").value.trim();

    const ceoInput =
        document.getElementById("ceoName").value.trim();

    if (!companyInput || !ceoInput) {
        alert("회사명과 CEO 이름을 입력해주세요!");
        return;
    }

    company.name = companyInput;
    company.ceoName = ceoInput;
    company.ceoId = `SF-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    startScreen.style.display = "none";
    loadingScreen.style.display = "flex";

    const loadingText =
        document.getElementById("loadingText");

    const loadingPercent =
        document.getElementById("loadingPercent");

    const steps = [
        { text: "회사 데이터를 생성하는 중...", percent: 20 },
        { text: "아티스트 네트워크를 연결하는 중...", percent: 45 },
        { text: "글로벌 시장을 분석하는 중...", percent: 70 },
        { text: "STARFORGE 시스템을 초기화하는 중...", percent: 100 }
    ];

    steps.forEach((step, index) => {

        setTimeout(() => {

            loadingText.textContent = step.text;
            loadingPercent.textContent = step.percent + "%";
            loadingFill.style.width = step.percent + "%";

        }, index * 1000);

    });

    setTimeout(() => {

        loadingScreen.style.display = "none";
        app.style.display = "flex";

        renderGame();

    }, 4500);

};

function renderDashboardData(){

    const money=document.getElementById("moneyValue");
    const reputation=document.getElementById("reputationValue");

    const ap=document.getElementById("apValue");
    const cp=document.getElementById("cpValue");

    const sidebarMoney=document.getElementById("sidebarMoney");

    const ceoName=document.getElementById("sidebarCEOName");
    const ceoId=document.getElementById("sidebarCEOId");


    if(money) money.textContent=`₩ ${(company.money*10000).toLocaleString()}`;

    if(reputation) reputation.textContent=company.reputation;

    if(ap) ap.textContent=company.AP;

    if(cp) cp.textContent=company.CP;

    if(sidebarMoney) sidebarMoney.textContent=`₩ ${(company.money*10000).toLocaleString()}`;

    if(ceoName) ceoName.textContent=`CEO. ${company.ceoName}`;

    if(ceoId) ceoId.textContent=company.ceoId;

}

function initSidebar(){

    const menus=document.querySelectorAll(".menu-item[data-page]");

    menus.forEach(menu=>{

    menu.onclick=()=>{

    menus.forEach(item=>
    item.classList.remove("active")
    );

    menu.classList.add("active");

    company.currentPage=menu.dataset.page;

    saveCompany();

    renderPage();

    };

    });

}
function renderPage(){

switch(company.currentPage){

case "dashboard":

renderDashboardPage();

break;


case "artist":

renderArtistPage();

break;


case "trainee":

renderTraineePage();

break;


case "audition":

renderAuditionPage();

break;


case "debut":

renderDebutPage();

break;


default:

console.log("준비중인 페이지");

}

setTimeout(

updateTopDate,

100

);

}

function renderGame(){

if(!company.currentPage){

company.currentPage="dashboard";

}

renderPage();

initSidebar();

updateTopDate();

document
.getElementById("nextMonthBtn")
.onclick=nextMonth;

}

function manualSave(){

saveCompany();

lucide.createIcons();

alert("💾 게임이 저장되었습니다!");

}

function openLogoutModal(){

document.getElementById(

"logoutModal"

).style.display="flex";

}


function closeLogoutModal(){

document.getElementById(

"logoutModal"

).style.display="none";

}


function logoutGame(){

saveCompany();

closeLogoutModal();

app.style.display="none";

loadingScreen.style.display="none";

startScreen.style.display="flex";

}

function openContinueModal(){

const modal=

document.getElementById(

"continueModal"

);

const saveList=

document.getElementById(

"saveList"

);


const saves=

getAllSaves()

.sort(

(a,b)=>

b.saveTimestamp-a.saveTimestamp

);


if(saves.length===0){

saveList.innerHTML=`

<div class="empty-save">

저장된 게임이 없습니다.

</div>

`;

}else{

saveList.innerHTML=

saves.map(save=>`

<div class="save-card">

<h3>

${save.name}

</h3>

<p>

CEO. ${save.ceoName}

</p>

<p class="save-month">

${save.month}개월차 플레이

</p>

<div class="save-date">

${save.saveDate}

</div>

<div class="save-buttons">

<button
class="load-save-btn"
onclick="loadGame('${save.id}')"
>

불러오기

</button>

<button
class="delete-save-btn"
onclick="deleteGame('${save.id}')"
>

삭제

</button>

</div>

</div>

`).join("");

}


modal.style.display="flex";

}


function closeContinueModal(){

document.getElementById(

"continueModal"

).style.display="none";

}

function loadGame(saveId){

const success=

loadCompany(saveId);

if(!success){

alert("저장 데이터를 불러올 수 없습니다.");

return;

}


closeContinueModal();

startScreen.style.display="none";

app.style.display="flex";

renderGame();

}

function deleteGame(saveId){

selectedDeleteSaveId=saveId;

document
.getElementById(
"deleteSaveModal"
)
.style.display="flex";

}

function closeDeleteSaveModal(){

document
.getElementById(
"deleteSaveModal"
)
.style.display="none";

selectedDeleteSaveId=null;

}


function confirmDeleteSave(){

if(!selectedDeleteSaveId)return;


deleteSave(

selectedDeleteSaveId

);


closeDeleteSaveModal();

closeContinueModal();

openContinueModal();

}

function nextMonth(){

if(typeof company.currentDate==="string"){

company.currentDate=

new Date(

company.currentDate

);

}

company.month++;

company.currentDate.setMonth(

company.currentDate.getMonth()+1

);

saveCompany();

renderPage();

updateTopDate();

document
.getElementById(
"nextMonthText"
)
.innerHTML=

`${company.month}개월차로 진행되었습니다!<br><br>${formatCurrentDate()}로 이동했습니다.`;

document
.getElementById(
"nextMonthModal"
)
.style.display="flex";

}

function updateTopDate(){

const dateEl=

document.getElementById(

"topDate"

);

const monthEl=

document.getElementById(

"topMonth"

);


if(!dateEl||!monthEl)return;


const date=

new Date(

company.currentDate

);


const weekday=

["일","월","화","수","목","금","토"];


dateEl.innerText=

`${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,"0")}.${String(date.getDate()).padStart(2,"0")} (${weekday[date.getDay()]})`;


monthEl.innerText=

`${company.month}개월차`;

}

function formatCurrentDate(){

const date=

new Date(

company.currentDate

);

const weekday=

["일","월","화","수","목","금","토"];

return `${date.getFullYear()}.${String(date.getMonth()+1).padStart(2,"0")}.${String(date.getDate()).padStart(2,"0")} (${weekday[date.getDay()]})`;

}

function closeNextMonthModal(){

document
.getElementById(
"nextMonthModal"
)
.style.display="none";

}