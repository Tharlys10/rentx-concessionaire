# Cadastro de carro

**RF**
* Deve ser possível cadastrar um novo carro.

**RN**
* Não deve ser possível cadastrar um carro com uma placa já existente.
* O carro deve ser cadastrador, por padrão, como disponivel.
* O usuário responsável pelo cadastro deve ser um usuário administrador.

# Listagem de carros

**RF**
* Deve ser possível listar todos os carros disponiveis
* Deve ser possível listar todos os carros disponiveis pelo id da categoria.
* Deve ser possível listar todos os carros disponiveis pelo nome da marca.
* Deve ser possível listar todos os carros disponiveis pelo nome do carro.

**RN**
* O usuário não precisar estar logado no sistema.

# Cadastro de Especificações no carro

**RF**
* Deve ser possível cadastrar uma espeficificação para um carro.

**RN**
* Não deve ser possível cadastrar uma especificação para um carro não existente.
* Não deve ser possível cadastrar uma especificação já existente para o mesmo carro.
* O usuário responsável pelo cadastro deve ser um usuário administrador.

# Cadastro de imagens do carro

**RF**
* Deve ser possível cadastrar a imagem do carro.

**RNF**
* Utilizar o multer para upload dos arquivos.

**RN**
* O usuário deve poder cadastrar mais de uma imagem para o mesmo carros.
* O usuário responsável pelo cadastro deve ser um usuário administrador.

# Alguel de carro

**RF**
* Deve ser possível cadastrar um aluguel.

**RN**
* O alguel deve ter duração mínima de 24 horas.
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário.
* Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro.
* O usuário deve está logado.
* Ao realiazar um aluguel, o status do carro deverá ser alterado para indisponivel.

# Devolução de carro

**RF**
* Deve ser possível realizar a devolução de um carro.

**RN**
* Se o carro for devolvido com menos de 24 horas, deverá ser cobrado diária complesta.
* Ao realizar a devolução, o carro deverá ser liberado para outro alguel.
* Ao realizar a devolução, o usuário deverá ser liberado para outro alguel.
* Ao realizar a devolução, deverá ser calculado o total do alguel.
* Caso o horário de devolução seja superiro ao horário previsto de entrega, deverá ser cobrado multa proporcional aos dias de atraso.
* Case haja multa, deverá ser somado ao total do aluguel.
* Deve ser possível cadastrar um aluguel.
