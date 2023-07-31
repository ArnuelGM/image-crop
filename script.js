// @ts-check

const $ = selector => document.querySelector(selector)
const selectedImage = $('#selectedImage')

$('main > div label input').addEventListener('change', (event) => {
  $('.croped').style.placeContent = !event.target.checked ? 'center' : ''
})

selectedImage.addEventListener('load', () => {
  $('#sx').max = $('#sx').value = selectedImage.naturalWidth
  $('#sy').max = $('#sy').value = selectedImage.naturalHeight
  $('#sw').max = $('#sw').value = selectedImage.naturalWidth
  $('#sh').max = $('#sh').value = selectedImage.naturalHeight
  repaint(selectedImage)
})
$('#sx').addEventListener('change', () => repaint(selectedImage))
$('#sy').addEventListener('change', () => repaint(selectedImage))
$('#sw').addEventListener('change', () => repaint(selectedImage))
$('#sh').addEventListener('change', () => repaint(selectedImage))

$('#selectedFile').addEventListener('change', (event) => {
  const url = URL.createObjectURL(event.target.files[0])
  selectedImage.src = url
})

function repaint(selectedImage) {
  if(!selectedImage.src) return
  const canvas = document.createElement('canvas')
  const { sx, sy, sw, sh } = getValues()
  canvas.width = sw
  canvas.height = sh
  const ctx = canvas.getContext('2d')
  // @ts-ignore
  ctx.drawImage(selectedImage, sx, sy, sw, sh, 0, 0, sw, sh)
  // @ts-ignore
  ctx.save()
  const dataURL = canvas.toDataURL('image/jpg', 100)
  $('#newImage').src = dataURL
  $('#newImage').addEventListener('load', (event) => setFavicon(event.target))
}

function getValues() {
  return {
    sx: +$('#sx').value,
    sy: +$('#sy').value,
    sw: +$('#sw').value,
    sh: +$('#sh').value,
  }
}

function setFavicon(image) {
  let link = $('html head link[rel=icon]')
  if( !link ) {
    link = document.createElement('link')
    $('html head').appendChild(link)
    link.setAttribute('rel', 'icon')
    link.setAttribute('type', 'image/jpg')
  }
  link.href = image.src
}


const controlX = $('.controls.x')
controlX.addEventListener("mousedown", () => controlX.dataset.canMove = 'true')
controlX.addEventListener('mouseup', () => controlX.dataset.canMove = 'false')
controlX.addEventListener('mousemove', (event) => {
  if(controlX.dataset.canMove === 'true') {
    controlX.style.left = (event.pageX - 20) + 'px'
    console.log(controlX.style.left)
  }
})

const controlW = $('.controls.w')
controlW.addEventListener("mousedown", () => controlW.dataset.canMove = 'true')
controlW.addEventListener('mouseup', () => controlW.dataset.canMove = 'false')
controlW.addEventListener('mousemove', (event) => {
  if(controlW.dataset.canMove === 'true') {
    controlW.style.left = (event.pageX - 20) + 'px'
    console.log(controlW.style.left)
  }
})
