/* ============================================================
  O PRÍNCIPE DO BREGA: CONFIGURAÇÃO CENTRAL DO SITE
   ------------------------------------------------------------
   Edite SOMENTE este arquivo para atualizar o site.
   Todas as seções (hero, músicas, vídeos, fotos, agenda, redes,
   contato) são geradas a partir daqui pelo script.js.

   REGRA DE CONTEÚDO:
   - Só preencha dados CONFIRMADOS pelo artista/assessoria.
   - Enquanto um dado não existir, deixe a string VAZIA ("") ou
     use o marcador "[[CONFIRMAR]]". Nada é inventado.
   - Campos vazios são renderizados como espaço reservado discreto.
   ============================================================ */

window.SITE = {

  /* ---------- IDENTIDADE ---------- */
  ARTISTA_NOME: "O Príncipe do Brega",
  ARTISTA_NOME_PLATAFORMA: "João Paulo O Príncipe De Brega",
  ARTISTA_NOME_AUTORAL: "João Paulo Lyra Bezerra",
  ARTISTA_CIDADE: "Recife",
  ARTISTA_ESTADO: "Pernambuco",
  ARTISTA_UF: "PE",
  ARTISTA_ANO_BASE: "2026",
  SITE_URL: "https://oprincipeoficial.com.br/", // ajuste para o domínio real ao publicar

  /* ---------- HERO ---------- */
  HERO_FRASE: "O romantismo do brega pernambucano ganha uma nova coroa.",
  FOTO_HERO: "fotos/WhatsApp Image 2026-09-17 at 11.19.56 AM.jpeg",
  FOTO_HERO_ALT: "O Príncipe do Brega em apresentação",

  /* ---------- O PRÍNCIPE (institucional) ---------- */
  SOBRE_SUBTITULO: "Um nome que nasceu da estrada, ganhou significado no palco e hoje representa uma nova fase na música.",
  FOTO_SOBRE: "fotos/{E011AE65-34B0-429D-A24A-3378C634F34B}.png",

  /* Bio institucional (texto oficial fornecido). */
  SOBRE_PARAGRAFOS: [
    "Depois de um período afastado da música, comecei a ouvir de pessoas próximas e admiradores que minha trajetória, marcada por grandes bandas, experiências e referências musicais, poderia representar algo maior. Foi assim, de maneira espontânea, que nasceu o nome **“O Príncipe do Brega”**.",
    "Em 2021, durante a pandemia, decidi retornar à música e comecei a construir um novo projeto artístico. No estúdio, diante da pergunta sobre como essa nova fase se chamaria, a resposta veio naturalmente: **“O Príncipe.”** O apelido deixou de ser apenas uma forma carinhosa de me apresentar e passou a traduzir minha identidade no palco.",
    "Depois de desafios, pausas e muito aprendizado, retorno com mais experiência, preparação e determinação. O nome **“O Príncipe do Brega”** foi oficialmente registrado no **INPI**, consolidando uma marca que nasceu da vivência com o público e da paixão pela música.",
    "Hoje, cada canção e cada apresentação carregam gratidão a Deus, à minha família, aos amigos e a todos que acreditaram nessa história. **O Príncipe do Brega está de volta. E esta história está apenas começando.**"
  ],

  SOBRE_DESTAQUES: [
    { titulo: "Uma história real", texto: "Um nome nascido da trajetória, da experiência e do encontro com o público." },
    { titulo: "Brega com identidade", texto: "Romantismo, paixão e presença de palco em uma assinatura própria." },
    { titulo: "Uma nova fase", texto: "Mais experiência, preparação e música para chegar a novos públicos." }
  ],

  /* ---------- BIOGRAFIA ---------- */
  BIO_TITULO: "Uma história feita de música",
  BIO_PARAGRAFOS: [
    "João Paulo Lyra Bezerra, conhecido artisticamente como João Paulo, O Príncipe do Brega, é cantor e compositor ligado à tradição musical do brega, levando para seus trabalhos a força das canções românticas, da paixão e das histórias que fazem parte da identidade musical de Pernambuco.",
    "Com uma proposta que valoriza a essência do brega e sua conexão direta com o público, João Paulo vem construindo sua trajetória artística através da música e das apresentações, mantendo viva uma sonoridade marcada pela emoção, pelo romantismo e pela proximidade com os fãs.",
    "Entre seus trabalhos recentes está “Eu Grito pro Mundo”, lançamento de 2026, creditado a João Paulo, O Príncipe do Brega e com composição de João Paulo Lyra Bezerra. A música representa uma nova etapa de sua caminhada artística e reforça sua identidade dentro da cena do brega.",
    "Mais do que um nome artístico, O Príncipe do Brega representa uma identidade construída em torno da música, da paixão e da cultura popular. Em cada canção e apresentação, João Paulo busca transformar sentimentos e histórias em música, aproximando o artista do público e fortalecendo sua presença na cena musical.",
    "Sua trajetória continua sendo construída com novos lançamentos, shows e projetos, levando o nome de O Príncipe do Brega para novos públicos e reafirmando seu espaço na música."
  ],

  /* ---------- MÚSICAS (confirme capa, links e player) ---------- */
  MUSICAS: [
    {
      titulo: "Eu Grito pro Mundo",
      artista: "João Paulo O Príncipe De Brega",
      participacao: "Anny Love",
      ano: "2026",
      duracao: "2:57",
      lancamento: "22/08/2026",
      capa: "musica/image.png",
      audio: "",                    // URL .mp3 próprio (opcional)
      youtube: "https://youtu.be/KOc8uvg6ExE?si=IzzcIaA1ZT3J-2Uk",
      spotify: "",                  // só preencha com o link oficial confirmado
      destaque: true
    }
    /* Adicione novas músicas confirmadas seguindo o mesmo formato:
    ,{
      titulo: "",
      artista: "João Paulo O Príncipe De Brega",
      participacao: "",
      ano: "",
      duracao: "",
      capa: "",
      audio: "",
      youtube: "",
      spotify: "",
      destaque: false
    }
    */
  ],

  /* ---------- VÍDEOS DO YOUTUBE ----------
     NUNCA inventar IDs. Deixe "id": "" até ter o ID real. */
  YOUTUBE_URL: "https://www.youtube.com/@oprincipeoficialrecife",
  VIDEOS: [
    { titulo: "ELE SIM ME AMA - O PRÍNCIPE DO BREGA TARDE LEGAL", categoria: "Clipe oficial", id: "OLXRYUccaVI", data: "11/07/2026" },
    { titulo: "MULHER DOS MEUS SONHOS (O PRÍNCIPE FEAT. PANK BREGA)", categoria: "Clipe oficial", id: "fTX01adg7mo", data: "04/09/2021" },
    { titulo: "MORANGO DO NORDESTE", categoria: "Clipe oficial", id: "jsrlggZss9U", data: "11/12/2020" }
  ],

  /* ---------- MÚSICAS NO YOUTUBE (cards) ---------- */
  MUSICAS_YOUTUBE: [
    { titulo: "Eu Grito pro Mundo", artista: "O Príncipe do Brega",
      feat: "Anny Love", url: "https://www.youtube.com/@oprincipeoficialrecife" }
  ],

  /* ---------- FOTOS (galeria / lightbox) ----------
     Coloque os arquivos em img/ e apenas preencha aqui. */
  FOTOS: [
    { src: "", alt: "Show",        legenda: "Show",        categoria: "Shows"     },
    { src: "", alt: "Bastidores",  legenda: "Bastidores",  categoria: "Bastidores"},
    { src: "", alt: "Ensaio",      legenda: "Ensaio",      categoria: "Ensaios"   },
    { src: "", alt: "Divulgação",  legenda: "Divulgação",  categoria: "Divulgação"},
    { src: "", alt: "Público",     legenda: "Público",     categoria: "Público"   },
    { src: "", alt: "Palco",       legenda: "Palco",       categoria: "Shows"     },
    { src: "", alt: "Artista",     legenda: "Artista",     categoria: "Artista"   },
    { src: "", alt: "Noite",       legenda: "Noite",       categoria: "Shows"     },
    { src: "", alt: "Retrato",     legenda: "Retrato",     categoria: "Artista"   },
    { src: "", alt: "Camarim",     legenda: "Camarim",     categoria: "Bastidores"}
  ],

  /* ---------- AGENDA ----------
     Quando vazio, o site exibe "Novos shows em breve". */
  AGENDA: [
    /* ,{ dia:"", mes:"", evento:"", local:"", cidade:"", uf:"", hora:"", ingresso:"" }
    */
  ],

  /* ---------- REDES / PLATAFORMAS ---------- */
  INSTAGRAM_URL: "https://www.instagram.com/oprinciperecifeoficial/",
  INSTAGRAM_HANDLE: "@oprinciperecifeoficial",
  INSTAGRAM_POSTS: [
    { src: "instagram/image.png", alt: "O Príncipe do Brega", url: "https://www.instagram.com/reel/Da9ZBuRuRuj/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
    { src: "instagram/imagem.png", alt: "O Príncipe do Brega no palco", url: "https://www.instagram.com/p/DZ1Q3rbuPPx/?utm_source=ig_web_copy_link&stkn=MzRlODBiNWFlZA==" },
    { src: "instagram/{8FC2DFAB-1D4A-423D-90ED-FBFE938E42CE}.png", alt: "O Príncipe do Brega com convidada", url: "" }
  ],
  YOUTUBE_HANDLE: "@oprincipeoficialrecife",
  SPOTIFY_URL: "",
  DEEZER_URL: "",
  APPLE_MUSIC_URL: "",
  AMAZON_MUSIC_URL: "",
  TIKTOK_URL: "",
  FACEBOOK_URL: "",

  /* ---------- CONTATO / CONTRATAÇÃO ----------
     Deixe vazio até o contato oficial ser fornecido. */
  WHATSAPP: "558184679901",
  EMAIL: "",
  BOOKING_EMAIL: "",
  EMPRESA: "",
  PRENSA_EMAIL: "",
  PARCERIAS_EMAIL: "",

  /* ---------- FORMULÁRIO ---------- */
  FORM_ACTION: ""               // ex.: endpoint Formspree; vazio = monta via WhatsApp/e-mail se disponíveis
};
