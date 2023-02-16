import * as React from 'react';
import styled from 'styled-components';

const MAX_COL_COUNT = 12;

interface Node {
	id: string;
	weight: number;
	next: Node | null;
}

export const LinkedCols: Node = {
	id: '01',
	weight: 3,
	next: {
		id: '02',
		weight: 3,
		next: {
			id: '03',
			weight: 3,
			next: {
				id: '04',
				weight: 3,
				next: null,
			},
		},
	},
};

export const Col = styled.div`
	background: #f2f2f2;
	display: block;
	width: 100%;
	box-shadow: 0 0 0 2px green inset;
`;

export const ColInteractive = (props) => {
	const { col, onClick } = props;

	const handleClick = () => onClick(col);

	return <Col onClick={handleClick} />;
};

interface IRenderedColsProps {
	handleColChange: ({ colWidths }: { colWidths: string }) => void;
}

export const RenderedCols = (props: IRenderedColsProps) => {
	const { handleColChange } = props;

	let currentCol: Node | null = LinkedCols;
	let elementsToRender = [];
	let colWidths = '';

	const onColsChange = () => {
		currentCol = LinkedCols;
		colWidths = '';

		while (currentCol) {
			const percent: number = parseFloat(
				`${(currentCol.weight / 12) * 100}`
			);

			colWidths += ` ${percent}%`;

			currentCol = currentCol.next;
		}

		handleColChange({
			colWidths,
		});
	};

	const handleClickOnCol = (col: Node) => {
		currentCol = LinkedCols;
		let foundNode: Node | null = null;

		while (currentCol && !foundNode) {
			if (currentCol.id === col.id) {
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

		if (foundNode.next) {
			if (foundNode.next.weight <= 1) {
				console.info(
					'Следующую колонку нельзя сделать меньше чем 1/12 ширины контейнера'
				);
				return;
			}
			foundNode.weight += 1;
			foundNode.next.weight -= 1;

			console.info('Расширили ту колонку, на которую кликнули на 1');

			onColsChange();
		}
	};

	while (currentCol) {
		const percent: number = parseInt(
			`${(currentCol.weight / 12) * 100}`,
			10
		);

		colWidths += ` ${percent}%`;

		elementsToRender.push(
			<ColInteractive
				col={{
					weight: currentCol.weight,
					id: currentCol.id,
				}}
				onClick={handleClickOnCol}
				key={currentCol.id}
			/>
		);
		currentCol = currentCol.next;
	}

	return <>{elementsToRender}</>;
};
