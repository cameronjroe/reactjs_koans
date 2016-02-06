import PartiesList from '../src/02-PartiesList.js';

describe("02 - Parties List", () => {
  var component;

  beforeEach( () => {
    // create a div
    var elem = document.createElement('div');
    // append it to the document
    elem = document.body.appendChild(elem);
    // render our component in the div
    return component = React.render(React.createElement(PartiesList), elem);
  });

  afterEach( () => {
    // unmount the component after tests
    React.unmountComponentAtNode(React.findDOMNode(component));
  });

  describe("should complete all tasks", () => {
    it("Task #1: Party hard - have more than 1 party on party list", () => {
      // grab a ul
      var lists = React.addons.TestUtils.scryRenderedDOMComponentsWithTag(component, 'ul');
      // make sure we have 1 list item
      assert.equal(lists.length, 1, "You must render an `ul` HTML list");

      // get the first list and grab the lis
      var list = lists[0];
      var parties = React.addons.TestUtils.scryRenderedDOMComponentsWithTag(list, 'li');

      // make sure we have more than 1
      assert.equal(parties.length > 1, true, "You have only one party on the list. Add one more party to the list.");
    });

    it("Task #2: List has proper class attribute", () => {
      var list = React.addons.TestUtils.findRenderedDOMComponentWithTag(component, 'ul');

      // make sure we have the right parties-list className
      assert.equal(list.props.className, 'parties-list', "`ul` element rendered by React should have `className` attribute `parties-list`");
    });
  });

});
