const blocos = document.querySelectorAll('.bloco');
const jogadorP = document.querySelector('.jogadorvez')
const resultadoX = document.querySelector('.resultado-x')
const resultadoO = document.querySelector('.resultado-o')
const reinicarBtn = document.querySelector('.reset')

let ganhador = null
let jogadorAtual
let jogadas = 0
let vitoriasX = 0
let vitoriasO = 0

quemComeca()
reinicarBtn.disabled = true

function quemComeca() {
    jogadorAtual = Math.random() < 0.5 ? 'X' : 'O';
    jogadorP.textContent = `Vez do "${jogadorAtual}"`
}

blocos.forEach((bloco) => {
    bloco.addEventListener('click', () => {
        if (bloco.textContent == '' && ganhador == null) {
            bloco.textContent = jogadorAtual
            jogadas++

            reinicarBtn.disabled = false

            if (checkGanhador()) {
                jogadorP.textContent = `"${ganhador}" ganhou a partida`

                if (ganhador == "X") {
                    vitoriasX++
                } else {
                    vitoriasO++
                }

                resultadoX.textContent = vitoriasX
                resultadoO.textContent = vitoriasO

            } else if (jogadas === 9) {
                jogadorP.textContent = 'Empate!'
            } else {
                jogadorAtual = jogadorAtual === 'X' ? 'O' : 'X'
                jogadorP.textContent = `Vez do "${jogadorAtual}"`
            }
        }
    })
})

function checkGanhador() {
    const combinacoesVitoria = [
        ['a1', 'a2', 'a3'],
        ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3'],

        ['a1', 'b1', 'c1'],
        ['a2', 'b2', 'c2'],
        ['a3', 'b3', 'c3'],

        ['a1', 'b2', 'c3'],
        ['a3', 'b2', 'c1']
    ]; 

    for (const combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao
        const blocoA = document.querySelector(`.${a}`)
        const blocoB = document.querySelector(`.${b}`)
        const blocoC = document.querySelector(`.${c}`)

        if (
            blocoA.textContent !== '' &&
            blocoA.textContent === blocoB.textContent &&
            blocoA.textContent === blocoC.textContent
        ) {
            ganhador = jogadorAtual
            return true
        }
    }
    return false
}

reinicarBtn.addEventListener('click', () => {
    ganhador = null
    jogadas = 0
    quemComeca()
    reinicarBtn.disabled = true

    blocos.forEach((bloco) => {
        bloco.textContent = ''
    })
})