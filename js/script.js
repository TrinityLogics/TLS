document.querySelector('#change-logo-button').addEventListener('click', changeLogo)
let logo = 1

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
      logo ++
   } else if ( logo === 4 ) {
         imageSrc = 'logos/logo-stacked.svg'
      logo = 1
   }
   document.querySelector('#logo-image').setAttribute('src',imageSrc)
}
