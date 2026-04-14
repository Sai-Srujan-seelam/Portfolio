/* ================================================================
   CINEMATIC PORTFOLIO — Srujan Seelam
   Lenis + GSAP ScrollTrigger + WebGL Flow Shader + Pinned Sections
   Tier 1-3 Redesign
   ================================================================ */

(function () {
  'use strict';

  function initLazyVideos() {
    var videos = document.querySelectorAll('video[data-lazy-video]');
    if (!videos.length || typeof IntersectionObserver === 'undefined') {
      videos.forEach(function (v) {
        v.setAttribute('autoplay', '');
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var v = entry.target;
        io.unobserve(v);
        v.setAttribute('autoplay', '');
        var playAttempt = v.play();
        if (playAttempt && playAttempt.catch) playAttempt.catch(function () {});
      });
    }, { rootMargin: '140px', threshold: 0.01 });
    videos.forEach(function (v) { io.observe(v); });
  }

  // ======================== SAFETY ========================
  if (typeof gsap === 'undefined') {
    document.addEventListener('DOMContentLoaded', function () {
      var ld = document.getElementById('loader');
      if (ld) {
        ld.style.display = 'none';
        ld.setAttribute('aria-busy', 'false');
      }
      document.querySelectorAll('.cin-reveal,.hero-tag,.hero-value-line,.hero-philosophy,.hero-meta,.hero-ctas').forEach(function (el) {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      var h1a = document.getElementById('hero-type-line1');
      var h1b = document.getElementById('hero-type-line2');
      var d1 = document.getElementById('hero-dot-1');
      var d2 = document.getElementById('hero-dot-2');
      var d3 = document.getElementById('hero-dot-3');
      if (h1a) h1a.textContent = 'Srujan';
      if (h1b) h1b.textContent = 'Seelam';
      [d1, d2, d3].forEach(function (d) {
        if (d) {
          d.textContent = '.';
          d.classList.add('is-visible');
        }
      });
      var dotsWrap = document.getElementById('hero-name-dots');
      if (dotsWrap) dotsWrap.classList.add('is-blinking');
      initLazyVideos();
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // ======================== LENIS SMOOTH SCROLL ========================
  var lenis;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      /* Short duration + higher wheel mult = light, buttery scroll (not sluggish) */
      duration: 1.05,
      easing: function (t) {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.02,
      touchMultiplier: 2,
      syncTouch: true,
      syncTouchLerp: 0.065
    });

    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  // ======================== LOADER (Full-screen Terminal — letter-by-letter) ========================
  var loader = document.getElementById('loader');
  var booted = false;

  function runTerminalLoader() {
    var container = document.getElementById('loader-lines');
    var cursor = document.getElementById('loader-cursor');
    if (!container) return;

    // Terminal commands — each item: { text, classes (per-char span classes), delay after (ms), speed (ms per char) }
    var commands = [
      { text: 'srujan@dev', cls: 't-prompt', speed: 0 },
      { text: ':', cls: 't-dim', speed: 0 },
      { text: '~', cls: 't-cmd', speed: 0 },
      { text: '$ ', cls: 't-prompt', speed: 0 },
      { text: 'python init_portfolio.py', cls: 't-bold', speed: 35, pause: 300 },
      { text: '\n', raw: true, speed: 0, pause: 100 },
      { text: '# loading modules...', cls: 't-comment', speed: 20, pause: 400 },
      { text: '\n', raw: true, speed: 0 },
      { text: '[OK] ', cls: 't-success', speed: 0 },
      { text: 'gen_ai_engineer ', cls: 't-bold', speed: 30 },
      { text: 'initialized', cls: 't-dim', speed: 25, pause: 200 },
      { text: '\n', raw: true, speed: 0 },
      { text: '[OK] ', cls: 't-success', speed: 0 },
      { text: 'ml_engineer ', cls: 't-bold', speed: 30 },
      { text: 'initialized', cls: 't-dim', speed: 25, pause: 200 },
      { text: '\n', raw: true, speed: 0 },
      { text: '[OK] ', cls: 't-success', speed: 0 },
      { text: 'nlp_researcher ', cls: 't-bold', speed: 30 },
      { text: 'initialized', cls: 't-dim', speed: 25, pause: 200 },
      { text: '\n\n', raw: true, speed: 0, pause: 150 },
      { text: '>>> ', cls: 't-prompt', speed: 0 },
      { text: 'print', cls: 't-accent', speed: 30 },
      { text: '(', cls: 't-dim', speed: 0 },
      { text: '"Building systems that scale"', cls: 't-string', speed: 28, pause: 100 },
      { text: ')', cls: 't-dim', speed: 0, pause: 300 },
      { text: '\n', raw: true, speed: 0 },
      { text: 'Building systems that scale', cls: 't-bold', speed: 0, pause: 400 },
      { text: '\n\n', raw: true, speed: 0, pause: 100 },
      { text: 'srujan@dev', cls: 't-prompt', speed: 0 },
      { text: ':', cls: 't-dim', speed: 0 },
      { text: '~', cls: 't-cmd', speed: 0 },
      { text: '$ ', cls: 't-prompt', speed: 0 },
      { text: './launch --portfolio', cls: 't-bold', speed: 35, pause: 200 },
      { text: '\n', raw: true, speed: 0 },
      { text: '> ready.', cls: 't-success', speed: 40 }
    ];

    var cmdIdx = 0;
    var charIdx = 0;

    function typeNext() {
      if (cmdIdx >= commands.length) {
        // Done typing — wait then kill
        if (cursor) cursor.style.display = 'none';
        return;
      }
      var cmd = commands[cmdIdx];
      var text = cmd.text;
      var speed = cmd.speed || 0;

      if (cmd.raw || speed === 0) {
        // Print entire chunk instantly
        if (cmd.raw) {
          container.appendChild(document.createTextNode(text));
        } else {
          var span = document.createElement('span');
          span.className = cmd.cls || '';
          span.textContent = text;
          container.appendChild(span);
        }
        cmdIdx++;
        charIdx = 0;
        var pause = cmd.pause || 0;
        if (pause > 0) { setTimeout(typeNext, pause); } else { typeNext(); }
        return;
      }

      // Type letter by letter
      if (charIdx === 0) {
        var span = document.createElement('span');
        span.className = cmd.cls || '';
        span.id = 'tcmd-' + cmdIdx;
        container.appendChild(span);
      }
      var el = document.getElementById('tcmd-' + cmdIdx);
      if (charIdx < text.length) {
        el.textContent += text[charIdx];
        charIdx++;
        setTimeout(typeNext, speed + Math.random() * 15);
      } else {
        cmdIdx++;
        charIdx = 0;
        var pause = cmd.pause || 0;
        if (pause > 0) { setTimeout(typeNext, pause); } else { typeNext(); }
      }
    }

    // Place cursor after lines
    if (cursor) container.parentNode.appendChild(cursor);
    typeNext();
  }

  function killLoader() {
    if (booted) return;
    booted = true;
    if (!loader) { bootSite(); return; }
    gsap.to(loader, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.inOut',
      onComplete: function () {
        loader.style.display = 'none';
        loader.setAttribute('aria-busy', 'false');
        bootSite();
      }
    });
  }

  function bootSite() {
    initHeroSequence();
    initScrollAnimations();
    initScrubCards();
    initCardTilt();
    initAboutTextEffect();
    initLazyVideos();
  }

  // Start terminal animation immediately
  runTerminalLoader();
  // Kill loader after typewriter finishes
  window.addEventListener('load', function () { setTimeout(killLoader, 4200); });
  setTimeout(killLoader, 5000);

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
    '  float t=u_time*0.062;',
    '  float n1=snoise(p*1.2+vec2(t,t*0.7));',
    '  float n2=snoise(p*2.4+vec2(-t*0.5,t*1.1)+n1*0.5);',
    '  float n3=snoise(p*4.0+vec2(t*0.3,-t*0.8)+n2*0.3);',
    '',
    '  vec2 mp=u_mouse*2.0-1.0;',
    '  mp.x*=aspect;',
    '  float md=length(p-mp);',
    '  float mInfluence=smoothstep(1.2,0.0,md)*0.38;',
    '  n1+=mInfluence*sin(u_time*0.26);',
    '',
    '  float flow=n1*0.5+n2*0.35+n3*0.15;',
    '  float heartbeat=pow(sin(u_time*0.32)*0.5+0.5,8.0)*0.12;',
    '',
    '  vec3 c1=vec3(0.15,0.39,0.92);',
    '  vec3 c2=vec3(0.03,0.57,0.7);',
    '  vec3 c3=vec3(0.49,0.23,0.93);',
    '',
    '  vec3 col=mix(c1,c2,smoothstep(-0.3,0.3,flow));',
    '  col=mix(col,c3,smoothstep(0.1,0.6,n2));',
    '',
    '  float line=smoothstep(0.02,0.0,abs(fract(flow*3.0+t*0.5)-0.5)-0.45);',
    '  float line2=smoothstep(0.015,0.0,abs(fract(n2*4.0-t*0.3)-0.5)-0.47);',
    '',
    '  float intensity=(line*0.11+line2*0.075)+(heartbeat*0.1);',
    '  intensity+=smoothstep(0.8,0.0,md)*0.03;',
    '  float field=abs(flow)*0.042+abs(n2)*0.028;',
    '  intensity+=field;',
    '',
    '  vec3 bg=vec3(0.96,0.94,0.91);',
    '  vec3 finalCol=bg-col*intensity*0.68;',
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
      mouse.x += (mouse.tx - mouse.x) * 0.042;
      mouse.y += (mouse.ty - mouse.y) * 0.042;
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
      this.o = Math.random() * 0.38 + 0.1;
      this.pp = Math.random() * Math.PI * 2;
      this.ps = Math.random() * 0.008 + 0.003;
      var r = Math.random();
      if (r < 0.4) { this.c = '37,99,235'; }
      else if (r < 0.65) { this.c = '8,145,178'; }
      else if (r < 0.8) { this.c = '124,58,237'; }
      else { this.c = '107,99,86'; }
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
        var a = Math.max(0, p.o + Math.sin(t * p.ps + p.pp) * 0.1 + Math.pow(Math.sin(t * 0.0035), 8) * 0.16);
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
            ctx.strokeStyle = 'rgba(37,99,235,' + ((1 - Math.sqrt(d) / 130) * 0.032) + ')';
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
    if (!nav) return;
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });

  function setMobileNavOpen(open) {
    if (!navToggle || !mobileMenu) return;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    navToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  if (navToggle && mobileMenu) {
    setMobileNavOpen(false);
  }

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', function () {
      var open = !mobileMenu.classList.contains('open');
      navToggle.classList.toggle('active', open);
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      document.body.classList.toggle('mobile-menu-open', open);
      setMobileNavOpen(open);
    });
    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
        document.body.classList.remove('mobile-menu-open');
        setMobileNavOpen(false);
      });
    });
  }

  var copyEmailBtn = document.getElementById('copy-email-btn');
  var copyEmailToast = document.getElementById('copy-email-toast');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', function () {
      var addr = copyEmailBtn.getAttribute('data-email') || '';
      var label = copyEmailBtn.querySelector('.copy-email-label');
      function showToast(msg) {
        if (copyEmailToast) {
          copyEmailToast.textContent = msg;
          copyEmailToast.hidden = false;
        }
      }
      function resetCopyUi() {
        copyEmailBtn.classList.remove('copied');
        if (label) label.textContent = 'Copy';
        if (copyEmailToast) copyEmailToast.hidden = true;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(function () {
          copyEmailBtn.classList.add('copied');
          if (label) label.textContent = 'Copied';
          showToast('Email copied to clipboard.');
          setTimeout(resetCopyUi, 2200);
        }).catch(function () {
          showToast('Copy blocked — email is ' + addr);
        });
      } else {
        showToast(addr);
      }
    });
  }

  var skipLink = document.querySelector('.skip-link');
  if (skipLink) {
    skipLink.addEventListener('click', function () {
      setTimeout(function () {
        var mainEl = document.getElementById('main');
        if (mainEl) mainEl.focus();
      }, 100);
    });
  }

  // Smooth scroll anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        if (lenis) {
          lenis.scrollTo(target, {
            offset: 0,
            duration: 1.05,
            easing: function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); }
          });
        } else {
          gsap.to(window, { scrollTo: { y: target, offsetY: 0 }, duration: 1.1, ease: 'power2.out' });
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

  // ======================== HERO TYPEWRITER (coder / terminal) ========================
  function initHeroTypewriter(onComplete) {
    var el1 = document.getElementById('hero-type-line1');
    var el2 = document.getElementById('hero-type-line2');
    var d1 = document.getElementById('hero-dot-1');
    var d2 = document.getElementById('hero-dot-2');
    var d3 = document.getElementById('hero-dot-3');
    var dotsWrap = document.getElementById('hero-name-dots');

    if (!el1 || !el2) {
      if (onComplete) onComplete();
      return;
    }

    function resetDots() {
      [d1, d2, d3].forEach(function (d) {
        if (d) {
          d.textContent = '';
          d.classList.remove('is-visible');
        }
      });
    }

    var reduced = typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      el1.textContent = 'Srujan';
      el2.textContent = 'Seelam';
      [d1, d2, d3].forEach(function (d) {
        if (d) {
          d.textContent = '.';
          d.classList.add('is-visible');
        }
      });
      if (onComplete) onComplete();
      return;
    }

    el1.textContent = '';
    el2.textContent = '';
    resetDots();
    if (dotsWrap) dotsWrap.classList.remove('is-blinking');

    function typeChar(el, text, index, baseMs, done) {
      if (index >= text.length) {
        if (done) done();
        return;
      }
      el.textContent += text.charAt(index);
      setTimeout(function () {
        typeChar(el, text, index + 1, baseMs, done);
      }, baseMs + Math.random() * 32);
    }

    typeChar(el1, 'Srujan', 0, 46, function () {
      typeChar(el2, 'Seelam', 0, 46, function () {
        var i = 0;
        var dots = [d1, d2, d3];
        function typeDots() {
          if (i >= 3) {
            if (dotsWrap) dotsWrap.classList.add('is-blinking');
            if (onComplete) onComplete();
            return;
          }
          var d = dots[i];
          if (d) {
            d.textContent = '.';
            d.classList.add('is-visible');
          }
          i++;
          setTimeout(typeDots, 118 + Math.random() * 35);
        }
        setTimeout(typeDots, 140);
      });
    });
  }

  function revealHeroRest() {
    gsap.to('.hero-value-line', { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' });
    gsap.to('.hero-philosophy', { opacity: 1, y: 0, duration: 0.78, ease: 'power3.out' });
    gsap.to('.hero-meta', { opacity: 1, y: 0, duration: 0.62, ease: 'power3.out' });
    gsap.to('.hero-ctas', { opacity: 1, y: 0, duration: 0.52, ease: 'power3.out' });
  }

  // ======================== HERO ENTRANCE ========================
  function initHeroSequence() {
    var tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    gsap.set('.hero-chip', { opacity: 0, y: 8 });

    tl.fromTo('.hero-visual',
        { opacity: 0, scale: 0.97 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out' }, 0
      )
      .to('.hero-chip-location', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.7)
      .to('.hero-chip-status', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.85)
      .to('.hero-chip-stat', { opacity: 1, y: 0, duration: 0.55, ease: 'power2.out' }, 0.95)
      .to('.hero-tag', { opacity: 1, y: 0, duration: 0.7 }, 0.1)
      .call(function () {
        initHeroTypewriter(revealHeroRest);
      }, null, 0.42);
  }

  // ======================== SCROLL REVEAL ANIMATIONS ========================
  function initScrollAnimations() {
    // Below-hero reveals only — hero keeps its own timeline (unchanged)
    document.querySelectorAll('.cin-reveal').forEach(function (el) {
      if (el.closest('#hero')) return;

      var parent = el.parentElement;
      var siblings = parent ? Array.from(parent.querySelectorAll(':scope > .cin-reveal')) : [];
      var idx = siblings.indexOf(el);

      gsap.to(el, {
        scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none none' },
        opacity: 1, y: 0, duration: 0.72, delay: idx * 0.04, ease: 'power2.out'
      });
    });

    // Section headings — wipe (skip anything inside #hero)
    document.querySelectorAll('.section-heading, .contact-heading').forEach(function (h) {
      if (h.closest('#hero')) return;
      gsap.fromTo(h,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          scrollTrigger: { trigger: h, start: 'top 90%', toggleActions: 'play none none none' },
          clipPath: 'inset(0 0% 0 0)', opacity: 1, duration: 0.7, ease: 'power2.out'
        }
      );
    });

    // Hero parallax — unchanged
    gsap.to('#hero .hero-content', {
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
      y: -60, opacity: 0.65, ease: 'none'
    });

    // Section dividers (not in hero)
    document.querySelectorAll('.section-divider').forEach(function (div) {
      if (div.closest('#hero')) return;
      gsap.fromTo(div,
        { opacity: 0 },
        {
          scrollTrigger: { trigger: div, start: 'top 96%', toggleActions: 'play none none none' },
          opacity: 1, duration: 0.55, ease: 'power2.out'
        }
      );
    });
  }

  // ======================== CARD REVEAL ANIMATIONS ========================
  function initScrubCards() {
    // Experience cards — one-shot with stagger
    gsap.utils.toArray('.exp-card').forEach(function (card, i) {
      gsap.fromTo(card,
        { opacity: 0, y: 28 },
        {
          scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
          opacity: 1, y: 0, duration: 0.65, delay: i * 0.06, ease: 'power2.out'
        }
      );
    });

    // Venture cards — simple fade up, no x-slide or 3D rotation
    gsap.utils.toArray('.venture-card').forEach(function (card, i) {
      gsap.fromTo(card,
        { opacity: 0, y: 24 },
        {
          scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
          opacity: 1, y: 0, duration: 0.65, delay: i * 0.05, ease: 'power2.out'
        }
      );
    });

    // Project cards — stagger by column position, no scale
    gsap.utils.toArray('.project-card').forEach(function (card, i) {
      gsap.fromTo(card,
        { opacity: 0, y: 30 },
        {
          scrollTrigger: { trigger: card, start: 'top 93%', toggleActions: 'play none none none' },
          opacity: 1, y: 0, duration: 0.68, delay: (i % 3) * 0.06, ease: 'power2.out'
        }
      );
    });

    // Life cards
    gsap.utils.toArray('.life-card').forEach(function (card, i) {
      gsap.fromTo(card,
        { opacity: 0, y: 28 },
        {
          scrollTrigger: { trigger: card, start: 'top 92%', toggleActions: 'play none none none' },
          opacity: 1, y: 0, duration: 0.65, delay: (i % 2) * 0.06, ease: 'power2.out'
        }
      );
    });

    // Arsenal groups
    gsap.utils.toArray('.arsenal-group').forEach(function (group, i) {
      gsap.fromTo(group,
        { opacity: 0, y: 24 },
        {
          scrollTrigger: { trigger: group, start: 'top 92%', toggleActions: 'play none none none' },
          opacity: 1, y: 0, duration: 0.62, delay: (i % 3) * 0.05, ease: 'power2.out'
        }
      );
    });

    // Contact grid
    var contactGrid = document.querySelector('.contact-grid');
    if (contactGrid) {
      gsap.fromTo(contactGrid,
        { opacity: 0, y: 36 },
        {
          scrollTrigger: { trigger: contactGrid, start: 'top 90%', toggleActions: 'play none none none' },
          opacity: 1, y: 0, duration: 0.7, ease: 'power2.out'
        }
      );
    }

    // Section tags
    document.querySelectorAll('.section-tag').forEach(function (tag) {
      gsap.fromTo(tag,
        { opacity: 0, x: -16 },
        {
          scrollTrigger: { trigger: tag, start: 'top 90%', toggleActions: 'play none none none' },
          opacity: 1, x: 0, duration: 0.7, ease: 'power2.out'
        }
      );
    });

    // Section numbers
    document.querySelectorAll('.section-num').forEach(function (num) {
      gsap.fromTo(num,
        { opacity: 0 },
        {
          scrollTrigger: { trigger: num, start: 'top 90%', toggleActions: 'play none none none' },
          opacity: 1, duration: 0.8, ease: 'power2.out'
        }
      );
    });

    // Positioning pills
    document.querySelectorAll('.positioning-strip span').forEach(function (pill, i) {
      gsap.fromTo(pill,
        { opacity: 0, y: 12 },
        {
          scrollTrigger: { trigger: pill, start: 'top 92%', toggleActions: 'play none none none' },
          opacity: 1, y: 0, duration: 0.6, delay: i * 0.08, ease: 'power2.out'
        }
      );
    });

    // Project stats
    document.querySelectorAll('.project-img-stat').forEach(function (stat) {
      gsap.fromTo(stat,
        { opacity: 0 },
        {
          scrollTrigger: { trigger: stat, start: 'top 88%', toggleActions: 'play none none none' },
          opacity: 0.15, duration: 1.0, ease: 'power2.out'
        }
      );
    });
  }

  // ======================== CARD TILT ========================
  function initCardTilt() {
    document.querySelectorAll('.venture-card, .project-card, .life-card, .exp-card').forEach(function (card) {
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

  // ======================== ABOUT TEXT EFFECTS ========================
  function initAboutTextEffect() {
    var heading = document.getElementById('about-heading');
    if (!heading) return;

    // Split heading text into words while preserving HTML (em tags)
    var html = heading.innerHTML;
    var tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    function wrapWords(node) {
      if (node.nodeType === 3) { // text node
        var words = node.textContent.split(/(\s+)/);
        var frag = document.createDocumentFragment();
        words.forEach(function (word) {
          if (word.trim() === '') {
            frag.appendChild(document.createTextNode(word));
          } else {
            var outer = document.createElement('span');
            outer.className = 'about-heading-word';
            var inner = document.createElement('span');
            inner.className = 'word-inner word-ripple';
            inner.textContent = word;
            outer.appendChild(inner);
            frag.appendChild(outer);
          }
        });
        return frag;
      } else if (node.nodeType === 1) { // element node
        var clone = node.cloneNode(false);
        Array.from(node.childNodes).forEach(function (child) {
          clone.appendChild(wrapWords(child));
        });
        return clone;
      }
      return node.cloneNode(true);
    }

    var wrapped = document.createDocumentFragment();
    Array.from(tempDiv.childNodes).forEach(function (child) {
      wrapped.appendChild(wrapWords(child));
    });

    heading.innerHTML = '';
    heading.appendChild(wrapped);

    // Animate words with GSAP - topple/ripple effect
    var wordInners = heading.querySelectorAll('.word-inner');

    // Override the default cin-reveal for this heading
    heading.style.opacity = '1';
    heading.style.transform = 'none';
    heading.style.clipPath = 'none';

    gsap.fromTo(wordInners,
      { y: '110%', rotateX: -80, opacity: 0 },
      {
        scrollTrigger: {
          trigger: heading,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        y: '0%',
        rotateX: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.06,
        ease: 'back.out(1.5)'
      }
    );
  }

  // ======================== KEYBOARD ========================
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navToggle && mobileMenu && mobileMenu.classList.contains('open')) {
      navToggle.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
      document.body.classList.remove('mobile-menu-open');
      setMobileNavOpen(false);
    }
  });

})();
