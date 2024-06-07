const tagsArray = document.getElementsByClassName('tag')
const contentMain = document.getElementById('main-feature')

function changeText(number) {
    const content1 = document.getElementById(`content-1`)
    const content2 = document.getElementById(`content-2`)
    const content3 = document.getElementById(`content-3`)
    const content4 = document.getElementById(`content-4`)
    
    content4.style.display = 'none'
    content3.style.display = 'none'
    content2.style.display = 'none'
    content1.style.display = 'none'
    contentMain.style.backgroundColor = '#17C69B'
    switch(number) {
        case 1:
            content1.style.display = 'block'
            contentMain.style.backgroundColor = '#17C69B'
            break
        case 2:
            content2.style.display = 'block'
            contentMain.style.backgroundColor = '#FDA543'
            break
        case 3:
            content3.style.display = 'block'
            contentMain.style.backgroundColor = '#FB3640'
            break
        case 4:
            content4.style.display = 'block'
            contentMain.style.backgroundColor = '#FA2F75'
            break
    }
}