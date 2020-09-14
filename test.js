const months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', "September",
    'October', 'November', 'December'
];

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

async function getNearestDate(code, moodleSession, idmSession) {
    let nearestQuiz;
    let nearestAssignement;
    await getNextQuiz(code, moodleSession, idmSession).then(date => nearestQuiz = date);
    await getNextAssignement(code, moodleSession, idmSession).then(date => nearestAssignement = date);
    if (nearestQuiz != 'No Upcoming Due Date' && nearestAssignement == 'No Upcoming Due Date')
        return nearestQuiz;
    else if (nearestQuiz == 'No Upcoming Due Date' && nearestAssignement != 'No Upcoming Due Date')
        return nearestAssignement;
    else if (nearestQuiz == 'No Upcoming Due Date' && nearestAssignement == 'No Upcoming Due Date')
        return nearestQuiz;
    else {
        let tempTimeStorage = "";
        let parsed_nearestQuiz = nearestQuiz.split(', ').map(dateBlock => dateBlock.split(' ').map(dateElement => dateElement.includes(':') ? tempTimeStorage = dateElement.split(':').map(str => Number(str)) : (dateElement === 'PM' && tempTimeStorage.length) ? [tempTimeStorage[0] + 12, tempTimeStorage[1]] : dateElement === 'AM' ? tempTimeStorage : dateElement ));
        let parsed_nearestAssignement = nearestAssignement.split(', ').map(dateBlock => dateBlock.split(' ').map(dateElement => dateElement.includes(':') ? tempTimeStorage = dateElement.split(':').map(str => Number(str)) : (dateElement === 'PM' && tempTimeStorage.length) ? [tempTimeStorage[0] + 12, tempTimeStorage[1]] : dateElement === 'AM' ? tempTimeStorage : dateElement ));
        let timestampQuiz = new Date(Number(parsed_nearestQuiz[1][2]), parsed_nearestQuiz[1][1].indexOf(months), Number(parsed_nearestQuiz[1][0]), parsed_nearestQuiz[2][1][0], parsed_nearestQuiz[2][1][1]);
        let timestampAssignement = new Date(Number(parsed_nearestAssignement[1][2]), parsed_nearestAssignement[1][1].indexOf(months), Number(parsed_nearestAssignement[1][0]), parsed_nearestAssignement[2][1][0], parsed_nearestAssignement[2][1][1])
        if (timestampQuiz > timestampAssignement) {
            return nearestQuiz;
        }
        else {
            return nearestAssignement;
        }
    }
}

async function getNextQuiz(code, moodleSession, idmSession) {
    let url = 'https://culearn.carleton.ca/moodle/mod/quiz/index.php?id=' + code;
    let nearestQuiz = "";
    await fetch(url, {
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'DNT': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': 'MoodleSession=' + moodleSession + '; IDMSESSID=' + idmSession + ';'
        }
    }).then(pageData => {
        return pageData.text();
    }).then(data => {
        let parsedDate = data.match(/c2" style="text-align:left;">(.*?)<\/td>\n<td class="cell c3 lastcol" style="text-align:left;"><\/td>/);
        if (parsedDate)
            nearestQuiz = parsedDate[1];
        else
            nearestQuiz = 'No Upcoming Due Date';
    });
    return nearestQuiz;
}

async function getNextAssignement(code, moodleSession, idmSession) {
    let url = 'https://culearn.carleton.ca/moodle/mod/assign/index.php?id=' + code;
    let nearestAssignement = "";
    await fetch(url, {
        method: 'POST',
        headers: {
            'Connection': 'keep-alive',
            'Upgrade-Insecure-Requests': '1',
            'DNT': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.102 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-User': '?1',
            'Sec-Fetch-Dest': 'document',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'en-US,en;q=0.9',
            'Cookie': 'MoodleSession=' + moodleSession + '; IDMSESSID=' + idmSession + ';'
        }
    }).then(pageData => {
        return pageData.text();
    }).then(data => {
        let parsedDate = data.match(/c2" style="text-align:center;">(.*?)<\/td>\n<td class="cell c3" style="text-align:right;">No submission<\/td>/);
        if (parsedDate !== null)
            nearestAssignement = parsedDate[1];
        else
            nearestAssignement = 'No Upcoming Due Date';
    });
    return nearestAssignement;
}
