/*function randomItem(array) {
    return array[
        Math.floor(Math.random() * array.length)
    ];
}

function getTraineeTier(type) {

    const roll = Math.random() * 100;

    if (type === "local") {

        if (roll < 70) return "일반";
        if (roll < 95) return "우수";
        return "엘리트";
    }

    if (type === "national") {

        if (roll < 50) return "일반";
        if (roll < 90) return "우수";
        return "엘리트";
    }

    if (type === "global") {

        if (roll < 25) return "일반";
        if (roll < 75) return "우수";
        return "엘리트";
    }
}

function randomGradeByTier(tier) {

    let grades = [];

    if (tier === "일반") {
        grades = ["D", "C", "B"];
    }

    if (tier === "우수") {
        grades = ["C", "B", "A"];
    }

    if (tier === "엘리트") {
        grades = ["B", "A", "S"];
    }

    return randomItem(grades);
}

function createTrainee(type) {

    const gender =
        Math.random() < 0.5
        ? "남성"
        : "여성";

    let name;

    if (gender === "남성") {

        name =
            randomItem(surnames)
            +
            randomItem(koreanMaleNames);

    } else {

        name =
            randomItem(surnames)
            +
            randomItem(koreanFemaleNames);
    }

    let nation = "한국";

if (type === "global") {

    nation =
        randomItem(nations);
}
    
    const tier = getTraineeTier(type);

    const specialty =
    randomItem([
        "보컬형",
        "댄서형",
        "래퍼형",
        "비주얼형",
        "올라운더"
    ]);

let vocal =
    randomGradeByTier(tier);

let dance =
    randomGradeByTier(tier);

let rap =
    randomGradeByTier(tier);

let visual =
    randomGradeByTier(tier);

let star =
    randomGradeByTier(tier);

    if (specialty === "보컬형") {

    vocal =
        upgradeGrade(vocal);
}

if (specialty === "댄서형") {

    dance =
        upgradeGrade(dance);
}

if (specialty === "래퍼형") {

    rap =
        upgradeGrade(rap);
}

if (specialty === "비주얼형") {

    visual =
        upgradeGrade(visual);

    star =
        upgradeGrade(star);
}

if (specialty === "올라운더") {

    vocal =
        upgradeGrade(vocal);

    dance =
        upgradeGrade(dance);

    rap =
        upgradeGrade(rap);
}

    return {

        name: name,

        gender: gender,

        tier: tier,

        age:
            Math.floor(
                Math.random() * 8
            ) + 15,

        nation: nation,

        vocal: vocal,

        dance: dance,

        rap: rap,

        visual: visual,

        star: star,

        potential: getPotential(tier),

        specialty: specialty,

        trait:
            randomItem(traits),

        yearsTrained: 0

    };
}

function upgradeGrade(grade) {

    if (grade === "D") return "C";

    if (grade === "C") return "B";

    if (grade === "B") return "A";

    if (grade === "A") return "S";

    return "S";
}

function trainStat(grade) {

    grade = upgradeGrade(grade);

    if (
        company.practiceRoomLevel >= 1
    ) {
        grade = upgradeGrade(grade);
    }

    return grade;
}

function getPotential(tier) {

    if (tier === "일반") {

        const roll =
            Math.random() * 100;

        if (roll < 50) return "★";
        if (roll < 85) return "★★";
        return "★★★";
    }

    if (tier === "우수") {

        const roll =
            Math.random() * 100;

        if (roll < 30) return "★★";
        if (roll < 80) return "★★★";
        return "★★★★";
    }

    if (tier === "엘리트") {

        const roll =
            Math.random() * 100;

        if (roll < 40) return "★★★★";
        return "★★★★★";
    }
}

const traits = [

"천재",
"노력파",
"워커홀릭",
"리더형",
"승부욕",
"긍정왕",
"예능캐",
"분위기메이커",
"연습벌레",
"집중력",

"게으름뱅이",
"유리멘탈",
"지각왕",
"낯가림",
"자존심",
"산만함",
"소심함",
"완벽주의",
"고집쟁이",
"허당",

"비주얼천재",
"음색천재",
"댄스머신",
"랩몬스터",
"팬서비스",
"SNS스타",
"패션왕",
"외국어천재",
"센터상",
"올라운더"

];

function getFlag(nation){

    if(nation === "한국") return "🇰🇷";
    if(nation === "미국") return "🇺🇸";
    if(nation === "일본") return "🇯🇵";
    if(nation === "중국") return "🇨🇳";
    if(nation === "태국") return "🇹🇭";
    if(nation === "필리핀") return "🇵🇭";
    if(nation === "캐나다") return "🇨🇦";
    if(nation === "호주") return "🇦🇺";

    return "🌎";
}

*/


//아이러브아이러니ver.//

function randomItem(array) {
    return array[
        Math.floor(Math.random() * array.length)
    ];
}

function getTraineeTier(type) {

    const roll = Math.random() * 100;

    if (type === "local") {

        if (roll < 70) return "일반";
        if (roll < 95) return "우수";
        return "엘리트";
    }

    if (type === "national") {

        if (roll < 50) return "일반";
        if (roll < 90) return "우수";
        return "엘리트";
    }

    if (type === "global") {

        if (roll < 25) return "일반";
        if (roll < 75) return "우수";
        return "엘리트";
    }
}

function randomGradeByTier(tier) {

    let grades = [];

    if (tier === "일반") {
        grades = ["D", "C", "B"];
    }

    if (tier === "우수") {
        grades = ["C", "B", "A"];
    }

    if (tier === "엘리트") {
        grades = ["B", "A", "S"];
    }

    return randomItem(grades);
}

function createTrainee(type) {

    const gender =
        Math.random() < 0.5
        ? "남성"
        : "여성";

    let name;

    if (gender === "남성") {

        name =
            randomItem(surnames)
            +
            randomItem(koreanMaleNames);

    } else {

        name =
            randomItem(surnames)
            +
            randomItem(koreanFemaleNames);
    }

    let nation = "한국";

if (type === "global") {

    nation =
        randomItem(nations);
}
    
    const tier = getTraineeTier(type);

    const specialty =
    randomItem([
        "보컬형",
        "댄서형",
        "래퍼형",
        "비주얼형",
        "올라운더"
    ]);

let vocal =
    randomGradeByTier(tier);

let dance =
    randomGradeByTier(tier);

let rap =
    randomGradeByTier(tier);

let visual =
    randomGradeByTier(tier);

let star =
    randomGradeByTier(tier);

    if (specialty === "보컬형") {

    vocal =
        upgradeGrade(vocal);
}

if (specialty === "댄서형") {

    dance =
        upgradeGrade(dance);
}

if (specialty === "래퍼형") {

    rap =
        upgradeGrade(rap);
}

if (specialty === "비주얼형") {

    visual =
        upgradeGrade(visual);

    star =
        upgradeGrade(star);
}

if (specialty === "올라운더") {

    vocal =
        upgradeGrade(vocal);

    dance =
        upgradeGrade(dance);

    rap =
        upgradeGrade(rap);
}

    return {

        name: name,

        gender: gender,

        tier: tier,

        age:
            Math.floor(
                Math.random() * 8
            ) + 15,

        nation: nation,

        vocal: vocal,

        dance: dance,

        rap: rap,

        visual: visual,

        star: star,

        potential: getPotential(tier),

        specialty: specialty,

        trait:
            randomItem(traits),

        yearsTrained: 0

    };
}

function upgradeGrade(grade) {

    if (grade === "D") return "C";

    if (grade === "C") return "B";

    if (grade === "B") return "A";

    if (grade === "A") return "S";

    return "S";
}

function trainStat(grade) {

    grade = upgradeGrade(grade);

    if (
        company.practiceRoomLevel >= 1
    ) {
        grade = upgradeGrade(grade);
    }

    return grade;
}

function getPotential(tier) {

    if (tier === "일반") {

        const roll =
            Math.random() * 100;

        if (roll < 50) return "★";
        if (roll < 85) return "★★";
        return "★★★";
    }

    if (tier === "우수") {

        const roll =
            Math.random() * 100;

        if (roll < 30) return "★★";
        if (roll < 80) return "★★★";
        return "★★★★";
    }

    if (tier === "엘리트") {

        const roll =
            Math.random() * 100;

        if (roll < 40) return "★★★★";
        return "★★★★★";
    }
}

const traits = [

"천재",
"노력파",
"워커홀릭",
"리더형",
"승부욕",
"긍정왕",
"예능캐",
"분위기메이커",
"연습벌레",
"집중력",

"게으름뱅이",
"유리멘탈",
"지각왕",
"낯가림",
"자존심",
"산만함",
"소심함",
"완벽주의",
"고집쟁이",
"허당",

"비주얼천재",
"음색천재",
"댄스머신",
"랩몬스터",
"팬서비스",
"SNS스타",
"패션왕",
"외국어천재",
"센터상",
"올라운더"

];

function getFlag(nation){

    if(nation === "한국") return "🇰🇷";
    if(nation === "미국") return "🇺🇸";
    if(nation === "일본") return "🇯🇵";
    if(nation === "중국") return "🇨🇳";
    if(nation === "태국") return "🇹🇭";
    if(nation === "필리핀") return "🇵🇭";
    if(nation === "캐나다") return "🇨🇦";
    if(nation === "호주") return "🇦🇺";

    return "🌎";
}