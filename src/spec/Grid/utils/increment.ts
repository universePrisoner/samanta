interface Node {
	id: string;
	weight: number;
	next: Node | null;
}

export const incrementColumnWidth = (
	list: Node,
	targetNodeId: string
): boolean => {
	let currentCol: Node | null = list;
	let foundNode: Node | null = null;

	while (currentCol && !foundNode) {
		if (currentCol.id === targetNodeId) {
			foundNode = currentCol;
			continue;
		}
		currentCol = currentCol.next;
	}

	if (!foundNode) {
		throw Error(
			'Не нашли такой колонки. Значит между рендерами потеряли данные.'
		);
	}

	if (!foundNode.next) return false;

	if (foundNode.next.weight <= 1) {
		console.info(
			'Следующую колонку нельзя сделать меньше чем 1/12 ширины контейнера'
		);
		return false;
	}

	foundNode.weight += 1;
	foundNode.next.weight -= 1;

	console.info('Расширили ту колонку, на которую кликнули на 1');

	return true;
};
