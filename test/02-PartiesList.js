import PartiesList from '../src/02-PartiesList.js';
import TestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import {
  mount,
} from 'enzyme';


describe("02 - Parties List", () => {
  var component;

  beforeEach( () => {
    component = mount(<PartiesList />);
  });

  describe("should complete all tasks", () => {
    it("Task #1: Party hard - have more than 1 party on party list", () => {
      // grab a ul
      var lists = component.find('ul');
      
      // make sure we have 1 list item
      assert.equal(lists.length, 1, "You must render an `ul` HTML list");

      // get the first list and grab the lis
      var list = lists[0];
      var parties = component.find('li');

      // make sure we have more than 1
      assert.equal(parties.length > 1, true, "You have only one party on the list. Add one more party to the list.");
    });

    it("Task #2: List has proper class attribute", () => {
      var list = component.find('ul');

      // make sure we have the right parties-list className
      assert.equal(list.prop('className'), 'parties-list', "`ul` element rendered by React should have `className` attribute `parties-list`");
    });
  });

});
