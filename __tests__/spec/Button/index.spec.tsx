import * as React from 'react';

import { Button } from 'spec/Button';

import '@testing-library/jest-dom';

describe('spec :> Button', function () {
	it('renders', function () {
		render(<Button />);

		expect(1).toEqual(1);
	});
});
