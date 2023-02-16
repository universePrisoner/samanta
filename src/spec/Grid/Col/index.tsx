import * as React from 'react';
import styled from 'styled-components';
{
	/*
	 *import { Node } from '../constants/index';
	 */
}

interface ICol {
	id: string;
	increment: (id: string) => void;
	children: JSX.Element | null;
}

export const ColWrapper = styled.div`
	background: #f2f2f2;
	display: block;
	width: 100%;
	box-shadow: 0 0 0 2px green inset;
	transition: all 0.3s ease;

	 {
		/*
	  *.handler {
	  *    opacity: 0;
	  *}
	  */
	}
	&:hover {
		background: azure;

		 {
			/*
		  *.handler {
		  *    opacity: 1;
		  *}
		  */
		}
	}
`;

const HandlerWrapper = styled.div`
	width: 100%;
	position: relative;
	height: 0;

	.handler--incrementer {
		position: absolute;
		left: 50%;
		top: 0;
		transform: translate(-50%, -50%);
		width: 50px;
		height: 2j0px;
		background: green;
		 {
			/*
		  *border-radius: 50%;
		  */
		}
		transition: all 0.3s ease;
		cursor: pointer;
		overflow: hidden;
		color: #fff;
		font-size: 10px;
		display: flex;
		align-items: center;
		justify-content: center;

		 {
			/*
		  *&:hover {
		  *    color: #fff;
		  *    width: 30px;
		  *    height: 30px;
		  *}
		  */
		}
	}
`;

interface IHandlerContainer {
	increment: () => void;
}

const HandlerContainer = ({ increment }: IHandlerContainer) => {
	return (
		<HandlerWrapper className="handler">
			<div className="handler--incrementer" onClick={increment}>
				ДОБАВИТЬ ВИДЖЕТ
				{/*
				 *Шире
				 */}
			</div>
		</HandlerWrapper>
	);
};

export const Col = (props: ICol) => {
	const { id, increment, children } = props;

	const incrementCb = (): void => increment(id);

	return (
		<ColWrapper>
			<HandlerContainer increment={incrementCb} />
			{children}
		</ColWrapper>
	);
};
