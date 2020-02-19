import React from 'react';
import renderer from 'react-test-renderer';

import FilePreviewer from '../src/FilePreviewer';

test('todo', () => {
  const component = renderer.create(<FilePreviewer />);

  const tree = component.toJSON();
  return expect(tree).toMatchSnapshot();
});
