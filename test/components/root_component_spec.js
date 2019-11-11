import React from 'react';
import ReactDOM from 'react-dom';
import {
  renderIntoDocument,
  scryRenderedDOMComponentsWithClass,
  scryRenderedDOMComponentsWithTag,
  Simulate
} from 'react-addons-test-utils';
import {List, Map, fromJS} from 'immutable';
import RootComponent from '../../src/apps/root/index';
import {expect} from 'chai';


describe('打开页面组件测试', () => {

  it('输出打开页面组件', () => {
		
    const component = renderIntoDocument(
      <RootComponent  />
    );
    const spans = scryRenderedDOMComponentsWithTag(component, 'span');
    

    expect(spans.length).to.equal(1);
    
  });
});