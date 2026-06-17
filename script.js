const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('section');
const menuToggle = document.querySelector('.menu-toggle');
const navId = document.getElementById('nav-elements');

menuToggle.addEventListener('click', function() {
    navId.style.display = 'block'
})

navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(item => item.classList.remove('selected'));

        this.classList.add('selected');
    });
});

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 300){
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('selected');

        if(link.getAttribute('href') === `#${current}`){
            link.classList.add('selected')
        }
    });
});
