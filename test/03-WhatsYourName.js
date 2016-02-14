import WhatsYourName from '../src/03-WhatsYourName.js';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import {
  mount,
} from 'enzyme';

describe("03 - What's Your Name?", () => {
  var component;
  var paragraphs;
  var inputs;

  var nameInParagraphEqualsTo = (paragraph, name) => {
    // grab the children paragraphs
    var text = paragraph.text();
    // check the text is the correct
    return _.isEqual(text, `Hello ${ name }`);
  }

  beforeEach( () => {
    component = mount(<WhatsYourName />);
    paragraphs = component.find('p');
    inputs = component.find('input');
  });

  describe("should complete all tasks", () => {
    describe("Task #1 - greet user", () => {
      it("Should change name in paragraph on name change in input", () =>{
        var input     = inputs.first();
        var paragraph = paragraphs.first();
        
        // check that our elements render the right amounts (p, input)
        assert.equal(paragraphs.length, 1, "There should be only one `p` element rendered by the component");
        assert.equal(inputs.length, 1, "There should be only one `input` rendered by the component");
        
        // check that when we change an input, the value paragraph updates properly
        input.simulate('change', {target: { value: "XYZ" } });
        assert.equal(nameInParagraphEqualsTo(paragraph, 'XYZ'), true, "After changing name in input, I should see the change in `p` element's content. In other words: `this.state.name` should change.");
        
        // check that the input changes a second time
        input.simulate('change', {target: { value: "ZYX" } });
        assert.equal(nameInParagraphEqualsTo(paragraph, 'ZYX'), true, "After changing name in input for the second time, we should see the change in `p` element. In other words: `this.state.name` should change.");
      });
    });

    describe("Task #2 - don't greet user if name wasn't provided", () => {
      it("Should display welcoming message if user didn't provide their name", () => {
        var input     = inputs.first();
        var paragraph = paragraphs.first();
        
        // simulate
        input.simulate('change', {target: { value: "" } });
        assert.equal(paragraph.text(), "Hey there. Enter your name.",
          "If user didn't enter the name (`this.state.name` length is 0), show \"Hey there. Enter your name.\". See the hint in task's description."
        );
      });
    });
  });
});
