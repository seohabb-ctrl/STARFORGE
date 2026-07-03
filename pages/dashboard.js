function renderDashboardPage(){

    const mainContent=document.getElementById("mainContent");

    mainContent.innerHTML=`

        <header class="topbar">

            <div class="page-title">

                <h1>대시보드</h1>

                <span>✦</span>

                <small>
                    ${company.name}
                </small>

            </div>

            <div class="top-actions">

                <div class="search-box">

                    <i data-lucide="search"></i>

                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                    >

                </div>

                <button class="icon-btn">
                    <i data-lucide="bell"></i>
                </button>

                <button class="icon-btn">
                    <i data-lucide="mail"></i>
                </button>

                <div class="date-box">

                    <i data-lucide="calendar-days"></i>

                    <div>

                        <strong id="topDate">

                    2026.06.29 (월)

                    </strong>

                        <span id="topMonth">

                    1개월차

                    </span>

    </div>

</div>

            </div>

        </header>

        <section id="dashboardContent">

    <div class="hero-layout">

        <!-- 메인 배너 -->
        <section class="hero-banner">

            <img
                src="./assets/images/dashboard-banner.png"
                class="banner-image"
            >

            <div class="banner-overlay">

                <p>WELCOME BACK, CEO</p>

                <h1>STARFORGE</h1>

                <span>
                    스타를 만들고, 세상을 빛낸다.
                </span>

                <small>
                    "우리는 꿈을 현실로 만드는 사람들입니다."
                </small>

            </div>

        </section>


        <!-- 오늘의 일정 -->
        <section class="schedule-card">

            <div class="card-header">

                <h3>오늘의 일정</h3>

                <a href="#">
                    더보기
                    <i data-lucide="chevron-right"></i>
                </a>

            </div>


            <div class="schedule-kpi">

                <div class="mini-kpi">

                    <h2 id="apValue">12</h2>

                    <span>보유 수량</span>

                    <small>AP</small>

                </div>


                <div class="mini-kpi">

                    <h2 id="cpValue">8</h2>

                    <span>보유 수량</span>

                    <small>CP</small>

                </div>

            </div>


            <div class="schedule-list">

                <div class="schedule-item">
                    <strong>10:00</strong>
                    <div>
                        <b>연습</b>
                        <span>신인 그룹 'NOVA' 안무 연습</span>
                    </div>
                </div>

                <div class="schedule-item">
                    <strong>13:00</strong>
                    <div>
                        <b>미팅</b>
                        <span>앨범 재킷 촬영 미팅</span>
                    </div>
                </div>

                <div class="schedule-item">
                    <strong>15:30</strong>
                    <div>
                        <b>촬영</b>
                        <span>예능 프로그램 녹화</span>
                    </div>
                </div>

                <div class="schedule-item">
                    <strong>18:00</strong>
                    <div>
                        <b>행사</b>
                        <span>팬사인회</span>
                    </div>
                </div>

            </div>

        </section>

    </div>

    <section class="kpi-grid">

    <div class="kpi-card">

        <div class="kpi-top">

            <span>회사 자금</span>

            <div class="kpi-icon gold">
                <i data-lucide="landmark"></i>
            </div>

        </div>

        <h2 id="moneyValue">₩ 0</h2>

        <small>8억 7,500만원</small>

        <p>지난 달 대비 ▲ 12.4%</p>

    </div>


    <div class="kpi-card">

        <div class="kpi-top">

            <span>회사 평판</span>

            <div class="kpi-icon purple">
                <i data-lucide="star"></i>
            </div>

        </div>

        <h2>
            <span id="reputationValue">0</span>
            <small>/ 100</small>
        </h2>

        <p>지난 달 대비 ▲ 5.2</p>

    </div>


    <div class="kpi-card">

        <div class="kpi-top">

            <span>팬덤 규모</span>

            <div class="kpi-icon green">
                <i data-lucide="users"></i>
            </div>

        </div>

        <h2>2,450,300 명</h2>

        <p>지난 달 대비 ▲ 8.7%</p>

    </div>


    <div class="kpi-card">

        <div class="kpi-top">

            <span>이번 달 순이익</span>

            <div class="kpi-icon blue">
                <i data-lucide="badge-dollar-sign"></i>
            </div>

        </div>

        <h2>₩ 1,250,000,000</h2>

        <small>12억 5,000만원</small>

        <p>지난 달 대비 ▲ 18.6%</p>

    </div>

</section>

<section class="dashboard-grid">

    <!-- 소속 그룹 현황 -->
    <div class="dashboard-card">

        <div class="card-header">

            <h3>소속 그룹 현황</h3>

            <a href="#">
                더보기
                <i data-lucide="chevron-right"></i>
            </a>

        </div>

        <div class="empty-group">

            <h4>
                아직 데뷔한 그룹이 없습니다.
            </h4>

            <p>
                연습생을 발굴하고 트레이닝하여<br>
                새로운 그룹을 만들어보세요!
            </p>

            <button>
                오디션 진행
            </button>

        </div>

    </div>


    <!-- 시설 현황 -->
    <div class="dashboard-card">

        <div class="card-header">

            <h3>시설 현황</h3>

            <a href="#">
                더보기
                <i data-lucide="chevron-right"></i>
            </a>

        </div>

        <div class="facility-list">

            <div class="facility-item">
                <span>연습실</span>
                <small>Lv.3</small>
                <div class="bar"><div style="width:65%"></div></div>
            </div>

            <div class="facility-item">
                <span>기숙사</span>
                <small>Lv.2</small>
                <div class="bar"><div style="width:45%"></div></div>
            </div>

            <div class="facility-item">
                <span>녹음실</span>
                <small>Lv.3</small>
                <div class="bar"><div style="width:70%"></div></div>
            </div>

            <div class="facility-item">
                <span>댄스홀</span>
                <small>Lv.2</small>
                <div class="bar"><div style="width:40%"></div></div>
            </div>

            <div class="facility-item">
                <span>콘텐츠 스튜디오</span>
                <small>Lv.2</small>
                <div class="bar"><div style="width:50%"></div></div>
            </div>

            <div class="facility-item">
                <span>사옥</span>
                <small>Lv.3</small>
                <div class="bar"><div style="width:60%"></div></div>
            </div>

        </div>

    </div>


    <!-- 최근 활동 -->
    <div class="dashboard-card">

        <div class="card-header">

            <h3>최근 활동</h3>

            <a href="#">
                더보기
                <i data-lucide="chevron-right"></i>
            </a>

        </div>

        <div class="activity-list">

            <div class="activity-item">
                <span>신인 연습생 '김서연' 영입</span>
                <small>2025.06.16 09:35</small>
            </div>

            <div class="activity-item">
                <span>그룹 'NOVA' 안무 연습 완료</span>
                <small>2025.06.16 10:20</small>
            </div>

            <div class="activity-item">
                <span>앨범 'ECLIPSE' 자켓 촬영 완료</span>
                <small>2025.06.15 16:45</small>
            </div>

            <div class="activity-item income">
                <span>음원 수익 정산 + ₩320,000,000</span>
                <small>2025.06.15 00:00</small>
            </div>

            <div class="activity-item">
                <span>콘서트 'STARFORGE DAY' 티켓 오픈</span>
                <small>2025.06.14 11:10</small>
            </div>

        </div>

    </div>

</section>

        <section class="quick-section">

    <h3>바로가기</h3>

    <div class="quick-grid">

        <button class="quick-card">
            <i data-lucide="calendar-days"></i>
            <span>스케줄 관리</span>
        </button>

        <button class="quick-card">
            <i data-lucide="star"></i>
            <span>오디션 관리</span>
        </button>

        <button class="quick-card">
            <i data-lucide="disc-3"></i>
            <span>앨범 제작</span>
        </button>

        <button class="quick-card">
            <i data-lucide="presentation"></i>
            <span>콘서트 기획</span>
        </button>

        <button class="quick-card">
            <i data-lucide="chart-column"></i>
            <span>재무 관리</span>
        </button>

        <button class="quick-card">
            <i data-lucide="folder-open"></i>
            <span>데뷔조 편성</span>
        </button>

    </div>

</section>

</section>

    `;

    lucide.createIcons();

    renderDashboardData();

    }