$(function () {

  /* ---- Navbar scroll ---- */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $('#navbar').addClass('scrolled');
    } else {
      $('#navbar').removeClass('scrolled');
    }
    revealOnScroll();
    setActiveNav();
  });

  /* ---- Smooth scroll ---- */
  $('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    var target = $($(this).attr('href'));
    if (target.length) {
      $('html, body').animate({ scrollTop: target.offset().top - 70 }, 700, 'swing');
      $('.navbar-collapse').collapse('hide');
    }
  });

  /* ---- Active nav link ---- */
  function setActiveNav() {
    var scrollPos = $(window).scrollTop();
    $('section').each(function () {
      var top = $(this).offset().top - 100;
      var bottom = top + $(this).outerHeight();
      var id = $(this).attr('id');
      if (scrollPos >= top && scrollPos < bottom) {
        $('.nav-link-custom').removeClass('active');
        $('.nav-link-custom[href="#' + id + '"]').addClass('active');
      }
    });
  }

  /* ---- Reveal on scroll ---- */
  function revealOnScroll() {
    $('.reveal').each(function () {
      var top = $(this).offset().top;
      var windowBottom = $(window).scrollTop() + $(window).height();
      if (windowBottom > top + 60) {
        $(this).addClass('visible');
      }
    });
  }
  revealOnScroll();

  /* ---- Project filters ---- */
  $('#projectFilters .proj-filter-btn').on('click', function () {
    var filter = $(this).data('filter');
    $('#projectFilters .proj-filter-btn').removeClass('active');
    $(this).addClass('active');
    $('.proj-item').each(function () {
      if (filter === 'all' || $(this).data('category') === filter) {
        $(this).removeClass('hidden');
      } else {
        $(this).addClass('hidden');
      }
    });
    setTimeout(revealOnScroll, 50);
  });

  /* ---- Contact form ---- */
  $('#contactForm').on('submit', function (e) {
    e.preventDefault();
    var btn = $(this).find('button[type="submit"]');
    btn.html('<i class="fas fa-spinner fa-spin"></i> Sending...');
    btn.prop('disabled', true);
    setTimeout(function () {
      btn.html('<i class="fas fa-check"></i> Sent!');
      $('#formMsg').slideDown(400);
      setTimeout(function () {
        btn.html('<i class="fas fa-paper-plane"></i> Send Message');
        btn.prop('disabled', false);
        $('#contactForm')[0].reset();
        setTimeout(function () { $('#formMsg').slideUp(); }, 5000);
      }, 3000);
    }, 1500);
  });

});