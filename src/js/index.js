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
  if (innerWidth > 768) {
    return;
  }

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

$('.form').submit(function(e) {
  e.preventDefault();

  let invalid = false;
  const inputs = $(this).find('input');
  inputs.each((index, element) => {
    if (element.value === '') {
      invalid = true;
    }
  });

  if (invalid) {
    $(this).attr('data-invalid', invalid);
  }
  else {
    const data = $(this).serializeArray().reduce(function(obj, item) {
      obj[item.name] = item.value;
      return obj;
    }, {});
    data.type = $(this).attr('data-name');

    $.ajax({
      type: 'GET',
      url:  'google-sheets.php',
      data,
      complete: response => {
        $(this).attr('data-success', !invalid);
      },
      error: error => {
        console.error(error);
      }
    });
  }
});