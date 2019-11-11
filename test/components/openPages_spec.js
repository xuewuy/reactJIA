import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {List, Map, fromJS} from 'immutable';
import OpenPages from '../../src/components/OpenPages';
import {expect} from 'chai';


describe('打开页面组件测试', () => {

  it('输出打开页面组件', () => {
		const openPages = fromJS({
			'/persons': {
				url: '/persons',
				name: '员工列表'
			}
		})
    const component = renderIntoDocument(
      <OpenPages openPages={openPages}  />
    );
    const spans = scryRenderedDOMComponentsWithTag(component, 'span');
    

    expect(spans.length).to.equal(1);
    
  });
});