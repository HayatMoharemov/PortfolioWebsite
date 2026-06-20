var canvasDots = function() {

    var canvas = document.querySelector('canvas'),
        ctx = canvas.getContext('2d'),
        colorDot = '#595959',
        color = '#8f8f8f';

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.display = 'block';

    ctx.fillStyle = colorDot;
    ctx.lineWidth = .1;
    ctx.strokeStyle = color;

    var mousePosition = {
        x: canvas.width / 2,
        y: canvas.height / 2
    };

    // Брой точки според площта на екрана
    var area = canvas.width * canvas.height;

    var dots = {
        nb: Math.max(50, Math.floor(area / 5000)),
        distance: window.innerWidth < 768 ? 40 : 60,
        d_radius: window.innerWidth < 768 ? 70 : 100,
        array: []
    };

    function Dot() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;

        this.vx = -0.5 + Math.random();
        this.vy = -0.5 + Math.random();

        this.radius = Math.random();
    }

    Dot.prototype.create = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx.fill();
    };

    Dot.prototype.animate = function() {

        for (let i = 0; i < dots.nb; i++) {

            let dot = dots.array[i];

            if (dot.y < 0 || dot.y > canvas.height) {
                dot.vy = -dot.vy;
            }

            if (dot.x < 0 || dot.x > canvas.width) {
                dot.vx = -dot.vx;
            }

            dot.x += dot.vx;
            dot.y += dot.vy;
        }
    };

    Dot.prototype.line = function() {

        for (let i = 0; i < dots.nb; i++) {

            for (let j = i + 1; j < dots.nb; j++) {

                let i_dot = dots.array[i];
                let j_dot = dots.array[j];

                if (
                    Math.abs(i_dot.x - j_dot.x) < dots.distance &&
                    Math.abs(i_dot.y - j_dot.y) < dots.distance
                ) {

                    if (
                        Math.abs(i_dot.x - mousePosition.x) < dots.d_radius &&
                        Math.abs(i_dot.y - mousePosition.y) < dots.d_radius
                    ) {

                        ctx.beginPath();
                        ctx.moveTo(i_dot.x, i_dot.y);
                        ctx.lineTo(j_dot.x, j_dot.y);
                        ctx.stroke();
                        ctx.closePath();
                    }
                }
            }
        }
    };

    // Създаваме точките САМО ВЕДНЪЖ
    for (let i = 0; i < dots.nb; i++) {
        dots.array.push(new Dot());
    }

    function render() {

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < dots.nb; i++) {
            dots.array[i].create();
        }

        dots.array[0].line();
        dots.array[0].animate();
    }

    window.onmousemove = function(e) {
        mousePosition.x = e.clientX;
        mousePosition.y = e.clientY;
    };

    setInterval(render, 1000 / 30);
};

window.onload = function() {
    canvasDots();
};