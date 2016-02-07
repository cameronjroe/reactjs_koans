import HelloWorld from '../src/01-HelloWorld.js';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import {
  describeWithDOM,
  mount,
} from 'enzyme';

describeWithDOM("01 - HelloWorld", () => {
  var component;

  beforeEach( () => {
    component = mount(<HelloWorld />);
  });

  it("should complete all tasks", () => {
    var divTags = component.find('div');
    var spanTags = component.find('span');
    
    assert.equal(divTags.length == 0, true, "Your React component shouldn't render any `div` HTML elements")
    assert.equal(spanTags.length == 1, true, "You need to render exactly one `span` HTML element")
    
    assert.equal(spanTags.text(), "Hello World", "You have rendered wrong message in your `span` element");
  })
});
