# GJS = JavaScript + GTK

Para poder utilizar Javascript + Gtk você precisa ter instalado o gjs que vem por padrão na instalação no Gnome ou o cjs que vem com o Cinnamon que é um fork do Gnome.


Depois de ter instalado o gjs para rodar qualquer um dos arquivos basta utilizar os métodos abaixo:

  Método 1:

    // Navegue até a pasta dos aquivos
    cd ~/arquivos/

    // Utilize o gjs ou cjs
    gjs arquivo.js

  Método 2:

    // Adicone permissão de execução no arquivo
    chmod +x arquivo.js

    // Executar o arquivo
    ./arquivo.js

    // Caso nescessário verique a primeira linha do arquivo para ecolher o binario que irá executar o arquivo, se instalou o cjs basta trocar
    #!/usr/bin/gjs por #!/usr/bin/cjs ou vice-versa

### calculadora.js
  É apenas uma calculadora simples que ainda nescessita de melhorias.

### testeWebkit.js
  É um exemplo de como utilizar o webkit para criar web apps ou para coisas mais avançadas
