/*debut.js*/

let selectedDebutMembers=[];
let debutPositions={};

let debutInfo={
groupName:"",
debutDate:"",
groupType:"",
concept:""
};

let debutStep=1;

function renderDebutPage(){

const main=document.getElementById("mainContent");

main.innerHTML=`

<div class="debut-page">

<div class="debut-top">

<div>

<div class="debut-breadcrumb">
연습생
<i data-lucide="chevron-right"></i>
데뷔조 편성
</div>

<h1>데뷔조 편성</h1>

<p>
데뷔조에 포함할 연습생을 선택하고 포지션을 배정하세요.
</p>

</div>

<div class="debut-steps">

<div class="step active">
<div class="step-circle">1</div>
<span>멤버 선택</span>
</div>

<div class="step-line"></div>

<div class="step">
<div class="step-circle">2</div>
<span>포지션 배정</span>
</div>

<div class="step-line"></div>

<div class="step">
<div class="step-circle">3</div>
<span>편성 완료</span>
</div>

</div>

</div>


<div class="debut-content">

<div class="debut-main">

<div class="debut-card">

<div class="debut-card-header">

<div>

<h4>연습생 목록</h4>

<p>
데뷔조에 포함할 멤버를 선택하세요.
(최소 3명 이상, 최대 12명)
</p>

</div>

</div>

<div class="trainee-card-grid">

${renderDebutTrainees()}

</div>

</div>

</div>


<div class="debut-side">

<div class="debut-card selected-card">

<div class="selected-header">

<h4>데뷔조 현황</h4>

<span>
${selectedDebutMembers.length} / 12명
</span>

</div>

<div class="selected-members">

${renderSelectedMembers()}

</div>

</div>


<div class="debut-card">

<h4>
데뷔 정보
</h4>

<div class="group-form">

<div>

<label>
그룹명
</label>

<input
type="text"
placeholder="그룹명을 입력하세요"
maxlength="20"
value="${debutInfo.groupName}"
oninput="debutInfo.groupName=this.value"
>

</div>


<div>

<label>
데뷔 예정 시기
</label>

<input
type="month"
value="${debutInfo.debutDate}"
onchange="debutInfo.debutDate=this.value"
>

</div>


<div>

<label>
그룹 타입
</label>

<select onchange="debutInfo.groupType=this.value">

<option value="">
선택하세요
</option>

<option value="걸그룹" ${debutInfo.groupType==="걸그룹"?"selected":""}>
걸그룹
</option>

<option value="보이그룹" ${debutInfo.groupType==="보이그룹"?"selected":""}>
보이그룹
</option>

<option value="혼성그룹" ${debutInfo.groupType==="혼성그룹"?"selected":""}>
혼성그룹
</option>

</select>

</div>


<div>

<label>
데뷔 컨셉
</label>

<select onchange="debutInfo.concept=this.value">

<option value="">
선택하세요
</option>

<option value="청량" ${debutInfo.concept==="청량"?"selected":""}>청량</option>

<option value="걸크러쉬" ${debutInfo.concept==="걸크러쉬"?"selected":""}>걸크러쉬</option>

<option value="힙합" ${debutInfo.concept==="힙합"?"selected":""}>힙합</option>

<option value="R&B" ${debutInfo.concept==="R&B"?"selected":""}>R&B</option>

<option value="틴크러쉬" ${debutInfo.concept==="틴크러쉬"?"selected":""}>틴크러쉬</option>

<option value="몽환" ${debutInfo.concept==="몽환"?"selected":""}>몽환</option>

<option value="레트로" ${debutInfo.concept==="레트로"?"selected":""}>레트로</option>

<option value="하이틴" ${debutInfo.concept==="하이틴"?"selected":""}>하이틴</option>

</select>

</div>


<div class="debut-guide-box">

<strong>
안내 사항
</strong>

<ul>

<li>
최소 3명 이상, 최대 12명까지 선택할 수 있습니다.
</li>

<li>
리더와 센터는 각각 1명만 지정 가능합니다.
</li>

<li>
예명은 최대 10자까지 입력 가능합니다.
</li>

</ul>

</div>


<button
class="next-step-btn"
onclick="nextDebutStep()"
>

다음 단계
<i data-lucide="arrow-right"></i>

</button>

</div>

</div>

</div>

</div>

</div>

`;

lucide.createIcons();

}

function renderDebutTrainees(){

return company.trainees.map((t,index)=>`

<div class="debut-trainee-card ${selectedDebutMembers.includes(index)?"selected":""}" onclick="toggleDebutMember(${index})">

<div class="card-top">

<div>

<strong>${t.name}</strong>

<div class="card-grade grade-${t.grade}">
${t.grade}
</div>

</div>

<div class="card-check ${selectedDebutMembers.includes(index)?"active":""}">
✓
</div>

</div>

<div class="card-info">
${t.age}세 · ${t.gender} · ${t.nation}
</div>

<div class="stat-row">
<span>보컬</span>
<div class="mini-bar">
<div style="width:${t.vocal}%"></div>
</div>
<strong>${t.vocal}</strong>
</div>

<div class="stat-row">
<span>랩</span>
<div class="mini-bar">
<div style="width:${t.rap}%"></div>
</div>
<strong>${t.rap}</strong>
</div>

<div class="stat-row">
<span>댄스</span>
<div class="mini-bar">
<div style="width:${t.dance}%"></div>
</div>
<strong>${t.dance}</strong>
</div>

<div class="stat-row">
<span>스타성</span>
<div class="mini-bar">
<div style="width:${t.star}%"></div>
</div>
<strong>${t.star}</strong>
</div>

</div>

`).join("");

}

function renderSelectedMembers(){

if(selectedDebutMembers.length===0){

return `
<div class="empty-selected">
선택된 연습생이 없습니다.
</div>
`;

}

return selectedDebutMembers.map(index=>{

const t=company.trainees[index];

return `

<div class="selected-member-card">

<div class="selected-member-top">

<div>

<strong>${t.name}</strong>

<p>
${t.age}세 · ${t.gender} · ${t.nation}
</p>

</div>

<button
class="remove-member-btn"
onclick="event.stopPropagation();toggleDebutMember(${index})"
>
✕
</button>

</div>

<select
class="position-select"
onchange="changeDebutPosition(${index},this.value)"
>

<option value="" ${!debutPositions[index]?"selected":""}>
포지션 선택
</option>

<option value="리더" ${debutPositions[index]==="리더"?"selected":""}>
리더
</option>

<option value="센터" ${debutPositions[index]==="센터"?"selected":""}>
센터
</option>

<option value="메인보컬" ${debutPositions[index]==="메인보컬"?"selected":""}>
메인보컬
</option>

<option value="리드보컬" ${debutPositions[index]==="리드보컬"?"selected":""}>
리드보컬
</option>

<option value="서브보컬" ${debutPositions[index]==="서브보컬"?"selected":""}>
서브보컬
</option>

<option value="메인래퍼" ${debutPositions[index]==="메인래퍼"?"selected":""}>
메인래퍼
</option>

<option value="리드래퍼" ${debutPositions[index]==="리드래퍼"?"selected":""}>
리드래퍼
</option>

<option value="메인댄서" ${debutPositions[index]==="메인댄서"?"selected":""}>
메인댄서
</option>

<option value="리드댄서" ${debutPositions[index]==="리드댄서"?"selected":""}>
리드댄서
</option>

</select>

<div class="stage-name-box">

<div class="stage-name-header">

<span>
예명 설정
</span>

<i data-lucide="info"></i>

</div>

<input
class="stage-name-input"
type="text"
placeholder="예명을 입력하세요"
maxlength="10"
value="${t.stageName||""}"
oninput="updateStageName(${index},this.value);this.nextElementSibling.innerText=this.value.length+'/10'"
onclick="event.stopPropagation()"
>

<div class="stage-name-count">

${(t.stageName||"").length}/10

</div>

</div>

</div>

`;

}).join("");

}

function toggleDebutMember(index){

if(selectedDebutMembers.includes(index)){

selectedDebutMembers=
selectedDebutMembers.filter(i=>i!==index);
delete debutPositions[index];

}else{

if(selectedDebutMembers.length>=12){

alert("최대 12명까지 선택할 수 있습니다.");

return;

}

selectedDebutMembers.push(index);

}

renderDebutPage();

}

function nextDebutStep(){

if(selectedDebutMembers.length<3){

alert("최소 3명 이상의 멤버를 선택해주세요.");

return;

}

if(!debutInfo.groupName){

alert("그룹명을 입력해주세요.");

return;

}

if(!debutInfo.groupType){

alert("그룹 타입을 선택해주세요.");

return;

}

if(!debutInfo.concept){

alert("데뷔 컨셉을 선택해주세요.");

return;

}


company.pendingDebutGroup={

id:Date.now(),

name:debutInfo.groupName,

type:debutInfo.groupType,

concept:debutInfo.concept,

status:"ready",

debutDate:debutInfo.debutDate||"미정",

fandom:"",

fans:0,

albums:0,

wins:0,

profit:0,

description:"",

color:"#C8A46B",

image:"assets/images/group-default.jpg",

activities:[

{
type:"debut",
title:"데뷔 준비 시작",
date:company.date
}

],

discography:[],

indicators:{

fanGrowth:0,

streams:0,

albumSales:0,

brandRank:0,

monthlyProfit:0

},

members:selectedDebutMembers.map(index=>{

const trainee=company.trainees[index];

return{

...trainee,

stageName:trainee.stageName||trainee.name,

position:debutPositions[index]||"미지정"

};

})

};


debutStep=2;

renderDebutConfirmPage();

}

function changeDebutPosition(index,position){

debutPositions[index]=position;

}

function updateStageName(index,value){

company.trainees[index].stageName=value;

}

function renderDebutConfirmPage(){

const group=company.pendingDebutGroup;

const main=document.getElementById("mainContent");

main.innerHTML=`

<div class="debut-confirm-page">

<div class="confirm-header">

<h1>
${group.name}
</h1>

<p>
${group.type} · ${group.concept}
</p>

<span>
${group.debutDate} 데뷔 예정
</span>

</div>


<div class="confirm-members">

${group.members.map(member=>`

<div class="confirm-member-card">

<div class="confirm-member-top">

<div>

<h3>
${member.stageName}
</h3>

<small>
본명 : ${member.name}
</small>

</div>

<div class="confirm-position">
${member.position}
</div>

</div>

<div class="confirm-info">

${member.age}세 ·
${member.gender} ·
${member.nation}

</div>

</div>

`).join("")}

</div>


<div class="confirm-buttons">

<button
class="back-btn"
onclick="debutStep=1;renderDebutPage()"
>

이전 단계

</button>


<button
class="debut-btn"
onclick="completeDebut()"
>

데뷔 확정

</button>

</div>

</div>

`;

}

function completeDebut(){

const group=company.pendingDebutGroup;


if(!group){

alert("그룹 정보가 없습니다.");

return;

}


/* 그룹 상태 결정 */

group.status=

group.debutDate

?"ready"

:"active";


/* 회사 그룹 목록 추가 */

company.groups.push(group);
saveCompany();


/* 데뷔한 연습생 제거 */

selectedDebutMembers

.sort((a,b)=>b-a)

.forEach(index=>{

company.trainees.splice(index,1);

});


/* 초기화 */

selectedDebutMembers=[];

debutPositions={};

debutInfo={

groupName:"",

debutDate:"",

groupType:"",

concept:""

};

debutStep=1;

company.pendingDebutGroup=null;


/* 완료 메시지 */

alert(`${group.name}가 성공적으로 데뷔했습니다!`);


/* 아티스트 페이지 이동 */

company.currentPage="artist";

renderArtistPage();

}