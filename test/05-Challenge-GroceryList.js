import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import GroceryListPart1 from '../src/05-Challenge-GroceryList-part-1.js';
import GroceryListPart2 from '../src/05-Challenge-GroceryList-part-2.js';
import GroceryListPart3 from '../src/05-Challenge-GroceryList-part-3.js';
import GroceryListPart4 from '../src/05-Challenge-GroceryList-part-4.js';

xdescribe("05 - Challenge - Grocery List", () => {
  var component;

  describe("Task #1 - display a list of groceries", () => {

    beforeEach( () => {
      var elem = document.createElement('div');
      elem = document.body.appendChild(elem);
      component = ReactDOM.render(React.createElement(GroceryListPart1), elem);
    });

    it('There should be an unordered list of groceries', () => {
      let groceryListItems = TestUtils.scryRenderedDOMComponentsWithTag(component, "li");
      assert.equal(groceryListItems.length, 1, "There should be exactly one element on the groceries list");

      let groceryItem = _.first(groceryListItems);
      assert.equal(groceryItem.props.children, "Apples", "GroceryItem should render only text inside <li> tag. This text should contain only grocery item name.");
    });
  });

  describe("Task #2 - add a new product to list", () => {

    beforeEach( () => {
      var elem = document.createElement('div');
      elem = document.body.appendChild(elem);
      component = ReactDOM.render(React.createElement(GroceryListPart2), elem);
    });

    it('Should render required tags like additional button and input', () => {
      try { TestUtils.findRenderedDOMComponentWithClass(component, "new-item");}
      catch(err){
        throw new Error("I can't find new item input");
      }
      try { TestUtils.findRenderedDOMComponentWithClass(component, "add-product");}
      catch(err){
        throw new Error("I can't find 'Add new Product' button");
      }
    });

    it('Should be possible to add a new product to list', () => {
      let newProductInput = TestUtils.findRenderedDOMComponentWithClass(component, "new-item");
      let newProductAddButton = TestUtils.findRenderedDOMComponentWithClass(component, "add-product");
      TestUtils.Simulate.change(newProductInput.getDOMNode(), { target: {value: 'Oranges' }});
      TestUtils.Simulate.click(newProductAddButton.getDOMNode());

      let groceryListItems = TestUtils.scryRenderedDOMComponentsWithTag(component, "li");
      assert.equal(groceryListItems.length, 2, "There should be exactly two elements on the groceries list");

      let groceryItem = _.last(groceryListItems);
      assert.equal(groceryItem.props.children, "Oranges", "GroceriesListItem should display a grocery name");
    });

    it('Should not be possible to add empty element', () => {
      let newProductAddButton = TestUtils.findRenderedDOMComponentWithClass(component, "add-product");
      TestUtils.Simulate.click(newProductAddButton.getDOMNode());
      let groceryListItems = TestUtils.scryRenderedDOMComponentsWithTag(component, "li");

      assert.equal(groceryListItems.length, 1, "There should be exactly one element on the groceries list");
    });
  });

  describe("Task #3 - clearing groceries list", () => {

    beforeEach( () => {
      var elem = document.createElement('div');
      elem = document.body.appendChild(elem);
      component = ReactDOM.render(React.createElement(GroceryListPart3), elem);
    });

    it('Should render required tags', () => {
      try { TestUtils.findRenderedDOMComponentWithClass(component, "clear-list");}
      catch(err){
        throw new Error("I can't find 'Clear the List' button");
      }
    });

    it('Should be possible to remove all list items', () => {
      let clearListButton = TestUtils.findRenderedDOMComponentWithClass(component, "clear-list");
      TestUtils.Simulate.click(clearListButton.getDOMNode());
      let groceryListItems = TestUtils.scryRenderedDOMComponentsWithTag(component, "li");

      assert.equal(groceryListItems.length, 0, "There should be exactly zero elements on the groceries list");
    });
  });

  describe("Task #4 - collecting groceries items", () => {

    beforeEach( () => {
      var elem = document.createElement('div');
      elem = document.body.appendChild(elem);
      component = ReactDOM.render(React.createElement(GroceryListPart4), elem);
    });

    it('Should be possible to make the grocery item complete', () => {
      let groceryListItems = TestUtils.scryRenderedDOMComponentsWithTag(component, "li");
      let groceryItem = _.last(groceryListItems);
      TestUtils.Simulate.click(groceryItem.getDOMNode());

      groceryListItems = TestUtils.scryRenderedDOMComponentsWithTag(component, "li");
      assert.equal(groceryListItems.length, 1, "There should be exactly one element on the groceries list");

      groceryItem = _.last(groceryListItems);
      assert.equal(groceryItem.props.className, "completed", "GroceriesListItem should be completed");
    });
  });
});
