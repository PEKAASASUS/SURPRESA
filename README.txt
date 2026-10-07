SURPRESA ROMÂNTICA — COMO USAR
==============================

1) FOTO
   Coloque a foto dela em assets/foto.jpg (retrato ou paisagem, tanto faz:
   o recorte é automático). Dica: use uma foto com até ~1200 px de largura
   e menos de 500 KB, para abrir rápido no celular.

2) MÚSICA (opcional)
   Coloque um arquivo em assets/musica.mp3. Sem ele, o site funciona normal.
   A música só começa depois do toque em "Abrir".

3) TEXTOS
   Abra script.js e edite a seção "CONFIG" no topo: nome dela, seu nome,
   data, frases, mensagem, caminhos da foto e da música.
   Na seção "TEMPO" você ajusta a duração de cada cena.

4) TESTAR NO COMPUTADOR
   Dê dois cliques em index.html.

5) ENVIAR PELO WHATSAPP
   Para ela abrir, o site precisa estar na internet. Opções gratuitas:
   - Netlify Drop: arraste a pasta "surpresa" em app.netlify.com/drop
   - Cloudflare Pages ou GitHub Pages
   Depois é só mandar o link. A foto fica na pasta do site; nada é coletado.
   Dica: o link fica público para quem o tiver. Não divulgue o endereço.
   Alguns serviços permitem escolher um nome de endereço bonito.

Estrutura:
  index.html   estrutura das telas
  style.css    visual e animações
  script.js    textos, tempos e comportamento
  assets/      foto.jpg e musica.mp3
