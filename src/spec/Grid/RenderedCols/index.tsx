import * as React from 'react';
import styled from 'styled-components';

import { MAX_COL_COUNT, LinkedCols, Node, wObjType } from '../constants/index';

import { incrementColumnWidth } from '../utils/increment';
import { incrementColumnWidthWidgetMinCols } from '../utils/increment';
import { calculateColumnsPercents } from '../utils/calculateColumnsPercents';

import { Col } from '../Col/index';

const addWidget = (colId: string, cols: Node) => {
	incrementColumnWidthWidgetMinCols(LinkedCols, colId, 2);
};

interface IRenderedColsProps {
	handleColChange: ({ colWidths }: { colWidths: string }) => void;
}

interface WStorage {
	[key: string]: JSX.Element | null;
}

const widgetsStorage: WStorage = {
	['text-0-0']: function () {
		return <h1>Hello, my dear friend!</h1>;
	},
};

const renderWidgets = (widgets: wObjType[] | null): JSX.Element | null => {
	if (!widgets) return null;

	return (
		<>
			{widgets.map((w: wObjType) => {
				const Component = widgetsStorage[w.id];

				return <Component key={w.id} />;
			})}
		</>
	);
};

export const RenderedCols = (props: IRenderedColsProps) => {
	const { handleColChange } = props;

	let currentCol: Node | null = LinkedCols;
	let elementsToRender = [];

	const onColsChange = () => {
		handleColChange({
			colWidths: calculateColumnsPercents(LinkedCols),
		});
	};

	// временно переделал на добавление виджета
	const increment = (colId: string) => {
		 const success: boolean = incrementColumnWidth(LinkedCols, colId);

		 if (success) onColsChange();

		 console.log(LinkedCols);
	};

	while (currentCol) {
		elementsToRender.push(
			<Col id={currentCol.id} increment={increment} key={currentCol.id}>
				{renderWidgets(currentCol.meta.widgets)}
			</Col>
		);
		currentCol = currentCol.next;
	}

	React.useEffect(() => {
		handleColChange({
			colWidths: calculateColumnsPercents(LinkedCols),
		});
	}, [handleColChange]);

	return <>{elementsToRender}</>;
};
