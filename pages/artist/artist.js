async function renderArtistPage(){

const main=document.getElementById("mainContent");

const html=await fetch("pages/artist/artist.html").then(res=>res.text());

main.innerHTML=html;

lucide.createIcons();

updateArtistSummary();

renderArtistCards();

const closeBtn=document.querySelector(".close-detail-modal");

if(closeBtn){

closeBtn.onclick=()=>{

document.getElementById("groupDetailModal").style.display="none";

};

}

}


function updateArtistSummary(){

document.getElementById("totalGroups").innerText=
company.groups.length;

document.getElementById("activeGroups").innerText=
company.groups.filter(g=>g.status==="active").length;

document.getElementById("readyGroups").innerText=
company.groups.filter(g=>g.status==="ready").length;

document.getElementById("totalFans").innerText=
company.groups.reduce((a,b)=>a+(b.fans||0),0).toLocaleString();

}


function renderArtistCards(){

const grid=document.getElementById("artistGrid");

grid.innerHTML="";
grid.className="";


if(company.groups.length===0){

grid.innerHTML=`

<div class="empty-artist">

<div class="artist-empty">

    <span class="artist-empty-label">
        YOUR FIRST ARTIST
    </span>

    <h2>아직 데뷔한 그룹이 없습니다</h2>

    <p>
        데뷔조 편성 탭에서<br>
        새로운 그룹을 만들어보세요.
    </p>

    <button onclick="renderDebutPage()">
        그룹 생성하기
    </button>
</div>

</div>

`;

return;

}

grid.className="artist-grid";

company.groups.forEach(group=>{

const statusText=

group.status==="active"

?"활동 중"

:"준비 중";


const statusClass=

group.status==="active"

?"active"

:"ready";


grid.innerHTML+=`

<div
class="artist-card"
style="border-top:5px solid ${group.color||"#C8A46B"}"
>

<div class="artist-content">


<div class="artist-card-top">

<div class="artist-badge ${statusClass}">

${statusText}

</div>

</div>


<h2>

${group.name}

</h2>


<p>

${group.members.length}인조 ${group.type}

</p>


<div class="artist-stats">

<div>

<span>팬덤</span>

<b>

${((group.fans||0)/10000).toFixed(0)}만

</b>

</div>


<div>

<span>앨범</span>

<b>

${((group.albums||0)/10000).toFixed(0)}만

</b>

</div>


<div>

<span>1위</span>

<b>

${group.wins||0}회

</b>

</div>

</div>


<button
class="artist-detail-btn"
style="
background:${group.color||"#C8A46B"}15;
color:${group.color||"#C8A46B"};
border:1px solid ${group.color||"#C8A46B"}40;
"
onclick="openGroupDetail(${group.id})"
>

상세 보기

</button>


</div>

</div>

`;

});


lucide.createIcons();

}

function openGroupDetail(id){

const group=company.groups.find(g=>g.id===id);

if(!group)return;

const modal=document.getElementById("groupDetailModal");

const body=document.getElementById("detailBody");


body.innerHTML=`

<div class="detail-layout">


<div class="detail-left">


<div class="detail-group-card">

<img
src="${group.image||'assets/images/group-default.jpg'}"
class="detail-group-image"
onclick="changeGroupImage(${group.id})"
title="클릭해서 대표 이미지를 변경하세요"
>

<input
type="file"
id="groupImageInput-${group.id}"
accept="image/*"
style="display:none"
onchange="uploadGroupImage(event,${group.id})"
>

<div class="detail-group-info">

<h1>

${group.name}

</h1>

<p>

${group.members.length}인조 ${group.type}

</p>

<span
style="
background:${group.color||"#C8A46B"}20;
color:${group.color||"#C8A46B"};
"
>

${group.concept}

</span>

</div>

</div>


<div class="detail-box">

<h2>

멤버

</h2>

<div class="detail-members-grid">

${group.members.map(member=>`

<div class="detail-member-item">

<div
class="member-avatar"
style="background:${group.color||"#C8A46B"}"
>

${member.stageName.charAt(0)}

</div>

<h4>

${member.stageName}

</h4>

<p>

${member.position}

</p>

</div>

`).join("")}

</div>

</div>


</div>



<div class="detail-right">


<div class="detail-box">

<h2>

최근 활동

</h2>

${
group.activities.length===0

?`

<div class="empty-detail">

아직 활동 내역이 없습니다.

</div>

`

:`

<div class="activity-list">

${group.activities.map(activity=>`

<div class="activity-item">

<div class="activity-title">

${activity.title}

</div>

<div class="activity-date">

${activity.date}

</div>

</div>

`).join("")}

</div>

`
}

</div>

<div class="detail-box">

<h2>

그룹 정보

</h2>

<div class="group-setting-row">

<label>

팬덤명

</label>

<div class="group-setting-input">

<input
type="text"
id="fandomInput"
maxlength="20"
placeholder="팬덤명을 입력하세요"
value="${group.fandom||""}"
>

<button
onclick="saveFandomName(${group.id})"
>

저장

</button>

</div>

<div class="group-setting-row">

<label>

그룹 소개

</label>

<textarea
id="descriptionInput"
maxlength="200"
placeholder="그룹 소개를 입력하세요"

>

${group.description||""}

</textarea>


<div class="description-footer">

<span>

${(group.description||"").length}/200

</span>

<button
onclick="saveGroupDescription(${group.id})"
>

저장

</button>

</div>

</div>

<div class="group-setting-row">

<label>

공식 색상

</label>

<div class="group-color-setting">

<input
type="color"
id="groupColorInput"
value="${group.color||"#C8A46B"}"
>

<span id="groupColorText">

${group.color||"#C8A46B"}

</span>

<button
onclick="saveGroupColor(${group.id})"
>

저장

</button>

</div>

</div>

</div>

</div>

<div class="detail-box">

<h2>

주요 지표

</h2>

<div class="detail-indicator-grid">

<div>

<span>

팬덤

</span>

<b>

${(group.fans||0).toLocaleString()}

</b>

</div>

<div>

<span>

앨범 판매

</span>

<b>

${(group.albums||0).toLocaleString()}

</b>

</div>

<div>

<span>

음방 1위

</span>

<b>

${group.wins||0}회

</b>

</div>

<div>

<span>

누적 수익

</span>

<b>

₩ ${(group.profit||0).toLocaleString()}

</b>

</div>

</div>

</div>


<div class="detail-box">

<h2>

디스코그래피

</h2>

${
group.discography.length===0

?`

<div class="empty-detail">

아직 발매한 앨범이 없습니다.

</div>

`

:`

<div class="album-list">

${group.discography.map(album=>`

<div class="album-item">

<div>

<h4>

${album.title}

</h4>

<p>

${album.type}

</p>

</div>

<span>

${album.releaseDate}

</span>

</div>

`).join("")}

</div>

`
}

</div>


</div>


</div>

`;

modal.style.display="flex";

}

function changeGroupImage(groupId){

document

.getElementById(

`groupImageInput-${groupId}`

)

.click();

}


function uploadGroupImage(event,groupId){

const file=

event.target.files[0];

if(!file)return;


const reader=

new FileReader();


reader.onload=function(e){

const group=

company.groups.find(

g=>g.id===groupId

);


if(!group)return;


group.image=

e.target.result;


saveCompany();


openGroupDetail(groupId);

renderArtistCards();

};


reader.readAsDataURL(file);

}

function saveFandomName(groupId){

const group=

company.groups.find(

g=>g.id===groupId

);

if(!group)return;


const input=

document.getElementById(

"fandomInput"

);


group.fandom=

input.value.trim();


saveCompany();


alert("팬덤명이 저장되었습니다!");

}

function saveGroupDescription(groupId){

const group=

company.groups.find(

g=>g.id===groupId

);

if(!group)return;


const input=

document.getElementById(

"descriptionInput"

);


group.description=

input.value.trim();


saveCompany();


alert("그룹 소개가 저장되었습니다!");

}

function saveGroupColor(groupId){

const group=

company.groups.find(

g=>g.id===groupId

);

if(!group)return;


const input=

document.getElementById(

"groupColorInput"

);


group.color=

input.value;


saveCompany();


document.getElementById(

"groupColorText"

).innerText=

group.color;


alert("공식 색상이 저장되었습니다!");

}