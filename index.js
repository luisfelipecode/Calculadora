// Seleciona o display e todos os botões
const display = document.getElementById('display');
const buttons = document.querySelectorAll('#keys button');

// Função principal que lida com o clique dos botões
function handleButtonClick (value) {
	const actions = {
		'C': clearDisplay,
		'←': deleteLast,
		'=': calculateResult,
		'%': handlePercentage
	};

	// Verifica se a ação existe no dicionário
	// Executa a ação correspondente
	if (actions[value]) {
		actions[value]();
	} else {
		appendToDisplay(value);
	}
}

// Adiciona event listeners para todos os botões
buttons.forEach(button => {
	button.addEventListener('click', () => handleButtonClick(button.textContent));
});

// Função para Limpa o display
function clearDisplay () {
	display.value = '';
}

// Apaga o último caractere do display
function deleteLast () {
	display.value = display.value.slice(0, -1);
}

// Adiciona valor ao display, evitando múltiplos operadores consecutivos
function appendToDisplay (value) {
	const lastChar = display.value.slice(-1);
	if (!(isOperator(value) && isOperator(lastChar))) {
		display.value += value;
	}
}

// Calcula o resultado da expressão no display
function calculateResult () {
	try {
		display.value = eval(display.value.replace(/(\d+(\.\d+)?)%/g, (match, p1) => p1 / 100));
	} catch (error) {
		display.value = 'Erro';
	}
}

// Manipula a operação de porcentagem
function handlePercentage () {
	const expression = display.value;
	const lastChar = expression.slice(-1);

	if (isOperator(lastChar)) return;

	const operatorMatch = expression.match(/(\d+(\.\d+)?)([+\-*/])(\d+(\.\d+)?)$/);

	if (operatorMatch) {
		const [_, num1, , operator, num2] = operatorMatch;
		const percentageValue = parseFloat(num2) / 100 * parseFloat(num1);
		display.value = expression.replace(/(\d+(\.\d+)?)$/, percentageValue);
	} else {
		const currentValue = parseFloat(expression);
		if (!isNaN(currentValue)) {
			display.value = currentValue / 100;
		}
	}
}

// Verifica se o valor é um operador
function isOperator (value) {
	return ['+', '-', '*', '/', '%'].includes(value);
}
