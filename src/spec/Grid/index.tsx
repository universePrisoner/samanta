import * as React from 'react';
import styled from 'styled-components';

import { RenderedCols } from './RenderedCols/index';

interface IGrid {
	colWidths: string;
}

export const GridWrapper = styled.div<IGrid>`
	display: grid;
	grid-template-rows: auto;
	grid-template-columns: ${({colWidths}) => colWidths};

	height: 100%;
`;

export const Grid = () => {
	const [colTemplate, setColTemplate] = React.useState<string>(
		'25% 25% 25% 25%'
	);

	const handleColChange = React.useCallback(
		({ colWidths }: { colWidths: string }) => {
			setColTemplate(colWidths);
		},
		[]
	);

	return (
		<GridWrapper colWidths={colTemplate}>
			<RenderedCols handleColChange={handleColChange} />
		</GridWrapper>
	);
};
