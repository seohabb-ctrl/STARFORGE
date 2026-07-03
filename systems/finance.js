function earnMoney(reason, amount) {

    company.money += amount;

    console.log(`${reason} +${amount}만원`);
}

function payMoney(reason, amount) {

    if (company.money < amount) {

        alert("자금이 부족합니다.");

        return false;
    }

    company.money -= amount;

    console.log(`${reason} -${amount}만원`);

    return true;
}