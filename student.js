document.addEventListener("DOMContentLoaded", function() {
    const activeLink = document.querySelector('.active');
    const underline = document.querySelector('.underline');
  
    if (activeLink) {
      const linkWidth = activeLink.offsetWidth;
      const linkLeft = activeLink.offsetLeft;
  
      underline.style.width = `${linkWidth + 20}px`;
      underline.style.left = `${linkLeft - 10}px`;
    }
  });
const navLinks = document.querySelectorAll('nav ul li a');
const underline = document.querySelector('.underline');
const contents = document.querySelectorAll('.content');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const linkWidth = link.offsetWidth;
    const linkLeft = link.offsetLeft;

    underline.style.width = `${linkWidth + 20}px`;
    underline.style.left = `${linkLeft - 10}px`;

    document.querySelector('.active').classList.remove('active');
    link.classList.add('active');

    const targetId = link.getAttribute('data-target');
    contents.forEach(content => {
      if (content.id === targetId) {
        content.classList.add('active');
      } else {
        content.classList.remove('active');
      }
    });
  });
});
