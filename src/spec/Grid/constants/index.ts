export interface wObjType {
	id: string;
}

export interface Node {
	id: string;
	weight: number;
	next: Node | null;
	meta: {
		widgets: wObjType[] | null;
	};
}

export const MAX_COL_COUNT = 6;

export const LinkedCols: Node = {
	id: '01',
	weight: 1,
	meta: {
		widgets: null,
	},
	next: {
		id: '02',
		weight: 1,
		meta: {
			widgets: null,
		},
		next: {
			id: '03',
			weight: 1,
			meta: {
				widgets: null,
			},
			next: {
				id: '04',
				weight: 1,
				meta: {
					widgets: null,
				},
				next: null
			},
		},
	},
};
