document.querySelector('#change-logo-button').addEventListener('click', changeLogo)
let logo = 2

function changeLogo() {
   let imageSrc
   if ( logo === 1) {
      imageSrc = 'logos/logo-blue.svg'
      logo ++
   } else if ( logo === 2) {
      imageSrc = 'logos/logo-blue-font-sizing.svg'
       logo ++
   } else if ( logo === 3 ) {
      imageSrc = 'logos/logo-blue-inline-sizing.svg'
      logo = 1
   }
   document.querySelector('#logo-image').setAttribute('src',imageSrc)
}
