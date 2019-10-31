import cssStyles from '../scss/example.module.css'
import scssStyles from '../scss/example.module.scss'

const div = document.createElement('div')

div.classList.add(cssStyles['bg-red'], scssStyles['text-white'])

div.innerText = 'css module'

document.body.appendChild(div)
