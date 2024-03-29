var link = document.createElement('link');
    link.id = 'imported-css';
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/ahm23/CULearn@3.0.0b/installer/installerCSSModel.css';
    document.getElementsByTagName('HEAD')[0].appendChild(link);
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
    </main>
`);
                $(document).ready(async function() {
                    $('main').show();
                    /*$('#intro-center').fadeTo(1200, 1);
                    await new Promise(resolve => setTimeout(resolve, 2400));
                    $('#intro-center').fadeTo(1200, 0);
                    await new Promise(resolve => setTimeout(resolve, 1800));
                    $('#intro-center').text('Welcome to cuLearn++').fadeTo(1200, 1);
                    await new Promise(resolve => setTimeout(resolve, 2500));
                    $('#intro-center').fadeTo(1200, 0);
                    await new Promise(resolve => setTimeout(resolve, 1800));
                    $('#intro-center').text("Before we Begin, Let's set a few things up!").fadeTo(1200, 1);
                    await new Promise(resolve => setTimeout(resolve, 4000));
                    */
                    $('#intro-center').fadeTo(1200, 0, function() {
                        $(this).hide();
                    });
                    await new Promise(resolve => setTimeout(resolve, 1200));
                    $('main').show();
                });

                function parseCourses(group) {
                    let courses = {};
                    for (course of $(group).children().toArray()) {
                        const TITLE = $(course).text();
                        let code = $(course).children('a').attr('href').match(/id=(.*)/)[1];
                        let name = TITLE.match(/[A-Z]{4}\d{4}/) ? TITLE.match(/[A-Z]{4}\d{4}/)[0] : undefined;
                        if (!name)
                            break;
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
                                    section: 'LAB'
                                };
                            }
                        }
                    }
                    console.log(courses);
                    return courses;
                }
                let courseCount = 0;
                $(document).ready(function() {
                    for ([key, value] of Object.entries(parseCourses($('.courses').toArray()[0]))) {
                        courseCount++;
                        $('.schedule').append(`
                <div class="class">
                <header>
                    Course #` + courseCount + `
                </header>
                <div class="row">
                    <div class="field quarter">
                        <div class="header ">Course Code*</div>
                        <input type="text" id="code` + courseCount + `" data-course="` + courseCount + `" class="input course_code" val="` + key + `"/>
                    </div>
                    <div class="field">
                        <div class="header">Class Times*</div>
                        <div class="class_time">
                            <label>Day 1:</label>
                            <select name="days">
                                <option value="choose">N/A</option>
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
                            <select name="days">
                                <option value="sunday">N/A</option>
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
                        <input id="name` + courseCount + `" data-course="` + courseCount + `" class="input course_name" val="` + key.replace(/^(.{4})(.*)$/, "$1 $2") + ` ` + value.section + `" />
                    </div>
                </div>
                <div class="row">
                    <div class="field half">
                        <div class="header">Course URL*</div>
                        <input class="input" val="https://culearn.carleton.ca/moodle/course/view.php?id=` + value.code + `" />
                    </div>
                </div>
            </div>
                `);
                    }
                });
$(document).ready(function() {
    $('body').on('keyup', '.course_code', function() {
        const INPUT = $(this).val().trim().toUpperCase();
        if (INPUT.length > 7 && INPUT.match(/[A-Z]{4}\d{4}/))
            $('#name' + $(this).data('course')).val(INPUT.replace(/^(.{4})(.*)$/, "$1 $2"));
        else
            $('#name' + $(this).data('course')).val(INPUT);
    });
    $('.add_class').click(function() {
        courseCount++;
        $('.schedule').append(`
        <div class="class">
        <header>
            Course #` + courseCount + `
        </header>
        <div class="row">
            <div class="field quarter">
                <div class="header ">Course Code*</div>
                <input type="text" id="code` + courseCount + `" data-course="` + courseCount + `" class="input course_code" />
            </div>
            <div class="field">
                <div class="header">Class Times*</div>
                <div class="class_time">
                    <label>Day 1:</label>
                    <select name="days">
                        <option value="choose">N/A</option>
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
                    <select name="days">
                        <option value="sunday">N/A</option>
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
                <input id="name` + courseCount + `" data-course="` + courseCount + `" class="input course_name" />
            </div>
        </div>
        <div class="row">
            <div class="field half">
                <div class="header">Course URL*</div>
                <input class="input" />
            </div>
        </div>
        </div>
        `);
    });
});
$(document).on('click', '#revert', function() {
    console.log('revertin')
    $('main, header').hide();
    $('#imported-css').remove();
    $('body').attr('style', '');
    $('#page-wrapper, #page-header').show();
});