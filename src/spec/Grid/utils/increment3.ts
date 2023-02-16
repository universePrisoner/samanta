// тестовый модуль для того, что бы можно было
// увеличивать колонку на минимальное количество колонок виджета
interface Node {
	id: string;
	weight: number;
	next: Node | null;
}

const breakTeeth = (list: Node, targetNode: Node, minCols: number) => {
	let currentCol: Node | null = list;
	// если виджет занимает меньше колонок , чем уже есть у колонки, то ничего не делаем
	const widgetNotFatEnoughToExtend = minCols - targetNode.weight <= 0;

	if (!currentCol.next || widgetNotFatEnoughToExtend) {
		console.info('WIdget not fat enough to extend current column');
		console.info('Or we have only one column and it is fatest');
		return;
	}

	const howManyColumnsWidgetNeeds = minCols - targetNode.weight;

	let counter = 0;
	// для простоты сначала предполагаем что находимся
	// в первой колонке из 12 и пытаемся в нее добавить виджет
	// 1. все колонки пустые
	// 2. в следующей есть виджет
	// 3. через одну есть виджет
	// 4. на самой последней есть виджет
	// 5. в первой колонке есть еще один виджет
	while (currentCol && counter < howManyColumnsWidgetNeeds) {
		currentCol = currentCol.next;
	}
};

export const incrementColumnWidthWidgetMinCols = (
	list: Node,
	targetNodeId: string,
	minCols: number
): boolean => {
	let currentCol: Node | null = list;
	let foundNode: Node | null = null;
	let prevNode: Node | null = null;

	while (currentCol && !foundNode) {
		if (currentCol.id === targetNodeId) {
			foundNode = currentCol;
			continue;
		}

		prevNode = currentCol;
		currentCol = currentCol.next;
	}

	if (!foundNode) {
		throw Error(
			'Не нашли такой колонки. Значит между рендерами потеряли данные.'
		);
	}

	breakTeeth(list, foundNode, minCols);

	/*
	 *
	 */
	/*
	 *console.info('Расширили ту колонку, на которую кликнули на 1');
	 */

	return true;
};
