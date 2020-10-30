$(document).ready(async function() {
    $('body').append(`
        <div id="intro-center" class="page_center_text text_xlarge intro">
            Hi There!
        </div>
        <header class="cancel">
            <div id="revert" class="cancel">Cancel Installation 🡒 </div>
            <svg class="cancel" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4 10.88L10.88 12 8 9.12 5.12 12 4 10.88 6.88 8 4 5.12 5.12 4 8 6.88 10.88 4 12 5.12 9.12 8 12 10.88z" fill-rule="nonzero"></path></svg>
        </header>
        <main class="setup">
            <header>
                <div class="title">Firstly, Lets Setup Your Schedule</div>
            </header>
            <section class="schedule">
                
            </section>
            <div class="footer">
                <div class="add_class">+ Add Another Class</div>
            </div>
            <div class="submit_schedule">
                <button id="submit_schedule">Next -></button>
            </div>
        </main>
    `);
    $('#intro-center').fadeTo(1200, 1);
    await new Promise(resolve => setTimeout(resolve, 2400));
    $('#intro-center').fadeTo(1200, 0);
    await new Promise(resolve => setTimeout(resolve, 1800));
    $('#intro-center').text('Welcome to cuLearn++').fadeTo(1200, 1);
    await new Promise(resolve => setTimeout(resolve, 2500));
    $('#intro-center').fadeTo(1200, 0);
    await new Promise(resolve => setTimeout(resolve, 1800));
    $('#intro-center').text("Before we Begin, Let's set a few things up!").fadeTo(1200, 1);
    await new Promise(resolve => setTimeout(resolve, 4000));
    $('#intro-center').fadeTo(1200, 0, function() {
        $(this).hide();
    });
    await new Promise(resolve => setTimeout(resolve, 1200));
    $('main').fadeIn(800);
});

function getCookie(cname) {
    let name = cname + '=';
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1);
        if (c.indexOf(name) == 0)
            return c.substring(name.length, c.length);
    }
    return "";
}

const requestHandler = (url) => new Promise((resolve) => {
    fetch(url, {
        method: 'GET',
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
            'Cookie': 'MoodleSession=' + getCookie('MoodleSession') + ';'
        }
    }).then(response => {
        return response.text();
    }).then(pageData => {
        resolve(pageData);
    });
});

function submitClasses() {
    var classData = [];
    for (course of $('.class').toArray()) {
        const CLASS_ID = $(course).data('class');
        classData[classData.length] = [
            $('#code'+CLASS_ID).val(),
            $('#name'+CLASS_ID).val(),
            $('#url'+CLASS_ID).val(),
            $('#first'+CLASS_ID).val(),
            $('#second'+CLASS_ID).val(),
            $('#start'+CLASS_ID).val(),
            $('#end'+CLASS_ID).val()
        ]
    }
    const SESS_KEY = $("input[name=sesskey]").val();
    const newBlockPageData = await requestHandler('https://culearn.carleton.ca/moodle/my/index.php?bui_addblock&sesskey=' + SESS_KEY + '&bui_addblock=html');
    console.log(newBlockPageData);
    var re = new RegExp('sesskey='+SESS_KEY+'&bui_editid=(.*?)"'); 
    let matchedBlockID = newBlockPageData.match(re);
    console.log(matchedBlockID);
    console.log(matchedBlockID[matchedBlockID.length]);
}



function appendCourse(courseCount, name, code, section, isTutorial) {
    $('.schedule').append(`
            <div data-class="`+ courseCount + `" class="class">
            <header>
                Course #` + courseCount + `
            </header>
            <div class="row">
                <div class="field quarter">
                    <div class="header ">Course Code*</div>
                    <input type="text" id="code` + courseCount + `" data-course="` + courseCount + `" class="input course_code" value="` + name + `"/>
                </div>
                <div class="field">
                    <div class="header">Class Times*</div>
                    <div class="class_time">
                        <label>Day 1:</label>
                        <select id="first` + courseCount + `" name="days">
                            <option value="na">N/A</option>
                            <option value="sunday">Sunday</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                        </select>
                        <label>Start Time:</label>
                        <input type="time" />
                        <label>Day 2:</label>
                        <select id="second` + courseCount + `" name="days">
                            <option value="na">N/A</option>
                            <option value="sunday">Sunday</option>
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                        </select>
                        <label>End Time:</label>
                        <input type="time" />
                    </div>
                </div>
                <div class="field quarter">
                    <div class="header">Display Name</div>
                    <input id="name` + courseCount + `" class="input course_name" value="` + name.replace(/^(.{4})(.*)$/, "$1 $2") + ` ` + section + `" />
                </div>
            </div>
            <div class="row">
                <div class="field half">
                    <div class="header">Course URL*</div>
                    <input id="url` + courseCount + `" class="input" value="https://culearn.carleton.ca/moodle/course/view.php?id=` + code + `" />
                </div>
                <div class="field quarter">
                    <div class="header">Tutorial*</div>
                    <div class="checklist item_checkbox">
                        <label class="checkbox_style">
                            <input class="checkbox" type="checkbox" ` + (isTutorial ? 'checked' : '') + `/>
                            <span class="checkmark"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    `);
}

function parseCourses(group) {
    let courses = {};
    for (course of $(group).children().toArray()) {
        const TITLE = $(course).text();
        let code = $(course).children('a').attr('href').match(/id=(.*)/)[1];
        let name = TITLE.match(/[A-Z]{4}\d{4}/) ? TITLE.match(/[A-Z]{4}\d{4}/)[0] : undefined;
        if (!name)
            continue;
        if (TITLE.indexOf('LAB') === -1) {
            let section = TITLE.indexOf('Crosslist') > -1 ? 'Crosslist' : TITLE.match(/(?<=^[A-Z]{4}\d{4})(.)/g);
            let lab = courses[name] ? courses.name.code : undefined;
            courses[name] = {
                code,
                section: section ? section : '',
                lab
            };
        } else {
            if (courses[name]) courses[name].lab = code;
            else {
                courses[name] = {
                    code,
                    section: 'Tutorial'
                };
            }
        }
    }
    console.log(courses);
    return courses;
}

$(document).ready(function() {
    let courseCount = 0;
    for ([key, value] of Object.entries(parseCourses($('.courses').toArray()[0]))) {
        courseCount++;
        console.log(value)
        appendCourse(courseCount, key, value.code, value.section, (value.section == 'Tutorial' ? true : false));
        if (value.lab) {
            appendCourse(courseCount, key, value.lab, 'Tutorial', true);
        }
    }
    $('body').on('keyup', '.course_code', function() {
        const INPUT = $(this).val().trim().toUpperCase();
        if (INPUT.length > 7 && INPUT.match(/[A-Z]{4}\d{4}/))
            $('#name' + $(this).data('course')).val(INPUT.replace(/^(.{4})(.*)$/, "$1 $2"));
        else
            $('#name' + $(this).data('course')).val(INPUT);
    });
    $('.add_class').click(function() {
        courseCount++;
        appendCourse(courseCount, '', '', '', false);
    });
});

$(document).on('click', '#revert', function() {
    console.log('revertin')
    $('main, header').hide();
    $('#imported-css').remove();
    $('body').attr('style', '');
    $('#page-wrapper, #page-header').show();
});

$(document).on('click', '#submit_schedule', function() {
    console.log('submittin')
    submitClasses();
});