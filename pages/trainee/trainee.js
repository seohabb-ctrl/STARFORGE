/*trainee.js*/

function renderTraineePage() {

    const content=document.getElementById("mainContent");

    const traineeCount=company.trainees.length;

    const avgGrade=getAverageGrade();

    content.innerHTML = `

    <div class="trainee-page">

    <!-- 상단 헤더 -->

    <div class="trainee-header">

        <div class="page-info">

            <h1>연습생</h1>

            <span>✦ STARFORGE</span>

        </div>

        <div class="header-actions">

            <input
                type="text"
                placeholder="연습생 이름을 입력하세요"
            >

            <button>
                <i data-lucide="bell"></i>
            </button>

            <button>
                <i data-lucide="mail"></i>
            </button>

            <button>
                <i data-lucide="calendar-days"></i>
            </button>

        </div>

    </div>


    <!-- 상단 카드 영역 -->

    <div class="trainee-top">

        <div class="trainee-stats">

            <div class="stat-card">

                <h4>전체 연습생</h4>

                <h2>${traineeCount}명</h2>

                <p>활동 18명 · 연습생 6명</p>

            </div>


            <div class="stat-card">

                <h4>연습생 정원</h4>

                <h2>${traineeCount} / ${company.traineeLimit}명</h2>

                <div class="progress-bar">
                    <div
class="progress-fill"
style="width:${traineeCount/company.traineeLimit*100}%"
></div>
                </div>

                <p>정원 확장 가능</p>

            </div>


            <div class="stat-card">

                <h4>평균 등급</h4>

                <h2>${avgGrade}</h2>

                <p>지난 달 대비 ▲ 0.3</p>

            </div>


            <div class="stat-card">

                <h4>연습생 유지율</h4>

                <h2>87.5%</h2>

                <p>지난 달 대비 ▲ 5.2%</p>

            </div>

        </div>


        <div class="grade-card">

            <h4>등급 분포</h4>

            <div class="grade-placeholder">

                차트 영역

            </div>

        </div>

    </div>


    <!-- 아래 영역 -->

    <div class="trainee-content">

        <!-- 왼쪽 -->

        <div class="trainee-main">

            <div class="tab-bar">

                <button class="active">
                    연습생 목록
                </button>

                <button>
                    등급 분포
                </button>

                <button>
                    연습 현황
                </button>

                <button>
                    성장 트렌드
                </button>

            </div>


            <div class="table-card">

    <!-- 필터 -->

    <div class="filter-bar">

        <div class="filter-left">

            <select>
                <option>전체</option>
            </select>

            <select>
                <option>전체 그룹</option>
            </select>

            <select
    id="gradeFilter"
    onchange="renderTraineeList()"
>

    <option value="">
        전체 등급
    </option>

    <option value="C">
        C
    </option>

    <option value="B">
        B
    </option>

    <option value="A">
        A
    </option>

    <option value="S">
        S
    </option>

</select>

            <select>
                <option>전체 성별</option>
            </select>

            <select>
                <option>전체 연령</option>
            </select>

        </div>


        <div class="filter-right">

            <div class="search-box">

                <i data-lucide="search"></i>

                <input
                    type="text"
                    id="traineeSearch"
                    placeholder="연습생 검색"
                    oninput="renderTraineeList()"
                >

            </div>


            <button class="add-trainee-btn">

                <i data-lucide="plus"></i>

                데뷔조 편성

            </button>

        </div>

    </div>


    <!-- 연습생 테이블 -->

    <div class="trainee-table-wrapper">

    <table class="trainee-table">

    <thead>

        <tr>

            <th>이름</th>
            <th>나이</th>
            <th>성별</th>
            <th>등급</th>
            <th>포지션</th>
            <th>소속 그룹</th>
            <th>입사일</th>
            <th>상태</th>
            <th>관리</th>

        </tr>

    </thead>

    <tbody id="traineeTableBody">

    </tbody>

</table>

</div>

</div>

        </div>


        <!-- 오른쪽 -->

        <div class="trainee-side">

            <div class="recent-card">

            <h4>
                최근 입사 연습생
            </h4>

            <div id="recentTraineeList">

            </div>

        </div>

            <div class="manage-card">

                연습생 관리

            </div>

        </div>

    </div>

</div>

    `;

    lucide.createIcons();

    renderTraineeList();

    renderRecentTrainees();

}

function renderTraineeList(){

    const tbody=document.getElementById("traineeTableBody");

    if(!tbody)return;

    const keyword=
        document.getElementById("traineeSearch")
        ?.value
        .toLowerCase()||"";

    const grade=
    document.getElementById("gradeFilter")
    ?.value||"";

const trainees=
    company.trainees.filter(t=>{

        const nameMatch=
            t.name.toLowerCase().includes(keyword);

        const gradeMatch=
            !grade||t.grade===grade;

        return nameMatch&&gradeMatch;

    });

    if(trainees.length===0){

        tbody.innerHTML=`
        <tr>
            <td colspan="9" class="empty-history">
                아직 영입된 연습생이 없습니다.
            </td>
        </tr>
        `;

        return;

    }

    tbody.innerHTML=trainees.map(t=>`

<tr>

    <td>${t.name}</td>

    <td>${t.age}세</td>

    <td>${t.gender}</td>

    <td>${t.grade}</td>

    <td>${t.position}</td>

    <td>${t.group||"-"}</td>

    <td>${t.joinDate||"-"}</td>

    <td>연습중</td>

    <td>

        <button
    class="manage-btn"
    onclick="showTraineeDetail(${company.trainees.indexOf(t)})"
>
    관리
</button>

    </td>

</tr>

`).join("");

}

function getAverageGrade(){

    if(company.trainees.length===0){

        return "-";

    }

    const scoreMap={

        C:1,

        B:2,

        A:3,

        S:4

    };

    const total=

    company.trainees.reduce(

        (sum,t)=>sum+(scoreMap[t.grade]||1),

        0

    );

    const avg=

    total/company.trainees.length;

    if(avg>=3.5)return "S";

    if(avg>=2.5)return "A";

    if(avg>=1.5)return "B";

    return "C";

}

function renderRecentTrainees(){

    const area=document.getElementById("recentTraineeList");

    if(!area)return;

    const recent=

    [...company.trainees]

    .reverse()

    .slice(0,3);

    if(recent.length===0){

        area.innerHTML=`
        <p class="empty-recent">
            아직 영입된 연습생이 없습니다.
        </p>
        `;

        return;

    }

    area.innerHTML=

    recent.map(t=>`

    <div class="recent-trainee-item">

        <div class="recent-grade">
            ${t.grade}
        </div>

        <div class="recent-info">

            <strong>
                ${t.name}
            </strong>

            <span>
                ${t.age}세 · ${t.position}
            </span>

        </div>

    </div>

    `).join("");

}

function showTraineeDetail(index){

    const trainee=company.trainees[index];

    if(!trainee)return;

    const modal=document.getElementById("modalArea");

    modal.innerHTML=`

    <div class="modal-overlay">

        <div class="trainee-detail-modal">

            <div class="detail-header">

                <div class="detail-grade">
                    ${trainee.grade}
                </div>

                <div>

                    <h2>${trainee.name}</h2>

                    <p>
                        ${trainee.age}세 ·
                        ${trainee.gender} ·
                        ${trainee.nation}
                    </p>

                </div>

            </div>


            <div class="detail-section">

                <h4>기본 정보</h4>

                <div class="detail-grid">

                    <div>
                        <span>포지션</span>
                        <strong>${trainee.position}</strong>
                    </div>

                    <div>
                        <span>소속 그룹</span>
                        <strong>${trainee.group||"미소속"}</strong>
                    </div>

                </div>

            </div>


            <div class="detail-section">

                <h4>능력치</h4>

                <div class="stat-item">

                    <span>보컬</span>

                    <div class="detail-bar">
                        <div style="width:${trainee.vocal}%"></div>
                    </div>

                    <strong>${trainee.vocal}</strong>

                </div>

                <div class="stat-item">

                    <span>랩</span>

                    <div class="detail-bar">
                        <div style="width:${trainee.rap}%"></div>
                    </div>

                    <strong>${trainee.rap}</strong>

                </div>

                <div class="stat-item">

                    <span>댄스</span>

                    <div class="detail-bar">
                        <div style="width:${trainee.dance}%"></div>
                    </div>

                    <strong>${trainee.dance}</strong>

                </div>

                <div class="stat-item">

                    <span>스타성</span>

                    <div class="detail-bar">
                        <div style="width:${trainee.star}%"></div>
                    </div>

                    <strong>${trainee.star}</strong>

                </div>

            </div>


            <button
                class="close-detail-btn"
                onclick="closeModal()"
            >
                닫기
            </button>

        </div>

    </div>

    `;

}

function closeModal(){

    document.getElementById("modalArea").innerHTML="";

}