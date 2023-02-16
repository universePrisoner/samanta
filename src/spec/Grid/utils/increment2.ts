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

	if (!foundNode.next) {
		// если нет предыдущего узла или только голова списка осталась
		if (!prevNode || prevNode === foundNode) {
			console.info('В списке только одна колонка.');
			return false;
		}

		if (prevNode.weight <= 1) {
			prevNode.weight = 0;
		} else {
			prevNode.weight -= 1;
		}

		foundNode.weight += 1;
		console.info('Расширили ту колонку, на которую кликнули на 1');
		return true;
	}

	if (foundNode.next.weight <= 1) {
		foundNode.next = foundNode.next.next;
	} else {
		foundNode.next.weight -= 1;
	}

	foundNode.weight += 1;

	console.info('Расширили ту колонку, на которую кликнули на 1');

	return true;
};
