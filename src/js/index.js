console.log('Buongiorno!');

function scrollTo(selector, cb) {
  $('html').animate({
    scrollTop: $(selector).offset().top + 5 + 'px'
  }, 500, cb);
}

$('a[href^="#"]').click(function(e) {
  e.preventDefault();
  scrollTo($(this).attr('href'));
});

const tabs = document.querySelectorAll('.tab-content > *');

const onResize = e => {
  if (innerWidth <= 768) {
    const activeControl = document.querySelector('.tab-control.active');
    const dataTab = activeControl.getAttribute('data-tab');

    tabs.forEach(tab => {
      tab.hidden = true;
    });
    const activeTab = document.querySelector(`.tab-content > [data-tab="${dataTab}"]`);
    activeTab.hidden = false;
  }
  else {
    tabs.forEach(tab => {
      tab.hidden = false;
    });
  }
};
addEventListener('resize', onResize);
onResize();

document.querySelectorAll('.tab-control').forEach((element, index) => {
  element.addEventListener('click', e => {
    document.querySelectorAll('.tab-control').forEach(control => {
      control.classList.remove('active');
    });
    element.classList.add('active');
    
    tabs.forEach(tab => {
      tab.hidden = true;
    });
    tabs[index].hidden = false;
  });
});