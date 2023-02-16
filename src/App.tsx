import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import { Builder } from './Builder';
import { Block, Widget } from './style';

import { Grid } from 'spec/Grid/index';
import StyledButton from './buttonAgnostic';

export const App = () => {
	return (
		<Block>
			<Grid />
		</Block>
	);
};

const schemaBorder = () => {
	const sideSchema = (w, t, c) => ({
		width: w || 'medium',
		style: t || 'none',
		color: c || 'currentcolor',
	});

	return  {
		border: {
			left: sideSchema(),
			top: sideSchema(),
			right: sideSchema(),
			bottom: sideSchema(),
		},
	};
};

const ButtonSchema = () => {
	return {
		customClasses: ['one-custom', 'two-custom'],
		...schemaBorder(),
	};
};
const KindOfMongooseButtonDefault = {
	type: 'button',
	data: {
		...ButtonSchema(),
	},
	insert: [
		{
			type: 'literal',
			data: 'NoWay'
		}
	],
};
const IconSchema = () => {
	return {
		width: 10,
		height: 10,
		color: 'currentcolor',
	};
};
const KindOfMongooseIconDefault = {
	type: 'icon',
	data: {
		...IconSchema(),
	}
};
const AccorderonSchema = () => ({});

const useButtonSchema = dataToOverride => {
	return React.useState({
		...ButtonSchema(),
		...dataToOverride,
	});
};
const useIconSchema = dataToOverride => {
	return React.useState({
		...IconSchema(),
		...dataToOverride,
	});
};
const useAccordeonSchema = dataToOverride => {
	return React.useState({
		...AccorderonSchema(),
		...dataToOverride,
	});
};


const Button = ({ schema, children }) => {
	return (
		<StyledButton
			{...schema}
		>{children}</StyledButton>
	);

};

const Icon = ({schema, children}) => {
	return <div style={{
		width: schema.width,
		height: schema.height,
		backgroundColor: schema.color,
	}}>{children}</div>;
};

const Accordeon = ({ schema, children }) => {
	return (
		<div>
			<div>
				<span>{children[0]}</span>
				{children[1]}
			</div>
			<div>
				{ [...children.slice(2)] }
			</div>
		</div>
	);
};

const element = {
	button: Button,
	icon: Icon,
	accordeon: Accordeon,
	['custom widget']: props => props.children,
};
const schemas = {
	button: useButtonSchema,
	icon: useIconSchema,
	accordeon: useAccordeonSchema,
	['custom widget']: () => [{}],
};
const serverDefaults = {
	button: KindOfMongooseButtonDefault,
	icon: KindOfMongooseIconDefault,
};

const CardSchema = {
	bucket: [
		{
			type: 'button',
			data: {
				...ButtonSchema(),
			},
			insert: [
				{
					type: 'literal',
					data: 'NoWay'
				}
			],
		},
		{
			type: 'button',
			data: {
				...ButtonSchema(),
			},
			insert: [
				{
					type: 'literal',
					data: 'Hi',
				},
				{
					type: 'icon',
					data: {
						...IconSchema(),
						color: 'blue',
					}
				}
			]
		},
		// 1. preset mode - if we have already existed widgets which contain more difficult data structures
		// 2. edit mode - how to apply data to this such of structure
		// 3. create this data structure with handlers on the front-end by api, imagine this is mongoose.schema
		{
			type: 'accordeon',
			data: {
				...AccorderonSchema(),
			},
			insert: [
				{
					type: 'literal',
					data: 'One more way to go to sleep',
				},
				{
					type: 'icon',
					data: {
						...IconSchema(),
						color: 'red',
					}
				},
				{
					type: 'literal',
					data: 'Elit laboriosam alias debitis dolore laboriosam officiis, cupiditate Veniam quae ratione commodi beatae similique? Veritatis nisi repellat facere similique rerum Eligendi aut laboriosam non illo veniam? Obcaecati sunt soluta vero',
				},
			]
		},
		{
			type: 'custom widget',
			data: {},
			insert: [
				{
					type: 'accordeon',
					data: {
						...AccorderonSchema(),
					},
					insert: [
						{
							type: 'literal',
							data: 'My homie',
						},
						{
							type: 'icon',
							data: {
								...IconSchema(),
								color: 'red',
							}
						},
						{
							type: 'literal',
							data: 'Elit laboriosam alias debitis dolore laboriosam officiis, cupiditate Veniam quae ratione commodi beatae similique? Veritatis nisi repellat facere similique rerum Eligendi aut laboriosam non illo veniam? Obcaecati sunt soluta vero',
						},
					]
				},
				{
					type: 'accordeon',
					data: {
						...AccorderonSchema(),
					},
					insert: [
						{
							type: 'button',
							data: {
								...ButtonSchema(),
							},
							insert: [
								{
									type: 'literal',
									data: 'Long story short. Tap on me',
								},
							]
						},
						{
							type: 'icon',
							data: {
								...IconSchema(),
								color: 'red',
							}
						},
						{
							type: 'literal',
							data: 'Elit laboriosam alias debitis dolore laboriosam officiis, cupiditate Veniam quae ratione commodi beatae similique? Veritatis nisi repellat facere similique rerum Eligendi aut laboriosam non illo veniam? Obcaecati sunt soluta vero',
						},
					]
				}
			]
		}
	],
};

function Rendered ({ d }) {
	const Component = element[d.type];
	const [ schema ] = schemas[d.type](d.data);

	return (
		<Component schema={schema} >
		{
			d.insert && !!d.insert.length && (
				d.insert.map(( insertedD, idx ) => {
					if(insertedD.type === 'literal') {
						return insertedD.data;
					}

					return <Rendered d={insertedD} key={`${insertedD.type}_${idx}`} />
				})
			)
		}
		</Component>
	);
};

const BuilderResult = ({ toRender = CardSchema.bucket }) => {

	return <div>
		{CardSchema.bucket.map((d, idx)=> {
			return <Rendered d={d} key={`${d.type}_${idx}`} />
		})}
	</div>;
};
/// custom widget mechanics
const addElementToCustomWidget = (schema, wTypeToAdd) => {
	if(!schema.insert) {
		schema.insert = [];
	}
	
	return {
		...schema,
		insert: [
			...schema.insert,
			serverDefaults[wTypeToAdd],
		]
	};

};
/// end custom widget mechanics

let widgetSchema = {};

{/*
  *const App = () =>  {
  *    const [widgetsToRender, updateWidgetsToRender] = React.useState([]);
  *
  *    const handleCreateWidget = () => {
  *        widgetSchema._id = 'Fuck You, Jerry!';
  *        widgetSchema.type = 'custom widget';
  *        widgetSchema.data = {};
  *        widgetSchema.insert = [
  *            {
  *                type: 'literal',
  *                data: 'Choose element to add into your widget'
  *            }
  *        ];
  *
  *        updateWidgetsToRender([
  *            ...widgetsToRender,
  *            widgetSchema
  *        ]);
  *    };
  *
  *    const handleAddElement = type => {
  *        widgetSchema = addElementToCustomWidget(widgetSchema, type);
  *        updateWidgetsToRender([widgetSchema]);
  *    }
  *
  *    return <div>
  *        <BuilderResult toRender={widgetsToRender} />
  *        <Builder
  *            schema={widgetSchema}
  *            handleAddElement={handleAddElement}
  *            createWidget={handleCreateWidget}
  *        />
  *    </div>
  *};
  */}


export default hot(App);
