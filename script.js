let users = [];
let editIndex = null;

document.getElementById('users').addEventListener('submit', function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const status = document.getElementById('status').value;

    if (editIndex !== null) {
        if (status == 0) {
            deletarUsuario(editIndex);
        } else {
            users[editIndex] = {
                nome,
                email,
                senha
            };
            editIndex = null;
        }
    } else {
        const user = {
            nome,
            email,
            senha
        };
        users.push(user);
    }

    atualizarTabela();

    document.getElementById('nome').value = '';
    document.getElementById('email').value = '';
    document.getElementById('senha').value = '';
    document.getElementById('status').value = 1;

    closeModal();
});

function atualizarTabela() {
    const tabela = document.querySelector('.table-container table');
    let linhas = `
        <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th></th>
            <th></th>
        </tr>`;

    users.forEach((user, index) => {
        linhas += `
            <tr>
                <td>${user.nome}</td>
                <td>${user.email}</td>
                <td><i onclick="editarUsuario(${index})" class="fa-solid fa-pen-to-square"></i></td>
                <td><i onclick="deletarUsuario(${index})" class="fa-solid fa-trash"></i></td>
            </tr>`;
    });

    tabela.innerHTML = linhas;
}

function editarUsuario(index) {
    openModal();

    const user = users[index];
    document.getElementById('nome').value = user.nome;
    document.getElementById('email').value = user.email;
    document.getElementById('senha').value = user.senha;
    document.getElementById('status').value = 1;

    editIndex = index;
    document.querySelector('.header-modal h3').textContent = "Editar Usuário";
    document.querySelector('#status').style.display = "initial";
}

function deletarUsuario(index) {
    users = users.filter((user, i) => i !== index);
    atualizarTabela();
}

function openModal() {
    document.querySelector(".add-user-modal").style.display = "initial";
    document.querySelector('.header-modal h3').textContent = "Cadastro de usuário";  // Por padrão, o modal vai ter o título de "Cadastro de Usuários"
}

function closeModal() {
    document.querySelector(".add-user-modal").style.display = "none";
    document.querySelector('#status').style.display = "none";
}
