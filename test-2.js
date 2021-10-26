Question = [
    {
        id: 0,
        answers: ['Истина в вине', 'Пришел, увидел, победил', 'Великое начинается с малого', 'Помни о смерти']
    },
    {
        id: 1,
        answers: ['test1', 'test2', 'test3', 'test4']
    },
    {
        id: 2,
        answers: ['test5', 'test6', 'test7', 'test8']
    },
    {
        id: 3,
        answers: ['test1', 'test2', 'test3', 'test4']
    },
    {
        id: 4,
        answers: ['test1', 'test2', 'test3', 'test4']
    },
    {
        id: 5,
        answers: ['test1', 'test2', 'test3', 'test4']
    },
]

function nextQuestion(test) {
    let parent = test.closest('.test-2__quiz__btns')
    let testId = parent.getAttribute('data-index')
    testId++
    parent.setAttribute('data-index', testId)

    let testAnswers = document.querySelectorAll('.test-2__quiz__btns__el')
    
    if (testId < Question.length) {
        testAnswers.forEach((answer, i) => {
            answer.innerHTML = Question[testId].answers[i]
        })

        // console.log(document.querySelector('.el' + testId))
        document.querySelectorAll('.el' + testId).forEach(item => item.classList.add('active'))
    } else {
        document.querySelector('.test-2__quiz__btns').innerHTML = "<div style='width: 100%;' class='test-2__quiz__text'>Тест завершен!</div>"
    }
}