    // Created by Ahmed A. Moussa, GNU GPLv3 License
    $('body').attr('style', 'margin: 0 !important;');
    $('#page-wrapper').hide();
    var link = document.createElement('link');
    link.id = 'imported-css'
    link.rel = 'stylesheet';
    link.href = 'https://cdn.jsdelivr.net/gh/ahm23/css_test_repo@0.1.0/index.min.css';
    document.getElementsByTagName('HEAD')[0].appendChild(link);
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Nunito&display=swap';
    document.getElementsByTagName('HEAD')[0].appendChild(link);
    link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Montserrat&display=swap';
    document.getElementsByTagName('HEAD')[0].appendChild(link);

    function getCookie(cname) {
        let name = cname + '=';
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
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


    $(document).ready(function() {
        $(document).on('click', '#revert', function() {
            $('main, header').hide();
            $('#imported-css').remove();
            $('body').attr('style', '');
            $('#page-wrapper, #page-header').show();
        });

        // DASHBOARD INITIAL RENDER
        $('body').append(`
        <div id="inner-page">
            <header>
                cuLearn++
                <div>
                    <svg id="revert" class="header-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="533.333px" height="533.333px" viewBox="0 0 533.333 533.333" style="enable-background:new 0 0 533.333 533.333;" xml:space="preserve"><g>	<path d="M416.667,333.333v-66.666H250V200h166.667v-66.667l100,100L416.667,333.333z M383.333,300v133.333H216.667v100l-200-100V0   h366.667v166.667H350V33.333H83.333L216.667,100v300H350V300H383.333z"/></g></svg>
                </div>
            </header>
            <main class="dash">
                <section class="header">
                    <div id="dash-title">Today's Panel - Thursday, January 1<sup>st</sup></div>
                    <div>
                        <svg version="1.1" id="prev-day" class="chevron" x="0px" y="0px" fill="#000000" viewBox="0 0 407.436 407.436"><polygon points="315.869,21.178 294.621,0 91.566,203.718 294.621,407.436 315.869,386.258 133.924,203.718 "/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                        <svg version="1.1" id="next-day" class="chevron" x="0px" y="0px" fill="#000000" viewBox="0 0 407.436 407.436"><polygon points="112.814,0 91.566,21.178 273.512,203.718 91.566,386.258 112.814,407.436 315.869,203.718 "/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg>
                    </div>
                </section>
                <section id="dash-content" class="content_wrapper">
                    <section id="dash-content-left" class="content">
                        <div class="panel">
                            <div class="header red-bg">Schedule</div>
                            <div id="schedule" class="schedule">

                            </div>
                        </div>
                        <div class="panel">
                            <div class="header red-bg">Checklist</div>
                        </div>
                    </section>
                    <section id="dash-content-right" class="content">
                        <div class="panel">
                            <div class="header black-bg">Upcoming Deadlines & Events</div>
                        </div>
                    </section>
                </section>
            </main>
        </div>
    `);
    });

    // Dashboard Functions
    $(document).ready(function() {
        const DATES_DATA = [
            [],
            [],
            [],
            [],
            ['13727', '13696', '13724', '13718', '13917', '13922', 'meme'],
            ['10011', '10012'],
            []
        ]

        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

        const CLASS_DATA = {
            '13727': {
                subj: 'MAAE',
                code: '2700',
                section: 'C',
                type: 'Lecture',
                startT: '8:35 AM',
                endT: '9:55 AM',
                title: 'Engineering Materials',
                link: 'https://culearn.carleton.ca/moodle/course/view.php?id=163048'
            },
            '13696': {
                subj: 'MAAE',
                code: '2101',
                section: 'C',
                type: 'Lecture',
                startT: '10:05 AM',
                endT: '11:25 AM',
                title: 'Engineering Dynamics',
                link: 'https://culearn.carleton.ca/moodle/course/view.php?id=163017'
            },
            '13724': {
                subj: 'MAAE',
                code: '2400',
                section: 'L6',
                type: 'Lab',
                startT: '11:35 AM',
                endT: '2:25 PM',
                title: 'Thermodynamics & Heat Transfer',
                link: ''
            },
            '13718': {
                subj: 'MAAE',
                code: '2400',
                section: 'F',
                type: 'Lecture',
                startT: '4:05 PM',
                endT: '5:25 PM',
                title: 'Thermodynamics & Heat Transfer',
                link: ''
            },
            '13917': {
                subj: 'MATH',
                code: '2004',
                section: 'C',
                type: 'Lecture',
                startT: '6:05 PM',
                endT: '7:25 PM',
                title: 'Multivariable Calculus for Engineering or Physics',
                link: ''
            },
            '13922': {
                subj: 'MATH',
                code: '2004',
                section: 'CT',
                type: 'Tutorial',
                startT: '7:35 PM',
                endT: '8:25 PM',
                title: 'Multivariable Calculus for Engineering or Physics',
                link: ''
            },
            'meme': {
                subj: 'MEME',
                code: '42069',
                section: 'E',
                type: 'LORD',
                startT: '8:35 PM',
                endT: '9:55 PM',
                title: 'Yes.',
                link: ''
            },
            '10011': {
                subj: 'AERO',
                code: '2001',
                section: 'C',
                type: 'Lecture',
                startT: '8:35 AM',
                endT: '9:25 AM',
                title: 'Aerospace Graphical Design',
                link: ''
            },
            '10012': {
                subj: 'AERO',
                code: '2001',
                section: 'L1',
                type: 'Tutorial',
                startT: '11:35 AM',
                endT: '1:25 PM',
                title: 'Aerospace Graphical Design',
                link: ''
            }
        }

        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let day = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        $('body').on('click', '#next-day', function() {
            day.setDate(day.getDate() + 1);
            refreshDash();
        });

        $('body').on('click', '#prev-day', function() {
            day.setDate(day.getDate() - 1);
            refreshDash();
        });

        function refreshDash() {
            const DATE = day.getDate();
            const DAY = day.getDay()
            $('#dash-title').html((day.getTime() === today.getTime() ? ("Today's Panel - " + days[DAY]) : days[DAY]) + ", " + months[day.getMonth()] + " " + DATE + "<sup>" + (DATE === 1 ? "st" : DATE === 2 ? "nd" : DATE === 3 ? "rd" : "th") + "</sup></div>");
            loadSchedule();
        }

        function loadSchedule() {
            $('#schedule').html('');
            DATES_DATA[day.getDay()].forEach(crn => {
                let CLASS = CLASS_DATA[crn];
                $('#schedule').append(`
                <div id="` + crn + `" class="class">
                    <div class="data">
                        <div class="title bold">` + CLASS.subj + ` ` + CLASS.code + ` - ` + CLASS.type + `</div>
                        <div>` + (day.getTime() === today.getTime() ? 'Today' : days[day.getDay()]) + ` @ ` + CLASS.startT + ` - ` + CLASS.endT + ` EST</div>
                    </div>
                    <div></div>
                </div>`);
            });
        }

        refreshDash();
        $('main.dash').css('display', 'grid');
        $('body').on('click', '.class', function() {
            openClass(CLASS_DATA[$(this).attr('id')]);
        });

    });

    function openClass(class_inf) {
        if (!class_inf.link)
            return 'No Class Page';
        transitionToClass('dash', 'course', class_inf.link);
        $(`
        <main class="course">
            <section class="header">
                <div class="fixer">
                    <div class="title">` + class_inf.subj + ` ` + class_inf.code + class_inf.section + `</div>
                    <div class="subtitle">` + class_inf.title + `</div>
                </div>
            </section>
            <section id="dash-content" class="content_wrapper">
                <div class="left_panel">
                    <div class="fixer">
                        <div class="toc_wrapper"><div class="title"><div>View Grades</div><svg class="grades_icon" fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"	 viewBox="0 0 463 463" style="enable-background:new 0 0 463 463;" xml:space="preserve"><g>	<path d="M367.5,32h-57.734c-3.138-9.29-11.93-16-22.266-16h-24.416c-7.41-9.965-19.148-16-31.584-16		c-12.435,0-24.174,6.035-31.585,16H175.5c-10.336,0-19.128,6.71-22.266,16H95.5C78.131,32,64,46.131,64,63.5v368		c0,17.369,14.131,31.5,31.5,31.5h272c17.369,0,31.5-14.131,31.5-31.5v-368C399,46.131,384.869,32,367.5,32z M175.5,87h112		c7.023,0,13.332-3.101,17.641-8H352v337H111V79h46.859C162.168,83.899,168.477,87,175.5,87z M175.5,31h28.438		c2.67,0,5.139-1.419,6.482-3.727C214.893,19.588,222.773,15,231.5,15c8.728,0,16.607,4.588,21.079,12.272		c1.343,2.308,3.813,3.728,6.482,3.728H287.5c4.687,0,8.5,3.813,8.5,8.5v24c0,4.687-3.813,8.5-8.5,8.5h-112		c-4.687,0-8.5-3.813-8.5-8.5v-24C167,34.813,170.813,31,175.5,31z M384,431.5c0,9.098-7.402,16.5-16.5,16.5h-272		c-9.098,0-16.5-7.402-16.5-16.5v-368C79,54.402,86.402,47,95.5,47H152v16.5c0,0.168,0.009,0.333,0.013,0.5H103.5		c-4.143,0-7.5,3.358-7.5,7.5v352c0,4.142,3.357,7.5,7.5,7.5h256c4.143,0,7.5-3.358,7.5-7.5v-352c0-4.142-3.357-7.5-7.5-7.5h-48.513		c0.004-0.167,0.013-0.332,0.013-0.5V47h56.5c9.098,0,16.5,7.402,16.5,16.5V431.5z"/>	<path d="M231.5,47c1.979,0,3.91-0.8,5.3-2.2c1.4-1.39,2.2-3.33,2.2-5.3c0-1.97-0.8-3.91-2.2-5.3c-1.39-1.4-3.32-2.2-5.3-2.2		c-1.98,0-3.91,0.8-5.3,2.2c-1.4,1.39-2.2,3.32-2.2,5.3s0.8,3.91,2.2,5.3C227.59,46.2,229.52,47,231.5,47z"/>	<path d="M183.5,159h136c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-136c-4.143,0-7.5,3.358-7.5,7.5S179.357,159,183.5,159z"/>	<path d="M183.5,239h136c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-136c-4.143,0-7.5,3.358-7.5,7.5S179.357,239,183.5,239z"/>	<path d="M183.5,319h24c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-24c-4.143,0-7.5,3.358-7.5,7.5S179.357,319,183.5,319z"/>	<path d="M183.5,199h136c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-136c-4.143,0-7.5,3.358-7.5,7.5S179.357,199,183.5,199z"/>	<path d="M183.5,279h32c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-32c-4.143,0-7.5,3.358-7.5,7.5S179.357,279,183.5,279z"/>	<path d="M183.5,359h32c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-32c-4.143,0-7.5,3.358-7.5,7.5S179.357,359,183.5,359z"/>	<path d="M143.5,159h8c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-8c-4.143,0-7.5,3.358-7.5,7.5S139.357,159,143.5,159z"/>	<path d="M143.5,239h8c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-8c-4.143,0-7.5,3.358-7.5,7.5S139.357,239,143.5,239z"/>	<path d="M143.5,319h8c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-8c-4.143,0-7.5,3.358-7.5,7.5S139.357,319,143.5,319z"/>	<path d="M143.5,199h8c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-8c-4.143,0-7.5,3.358-7.5,7.5S139.357,199,143.5,199z"/>	<path d="M143.5,279h8c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-8c-4.143,0-7.5,3.358-7.5,7.5S139.357,279,143.5,279z"/>	<path d="M143.5,359h8c4.143,0,7.5-3.358,7.5-7.5s-3.357-7.5-7.5-7.5h-8c-4.143,0-7.5,3.358-7.5,7.5S139.357,359,143.5,359z"/>	<path d="M279.5,264c-26.191,0-47.5,21.309-47.5,47.5s21.309,47.5,47.5,47.5c10.583,0,20.367-3.482,28.272-9.357		c0.074-0.052,0.155-0.088,0.228-0.143c0.2-0.15,0.389-0.309,0.57-0.474C319.771,340.329,327,326.747,327,311.5		C327,285.309,305.691,264,279.5,264z M272,279.883V304h-24.117C250.708,292.094,260.094,282.708,272,279.883z M247.883,319h27.867		l16.719,22.292c-3.976,1.737-8.36,2.708-12.969,2.708C264.161,344,251.279,333.315,247.883,319z M304.463,332.284L287,309v-29.117		c14.315,3.396,25,16.278,25,31.617C312,319.398,309.165,326.646,304.463,332.284z"/></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div></div>
                        <div class="toc_wrapper">
                            <div class="title"><div>Table of Contents</div><svg version="1.1" id="Layer_1" class="chevron_small" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#ffffff" viewBox="0 0 404.257 404.257" style="enable-background:new 0 0 404.257 404.257;" xml:space="preserve"><polygon points="386.257,114.331 202.128,252.427 18,114.331 0,138.331 202.128,289.927 404.257,138.331 "/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>
                        </div>
                    </div>
                </div>
                <div class="middle_panel"></div>
                <div class="right_panel">
                    <div class="fixer">
                        <div class="toc_wrapper">
                            <div class="title"><div>Latest Announcements</div><svg version="1.1" id="Layer_1" class="chevron_small" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#ffffff" viewBox="0 0 404.257 404.257" style="enable-background:new 0 0 404.257 404.257;" xml:space="preserve"><polygon points="386.257,114.331 202.128,252.427 18,114.331 0,138.331 202.128,289.927 404.257,138.331 "/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>
                        </div>
                        <div class="toc_wrapper">
                            <div class="title"><div>Forums</div><svg version="1.1" id="Layer_1" class="chevron_small" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#ffffff" viewBox="0 0 404.257 404.257" style="enable-background:new 0 0 404.257 404.257;" xml:space="preserve"><polygon points="386.257,114.331 202.128,252.427 18,114.331 0,138.331 202.128,289.927 404.257,138.331 "/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>
                            <div class="content col1">None</div>
                        </div>
                        <div class="toc_wrapper">
                            <div class="title"><div>Quizzes</div><svg version="1.1" id="Layer_1" class="chevron_small" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#ffffff" viewBox="0 0 404.257 404.257" style="enable-background:new 0 0 404.257 404.257;" xml:space="preserve"><polygon points="386.257,114.331 202.128,252.427 18,114.331 0,138.331 202.128,289.927 404.257,138.331 "/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>
                            <div class="content col1">None</div>
                        </div>
                        <div class="toc_wrapper">
                            <div class="title"><div>Dropboxes / Assignments</div><svg version="1.1" id="Layer_1" class="chevron_small" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" fill="#ffffff" viewBox="0 0 404.257 404.257" style="enable-background:new 0 0 404.257 404.257;" xml:space="preserve"><polygon points="386.257,114.331 202.128,252.427 18,114.331 0,138.331 202.128,289.927 404.257,138.331 "/><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g><g></g></svg></div>
                            <div class="content col1">None</div>
                        </div>
                    </div>
                </div>
            </section>
        </main>             
    `).appendTo('#inner-page');
    }


    function transitionToClass(out, inp, url) {
        $('main.' + out).fadeOut(400, async function() {
            $(this).remove();
            const DAT = $(await requestHandler(url));
            const ANNOUNCEMENTS = DAT.find('a:contains("Announcements")').attr('href');

            let col_colour = 1;
            for (section of DAT.find('.section.main').toArray()) {
                const TITLE = $(section).attr('aria-label');
                $('#course-toc').append('<div class="content col' + col_colour + '">' + TITLE + '</div>');
                col_colour = col_colour == 1 ? 2 : 1;
                $('.middle_panel').append('<div id="' + TITLE + '" class="category"><div class="title">' + TITLE + '</div><div class="content"></div></div>');
                $('div[id*="' + TITLE + '"] > .content').append('<div class="item text">' + $(section).find('.summary').html() + '</div>');
            }

            $('body').on('click', '#course-toc > .content', function() {
                $('main.course').animate({
                    scrollTop: $('div[id*="' + TITLE + '"]').offset().top
                }, 2000);
            });



            $('main.' + inp).fadeIn(200);
            $('main.' + inp).css('display', 'grid');
        });
    }