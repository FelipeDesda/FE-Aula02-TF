/**
 * Entra no modo de edição de um item da lista.
 *
 * @param {HTMLLIElement} liElement - O elemento <li> que será editado.
 */
export default function editNameItem(liElement) {

    // Recupera o nó de texto (sempre o primeiro filho do li)
    const textNode = liElement.firstChild;
    const currentName = textNode.nodeValue;

    // --- monta o input de edição ---
    const inputElement = document.createElement("input");
    inputElement.setAttribute("type", "text");
    inputElement.setAttribute("value", currentName);
    inputElement.classList.add("form-control", "form-control-sm", "me-2");

    // --- monta o botão "Alterar" ---
    const buttonAlterarElement = document.createElement("button");
    buttonAlterarElement.classList.add("btn", "btn-success", "btn-sm");
    buttonAlterarElement.innerText = "Alterar";

    // --- função que confirma a alteração ---
    function confirmar() {
        const novoNome = inputElement.value.trim();

        // não permite salvar valor vazio
        if (novoNome === "") {
            return;
        }

        // substitui o input pelo nó de texto atualizado
        textNode.nodeValue = novoNome;
        liElement.replaceChild(textNode, inputElement);

        // remove o botão Alterar e reexibe o botão Excluir
        buttonAlterarElement.remove();
        liElement.querySelector(".btn-danger").style.display = "";
    }

    // confirma ao clicar em "Alterar"
    buttonAlterarElement.addEventListener("click", (event) => {
        event.preventDefault();

        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);

        confirmar();
    });

    // desafio: confirma ao pressionar Enter dentro do input
    inputElement.addEventListener("keypress", (event) => {
        if (event.key !== "Enter") {
            return;
        }
        event.preventDefault();
        confirmar();
    });

    // esconde o botão Excluir enquanto está em modo de edição
    liElement.querySelector(".btn-danger").style.display = "none";

    // substitui o nó de texto pelo input
    liElement.replaceChild(inputElement, textNode);

    // insere o botão Alterar antes do botão Excluir
    liElement.insertBefore(buttonAlterarElement, liElement.querySelector(".btn-danger"));

    // coloca o foco no input automaticamente
    inputElement.focus();
}
