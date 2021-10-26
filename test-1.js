! function (n) {
    var o = {};

    function i(t) {
        if (o[t]) return o[t].exports;
        var e = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return n[t].call(e.exports, e, e.exports, i), e.l = !0, e.exports
    }
    i.m = n, i.c = o, i.d = function (t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, {
            enumerable: !0,
            get: n
        })
    }, i.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(t, "__esModule", {
            value: !0
        })
    }, i.t = function (e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
                enumerable: !0,
                value: e
            }), 2 & t && "string" != typeof e)
            for (var o in e) i.d(n, o, function (t) {
                return e[t]
            }.bind(null, o));
        return n
    }, i.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return i.d(e, "a", e), e
    }, i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, i.p = "", i(i.s = 0)
}([function (t, e) {
    document.addEventListener("DOMContentLoaded", function () {
        document.querySelector("#quiz-start-btn").addEventListener("click", function () {
            document.querySelector("#quiz-header").style.display = "none"
        })
    })
}]);
let sum = 0;
! function (b, m) {
    "use strict";
    b.quiz = function (t, e) {
        var i = this;
        i.$el = b(t), i.$el.data("quiz", i), i.options = b.extend(b.quiz.defaultOptions, e);
        var s = i.options.questions,
            n = s.length,
            o = i.options.startScreen,
            r = i.options.startButton,
            u = i.options.homeButton,
            a = i.options.resultsScreen,
            l = i.options.gameOverScreen,
            c = i.options.nextButtonText,
            d = i.options.finishButtonText,
            p = i.options.restartButtonText,
            h = 1,
            f = 0,
            q = !1;
        i.methods = {
            init: function () {
                i.methods.setup(), b(m).on("click", r, function (t) {
                    t.preventDefault(), i.methods.start()
                }), b(m).on("click", u, function (t) {
                    t.preventDefault(), i.methods.home()
                }), b(m).on("click", ".answers a", function (t) {
                    t.preventDefault(), i.methods.answerQuestion(this)
                }), b(m).on("click", "#quiz-next-btn", function (t) {
                    t.preventDefault(), i.methods.nextQuestion()
                }), b(m).on("click", "#quiz-finish-btn", function (t) {
                    t.preventDefault(), i.methods.finish()
                }), b(m).on("click", "#quiz-restart-btn, #quiz-retry-btn", function (t) {
                    t.preventDefault(), i.methods.restart()
                })
            },
            setup: function () {
                var n = "";
                i.options.counter && (n += '<div id="quiz-counter"></div>'), n +=
                    '<div id="questions">', b.each(s, function (t, e) {
                        n += '<div class="question-container">', n += '<p class="question">' + e.q +
                            "</p>", n += '<ul class="answers">', b.each(e.options, function (t, e) {
                                n += '<li><a href="#" data-index="' + t + '" data-value=" ">' +
                                    e + "</a></li>"
                            }), n += "</ul>", n += "</div>"
                    }), n += "</div>", 0 === b(a).length && (n += '<div id="' + a.substr(1) + '">', n +=
                        '<p id="quiz-results"></p>', n += "</div>"), n += '<div id="quiz-controls">',
                    n += '<div id="quiz-buttons">', n += '<a href="#" id="quiz-next-btn">' + c + "</a>",
                    n += '<a href="#" id="quiz-finish-btn">' + d + "</a>", n +=
                    '<a href="#" id="quiz-restart-btn">' + p + "</a>", n += "</div>", i.$el.append(n +=
                        "</div>").addClass("quiz-container quiz-start-state"), b("#quiz-counter")
                    .hide(), b(".question-container").hide(), b(l).hide(), b(a).hide(), b(
                        "#quiz-controls")
                    .hide(), "function" == typeof i.options.setupCallback && i.options.setupCallback()
            },
            start: function () {
                i.$el.removeClass("quiz-start-state").addClass("quiz-questions-state"), b(o).hide(), b(
                        "#quiz-controls").hide(), b("#quiz-finish-btn").hide(), b("#quiz-restart-btn")
                    .hide(), b("#questions").show(), b("#quiz-counter").show(), b(
                        ".question-container:first-child").show().addClass("active-question"), i.methods
                    .updateCounter()
            },
            answerQuestion: function (t) {
                //if (!q) {
                q = !0;
                $('a.correct').removeClass('correct');
                var e = b(t),
                    n = "",
                    o = e.data("index");
                if (o === s[t = h - 1].correctIndex) e.addClass("correct"), n = s[t].correctResponse,
                    f++;
                else if (e.addClass("correct"), n = s[t].incorrectResponse, !i.options.allowIncorrect)
                    return void i.methods.gameOver(n);
                b("#quiz-response").html(n), b("#quiz-controls").fadeIn(), sum += parseInt(s[t].value[
                    o]), "function" == typeof i.options.answerCallback && i.options.answerCallback(
                    h, o, s[t], sum)
                //}
            },
            nextQuestion: function () {
                q = !1, b(".active-question").hide().removeClass("active-question").next(
                        ".question-container").show().addClass("active-question"), b("#quiz-controls")
                    .hide(), ++h === n && (b("#quiz-next-btn").hide(), b("#quiz-finish-btn").show()), i
                    .methods.updateCounter(), "function" == typeof i.options.nextCallback && i.options
                    .nextCallback()
            },
            gameOver: function (t) {
                var e;
                0 === b(l).length && (e = "", e += '<div id="' + l.substr(1) + '">', e +=
                        '<p id="quiz-gameover-response"></p>', e +=
                        '<p><a href="#" id="quiz-retry-btn">' + p + "</a></p>", i.$el.append(e +=
                            "</div>")), b("#quiz-gameover-response").html(t), b("#quiz-counter").hide(),
                    b("#questions").hide(), b("#quiz-finish-btn").hide(), b(l).show()
            },
            finish: function () {
                i.$el.removeClass("quiz-questions-state").addClass("quiz-results-state"), b(
                        ".active-question").hide().removeClass("active-question"), b("#quiz-counter")
                    .hide(), b("#quiz-response").hide(), b("#quiz-finish-btn").hide(), b(
                        "#quiz-next-btn").hide(), b("#quiz-restart-btn").show(), b(a).show();
                var t = i.options.resultsFormat.replace("%score", f).replace("%total", n).replace(
                    "%value", sum);
                b("#quiz-results").html(t), "function" == typeof i.options.finishCallback && i.options
                    .finishCallback()
            },
            restart: function () {
                i.methods.reset(), i.$el.addClass("quiz-questions-state"), b("#questions").show(), b(
                    "#quiz-counter").show(), b(".question-container:first-child").show().addClass(
                    "active-question"), i.methods.updateCounter()
            },
            reset: function () {
                q = !1, h = 1, f = 0, sum = 0, b(".answers a").removeClass("correct incorrect"), i.$el
                    .removeClass().addClass("quiz-container"), b("#quiz-restart-btn").hide(), b(l)
                    .hide(), b(a).hide(), b("#quiz-controls").hide(), b("#quiz-response").show(), b(
                        "#quiz-next-btn").show(), b("#quiz-counter").hide(), b(".active-question")
                    .hide().removeClass("active-question"), "function" == typeof i.options
                    .resetCallback && i.options.resetCallback()
            },
            home: function () {
                i.methods.reset(), i.$el.addClass("quiz-start-state"), b(o).show(), "function" ==
                    typeof i.options.homeCallback && i.options.homeCallback()
            },
            updateCounter: function () {
                var t = i.options.counterFormat.replace("%current", h).replace("%total", n);
                b("#quiz-counter").html(t)
            }
        }, i.methods.init()
    }, b.quiz.defaultOptions = {
        allowIncorrect: !0,
        counter: !0,
        counterFormat: "%current/%total",
        startScreen: "#quiz-start-screen",
        startButton: "#quiz-start-btn",
        homeButton: "#quiz-home-btn",
        resultsScreen: "#quiz-results-screen",
        resultsFormat: "You got %score out of %total correct!",
        gameOverScreen: "#quiz-gameover-screen",
        nextButtonText: "Next",
        finishButtonText: "Finish",
        restartButtonText: "Restart"
    }, b.fn.quiz = function (t) {
        return this.each(function () {
            new b.quiz(this, t)
        })
    }
}(jQuery, (window, document)), $("#quiz").quiz({
    counterFormat: "Вопрос %current из %total",
    resultsFormat: 'Вы приняты на должность Галактического Коуча <br>Умеете вдохновлять окружающих на подвиги! <span class="win-number">%score</span> <br>валуе= %value <a href="#">Перейти на партнерский материал </a>',
    nextButtonText: "Далее",
    finishButtonText: "Узнать результат",
    restartButtonText: "Пройти еще раз",
    finishCallback: function () {
        let t = document.querySelector("#quiz-results");
        var e = sum;
        console.log(sum), t.innerHTML = e <= 1 ?
            '<div><h2>Поздравляем! Благодаря вашим управленческим навыкам и ставке на цифровую трансформацию вам удалось масштабировать свои проекты и вывести на рынок новые решения. Теперь узнаем, насколько глубоко вы разобрались в теме использования данных для бизнеса</h2><h4>Ваш результат:</h4> <p>Аналоговый консерватор — вы предпочитаете традиционные решения и с опаской смотрите на передовые идеи. Вам есть, куда расти.</p></div> ' :
            2 <= e && e <= 4 ?
            '<div><h2>Поздравляем! Благодаря вашим управленческим навыкам и ставке на цифровую трансформацию вам удалось масштабировать свои проекты и вывести на рынок новые решения. Теперь узнаем, насколько глубоко вы разобрались в теме использования данных для бизнеса</h2><h4>Ваш результат:</h4> <p>Цифровой разведчик — вы не любите делать ставку на ITтехнологии, но с интересом смотрите на их возможности. Будьте в тренде, и у вас получится найти точки роста.</p></div> </div>' :
            5 <= e && e <= 6 ?
            ' <div><h2>Поздравляем! Благодаря вашим управленческим навыкам и ставке на цифровую трансформацию вам удалось масштабировать свои проекты и вывести на рынок новые решения. Теперь узнаем, насколько глубоко вы разобрались в теме использования данных для бизнеса</h2><h4>Ваш результат:</h4><p>Опытный цифровизатор — вы отлично разбираетесь в цифровых решениях и знаете, как провести IT-трансформацию вашего бизнеса. У вас большие перспективы.</p></div> </div>' :
            '<div><h2>Поздравляем! Благодаря вашим управленческим навыкам и ставке на цифровую трансформацию вам удалось масштабировать свои проекты и вывести на рынок новые решения. Теперь узнаем, насколько глубоко вы разобрались в теме использования данных для бизнеса</h2><h4>Ваш результат:</h4> <p>Цифровой спецназ — вы настолько хорошо разбираетесь в IT-технологиях, что даже конкуренты стоят в очереди, чтобы проконсультироваться с вами.</p></div> </div>'
    },
    questions: [{
        q: "Ваша компания занимается разработкой игр. Вы начинаете работу над проектом, который соберет большую фан-базу и взорвет рынок. Где компания будет хранить технические данные проекта?",
        options: [
            "1.\tБюджет нужно направить в разработку, поэтому данные будут храниться на серверном компьютере в компании, а доступ к файлам обеспечим через небольшую локальную сеть. С этим справится штатный сисадмин.",
            "2.\tВложимся в собственную профессиональную СХД с поддержкой вендора. Потенциально предусмотрим возможность масштабирования.",
            "3.\tБудем хранить основные массивы данных в облаке и обеспечивать работу сотрудников через него."
        ],
        value: ["0", "1", "0"]
    }, {
        q: "Вы подбираете СХД и ведете переговоры с интегратором, который обеспечит запуск оборудования. Перед встречей вы решили изучить тему, но споткнулись о сложные термины. Горячие, холодные данные… Это вообще о чем?",
        options: [
            "1.\tЗдесь все просто: горячие данные – это те, обработка которых требует больших вычислительных мощностей и в прямом смысле слова нагревает оборудование, верно?",
            "2.\tПохоже, что это градация данных по степени важности для компании: горячие данные крайне важны, а, например, потеря ледяных не принесет существенных проблем.",
            "3.\tЗдесь нет ничего сложного. Горячие данные – это та информация, к которой сотрудники компании обращаются чаще всего, а холодные — те данные, к которым компания обращается не так часто, но их тоже нужно хранить. "
        ],
        value: ["0", "0", "1"]
    }, {
        q: "Релиз вашего проекта прошел отлично: продажи растут, а прибыль превысила все ожидания. Но рынок нестабилен, и вы решили диверсифицировать активы, выкупив локальную сеть продуктовых магазинов. Вам нужно мощное конкурентное преимущество. Какие идеи?",
        options: [
            "1. Запущу сеть с фермерскими продуктами, а во время маркетинговой компании сделаю упор на идеи здорового питания и заботы об экологии.",
            "2. Разверну нейросеть, которая будет анализировать покупки покупателей, и каждый будет получать максимально точные персональные акции.",
            "3.\tПойду в узкий и потенциально высокомаржинальный сегмент. Например, буду продавать премиальные продукты питания."
        ],
        value: ["0", "1", "0"]
    }, {
        q: "Ваше IT-решение здорово себя показало: поток покупателей сильно растет, нужно хранить все больше данных о клиентских предпочтениях. Настал момент нарастить вашу IT-инфраструктуру и сделать это нужно не переплатив. Как поступите?",
        options: [
            "1. Я уже неплохо разбираюсь в теме и знаю, как сэкономить на СХД. Закуплю систему хранения данных на HDD-накопителях.",
            "2. Думаю, нужно закупить больше СХД той модели, которую я уже использую. Это проверенное решение.  ",
            "3.\tВсегда можно сэкономить, закупив б/у СХД, проверенный способ не заплатить больше."
        ],
        value: ["0", "1", "0"]
    }, {
        q: "Ваши успехи в работе с цифровыми технологиями заметили в местном правительстве, и теперь вы входите в совет по цифровому развитию вашего города. Заседание длится уже 4 ч, но все предложения выглядят слабовато. Настала ваша очередь. Что предложите?",
        options: [
            "1. Внедрим интеллектуальное управление дорожным движением: реально развернуть IT-систему, которая позволит регулировать потоки транспорта. Это разгрузит дороги и сделает жизнь горожан комфортнее.",
            "2. Запустим в городе систему распознавания лиц, благодаря которой сможем ловить нарушителей порядка.",
            "3. Обяжем предприятия устанавливать датчики контроля выбросов вредных веществ и с помощью IoT подключим их к единой системе. Так мы позаботимся об экологии города, разве нет?"
        ],
        value: ["1", "0", "0"]
    }, {
        q: "Ваша идея внедрить интеллектуальное дорожное управление понравилась совету, но перед началом работы над проектом нужно определиться, хранение какого типа данных предполагает развитие этой системы.",
        options: ["1. Структурированные.", "2. Неструктурированные.",
            "3. Нужно сконцентрироваться на обоих типах данных, ведь система будет решать самые разные задачи."
        ],
        value: ["0", "0", "1"]
    }, {
        q: "Вы отправляетесь за крупным кредитом на развитие бизнеса в банк. На встрече его топ-менеджер берет со стола документ – проект цифровой трансформации банка: «Я слышал, вы в этом большой специалист, а мы собираемся наращивать IT-инфраструктуру. Посоветуйте, на что обратить особое внимание». Что ответите?",
        options: [
            "1.\t«Я обычно доверяю все вопросы по цифровизации своим профильным сотрудникам, так что воздержусь от советов». ",
            "2.\t«Банк — субъект критической информационной инфраструктуры. Я бы сосредоточился на максимально надежных решениях, которые позволят обеспечить безотказную работу ваших IT-систем в любых условиях».",
            "3.\tСконцентрируйтесь на традиционных финансовых продуктах: широкое внедрение цифровых сервисов – хайп, который скоро пройдет»"
        ],
        value: ["0", "1", "0"]
    }]
});




const links = document.querySelectorAll('.share a');

function onClick(event) {
    event.preventDefault();

    window.open(
        event.currentTarget.href,
        'Поделиться',
        'width=600,height=500,location=no,menubar=no,toolbar=no'
    );
}

links.forEach((link) => {
    const url = encodeURIComponent(window.location.origin + window.location.pathname);
    const title = encodeURIComponent(document.title);

    link.href = link.href
        .replace('{url}', url)
        .replace('{title}', title);

    link.addEventListener('click', onClick);
});