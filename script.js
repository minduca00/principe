/* ============================================================
  O PRÍNCIPE DO BREGA: SCRIPT DO SITE
   Lê os dados de config.js (window.SITE) e monta as seções.
   ============================================================ */
(function () {
  'use strict';

  var S = window.SITE || {};
  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Utilitários */
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  /* Mostra "[INFORMAÇÃO A CONFIRMAR COM O ARTISTA]" como placeholder
     discreto; marcador interno [[CONFIRMAR]] nunca aparece no site. */
  function textoPendente(txt) {
    if (!txt) return '<span class="pendente">[Informação a confirmar com o artista]</span>';
    var limpo = String(txt).replace(/\[\[\s*CONFIRMAR\s*\]\]/g, '').trim();
    if (!limpo) return '<span class="pendente">[Informação a confirmar com o artista]</span>';
    return esc(limpo);
  }

  /* ---------- Ano no rodapé ---------- */
  var ano = $('#ano');
  if (ano) ano.textContent = new Date().getFullYear();

  /* ============================================================
     HERO / SOBRE / BIOGRAFIA
     ============================================================ */
  if (S.HERO_FRASE) { var hf = $('#heroFrase'); if (hf) hf.textContent = S.HERO_FRASE; }

  function aplicarFoto(contId, caminho, altFallback) {
    var c = document.getElementById(contId);
    if (!c || !caminho) return;
    c.innerHTML = '<img src="' + esc(caminho) + '" alt="' + esc(altFallback || '') +
      '" loading="lazy" style="width:100%;height:100%;object-fit:cover">';
  }
  aplicarFoto('heroFoto', S.FOTO_HERO, S.FOTO_HERO_ALT);
  aplicarFoto('sobreFoto', S.FOTO_SOBRE, 'Retrato do artista');

  if (S.SOBRE_SUBTITULO) {
    var st = $('#sobreSubtitulo'); if (st) st.textContent = S.SOBRE_SUBTITULO;
  }
  var sp = $('#sobreParagrafos');
  if (sp && S.SOBRE_PARAGRAFOS) {
    sp.innerHTML = S.SOBRE_PARAGRAFOS.map(function (p) {
      return '<p class="editavel">' + textoPendente(p) + '</p>';
    }).join('');
  }
  var stp = $('#sobreTopicos');
  if (stp && S.SOBRE_DESTAQUES) {
    stp.innerHTML = S.SOBRE_DESTAQUES.map(function (t) {
      return '<div class="topico"><b>' + esc(t.titulo) + '</b><span>' +
             textoPendente(t.texto) + '</span></div>';
    }).join('');
  }
  var bp = $('#bioParagrafos');
  if (bp && S.BIO_PARAGRAFOS) {
    bp.innerHTML = S.BIO_PARAGRAFOS.map(function (p) {
      return '<p>' + textoPendente(p) + '</p>';
    }).join('');
  }

  /* ============================================================
    MÚSICAS: destaque + grade com player funcional
     ============================================================ */
  var svgSpotify = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.4a.75.75 0 01-1.03.25c-2.82-1.72-6.37-2.11-10.55-1.16a.75.75 0 11-.33-1.46c4.57-1.04 8.5-.59 11.66 1.34a.75.75 0 01.25 1.03zm1.23-2.74a.94.94 0 01-1.29.31c-3.23-1.98-8.15-2.56-11.97-1.4a.94.94 0 11-.54-1.79c4.37-1.32 9.79-.68 13.49 1.59a.94.94 0 01.31 1.29zm.11-2.86C14.06 8.5 7.98 8.29 4.28 9.41a1.12 1.12 0 11-.65-2.15c4.25-1.29 10.96-1.04 15.28 1.53a1.12 1.12 0 11-1.14 1.93z"/></svg>';
  var svgYT = '<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 00-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 001.76-1.77A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15.2V8.8l5.2 3.2-5.2 3.2z"/></svg>';
  var svgPlay = '<svg class="i-play" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5l13 7.5-13 7.5V4.5z"/></svg>';
  var svgPause = '<svg class="i-pause" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4h4v16H7zM13 4h4v16h-4z"/></svg>';

  function capaHTML(src, alt) {
    if (src) return '<img src="' + esc(src) + '" alt="' + esc(alt) + '" loading="lazy">';
    return '<div class="ph"><div class="ph-txt">Capa<br><b>[substituir em config.js]</b></div></div>';
  }

  var musicas = S.MUSICAS || [];
  var mctx = $('#musicasConteudo');
  if (mctx) {
    if (!musicas.length) {
      mctx.innerHTML = '<p class="pendente" style="text-align:center">Novas músicas em breve.</p>';
    } else {
      var destaque = musicas.filter(function (m) { return m.destaque; })[0] || musicas[0];
      var apenasUmCard = musicas.length === 1;
      var html = '';

      if (destaque && !apenasUmCard) {
        html += '<article class="destaque rev on">';
        html += '<div class="destaque-capa"><div class="capa-box">' + capaHTML(destaque.capa, destaque.titulo) + '</div></div>';
        html += '<div class="destaque-info">';
        html += '<span class="tag-lanc"><i></i> Lançamento em destaque</span>';
        html += '<h3>' + esc(destaque.titulo) + '</h3>';
        html += '<p class="part"><b>Participação</b>' +
                (destaque.participacao ? esc(destaque.participacao) : '<span class="pendente">[A confirmar]</span>') + '</p>';
        html += '<p class="meta-musica">' + esc(destaque.ano || '') +
                (destaque.duracao ? ' · ' + esc(destaque.duracao) : '') +
                (destaque.lancamento ? ' · Lançamento ' + esc(destaque.lancamento) : '') + '</p>';
        html += playerHTML(destaque, 0);
        html += plataformasHTML(destaque);
        html += '</div></article>';
      }

      var grade = musicas.slice();
      html += '<div class="grade-musicas' + (apenasUmCard ? ' grade-musicas-unica' : '') + '">';
      grade.forEach(function (m, i) {
        html += '<article class="card-musica rev-d' + ((i % 4) + 1) + '">';
        html += '<div class="card-capa">' + capaHTML(m.capa, m.titulo);
        html += '<div class="veu"><button class="card-play" data-i="' + i + '" aria-label="Reproduzir ' + esc(m.titulo) + '">' +
                '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5l13 7.5-13 7.5V4.5z"/></svg></button></div></div>';
        html += '<div class="card-info"><h4>' + esc(m.titulo) + '</h4>';
        html += '<p class="sub">' + (m.participacao ? 'Part. ' + esc(m.participacao) : esc(m.artista || S.ARTISTA_NOME)) + '</p>';
        html += '<p class="meta-musica">' + esc(m.duracao || '') + (m.ano ? ' · ' + esc(m.ano) : '') + '</p>';
        html += minisHTML(m);
        html += '</div></article>';
      });
            if (!apenasUmCard) {
        html += '<article class="card-musica card-vazio rev-d4">' +
          '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="1.4" stroke-linecap="round"/></svg>' +
          '<span>Espaço reservado<br>para novos lançamentos</span></article>';
            }
      html += '</div>';
      mctx.innerHTML = html;
    }
  }

  function playerHTML(m, idx) {
    var tem = !!m.audio;
    return '<div class="player" data-player data-i="' + idx + '">' +
      '<button class="play-btn" aria-label="Reproduzir ' + esc(m.titulo) + '"' + (tem ? '' : ' disabled title="Áudio ainda não disponível: use as plataformas"') + '>' +
      svgPlay + svgPause + '</button>' +
      '<div class="onda" aria-hidden="true"></div>' +
      '<span class="tempo">' + (tem ? '0:00' : (m.duracao || '--:--')) + '</span>' +
      (tem ? '<audio preload="none" src="' + esc(m.audio) + '"></audio>' : '') +
      '</div>';
  }
  function plataformasHTML(m) {
    var out = '<div class="plataformas">';
    if (m.youtube) out += '<a href="' + esc(m.youtube) + '" class="plat" target="_blank" rel="noopener" aria-label="Assistir no YouTube">' + svgYT + ' YouTube</a>';
    if (m.spotify) out += '<a href="' + esc(m.spotify) + '" class="plat" target="_blank" rel="noopener" aria-label="Ouvir no Spotify">' + svgSpotify + ' Spotify</a>';
    if (!m.youtube && !m.spotify) out += '<span class="pendente">Links oficiais a confirmar</span>';
    out += '</div>';
    return out;
  }
  function minisHTML(m) {
    var out = '<div class="mini-plats">';
    if (m.youtube) out += '<a href="' + esc(m.youtube) + '" class="mini-plat" target="_blank" rel="noopener" aria-label="YouTube">' + svgYT + '</a>';
    if (m.spotify) out += '<a href="' + esc(m.spotify) + '" class="mini-plat" target="_blank" rel="noopener" aria-label="Spotify">' + svgSpotify + '</a>';
    out += '</div>';
    return out;
  }

  /* Player funcional (áudio real quando existir; senão, leva à plataforma) */
  function ativarPlayers() {
    document.querySelectorAll('[data-player]').forEach(function (p) {
      var btn = p.querySelector('.play-btn');
      var audio = p.querySelector('audio');
      if (!btn) return;
      btn.addEventListener('click', function () {
        if (!audio) {
          var i = parseInt(p.getAttribute('data-i'), 10) || 0;
          var m = (S.MUSICAS || [])[i];
          if (m && (m.youtube || m.spotify)) window.open(m.youtube || m.spotify, '_blank', 'noopener');
          return;
        }
        if (audio.paused) {
          document.querySelectorAll('audio').forEach(function (a) { if (a !== audio) a.pause(); });
          audio.play();
          p.classList.add('ativo'); btn.classList.add('tocando');
        } else {
          audio.pause();
          p.classList.remove('ativo'); btn.classList.remove('tocando');
        }
      });
      if (audio) {
        audio.addEventListener('timeupdate', function () {
          var t = p.querySelector('.tempo');
          if (!t) return;
          var s = Math.floor(audio.currentTime), mm = Math.floor(s / 60), ss = ('0' + (s % 60)).slice(-2);
          t.textContent = mm + ':' + ss;
        });
        audio.addEventListener('ended', function () {
          p.classList.remove('ativo'); btn.classList.remove('tocando');
        });
      }
    });
    document.querySelectorAll('.card-play').forEach(function (b) {
      b.addEventListener('click', function (ev) {
        ev.preventDefault();
        var i = parseInt(b.getAttribute('data-i'), 10) || 0;
        var m = (S.MUSICAS || [])[i];
        if (m && (m.youtube || m.spotify)) window.open(m.youtube || m.spotify, '_blank', 'noopener');
      });
    });
  }

  /* Ondas do player */
  document.querySelectorAll('.onda').forEach(function (onda) {
    var html = '';
    for (var i = 0; i < 42; i++) html += '<i style="animation-delay:' + (i * 0.045).toFixed(2) + 's"></i>';
    onda.innerHTML = html;
  });

  /* ============================================================
    VÍDEOS (YouTube): NUNCA inventar ID
     ============================================================ */
  var vctx = $('#videosConteudo');
  if (vctx && S.VIDEOS) {
    vctx.innerHTML = S.VIDEOS.map(function (v, i) {
      var temId = !!v.id;
      var thumb = temId
        ? '<img src="https://i.ytimg.com/vi/' + esc(v.id) + '/hqdefault.jpg" alt="' + esc(v.titulo) + '" loading="lazy" style="width:100%;height:100%;object-fit:cover">'
        : '<div class="ph"><div class="ph-txt"><svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="2.5" y="5" width="19" height="14" rx="1.5" stroke="currentColor" stroke-width="1.2"/><path d="M10 9.5l5 2.5-5 2.5v-5z" fill="currentColor"/></svg>Thumbnail do YouTube<br><b>[inserir ID em config.js]</b></div></div>';
      return '<article class="card-video rev-d' + ((i % 3) + 1) + '" data-video="' + esc(v.id || '') + '" data-url="' + esc(v.url || S.YOUTUBE_URL || '') + '">' +
        '<div class="video-thumb">' + thumb +
        '<span class="video-play"><svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M7 4.5l13 7.5-13 7.5V4.5z"/></svg></span>' +
        '<span class="video-dur">--:--</span></div>' +
        '<div class="video-info"><h4>' + textoPendente(v.titulo) + '</h4><span>' + esc(v.categoria || '') + (v.data ? ' · ' + esc(v.data) : '') + '</span></div>' +
        '</article>';
    }).join('');
    vctx.querySelectorAll('.card-video').forEach(function (card) {
      card.addEventListener('click', function () {
        var id = card.getAttribute('data-video');
        if (id) {
          var thumb = card.querySelector('.video-thumb');
          thumb.innerHTML = '<iframe style="position:absolute;inset:0;width:100%;height:100%;border:0" src="https://www.youtube.com/embed/' + esc(id) + '?autoplay=1&rel=0" title="Vídeo" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" allowfullscreen></iframe>';
        } else {
          window.open(card.getAttribute('data-url') || S.YOUTUBE_URL, '_blank', 'noopener');
        }
      });
    });
  }

  /* ============================================================
     MÚSICAS NO YOUTUBE
     ============================================================ */
  var yctx = $('#ytMusicasConteudo');
  if (yctx && S.MUSICAS_YOUTUBE) {
    yctx.innerHTML = S.MUSICAS_YOUTUBE.map(function (m) {
      var nome = m.feat ? ' feat. ' + esc(m.feat) : '';
      return '<a class="card-yt" href="' + esc(m.url || S.YOUTUBE_URL || '#') + '" target="_blank" rel="noopener">' +
        '<span class="yt-ico"><svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M21.6 7.2a2.5 2.5 0 00-1.76-1.77C18.25 5 12 5 12 5s-6.25 0-7.84.43A2.5 2.5 0 002.4 7.2 26 26 0 002 12a26 26 0 00.4 4.8 2.5 2.5 0 001.76 1.77C5.75 19 12 19 12 19s6.25 0 7.84-.43a2.5 2.5 0 001.76-1.77A26 26 0 0022 12a26 26 0 00-.4-4.8zM10 15.2V8.8l5.2 3.2-5.2 3.2z"/></svg></span>' +
        '<span class="yt-txt"><h4>' + esc(m.titulo) + nome + '</h4>' +
        '<span class="yt-artista">' + esc(m.artista || S.ARTISTA_NOME) + '</span>' +
        '<span class="yt-go">▶ Assistir no YouTube</span></span></a>';
    }).join('');
  }

  /* ============================================================
     GALERIA + LIGHTBOX
     ============================================================ */
  var fotos = S.FOTOS || [];
  var gctx = $('#galeriaConteudo');
  if (gctx) {
    gctx.innerHTML = fotos.map(function (f, i) {
      var mid = f.src
        ? '<img src="' + esc(f.src) + '" alt="' + esc(f.alt || '') + '" loading="lazy" style="width:100%;height:100%;object-fit:cover">'
        : '<div class="ph"><div class="ph-txt">Foto ' + ('0' + (i + 1)).slice(-2) + '<br><b>' + esc(f.legenda || '') + '</b></div></div>';
      return '<figure class="foto g' + (i + 1) + '" data-legenda="' + esc(f.legenda || '') + '" data-src="' + esc(f.src || '') + '">' +
        mid +
        '<span class="zoom"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="6.6" stroke="currentColor" stroke-width="1.6"/><path d="M15.8 15.8L20 20M11 8.6v4.8M8.6 11h4.8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg></span>' +
        '<span class="rot">' + esc(f.legenda || '') + '</span></figure>';
    }).join('');
  }

  /* Feed Instagram (mesma base de fotos, se houver) */
  var igctx = $('#igFeed');
  if (igctx) {
    var igFotos = S.INSTAGRAM_POSTS || [];
    if (igFotos.length) {
      igctx.innerHTML = igFotos.map(function (f) {
        return '<a class="ig-item" href="' + esc(f.url || S.INSTAGRAM_URL || '#') + '" target="_blank" rel="noopener"><img src="' + esc(f.src) + '" alt="' + esc(f.alt || 'Instagram') + '" loading="lazy" style="width:100%;height:100%;object-fit:cover"></a>';
      }).join('');
    } else {
      igctx.innerHTML = '<div class="ig-item"><div class="ph"><div class="ph-txt">Feed<br><b>[fotos em config.js]</b></div></div></div>' +
                        '<div class="ig-item"><div class="ph"><div class="ph-txt">Reels<br><b>[fotos em config.js]</b></div></div></div>' +
                        '<div class="ig-item"><div class="ph"><div class="ph-txt">Shows<br><b>[fotos em config.js]</b></div></div></div>';
    }
  }

  /* Lightbox */
  var fotoEls = Array.prototype.slice.call(document.querySelectorAll('.foto'));
  var lb = $('#lightbox'), lbCont = $('#lbConteudo'), lbLeg = $('#lbLegenda');
  var lbFechar = $('#lbFechar'), lbPrev = $('#lbPrev'), lbNext = $('#lbNext');
  var atual = 0;

  function mostrar(i) {
    if (!fotoEls.length || !lbCont) return;
    atual = (i + fotoEls.length) % fotoEls.length;
    var f = fotoEls[atual];
    var src = f.getAttribute('data-src');
    lbCont.innerHTML = src
      ? '<img src="' + esc(src) + '" alt="' + esc(f.getAttribute('data-legenda') || '') + '">'
      : '<div class="ph"><div class="ph-txt">Imagem ' + (atual + 1) + '<br><b>[substituir em config.js]</b></div></div>';
    if (lbLeg) lbLeg.textContent = f.getAttribute('data-legenda') || '';
  }
  function abrirLb(i) { mostrar(i); if (lb) lb.classList.add('aberto'); document.body.style.overflow = 'hidden'; }
  function fecharLb() { if (lb) lb.classList.remove('aberto'); document.body.style.overflow = ''; }

  fotoEls.forEach(function (f, i) { f.addEventListener('click', function () { abrirLb(i); }); });
  if (lbFechar) lbFechar.addEventListener('click', fecharLb);
  if (lbPrev) lbPrev.addEventListener('click', function () { mostrar(atual - 1); });
  if (lbNext) lbNext.addEventListener('click', function () { mostrar(atual + 1); });
  if (lb) lb.addEventListener('click', function (e) { if (e.target === lb) fecharLb(); });

  document.addEventListener('keydown', function (e) {
    if (!lb || !lb.classList.contains('aberto')) return;
    if (e.key === 'Escape') fecharLb();
    if (e.key === 'ArrowLeft') mostrar(atual - 1);
    if (e.key === 'ArrowRight') mostrar(atual + 1);
  });

  var x0 = null;
  if (lb) {
    lb.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (x0 === null) return;
      var d = e.changedTouches[0].clientX - x0;
      if (Math.abs(d) > 55) mostrar(d > 0 ? atual - 1 : atual + 1);
      x0 = null;
    }, { passive: true });
  }

  /* ============================================================
     AGENDA
     ============================================================ */
  var actx = $('#agendaConteudo');
  if (actx) {
    var evs = S.AGENDA || [];
    if (evs.length) {
      actx.innerHTML = '<div class="lista-agenda rev on">' + evs.map(function (e) {
        var ing = e.ingresso ? '<a href="' + esc(e.ingresso) + '" class="btn btn-linha" target="_blank" rel="noopener">Ingresso</a>' : '<a href="#contratacao" class="btn btn-linha">Saiba mais</a>';
        return '<article class="evento"><div class="ev-data"><span class="dia">' + esc(e.dia || '00') +
          '</span><span class="mes">' + esc(e.mes || '') + '</span></div>' +
          '<div class="ev-info"><h4>' + esc(e.evento || '') + '</h4><div class="local">' +
          '<i><svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-5.6 7-11a7 7 0 10-14 0c0 5.4 7 11 7 11z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.5"/></svg>' + esc(e.local || '') + '</i>' +
          '<span class="sep"></span><i>' + esc((e.cidade || '') + (e.uf ? ' / ' + e.uf : '')) + '</i>' +
          (e.hora ? '<span class="sep"></span><i>' + esc(e.hora) + '</i>' : '') +
          '</div></div>' + ing + '</article>';
      }).join('') + '</div>';
    } else {
      actx.innerHTML = '<div class="agenda-vazia rev on">' +
        '<svg class="coroa" width="56" height="34" viewBox="0 0 56 34" fill="none" aria-hidden="true"><path d="M4 28l6-17 8 10 10-17 10 17 8-10 6 17H4z" stroke="#C9A227" stroke-width="1.4" stroke-linejoin="round"/><circle cx="4" cy="9" r="2.4" fill="#E7C766"/><circle cx="28" cy="4" r="2.4" fill="#E7C766"/><circle cx="52" cy="9" r="2.4" fill="#E7C766"/></svg>' +
        '<h3>Novos shows em breve</h3>' +
        '<p>Acompanhe as redes sociais do Príncipe para novidades e novas datas.</p>' +
        '<a href="#contratacao" class="btn btn-ouro">Contratar para o seu evento <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></a></div>';
    }
  }

  /* ============================================================
    REDES SOCIAIS: só ativa links confirmados
     ============================================================ */
  var rctx = $('#redesConteudo');
  if (rctx) {
    var icoIG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1.2" fill="currentColor"/></svg>';
    var redes = [
      { nome: 'Instagram', handle: S.INSTAGRAM_HANDLE || '', url: S.INSTAGRAM_URL || '', ico: icoIG },
      { nome: 'YouTube', handle: S.YOUTUBE_HANDLE || '', url: S.YOUTUBE_URL || '', ico: svgYT },
      { nome: 'Spotify', handle: '', url: S.SPOTIFY_URL || '', ico: svgSpotify },
      { nome: 'Deezer', handle: '', url: S.DEEZER_URL || '', ico: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M4 16h3v3H4zM8 13h3v6H8zM12 9h3v10h-3zM16 5h3v14h-3z" fill="currentColor"/></svg>' },
      { nome: 'Apple Music', handle: '', url: S.APPLE_MUSIC_URL || '', ico: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 18V6l10-2v12" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="6.5" cy="18" r="2.5" stroke="currentColor" stroke-width="1.6"/><circle cx="16.5" cy="16" r="2.5" stroke="currentColor" stroke-width="1.6"/></svg>' },
      { nome: 'Amazon Music', handle: '', url: S.AMAZON_MUSIC_URL || '', ico: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M9 17V7.5l9-1.8V15" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="7" cy="17" r="2.2" stroke="currentColor" stroke-width="1.6"/><circle cx="16" cy="15.2" r="2.2" stroke="currentColor" stroke-width="1.6"/></svg>' },
      { nome: 'TikTok', handle: '', url: S.TIKTOK_URL || '', ico: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 3h2.5c.4 1.8 1.6 3 3.5 3.3v2.4c-1.3.1-2.5-.2-3.6-.9v6.1a5.3 5.3 0 11-5.3-5.3c.2 0 .5 0 .7.1v2.4a2.9 2.9 0 102 2.8V3z"/></svg>' },
      { nome: 'Facebook', handle: '', url: S.FACEBOOK_URL || '', ico: '<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2 0-3.5 1.5-3.5 3.5V11H8v3h2.5v7h3v-7H16l.5-3h-3V9.5c0-.3.2-.5.5-.5z"/></svg>' }
    ];
    rctx.innerHTML = redes.map(function (r) {
      if (r.url) {
        return '<a href="' + esc(r.url) + '" class="rede" target="_blank" rel="noopener"><span class="ico">' + r.ico + '</span><b>' + esc(r.nome) + '</b><span>' + esc(r.handle || 'Perfil oficial') + '</span></a>';
      }
      return '<span class="rede rede-off" aria-disabled="true"><span class="ico">' + r.ico + '</span><b>' + esc(r.nome) + '</b><span>[link a confirmar]</span></span>';
    }).join('');
  }

  /* ============================================================
     CONTATO (shows / imprensa / parcerias / redes)
     ============================================================ */
  var cctx = $('#contatoConteudo');
  if (cctx) {
    var icoZap = '<svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.1a8.1 8.1 0 01-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8.1 8.1 0 1112 20.1zm4.5-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 01-3.2-2.8c-.1-.2 0-.4.1-.5l.4-.5c.1-.2.1-.3 0-.5l-.7-1.7c-.2-.4-.4-.4-.5-.4h-.5a1 1 0 00-.7.3c-.3.3-.9.9-.9 2.1s.9 2.5 1 2.6a9.3 9.3 0 003.6 3.2c1.5.6 1.8.5 2.2.5s1.4-.6 1.6-1.1c.2-.6.2-1 .1-1.1z"/></svg>';
    var icoMail = '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M4 7l8 6 8-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    var itens = [
      { b: 'Assessoria', svg: icoZap, txt: S.WHATSAPP ? '(81) 8467-9901' : 'WhatsApp: [a confirmar]', href: S.WHATSAPP ? 'https://wa.me/' + esc(S.WHATSAPP) : '#contratacao' }
    ];
    cctx.innerHTML = itens.map(function (c) {
      return '<a href="' + c.href + '" class="contato" ' + (c.href.indexOf('http') === 0 ? 'target="_blank" rel="noopener"' : '') + '>' + c.svg + '<b>' + esc(c.b) + '</b><span>' + c.txt + '</span></a>';
    }).join('');
  }

  /* ============================================================
     FORMULÁRIO DE CONTRATAÇÃO
     ============================================================ */
  var form = $('#formContratacao');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var aviso = $('#formAviso');
      var dados = {};
      new FormData(form).forEach(function (v, k) { dados[k] = v; });
      if (!dados.nome || !dados.whatsapp || !dados.email) {
        if (aviso) { aviso.textContent = 'Preencha nome, WhatsApp e-mail.'; aviso.classList.add('erro'); }
        return;
      }
      var linhas = ['Contratação: ' + (S.ARTISTA_NOME || 'O Príncipe do Brega'), ''];
      [['nome', 'Nome'], ['empresa', 'Empresa/Evento'], ['whatsapp', 'WhatsApp'], ['email', 'E-mail'], ['cidade', 'Cidade'], ['data', 'Data'], ['tipo', 'Tipo'], ['mensagem', 'Mensagem']].forEach(function (p) {
        if (dados[p[0]]) linhas.push(p[1] + ': ' + dados[p[0]]);
      });
      var texto = linhas.join('\n');

      if (S.FORM_ACTION) {
        fetch(S.FORM_ACTION, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } })
          .then(function () { if (aviso) { aviso.classList.remove('erro'); aviso.textContent = 'Solicitação enviada. Obrigado!'; form.reset(); } })
          .catch(function () { if (aviso) { aviso.classList.add('erro'); aviso.textContent = 'Não foi possível enviar. Tente o WhatsApp.'; } });
      } else if (S.WHATSAPP) {
        window.open('https://wa.me/' + S.WHATSAPP + '?text=' + encodeURIComponent(texto), '_blank', 'noopener');
        if (aviso) { aviso.classList.remove('erro'); aviso.textContent = 'Abrindo o WhatsApp com sua solicitação...'; }
      } else if (S.EMAIL || S.BOOKING_EMAIL) {
        window.location.href = 'mailto:' + (S.EMAIL || S.BOOKING_EMAIL) + '?subject=' + encodeURIComponent('Contratação: O Príncipe do Brega') + '&body=' + encodeURIComponent(texto);
        if (aviso) { aviso.classList.remove('erro'); aviso.textContent = 'Abrindo seu e-mail...'; }
      } else {
        if (aviso) { aviso.classList.remove('erro'); aviso.textContent = 'Contato oficial ainda não cadastrado. Em breve divulgaremos os canais de contratação.'; }
      }
    });
  }

  /* ============================================================
     NAVEGAÇÃO / MENU / PARALLAX / REVELAÇÃO
     ============================================================ */
  var nav = $('#nav'), zap = $('#flutuaZap');

  function aoRolar() {
    var y = window.scrollY;
    if (nav) nav.classList.toggle('solido', y > 60);
    if (zap) zap.classList.toggle('on', y > 600);
    parallax();
    marcarMenu();
  }

  var burger = $('#burger'), mobile = $('#mobile');
  function fecharMobile() {
    if (!mobile) return;
    mobile.classList.remove('aberto');
    if (burger) { burger.classList.remove('aberto'); burger.setAttribute('aria-expanded', 'false'); }
    document.body.style.overflow = '';
  }
  if (burger && mobile) {
    burger.addEventListener('click', function () {
      var abrindo = !mobile.classList.contains('aberto');
      mobile.classList.toggle('aberto', abrindo);
      burger.classList.toggle('aberto', abrindo);
      burger.setAttribute('aria-expanded', abrindo ? 'true' : 'false');
      document.body.style.overflow = abrindo ? 'hidden' : '';
    });
    mobile.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', fecharMobile); });
  }

  var secoes = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  var links = Array.prototype.slice.call(document.querySelectorAll('.menu a'));
  function marcarMenu() {
    var pos = window.scrollY + 140, atual = '';
    secoes.forEach(function (s) { if (s.offsetTop <= pos) atual = s.id; });
    links.forEach(function (l) { l.classList.toggle('ativo', l.getAttribute('href') === '#' + atual); });
  }

  var alvos = document.querySelectorAll('.rev:not(.on)');
  if ('IntersectionObserver' in window && !reduz) {
    var obs = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    alvos.forEach(function (el2) { obs.observe(el2); });
  } else {
    alvos.forEach(function (el2) { el2.classList.add('on'); });
  }

  var paras = document.querySelectorAll('[data-parallax]');
  var ticking = false;
  function parallax() {
    if (reduz || ticking || window.innerWidth < 960) return;
    ticking = true;
    requestAnimationFrame(function () {
      paras.forEach(function (el2) {
        var f = parseFloat(el2.getAttribute('data-parallax')) || 0.04;
        var r = el2.getBoundingClientRect();
        var centro = r.top + r.height / 2 - window.innerHeight / 2;
        el2.style.transform = 'translate3d(0,' + (-centro * f).toFixed(2) + 'px,0)';
      });
      ticking = false;
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      if (href === '#') return;
      var alvo = document.querySelector(href);
      if (!alvo) return;
      e.preventDefault();
      var topo = alvo.getBoundingClientRect().top + window.scrollY - (window.innerWidth > 960 ? 66 : 60);
      window.scrollTo({ top: topo, behavior: reduz ? 'auto' : 'smooth' });
      fecharMobile();
    });
  });

  /* Inicialização */
  ativarPlayers();
  aoRolar();
  window.addEventListener('scroll', aoRolar, { passive: true });
  window.addEventListener('resize', parallax);

})();
