// Created by Ahmed A. Moussa, GNU GPLv3 License
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
$(function() {
    $('#page-wrapper').hide();
    var head = document.getElementsByTagName('HEAD')[0];
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = '';
    head.appendChild(link);
    $('body').append(`
    <header>
        <div>
            <img src="https://culearn.carleton.ca/moodle/theme/image.php/culearn/theme/1598793484/logos/cu-shield-svg" />
            <div>CULearn</div>
        </div>
        <div>
            <svg id="revert" class="header-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" width="533.333px" height="533.333px" viewBox="0 0 533.333 533.333" style="enable-background:new 0 0 533.333 533.333;" xml:space="preserve"><g>	<path d="M416.667,333.333v-66.666H250V200h166.667v-66.667l100,100L416.667,333.333z M383.333,300v133.333H216.667v100l-200-100V0   h366.667v166.667H350V33.333H83.333L216.667,100v300H350V300H383.333z"/></g></svg>
        </div>
    </header>
    <main>
        <section class="lft">
            <div id='courses' class="section-wrapper courses">
                <div id='courses-header' class="section-header">
                    <div>Your Courses</div>
                </div>
                <div id="courses-search">
                    <div class="search">
                        <svg class="search-icon" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M15.804 14.864l-3.846-3.847A6.745 6.745 0 006.743 0a6.743 6.743 0 100 13.486 6.707 6.707 0 004.27-1.525l3.847 3.843a.666.666 0 00.944-.94zm-9.061-2.72a5.408 5.408 0 01-5.404-5.401 5.41 5.41 0 015.404-5.404 5.413 5.413 0 015.404 5.404 5.41 5.41 0 01-5.404 5.4z" fill-rule="nonzero"></path></svg>
                        <input class="search-input" data-search="integration" placeholder="Search">
                        <svg class="search-clear" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm4 10.88L10.88 12 8 9.12 5.12 12 4 10.88 6.88 8 4 5.12 5.12 4 8 6.88 10.88 4 12 5.12 9.12 8 12 10.88z" fill-rule="nonzero"></path></svg>
                    </div>
                </div>
                <div id='courses-container' class="section-inner">
                    <ul class="list">
                        <li class="list-element group"><div>Fall 2020</div><svg class="arrow" viewBox="0 0 6 5" xmlns="http://www.w3.org/2000/svg"><path d="M3 5l3-5H0z" fill="#FFF" fill-rule="evenodd"></path></svg></li>
                        <li class="list-element course"><div>ECOR 2050</div><div>Section A</div><div></div></li>
                        <li class="list-element course"><div>MAAE 2202</div><div>Section A</div><div></div></li>
                        <li class="list-element course"><div>MAAE 2202 - Lab</div><div>Section L1</div><div></div></li>
                        <li class="list-element course"><div>MAAE 2300</div><div>Section A</div><div></div></li>
                        <li class="list-element course"><div>MATH 1005</div><div>Section E</div><div></div></li>
                        <li class="list-element course"><div>COOP 1000</div><div>Section C</div><div></div></li>
                        <li class="list-element course"><div>COMP 1805</div><div>Sections A & B</div><div></div></li>
                    </ul>
                </div>
            </div>
        </section>
        <section class="rgt">
            <div id='pinned' class="section-wrapper pinned">
                <div class="section-header">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 193.826 193.826" style="enable-background:new 0 0 193.826 193.826;" xml:space="preserve"><path d="M191.495,55.511L137.449,1.465c-1.951-1.953-5.119-1.953-7.07,0l-0.229,0.229c-3.314,3.313-5.14,7.72-5.14,12.406  c0,3.019,0.767,5.916,2.192,8.485l-56.55,48.533c-4.328-3.868-9.852-5.985-15.703-5.985c-6.305,0-12.232,2.455-16.689,6.913  l-0.339,0.339c-1.953,1.952-1.953,5.118,0,7.07l32.378,32.378l-31.534,31.533c-0.631,0.649-15.557,16.03-25.37,28.27  c-9.345,11.653-11.193,13.788-11.289,13.898c-1.735,1.976-1.639,4.956,0.218,6.822c0.973,0.977,2.256,1.471,3.543,1.471  c1.173,0,2.349-0.41,3.295-1.237c0.083-0.072,2.169-1.885,13.898-11.289c12.238-9.813,27.619-24.74,28.318-25.421l31.483-31.483  l30.644,30.644c0.976,0.977,2.256,1.465,3.535,1.465s2.56-0.488,3.535-1.465l0.339-0.339c4.458-4.457,6.913-10.385,6.913-16.689  c0-5.851-2.118-11.375-5.985-15.703l48.533-56.55c2.569,1.425,5.466,2.192,8.485,2.192c4.687,0,9.093-1.825,12.406-5.14l0.229-0.229  C193.448,60.629,193.448,57.463,191.495,55.511z"/></svg>
                    <div>Pinned Content</div>
                </div>
                <div class="section-inner"></div>
            </div>
            <div id='deadlines' class="section-wrapper deadlines">
                <div class="section-header">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M4630.7,4996.6c-1119.9-80.9-2169.3-549.6-3023.8-1348.1C1069.7,3148.7,594.8,2393.8,352.2,1665.8C-170.5,97.9,130.2-1638,1152.7-2934.2c147.3-188.7,616-657.4,804.7-804.7c725.9-572.4,1642.6-941.6,2569.6-1034.9c333.9-33.2,941.6-12.5,1265.1,41.5c987.2,165.9,1872.8,609.7,2606.9,1306.6c620.1,586.9,1128.2,1453.8,1341.8,2289.6c392,1528.5,51.8,3102.6-933.3,4328.3c-203.3,253-595.2,632.5-850.3,823.4C6997.1,4737.3,5819.1,5083.7,4630.7,4996.6z M5404.3,4102.7c1393.7-151.4,2592.4-987.2,3198-2227.4c557.9-1144.8,551.7-2449.3-18.7-3577.5c-192.9-379.5-389.9-655.4-707.2-983.1c-410.6-425.2-881.4-740.4-1420.6-954c-744.5-292.4-1671.6-348.4-2445.2-147.2c-966.5,250.9-1798.1,840-2345.6,1659.2C1208.7-1443,988.9-721.3,988.9,102.1c0,949.9,296.6,1796,889.7,2532.3c159.7,197,510.2,537.2,709.3,684.4C3394.6,3922.3,4427.5,4210.5,5404.3,4102.7z"/><path d="M4332.1,2868.7c-41.5-51.9-43.6-80.9-43.6-518.5v-462.5l197-1124.1c109.9-618,207.4-1140.7,219.8-1163.5c31.1-60.2,105.8-78.8,309-78.8c302.8,0,261.3-103.7,489.4,1205l194.9,1107.5v504c0,474.9-2.1,504-41.5,543.4c-39.4,39.4-68.4,41.5-661.6,41.5h-622.2L4332.1,2868.7z"/><path d="M4792.5-1233.6c-215.7-70.5-383.7-219.8-481.1-425.2c-45.6-97.5-53.9-145.2-53.9-302.8c0-159.7,8.3-203.2,56-304.9c232.3-497.8,858.6-599.4,1231.9-199.1c141,151.4,203.2,302.8,201.2,493.6c-2.1,300.7-161.8,553.8-433.4,686.5C5155.4-1206.6,4937.6-1185.9,4792.5-1233.6z"/></g></g></svg>
                    <div>Upcoming Deadlines</div>
                </div>
                    <div class="section-inner"></div>
            </div>
        </section>
    </main>
    `);

});

$(document).ready(function () {
    $(document).on('click', '#revert', function () {
        $('main, header').hide();
        $('#page-wrapper').show();
    });
});