/* ================================================================
   CINEMATIC PORTFOLIO — Srujan Seelam
   Lenis + GSAP ScrollTrigger + WebGL Flow Shader + Pinned Sections
   Tier 1-3 Redesign
   ================================================================ */

(function () {
  'use strict';

  // ======================== SAFETY ========================
  if (typeof gsap === 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      var ld = document.getElementById('loader');
      if (ld) ld.style.display = 'none';
      document.querySelectorAll('.cin-reveal,.hero-line,.hero-tag,.hero-philosophy,.hero-meta,.hero-ctas,.scroll-cue').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ======================== LENIS SMOOTH SCROLL ========================
  var lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // ======================== LOADER ========================
  var loader = document.getElementById('loader');
  var booted = false;

  function killLoader() {
    if (booted) return;
    booted = true;
    if (!loader) { bootSite(); return; }
    gsap.to(loader, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.inOut',
      onComplete: function () {
        loader.style.display = 'none';
        bootSite();
      }
    });
  }

  function bootSite() {
    initHeroSequence();
    initScrollAnimations();
    initPinnedSections();
    initScrubCards();
    initCardTilt();
  }

  window.addEventListener('load', killLoader);
  setTimeout(killLoader, 2800);

  // ======================== WEBGL FLOW-FIELD SHADER ========================
  var canvas = document.getElementById('shader-canvas');
  var gl, shaderProgram, timeUniform, mouseUniform, resUniform;
  var mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

  var vertSrc = [
    'attribute vec2 a_pos;',
    'void main(){gl_Position=vec4(a_pos,0.0,1.0);}'
  ].join('\n');

  var fragSrc = [
    'precision mediump float;',
    'uniform float u_time;',
    'uniform vec2 u_mouse;',
    'uniform vec2 u_res;',
    '',
    'vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}',
    'vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}',
    '',
    'float snoise(vec2 v){',
    '  const vec4 C=vec4(0.211324865405187,0.366025403784439,',
    '                     -0.577350269189626,0.024390243902439);',
    '  vec2 i=floor(v+dot(v,C.yy));',
    '  vec2 x0=v-i+dot(i,C.xx);',
    '  vec2 i1;i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);',
    '  vec4 x12=x0.xyxy+C.xxzz;',
    '  x12.xy-=i1;',
    '  i=mod289(i);',
    '  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));',
    '  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0);',
    '  m=m*m;m=m*m;',
    '  vec3 x=2.0*fract(p*C.www)-1.0;',
    '  vec3 h=abs(x)-0.5;',
    '  vec3 ox=floor(x+0.5);',
    '  vec3 a0=x-ox;',
    '  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);',
    '  vec3 g;',
    '  g.x=a0.x*x0.x+h.x*x0.y;',
    '  g.yz=a0.yz*x12.xz+h.yz*x12.yw;',
    '  return 130.0*dot(m,g);',
    '}',
    '',
    'void main(){',
    '  vec2 uv=gl_FragCoord.xy/u_res;',
    '  float aspect=u_res.x/u_res.y;',
    '  vec2 p=uv*2.0-1.0;',
    '  p.x*=aspect;',
    '',
    '  float t=u_time*0.08;',
    '  float n1=snoise(p*1.2+vec2(t,t*0.7));',
    '  float n2=snoise(p*2.4+vec2(-t*0.5,t*1.1)+n1*0.5);',
    '  float n3=snoise(p*4.0+vec2(t*0.3,-t*0.8)+n2*0.3);',
    '',
    '  vec2 mp=u_mouse*2.0-1.0;',
    '  mp.x*=aspect;',
    '  float md=length(p-mp);',
    '  float mInfluence=smoothstep(1.2,0.0,md)*0.4;',
    '  n1+=mInfluence*sin(u_time*0.3);',
    '',
    '  float flow=n1*0.5+n2*0.35+n3*0.15;',
    '  float heartbeat=pow(sin(u_time*0.35)*0.5+0.5,8.0)*0.15;',
    '',
    '  vec3 c1=vec3(0.0,1.0,0.78);',
    '  vec3 c2=vec3(0.0,0.83,1.0);',
    '  vec3 c3=vec3(0.49,0.42,1.0);',
    '',
    '  vec3 col=mix(c1,c2,smoothstep(-0.3,0.3,flow));',
    '  col=mix(col,c3,smoothstep(0.1,0.6,n2));',
    '',
    '  float line=smoothstep(0.02,0.0,abs(fract(flow*3.0+t*0.5)-0.5)-0.45);',
    '  float line2=smoothstep(0.015,0.0,abs(fract(n2*4.0-t*0.3)-0.5)-0.47);',
    '',
    '  float intensity=(line*0.08+line2*0.05)+(heartbeat*0.06);',
    '  intensity+=smoothstep(0.8,0.0,md)*0.015;',
    '  float field=abs(flow)*0.018+abs(n2)*0.008;',
    '  intensity+=field;',
    '',
    '  vec3 bg=vec3(0.02,0.02,0.03);',
    '  vec3 finalCol=bg+col*intensity;',
    '',
    '  gl_FragColor=vec4(finalCol,1.0);',
    '}'
  ].join('\n');

  function initWebGL() {
    if (!canvas) return false;
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return false;

    function compile(type, src) {
      var s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('Shader error:', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    }

    var vs = compile(gl.VERTEX_SHADER, vertSrc);
    var fs = compile(gl.FRAGMENT_SHADER, fragSrc);
    if (!vs || !fs) return false;

    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) return false;

    gl.useProgram(shaderProgram);

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW);

    var pos = gl.getAttribLocation(shaderProgram, 'a_pos');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    timeUniform = gl.getUniformLocation(shaderProgram, 'u_time');
    mouseUniform = gl.getUniformLocation(shaderProgram, 'u_mouse');
    resUniform = gl.getUniformLocation(shaderProgram, 'u_res');

    return true;
  }

  function resizeGL() {
    if (!canvas || !gl) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  var glReady = initWebGL();
  if (glReady) {
    resizeGL();
    var startTime = performance.now();

    (function renderGL() {
      var t = (performance.now() - startTime) / 1000;
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(timeUniform, t);
      gl.uniform2f(mouseUniform, mouse.x, mouse.y);
      gl.uniform2f(resUniform, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestAnimationFrame(renderGL);
    })();

    window.addEventListener('resize', resizeGL);
  } else {
    initCanvas2DFallback();
  }

  document.addEventListener('mousemove', function (e) {
    mouse.tx = e.clientX / window.innerWidth;
    mouse.ty = 1.0 - e.clientY / window.innerHeight;
  });

  // ======================== CANVAS 2D FALLBACK ========================
  function initCanvas2DFallback() {
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var particles = [];

    function resize2D() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function FallbackNode() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.s = Math.random() * 1.8 + 0.4;
      this.vx = (Math.random() - 0.5) * 0.12;
      this.vy = (Math.random() - 0.5) * 0.12;
      this.o = Math.random() * 0.5 + 0.15;
      this.pp = Math.random() * Math.PI * 2;
      this.ps = Math.random() * 0.008 + 0.003;
      var r = Math.random();
      if (r < 0.4) { this.c = '0,255,200'; }
      else if (r < 0.65) { this.c = '0,212,255'; }
      else if (r < 0.8) { this.c = '124,108,255'; }
      else { this.c = '180,180,200'; }
    }

    resize2D();
    var count = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 160);
    for (var i = 0; i < count; i++) particles.push(new FallbackNode());

    (function render2D() {
      var t = performance.now();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;
        var a = Math.max(0, p.o + Math.sin(t * p.ps + p.pp) * 0.12 + Math.pow(Math.sin(t * 0.0035), 8) * 0.2);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + p.c + ',' + a + ')';
        ctx.fill();
      }
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var d = dx * dx + dy * dy;
          if (d < 16900) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(0,255,200,' + ((1 - Math.sqrt(d) / 130) * 0.06) + ')';
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(render2D);
    })();

    window.addEventListener('resize', function () {
      resize2D();
      particles.length = 0;
      var c2 = Math.min(Math.floor((canvas.width * canvas.height) / 10000), 160);
      for (var i = 0; i < c2; i++) particles.push(new FallbackNode());
    });
  }

  // ======================== SCROLL PROGRESS ========================
  var scrollBar = document.getElementById('scroll-progress');
  window.addEventListener('scroll', function () {
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollBar && h > 0) scrollBar.style.transform = 'scaleX(' + (window.scrollY / h) + ')';
  }, { passive: true });

  // ======================== NAVIGATION ========================
  var nav = document.getElementById('main-nav');
  var navToggle = document.getElementById('nav-toggle');
  var mobileMenu = document.getElementById('mobile-menu');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });

  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  if (mobileMenu) {
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth scroll anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, { offset: 0, duration: 1.4 });
        } else {
          gsap.to(window, { scrollTo: { y: target, offsetY: 0 }, duration: 1.2, ease: 'power3.inOut' });
        }
      }
    });
  });

  // ======================== SCROLLSPY ========================
  var navAnchors = document.querySelectorAll('.nav-links a:not(.nav-cta)');
  var spySections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', function () {
    var current = '';
    spySections.forEach(function (sec) {
      var rect = sec.getBoundingClientRect();
      if (rect.top <= window.innerHeight * 0.4 && rect.bottom > window.innerHeight * 0.2) {
        current = sec.id;
      }
    });
    navAnchors.forEach(function (a) {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

  // ======================== HERO ENTRANCE ========================
  function initHeroSequence() {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, delay: 0.15 })
      .to('.hero-line', { opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out' }, '-=0.4')
      .to('.hero-philosophy', { opacity: 1, y: 0, duration: 0.9 }, '-=0.5')
      .to('.hero-meta', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
      .to('.scroll-cue', { opacity: 1, duration: 0.5 }, '-=0.1');
  }

  // ======================== SCROLL REVEAL ANIMATIONS ========================
  function initScrollAnimations() {
    document.querySelectorAll('.cin-reveal').forEach(function (el) {
      var parent = el.parentElement;
      var siblings = parent ? Array.from(parent.querySelectorAll(':scope > .cin-reveal')) : [];
      var idx = siblings.indexOf(el);

      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.9, delay: idx * 0.08, ease: 'power3.out'
      });
    });

    document.querySelectorAll('.section-heading, .contact-heading').forEach(function (h) {
      gsap.fromTo(h,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          scrollTrigger: { trigger: h, start: 'top 85%', toggleActions: 'play none none none' },
          clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 1.2, ease: 'power3.inOut'
        }
      );
    });

    gsap.to('#hero .hero-content', {
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
      y: -120, opacity: 0.15, scale: 0.97, ease: 'none'
    });

    gsap.to('.scroll-cue', {
      scrollTrigger: { trigger: '#hero', start: '60px top', end: '180px top', scrub: true },
      opacity: 0, y: -15
    });

    // Section dividers fade in
    document.querySelectorAll('.section-divider').forEach(function (div) {
      gsap.fromTo(div,
        { opacity: 0 },
        {
          scrollTrigger: { trigger: div, start: 'top 92%', toggleActions: 'play none none none' },
          opacity: 1, duration: 1.2, ease: 'power2.out'
        }
      );
    });
  }

  // ======================== PINNED CINEMATIC SECTIONS ========================
  function initPinnedSections() {
    var sections = [
      { id: '#about' },
      { id: '#ventures' },
      { id: '#work' },
      { id: '#arsenal' },
      { id: '#beyond' },
      { id: '#contact' }
    ];

    sections.forEach(function (sec) {
      var el = document.querySelector(sec.id);
      if (!el) return;

      gsap.fromTo(el,
        { opacity: 0.3, scale: 0.96 },
        {
          scrollTrigger: {
            trigger: el,
            start: 'top 95%',
            end: 'top 40%',
            scrub: true
          },
          opacity: 1, scale: 1, ease: 'none'
        }
      );

      if (sec.id !== '#contact') {
        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'bottom 60%',
            end: 'bottom 10%',
            scrub: true
          },
          opacity: 0.2, y: -30, ease: 'none'
        });
      }
    });
  }

  // ======================== SCRUB-BASED CARD ANIMATIONS ========================
  function initScrubCards() {
    gsap.utils.toArray('.venture-card').forEach(function (card, i) {
      gsap.fromTo(card,
        { opacity: 0, x: i % 2 === 0 ? -60 : 60, rotateY: i % 2 === 0 ? 5 : -5 },
        {
          scrollTrigger: { trigger: card, start: 'top 90%', end: 'top 55%', scrub: true },
          opacity: 1, x: 0, rotateY: 0, ease: 'none'
        }
      );
    });

    gsap.utils.toArray('.project-card').forEach(function (card, i) {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.92 },
        {
          scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 60%', scrub: true },
          opacity: 1, y: 0, scale: 1, ease: 'none'
        }
      );
    });

    gsap.utils.toArray('.life-card').forEach(function (card, i) {
      var row = Math.floor(i / 2);
      var col = i % 2;
      gsap.fromTo(card,
        { opacity: 0, y: 60 + row * 20, rotate: (col - 0.5) * 2, scale: 0.9 },
        {
          scrollTrigger: { trigger: card, start: 'top 92%', end: 'top 58%', scrub: true },
          opacity: 1, y: 0, rotate: 0, scale: 1, ease: 'none'
        }
      );
    });

    gsap.utils.toArray('.arsenal-group').forEach(function (group, i) {
      gsap.fromTo(group,
        { opacity: 0, y: 40 },
        {
          scrollTrigger: { trigger: group, start: 'top 92%', end: 'top 65%', scrub: true },
          opacity: 1, y: 0, ease: 'none'
        }
      );
    });

    var contactGrid = document.querySelector('.contact-grid');
    if (contactGrid) {
      gsap.fromTo(contactGrid,
        { opacity: 0, y: 80, scale: 0.92 },
        {
          scrollTrigger: { trigger: contactGrid, start: 'top 90%', end: 'top 45%', scrub: true },
          opacity: 1, y: 0, scale: 1, ease: 'none'
        }
      );
    }

    document.querySelectorAll('.section-tag').forEach(function (tag) {
      gsap.fromTo(tag,
        { opacity: 0, x: -30 },
        {
          scrollTrigger: { trigger: tag, start: 'top 88%', end: 'top 70%', scrub: true },
          opacity: 1, x: 0, ease: 'none'
        }
      );
    });

    document.querySelectorAll('.section-num').forEach(function (num) {
      gsap.fromTo(num,
        { opacity: 0, scale: 0.5 },
        {
          scrollTrigger: { trigger: num, start: 'top 88%', end: 'top 70%', scrub: true },
          opacity: 1, scale: 1, ease: 'none'
        }
      );
    });

    document.querySelectorAll('.positioning-strip span').forEach(function (pill, i) {
      gsap.fromTo(pill,
        { opacity: 0, y: 20, scale: 0.8 },
        {
          scrollTrigger: { trigger: pill, start: 'top 90%', toggleActions: 'play none none none' },
          opacity: 1, y: 0, scale: 1, duration: 0.6, delay: i * 0.1, ease: 'back.out(1.7)'
        }
      );
    });

    // Project card image stats — count up on scroll
    document.querySelectorAll('.project-img-stat').forEach(function (stat) {
      gsap.fromTo(stat,
        { opacity: 0, scale: 0.6 },
        {
          scrollTrigger: { trigger: stat, start: 'top 85%', toggleActions: 'play none none none' },
          opacity: 0.15, scale: 1, duration: 1.2, ease: 'power3.out'
        }
      );
    });
  }

  // ======================== CARD TILT ========================
  function initCardTilt() {
    document.querySelectorAll('.venture-card, .project-card, .life-card').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var rect = card.getBoundingClientRect();
        var x = (e.clientX - rect.left) / rect.width - 0.5;
        var y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateX: y * -6, rotateY: x * 6, transformPerspective: 800,
          duration: 0.4, ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', function () {
        gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.7, ease: 'elastic.out(1,0.5)' });
      });
    });
  }

  // ======================== KEYBOARD ========================
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && mobileMenu && mobileMenu.classList.contains('open')) {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

})();
