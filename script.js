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
    }
  });

  /* ---- Mobile Menu ---- */
  var $toggler   = $('#menuToggler');
  var $overlay   = $('#mobileOverlay');
  var $closeBtn  = $('#menuClose');
  var $mobileLinks = $('.mobile-nav-link');

  function openMenu() {
    $toggler.addClass('open');
    $overlay.addClass('active');
    $('body').css('overflow', 'hidden');
  }

  function closeMenu() {
    $toggler.removeClass('open');
    $overlay.removeClass('active');
    $('body').css('overflow', '');
  }

  $toggler.on('click', openMenu);
  $closeBtn.on('click', closeMenu);

  // Close when clicking the backdrop (not the panel)
  $overlay.on('click', function(e) {
    if (!$(e.target).closest('#mobilePanel').length) {
      closeMenu();
    }
  });

  // Close on link click and scroll to section
  $mobileLinks.on('click', function(e) {
    e.preventDefault();
    var target = $($(this).attr('href'));
    closeMenu();
    setTimeout(function() {
      if (target.length) {
        $('html, body').animate({ scrollTop: target.offset().top - 70 }, 700, 'swing');
      }
    }, 300);
  });

  // Close on ESC key
  $(document).on('keydown', function(e) {
    if (e.key === 'Escape') closeMenu();
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
        $('.mobile-nav-link').removeClass('active');
        $('.mobile-nav-link[href="#' + id + '"]').addClass('active');
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