interface Node {
	id: string;
	weight: number;
	next: Node | null;
}

import { MAX_COL_COUNT } from '../constants';

export const calculateColumnsPercents = (list: Node): string => {
	let currentCol: Node | null = list;
	let colWidths: string = '';

	while (currentCol) {
		const percent: number = parseFloat(
			`${(currentCol.weight / MAX_COL_COUNT) * 100}`
		);

		colWidths += ` ${percent}%`;

		currentCol = currentCol.next;
	}

	return colWidths;
};
