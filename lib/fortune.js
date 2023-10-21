const fortuneCookies = [
    'Не бійся невідомого',
    'Тебе чекає сюрприз',
    'Подивись на небо',
    'Перейди річку',
    'Попий кваску',
    'Відкрий книгу'
]

exports.getFortune = () => {
    const idx = Math.floor(Math.random()*fortuneCookies.length)
    return fortuneCookies[idx]
}