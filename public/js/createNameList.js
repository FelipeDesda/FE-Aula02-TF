import editNameItem from "./editNameItem.js";

export default function createNameList(name) {

    const liElement = document.createElement("li");
    liElement.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-center");

    liElement.append(document.createTextNode(name));

    const buttonDeleteElement = document.createElement("button");
    buttonDeleteElement.classList.add("btn", "btn-danger", "btn-sm");
    buttonDeleteElement.innerText = "Excluir";
    buttonDeleteElement.addEventListener("click", (event) => {
        event.preventDefault();

        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);

        event.currentTarget.parentElement.remove();
    });
    liElement.append(buttonDeleteElement);

    // listener de edição registrado no li; ignora cliques nos botões
    liElement.addEventListener("click", (event) => {
        console.log("target:", event.target);
        console.log("currentTarget:", event.currentTarget);

        // se o clique veio de um botão, não entra em modo de edição
        if (event.target.tagName === "BUTTON") {
            return;
        }

        // só entra em modo de edição se não houver um input aberto já
        if (event.currentTarget.querySelector("input")) {
            return;
        }

        editNameItem(event.currentTarget);
    });

    return liElement;

}
