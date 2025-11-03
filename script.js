document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.getElementById('formulario-cadastro');
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const mensagemSucesso = document.getElementById('mensagem-sucesso');

    formulario.addEventListener('submit', function(event) {
        // Previne o envio padrão do formulário
        event.preventDefault();

        // Limpa mensagens de erro e sucesso anteriores
        limparMensagensErro();
        mensagemSucesso.textContent = '';
        mensagemSucesso.classList.remove('ativo');
        
        // Variável de controle de validação
        let formularioValido = true;

        // 1. Validação do Campo Nome
        if (nomeInput.value.trim() === '') {
            exibirErro(nomeInput, 'O campo Nome é obrigatório.');
            formularioValido = false;
        } else if (nomeInput.value.trim().length < 3) {
            exibirErro(nomeInput, 'O Nome deve ter pelo menos 3 caracteres.');
            formularioValido = false;
        }

        // 2. Validação do Campo Email
        if (emailInput.value.trim() === '') {
            exibirErro(emailInput, 'O campo E-mail é obrigatório.');
            formularioValido = false;
        } else if (!validarEmail(emailInput.value.trim())) {
            exibirErro(emailInput, 'Por favor, insira um E-mail válido.');
            formularioValido = false;
        }

        // 3. Resultado Final
        if (formularioValido) {
            // Se tudo estiver válido:
            // Simula o envio de dados
            console.log('Formulário Enviado com Sucesso:', {
                nome: nomeInput.value.trim(),
                email: emailInput.value.trim()
            });

            // Exibe mensagem de sucesso e reseta o formulário
            mensagemSucesso.textContent = 'Cadastro realizado com sucesso!';
            mensagemSucesso.classList.add('ativo');
            formulario.reset();
        }
    });

    // Função para exibir a mensagem de erro específica
    function exibirErro(inputElement, mensagem) {
        const campoGrupo = inputElement.closest('.campo-grupo');
        const spanErro = campoGrupo.querySelector('.mensagem-erro');
        
        spanErro.textContent = mensagem;
        spanErro.classList.add('ativo');
        inputElement.classList.add('invalido');
    }

    // Função para limpar todas as mensagens de erro
    function limparMensagensErro() {
        document.querySelectorAll('.mensagem-erro.ativo').forEach(span => {
            span.textContent = '';
            span.classList.remove('ativo');
        });
        document.querySelectorAll('input.invalido').forEach(input => {
            input.classList.remove('invalido');
        });
    }

    // Função auxiliar para validar o formato do Email (regex simples)
    function validarEmail(email) {
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regexEmail.test(email);
    }
});