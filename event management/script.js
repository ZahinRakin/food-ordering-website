document.addEventListener('DOMContentLoaded', () => {
    const mainButton = document.getElementById('mainButton');

    let number = 1;
    let innerButtonsVisible = false;

    mainButton.addEventListener('click', () => {
        if (!innerButtonsVisible) {
            showInnerButtons();
        }
    });

    function showInnerButtons() {
        mainButton.innerHTML = `
            <button id="minusButton" class="inner-button">-</button>
            <span id="numberDisplay">${number}</span>
            <button id="plusButton" class="inner-button">+</button>
        `;

        document.getElementById('minusButton').addEventListener('click', (event) => {
            event.stopPropagation();
            decrementNumber();
        });

        document.getElementById('plusButton').addEventListener('click', (event) => {
            event.stopPropagation();
            incrementNumber();
        });

        innerButtonsVisible = true;
    }

    function incrementNumber() {
        number++;
        document.getElementById('numberDisplay').textContent = number;
    }

    function decrementNumber() {
        if (number > 0) {
            number--;
            document.getElementById('numberDisplay').textContent = number;
        }
        if (number === 0) {
            resetButton();
        }
    }

    function resetButton() {
        mainButton.innerHTML = 'Button';
        innerButtonsVisible = false;
        number = 1;
    }
});
