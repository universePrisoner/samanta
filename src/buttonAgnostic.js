import styled from 'styled-components';

const createBorderStyles = border => {
	const {
		left,
		right,
		top,
		bottom,
	} = border;

	const [w1, w2, w3, w4] = [left.width, right.width, top.width, bottom.width].map(w => {
		const numberW = parseInt(w, 10);

		return !!(numberW) ? `${numberW}px` : w;
	});

	return `
		border-width: ${w1} ${w2} ${w3} ${w4};
		border-style: ${left.style} ${top.style} ${right.style} ${bottom.style};
		border-color: ${left.color} ${top.color} ${right.color} ${bottom.color};
	`;
};

export default styled.button`
	${({border}) => createBorderStyles(border)}
`;
