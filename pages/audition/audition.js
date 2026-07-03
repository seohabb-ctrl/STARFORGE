/*audition.js*/

async function renderAuditionPage(){

    const main=document.getElementById("mainContent");

    const html=await fetch("pages/audition/audition.html").then(res=>res.text());

    main.innerHTML=html;

    renderAuditionHistory();

    renderScoutResult();

    lucide.createIcons();

}

function startAudition(type){

    console.log("오디션 실행!");

    let cost=0,candidateCount=0,title="";

    if(type==="local"){
        cost=2;
        candidateCount=3;
        title="지역 오디션";
    }

    if(type==="national"){
        cost=5;
        candidateCount=4;
        title="전국 오디션";
    }

    if(type==="global"){
        cost=10;
        candidateCount=5;
        title="글로벌 오디션";
    }

    if(company.AP<cost){

        alert("AP가 부족합니다.");

        return;

    }

    company.AP-=cost;

    const candidates=[];

    const positions=["보컬","댄스","래퍼","프로듀싱"];
    const grades=["C","B","A","S"];
    const nations=["한국","일본","중국","태국","미국"];

    for(let i=0;i<candidateCount;i++){

        const gender=Math.random()<0.5?"남성":"여성";

        const nation=randomItem(nations);

        const grade=randomItem(grades);

let minStat=50,maxStat=80;

if(grade==="B"){
    minStat=60;
    maxStat=85;
}

if(grade==="A"){
    minStat=75;
    maxStat=95;
}

if(grade==="S"){
    minStat=85;
    maxStat=100;
}

candidates.push({
    name:
    nation==="한국"
    ?randomItem(surnames)+(gender==="남성"?randomItem(koreanMaleNames):randomItem(koreanFemaleNames))
    :nation==="일본"
    ?"사토 "+randomItem(japaneseNames)
    :nation==="중국"
    ?randomItem(chineseNames)
    :nation==="태국"
    ?randomItem(thaiNames)
    :(gender==="남성"?randomItem(americanMaleNames):randomItem(americanFemaleNames)),
    nation:nation,
    age:16+Math.floor(Math.random()*6),
    gender:gender,
    position:randomItem(positions),
grade:grade,

vocal:minStat+Math.floor(Math.random()*(maxStat-minStat+1)),
rap:minStat+Math.floor(Math.random()*(maxStat-minStat+1)),
dance:minStat+Math.floor(Math.random()*(maxStat-minStat+1)),
star:minStat+Math.floor(Math.random()*(maxStat-minStat+1))
});

    }

    company.auditionCandidates=candidates;

    company.auditionHistory.unshift({

        date:`2026.${String(company.month).padStart(2,"0")}.01`,
        type:title,
        count:candidateCount,
        hired:0

    });

    company.currentAuditionType="audition";

renderDashboardData();

renderAuditionHistory();

showAuditionResultModal(
    title,
    candidates
);

}

function showAuditionResultModal(title,candidates){

    if(candidates.length===0){

        closeModal();

        renderAuditionPage();

        return;

    }

    const modal=document.getElementById("modalArea");

    modal.innerHTML=`
    <div class="modal-overlay">

        <div class="audition-modal modern-modal">

            <h2>${title} 결과</h2>

            <p class="modal-subtitle">
                총 ${candidates.length}명의 후보를 발견했습니다.
            </p>

            <div class="result-card-list">

${candidates.map((t,i)=>{

const vocal=t.vocal;
const rap=t.rap;
const dance=t.dance;
const star=t.star;

return `

<div class="result-card">

<div class="result-top">

<div class="grade-circle">
${t.grade}
</div>

<div class="position-badge">
${t.position}
</div>

</div>

<h3>
${t.name}
</h3>

<p class="candidate-meta">
${t.age}세 · ${t.gender} · ${t.nation} · ${t.position}
</p>

<div class="stat-list">

<div class="stat-row">
<span>가창력</span>
<div class="stat-bar">
    <div style="width:${vocal}%"></div>
</div>
<strong>${vocal}</strong>
</div>

<div class="stat-row">
<span>랩</span>
<div class="stat-bar">
    <div style="width:${rap}%"></div>
</div>
<strong>${rap}</strong>
</div>

<div class="stat-row">
<span>댄스</span>
<div class="stat-bar">
    <div style="width:${dance}%"></div>
</div>
<strong>${dance}</strong>
</div>

<div class="stat-row">
<span>스타성</span>
<div class="stat-bar">
    <div style="width:${star}%"></div>
</div>
<strong>${star}</strong>
</div>

</div>

<div class="candidate-special">
특기 · ${
t.position==="보컬"
?"고음, 감성 보컬"
:t.position==="댄스"
?"프리스타일, 안무 창작"
:t.position==="래퍼"
?"가사 창작, 플로우"
:"작곡, 편곡, 비트 메이킹"
}
</div>

${t.hired?`

<button class="hired-btn">
영입 완료
</button>

`:`

<button
class="hire-btn-card"
onclick="hireCandidate(${i})"
>
영입하기
</button>

`}

</div>

`;
}).join("")}

</div>

            <button
                class="close-modal-btn"
                onclick="closeModal()"
            >
                확인
            </button>

        </div>

    </div>
    `;

    lucide.createIcons();

}

function closeModal(){

    document.getElementById("modalArea").innerHTML="";

}

function renderScoutResult(){

    const area=document.getElementById("scoutResultArea");

    if(!area) return;

    if(!company.scoutCandidates||company.scoutCandidates.length===0){

        area.innerHTML=`
        <div class="empty-scout">

            <i data-lucide="user-search"></i>

            <p>
                아직 진행된 스카우트가 없습니다.
            </p>

        </div>
        `;

        return;

    }

    const normal=
        company.scoutCandidates.filter(t=>t.grade==="C").length;

    const good=
        company.scoutCandidates.filter(t=>t.grade==="B"||t.grade==="A").length;

    const elite=
        company.scoutCandidates.filter(t=>t.grade==="S").length;

    area.innerHTML=`
    <div class="scout-summary">

        <div class="summary-box">

            <strong>
                ${company.scoutCandidates.length}
            </strong>

            <span>
                총 후보
            </span>

        </div>

        <div class="summary-box">

            <strong>
                ${normal}
            </strong>

            <span>
                일반
            </span>

        </div>

        <div class="summary-box">

            <strong>
                ${good}
            </strong>

            <span>
                우수
            </span>

        </div>

        <div class="summary-box">

            <strong>
                ${elite}
            </strong>

            <span>
                엘리트
            </span>

        </div>

    </div>
    `;

}

function showToast(message){

    const toast=document.createElement("div");

    toast.className="game-toast";

    toast.textContent=message;

    document.body.appendChild(toast);

    setTimeout(()=>{
        toast.classList.add("show");
    },100);

    setTimeout(()=>{

        toast.classList.remove("show");

        setTimeout(()=>{
            toast.remove();
        },300);

    },2000);

}

function hireCandidate(index){

    if(company.trainees.length>=company.traineeLimit){

        showToast(
            `❌ 연습생 정원이 가득 찼습니다. (${company.traineeLimit}명)`
        );

        return;

    }

    const source=
    company.currentAuditionType==="scout"
    ?company.scoutCandidates
    :company.auditionCandidates;

    const trainee=source[index];

if(!trainee) return;

if(trainee.hired) return;

trainee.hired=true;

trainee.joinDate=`2026.${String(company.month||1).padStart(2,"0")}`;

company.trainees.push(trainee);

    const history=company.auditionHistory[0];

        if(history){

            history.hired++;

        }

    source[index].hired=true;

    showToast(
    `✅ ${trainee.name} 영입 완료 (${company.trainees.length}/${company.traineeLimit})`
);

    renderDashboardData();

    showAuditionResultModal(

    company.currentAuditionType==="scout"
        ?"스카우트"
        :"오디션",

    source

);

}

function renderAuditionHistory(){

    const tbody=document.querySelector(".history-table tbody");

    if(!tbody) return;

    if(company.auditionHistory.length===0){

        tbody.innerHTML=`
        <tr>

            <td colspan="6" class="empty-history">
                아직 진행된 오디션이 없습니다.
            </td>

        </tr>
        `;

        return;

    }

    tbody.innerHTML=
    company.auditionHistory.map(history=>`

    <tr>

        <td>${history.date}</td>

        <td>${history.type}</td>

        <td>${history.count}명</td>

        <td>${history.hired}명</td>

        <td>${
    history.type==="글로벌 오디션"
    ||history.type==="프리미엄 스카우트"
    ?"S"
    :"A"
}</td>

        <td>
            완료
        </td>

    </tr>

    `).join("");

}

function showScoutTab(){

    document.getElementById("auditionTabBtn").classList.remove("active");

    document.getElementById("scoutTabBtn").classList.add("active");

    document.getElementById("auditionContent").innerHTML=`

    <div class="audition-list">

        <div class="audition-card local">

            <div class="audition-icon">
                <i data-lucide="map-pinned"></i>
            </div>

            <h4>거리 스카우트</h4>

            <p>
                거리에서 숨은 재능을 발굴합니다.
            </p>

            <div class="audition-tags">

                <span class="tag-gold">
                    비용 500만원
                </span>

                <span class="tag-light">
                    쿨타임 없음
                </span>

            </div>

            <button onclick="startScout('street')">
    스카우트 진행
</button>

        </div>


        <div class="audition-card national">

            <div class="audition-icon">
                <i data-lucide="smartphone"></i>
            </div>

            <h4>SNS 스카우트</h4>

            <p>
                SNS에서 화제가 된 인재를 찾습니다.
            </p>

            <div class="audition-tags">

                <span class="tag-gold">
                    비용 1000만원
                </span>

                <span class="tag-blue-soft">
                    우수 확률↑
                </span>

            </div>

            <button onclick="startScout('sns')">
    스카우트 진행
</button>

        </div>


        <div class="audition-card global">

            <div class="audition-icon">
                <i data-lucide="star"></i>
            </div>

            <h4>프리미엄 스카우트</h4>

            <p>
                최고급 인재를 직접 발굴합니다.
            </p>

            <div class="audition-tags">

                <span class="tag-gold">
                    비용 3000만원
                </span>

                <span class="tag-purple-soft">
                    엘리트 확률↑
                </span>

            </div>

            <button onclick="startScout('premium')">
    스카우트 진행
</button>

        </div>

    </div>

    `;

    lucide.createIcons();

}

function showAuditionTab(){

    document.getElementById("auditionTabBtn").classList.add("active");

    document.getElementById("scoutTabBtn").classList.remove("active");

    document.getElementById("auditionContent").innerHTML=`

    <div class="audition-list">

        <div class="audition-card local">

            <div class="audition-icon">
                <i data-lucide="map-pin"></i>
            </div>

            <h4>지역 오디션</h4>

            <p>
                내 주변의 숨은 재능을 발굴합니다.
            </p>

            <div class="audition-tags">

                <span class="tag-green">
                    쿨타임 없음
                </span>

                <span class="tag-blue">
                    월 3회 가능
                </span>

            </div>

            <button onclick="startAudition('local')">
                오디션 진행
            </button>

            <small>
                소모 AP 2
            </small>

        </div>


        <div class="audition-card national">

            <div class="audition-icon">
                <i data-lucide="building-2"></i>
            </div>

            <h4>전국 오디션</h4>

            <p>
                전국 단위로 유망한 인재를 찾습니다.
            </p>

            <div class="audition-tags">

                <span class="tag-orange">
                    3개월 쿨타임
                </span>

                <span class="tag-blue">
                    우수 이상 확률↑
                </span>

            </div>

            <button onclick="startAudition('national')">
                오디션 진행
            </button>

            <small>
                소모 AP 5
            </small>

        </div>


        <div class="audition-card global">

            <div class="audition-icon">
                <i data-lucide="globe"></i>
            </div>

            <h4>글로벌 오디션</h4>

            <p>
                전 세계에서 최고의 인재를 찾습니다.
            </p>

            <div class="audition-tags">

                <span class="tag-red">
                    6개월 쿨타임
                </span>

                <span class="tag-purple">
                    엘리트 확률↑
                </span>

            </div>

            <button onclick="startAudition('global')">
                오디션 진행
            </button>

            <small>
                소모 AP 10
            </small>

        </div>

    </div>

    `;

    lucide.createIcons();

}

function startScout(type){

    let cost=0,candidateCount=0,title="";

    if(type==="street"){
        cost=500;
        candidateCount=2;
        title="거리 스카우트";
    }

    if(type==="sns"){
        cost=1000;
        candidateCount=3;
        title="SNS 스카우트";
    }

    if(type==="premium"){
        cost=3000;
        candidateCount=4;
        title="프리미엄 스카우트";
    }

    if(company.money<cost){

        showToast("❌ 자금이 부족합니다.");

        return;

    }

    company.money-=cost;

    const candidates=[];

    const positions=["보컬","댄스","래퍼","프로듀싱"];
    const grades=["C","B","A","S"];

    for(let i=0;i<candidateCount;i++){

        const gender=Math.random()<0.5?"남성":"여성";

        let gradePool=[...grades];

        let nationPool=["한국"];

if(type==="sns"){

    nationPool=[
        "한국",
        "일본",
        "중국"
    ];

}

if(type==="premium"){

    nationPool=[
        "한국",
        "일본",
        "중국",
        "태국",
        "미국"
    ];

}

        if(type==="sns"){

            gradePool=["B","B","A","A","S"];

        }

        if(type==="premium"){

            gradePool=["A","A","S","S"];

        }

        const nation=randomItem(nationPool);

let name="";

if(nation==="한국"){

    name=randomItem(surnames)+(gender==="남성"
        ?randomItem(koreanMaleNames)
        :randomItem(koreanFemaleNames));

}

if(nation==="일본"){

    name="사토 "+randomItem(japaneseNames);

}

if(nation==="중국"){

    name=randomItem(chineseNames);

}

if(nation==="태국"){

    name=randomItem(thaiNames);

}

if(nation==="미국"){

    name=gender==="남성"
        ?randomItem(americanMaleNames)
        :randomItem(americanFemaleNames);

}

const grade=randomItem(gradePool||grades);

let minStat=50,maxStat=80;

if(grade==="B"){
    minStat=60;
    maxStat=85;
}

if(grade==="A"){
    minStat=75;
    maxStat=95;
}

if(grade==="S"){
    minStat=85;
    maxStat=100;
}

candidates.push({
    id:Date.now()+Math.random(),
    name:name,
    nation:nation,
    age:16+Math.floor(Math.random()*6),
    gender:gender,
    position:randomItem(positions),
    grade:grade,

    vocal:minStat+Math.floor(Math.random()*(maxStat-minStat+1)),
    rap:minStat+Math.floor(Math.random()*(maxStat-minStat+1)),
    dance:minStat+Math.floor(Math.random()*(maxStat-minStat+1)),
    star:minStat+Math.floor(Math.random()*(maxStat-minStat+1))
});

    }

    company.scoutCandidates=candidates;

company.auditionHistory.unshift({

    date:`2026.${String(company.month).padStart(2,"0")}.01`,

    type:title,

    count:candidateCount,

    hired:0,

    isScout:true

});

company.currentAuditionType="scout";

renderDashboardData();

renderAuditionHistory();

renderScoutResult();

showAuditionResultModal(
    title,
    candidates
);

}