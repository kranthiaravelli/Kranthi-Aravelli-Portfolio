import { supabase } from "./supabase.js";

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


const notification = document.getElementById('noti');
const closeNotification = document.getElementById('close-notification');


closeNotification.addEventListener('click', function() {
    notification.style.display = 'none';
})

const noticePara = document.getElementById('norice-para');
const noCertificate = document.getElementById('no-certificate');

noCertificate.onclick = function() {
    noticePara.style.display = 'block';

    setTimeout(function() {
        noticePara.style.display = 'none';
    }, 3000);
};

const downLink = document.querySelectorAll('.downlink');
const selectedResource = document.getElementById('selected-resource');

const downSection = document.querySelector(".download-form");

const form = document.getElementById('downloadForm');
const message = document.getElementById('formMessage');

const backArrow = document.querySelector('.back-arrow');

backArrow.addEventListener("click", () => {
    downSection.style.display = 'none';
})

let currentResource = null;

downLink.forEach((button) => {
    button.addEventListener('click', () => {

        message.textContent = ""

        downSection.style.display = 'flex';

        currentResource = {
            name: button.dataset.resource,
            file: button.dataset.file
        };

        selectedResource.textContent = currentResource.name;
    });
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const instagram_id = document.getElementById('instagram').value.trim();

    message.textContent = "Submitting...";

    const { error } = await supabase
        .from('resources_downlaods')
        .insert([
            {
                name: name,
                email: email,
                instagram_id: instagram,
                resource_name: currentResource.name
            }
        ]);

    if (error) {
        console.error(error);
        message.textContent = 'Unable to download. Please try again.';
        message.style.color = 'Red';
        return;
    }

    // message.textContent = "Details saved successfully";

    const link = document.createElement('a');

    link.href = currentResource.file;
    link.download = currentResource.file.split("/").pop();

    document.body.appendChild(link);
    link.click();
    link.remove();

    message.textContent = "Success! Your file has been downloaded.";
    message.style.color = "green";

    form.reset();
});
