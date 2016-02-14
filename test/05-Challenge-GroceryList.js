import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import GroceryListPart1 from '../src/05-Challenge-GroceryList-part-1.js';
import GroceryListPart2 from '../src/05-Challenge-GroceryList-part-2.js';
import GroceryListPart3 from '../src/05-Challenge-GroceryList-part-3.js';
import GroceryListPart4 from '../src/05-Challenge-GroceryList-part-4.js';
import {mount} from 'enzyme';

describe("05 - Challenge - Grocery List", () => {
  var component;

  describe("Task #1 - display a list of groceries", () => {

    beforeEach( () => {
      component = mount(<GroceryListPart1 />);
    });

    it('There should be an unordered list of groceries', () => {
      // find li components
      let groceryListItems = component.find('li');
      // get the 
      assert.equal(groceryListItems.length, 1, "There should be exactly one element on the groceries list");

      let groceryItem = groceryListItems.first();
      assert.equal(groceryItem.text(), "Apples", "GroceryItem should render only text inside <li> tag. This text should contain only grocery item name.");
    });
  });

  describe("Task #2 - add a new product to list", () => {

    beforeEach( () => {
      component = mount(<GroceryListPart2 />);
    });

    it('Should render required tags like additional button and input', () => {
      try { component.find(".new-item"); }
      catch(err){
        throw new Error("I can't find new item input");
      }
      try { component.find(".add-product");}
      catch(err){
        throw new Error("I can't find 'Add new Product' button");
      }
    });

    it('adds a new product to the list', () => {
      let newProductInput = component.find('.new-item');
      let newProductAddButton = component.find('.add-product');
      newProductInput.simulate('change', { target: {value: 'Oranges' }});
      newProductAddButton.simulate('click');

      let groceryListItems = component.find("li");
      assert.equal(groceryListItems.length, 2, "There should be exactly two elements on the groceries list");

      let groceryItem = groceryListItems.last();
      assert.equal(groceryItem.text(), "Oranges", "GroceriesListItem should display a grocery name");
    });

    it('is not possible to add an empty element', () => {
      let newProductAddButton = component.find('.add-product');
      newProductAddButton.simulate('click');
      let groceryListItems = component.find("li");

      assert.equal(groceryListItems.length, 1, "There should be exactly one element on the groceries list");
    });
  });

  describe("Task #3 - clearing groceries list", () => {

    beforeEach( () => {
      component = mount(<GroceryListPart3 />);
    });

    it('Should render required tags', () => {
      try { component.find(".clear-list"); }
      catch(err){
        throw new Error("I can't find 'Clear the List' button");
      }
    });

    it('is possible to remove all list items', () => {

      let clearListButton = component.find(".clear-list");
      clearListButton.simulate('click');
      let groceryListItems = component.find("li");

      assert.equal(groceryListItems.length, 0, "There should be exactly zero elements on the groceries list");
    });
  });

  describe("Task #4 - collecting groceries items", () => {

    beforeEach( () => {
      component = mount(<GroceryListPart4 />);
    });

    it('is possible to make the grocery item complete', () => {
      let groceryListItems = component.find("li");
      let groceryItem = groceryListItems.last();
      groceryItem.simulate('click');

      groceryListItems = component.find("li");
      assert.equal(groceryListItems.length, 1, "There should be exactly one element on the groceries list");

      groceryItem = groceryListItems.last();
      assert.equal(groceryItem.prop('className'), "completed", "GroceriesListItem should be completed");
    });
  });
});
