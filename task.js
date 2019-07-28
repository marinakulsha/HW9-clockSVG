(function() {

    // создать svg tag
    const svg_container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg_container.setAttribute("width", "500");
    svg_container.setAttribute("height", "500");
    svg_container.id = "containerClock";
    var section = document.getElementById("section");
    section.appendChild(svg_container);

    //создать границу часов
    const clock_frame = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    clock_frame.setAttribute("cx", "250");
    clock_frame.setAttribute("cy", "250");
    clock_frame.setAttribute("r", "249");
    clock_frame.setAttribute("style", "fill:#fffb02;stroke:rgb(240, 216, 5); stroke-width:0.7%");
    svg_container.appendChild(clock_frame);


    // создать зеленые кружки
    for (let i = 0; i < 12; i++) {
        const radian = (2 * Math.PI) / 12 * (i - 2);
        const green_circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        green_circle.setAttribute("cx", (Math.cos(radian) * 205 + 250).toString()); //centerX + radius * Math.cos(radian);Полный круг - 2pi радианов
        green_circle.setAttribute("cy", (Math.sin(radian) * 205 + 250).toString()); //centerY + radius * Math.sin(radian);
        green_circle.setAttribute("r", "5.5%");
        green_circle.setAttribute("style", "fill:rgb(24, 170, 24);stroke:none;");
        green_circle.setAttribute("id", "green");
        svg_container.appendChild(green_circle);


        //надпись у кружков
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute("x", (Math.cos(radian) * 206 + 249).toString());
        text.setAttribute("y", (Math.sin(radian) * 206 + 255).toString());
        text.setAttribute("width", "50");
        text.setAttribute("height", "50");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("stroke", "black");
        text.setAttribute("stroke-width", "1px");
        text.textContent = `${i + 1}`;
        svg_container.appendChild(text);
    };


    //сгрупируем все стрелки
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.id = "hands";
    svg_container.appendChild(group);

    // часовая стрелка
    const hour_hand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    hour_hand.setAttribute("x1", "250");
    hour_hand.setAttribute("y1", "250");
    hour_hand.setAttribute("x2", "250");
    hour_hand.setAttribute("y2", "90");
    hour_hand.id = "hour";
    hour_hand.setAttribute("style", "stroke:black; stroke-width:1.1%;stroke-linecap:round");
    group.appendChild(hour_hand);

    //минутная стрелка
    const minute_hand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    minute_hand.setAttribute("x1", "250");
    minute_hand.setAttribute("y1", "250");
    minute_hand.setAttribute("x2", "250");
    minute_hand.setAttribute("y2", "50");
    minute_hand.id = "min";
    minute_hand.setAttribute("style", "stroke:black; stroke-width:0.8%;stroke-linecap:round");
    group.appendChild(minute_hand);

    // секундная стрелка
    const sec_hand = document.createElementNS("http://www.w3.org/2000/svg", "line");
    sec_hand.setAttribute("x1", "250");
    sec_hand.setAttribute("y1", "250");
    sec_hand.setAttribute("x2", "250");
    sec_hand.setAttribute("y2", "45");
    sec_hand.id = "sec";
    sec_hand.setAttribute("style", "stroke:red; stroke-width:0.6%;stroke-linecap:round");
    group.appendChild(sec_hand);

    //центр
    const clock_dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    clock_dot.setAttribute("cx", "250");
    clock_dot.setAttribute("cy", "250");
    clock_dot.setAttribute("r", "1.5%");
    clock_dot.setAttribute("style", "fill:red;stroke:red; stroke-width:0.6%");
    svg_container.appendChild(clock_dot);

    //электронные часы
    var section = document.getElementById("section");
    var spanTime = document.createElement('span');
    spanTime.id = "electClock";
    section.appendChild(spanTime);

    //функция поворота
    //минутная и секундная стрелка-каждый тик-поворот на 6 градусов; часовая стрелка-каждый тик-поворот на 30 градусов.

    setInterval(function() {

        function transformHands(element, deg) {
            element.setAttribute('transform', 'rotate(' + deg + ' 250 250)');
        }
        const date = new Date();
        const hour = document.getElementById('hour');
        const sec = document.getElementById('sec');
        const min = document.getElementById('min');

        transformHands(sec, 6 * date.getSeconds());
        transformHands(min, 6 * date.getMinutes());
        transformHands(hour, 30 * (date.getHours() % 12) + date.getMinutes() / 2);

        showTime();

        function showTime() {
            var timeNow = new Date();
            var hh = timeNow.getHours();
            var mm = timeNow.getMinutes();
            var ss = timeNow.getSeconds();
            var formatedTime = `${addZero(hh)}:${addZero(mm)}:${addZero(ss)}`;
            document.getElementById('electClock').innerHTML = formatedTime;
        };

        function addZero(num) {
            return (parseInt(num, 10) < 10 ? "0" : "") + num;
        };

    }, 1000);

}())