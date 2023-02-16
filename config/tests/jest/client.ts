import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

global.render = render;
global.userEvent = userEvent;
