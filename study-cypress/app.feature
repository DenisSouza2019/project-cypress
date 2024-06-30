Recurso: Registro de Imagem

  Cenário 1: Enviando uma imagem com entradas inválidas
    Dado que estou na página de registro de imagens
    Quando eu insiro "" no campo de título
    Então eu insiro "" no campo URL
    Então clico no botão enviar
    Então, devo ver a mensagem "Por favor, digite um título para a imagem" acima do campo de título
    E devo ver a mensagem "Digite um URL válido" acima do campo imageUrl
    E devo ver um ícone de exclamação nos campos de título e URL

  Cenário 2: Enviando uma imagem com entradas válidas usando a tecla Enter
    Dado que estou na página de registro de imagens
    Quando eu digito "Alien BR" no campo de título
    Então devo ver um ícone de verificação no campo de título
    Quando eu insiro "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg" no campo URL
    Então devo ver um ícone de verificação no campo imageUrl
    Então posso pressionar Enter para enviar o formulário
    E a lista de imagens cadastradas deverá ser atualizada com o novo item
    E o novo item deve ser armazenado no localStorage
    Então as entradas devem ser limpas

  Cenário 3: Enviando uma imagem e atualizando a lista
    Dado que estou na página de registro de imagens
    Então eu digitei "BR Alien" no campo do título
    Então digitei "https://cdn.mos.cms.futurecdn.net/eM9EvWyDxXcnQTTyH8c8p5-1200-80.jpg" no campo URL
    Quando clico no botão enviar
    E a lista de imagens cadastradas deverá ser atualizada com o novo item
    E o novo item deve ser armazenado no localStorage
    Então as entradas devem ser limpas

  Cenário 4: Atualizando a página após enviar uma imagem clicando no botão enviar
    Dado que estou na página de registro de imagens
    Então enviei uma imagem clicando no botão enviar
    Quando eu atualizo a página
    Então ainda devo ver a imagem enviada na lista de imagens cadastradas
