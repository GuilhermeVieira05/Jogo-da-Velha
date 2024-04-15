const main = document.querySelector('main')
const root = document.querySelector(':root')
const input1 = document.getElementById('jogador1')
const input2 = document.getElementById('jogador2')
const start = document.getElementById('start')
const player = document.getElementById('player')
const buttons = document.querySelectorAll('.item')
const restart = document.querySelector('.restart')

let vBoard = []

function getWinRegions(){
    const winRegions = []
    if(vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        winRegions.push("0.0","0.1", "0.2")
    if(vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winRegions.push("1.0","1.1", "1.2")
    if(vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push("2.0","2.1", "2.2")
    if(vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0","1.0", "2.0")
    if(vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1","1.1", "2.1")
    if(vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2","1.2", "2.2")
    if(vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0","1.1", "2.2")
    if(vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2","1.1", "2.0")
    return winRegions
}

function handleWin(regions){
    regions.forEach(function(region){
        document.querySelector('[data-position="' + region + '"]').classList.add('win')
    })
    const playerName = player.innerText
    player.innerText = ''
    document.querySelector('p').innerHTML = playerName + ' VENCEU!'
}

function check(){
    if(input1.value === input2.value){
        input2.value = input2.value + ' 1'
    }
}

start.addEventListener('click', function(ev){
    ev.preventDefault()
    check()
    vBoard = [['', '',''],['','',''],['','','']]

    const button = ev.currentTarget
    const player1 = input1.value
    const player2 = input2.value
    player.innerText = player1
    input1.setAttribute('disabled', '')
    input2.setAttribute('disabled', '')
    button.setAttribute('disabled', '')
    buttons.forEach(itemBtn => {
        itemBtn.removeAttribute('disabled')
    })
})

buttons.forEach( itemBtn => {
    itemBtn.addEventListener('click', function(ev){
    const player1 = input1.value
    const player2 = input2.value
    const button = ev.currentTarget
    const value = button.dataset.position
    const rowColumnPair = value.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    if(player.innerText === player1){
        button.innerText = 'X'
        vBoard[row][column] = 'X'
        button.setAttribute('disabled', '')
    }else{
        button.innerText = 'O'
        vBoard[row][column] = 'O'
        button.setAttribute('disabled', '')
    }
    console.clear()
    console.table(vBoard)
    const winRegions = getWinRegions()
    if (winRegions.length > 0){
        handleWin(winRegions)
    } else if(vBoard.flat().includes('')){
        player.innerText = player.innerText === player1 ? player2 : player1
    } else{
        player.innerText = ''
        document.querySelector('p').innerHTML = 'Empate!'
    }
    })
})
    

restart.addEventListener('click', function(ev){
    ev.preventDefault()
    buttons.forEach(btn =>{
        btn.innerText = ''
        btn.setAttribute('disabled', '')
        btn.classList.remove('win')
    })
    input1.value = ''
    input2.value = ''
    input1.removeAttribute('disabled')
    input2.removeAttribute('disabled')
    start.removeAttribute('disabled')
    document.getElementById('turn').innerText = 'Vez de: '
    player.innerText = '______'
})

document.getElementById('themeSwitcher').addEventListener('click', function(){
    if (main.dataset.theme === 'dark'){
        root.style.setProperty('--bg-color', '#f1f5f9')
        root.style.setProperty('--border-color', '#aaa')
        root.style.setProperty('--font-color', '#212529')
        root.style.setProperty('--primary-color', '#26834a')
        main.dataset.theme = 'light'
     }else {
         root.style.setProperty('--bg-color', '#212529')
        root.style.setProperty('--border-color', '#666')
        root.style.setProperty('--font-color', '#f1f5f9')
        root.style.setProperty('--primary-color', '#4dff91')
        main.dataset.theme = 'dark'
    }
})