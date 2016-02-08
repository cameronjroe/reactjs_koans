import LifecycleMethodsComponent from '../src/07-LifecycleMethods.js';
import sinon from 'sinon';
import ReactDOM from 'react-dom';

xdescribe("07 - Lifecycle methods", () => {
  var component;

  describe("Task #1 - emit a console log when the component mounts", () => {
    it("should emit 'I'm mounted!' in developer's console", () => {
      var mock = sinon.mock(console);
      mock.expects("log").once().withArgs("I'm mounted!");

      var rootNode = document.body.appendChild(document.createElement('div'));
      ReactDOM.render(React.createElement(LifecycleMethodsComponent), rootNode);
      mock.verify();
    });
  });

  describe("Task #2 - emit a console log when the component updates", () => {
    it("should emit 'Updated!' in developer's console", () => {
      var rootNode = document.body.appendChild(document.createElement('div'));
      var component = ReactDOM.render(React.createElement(LifecycleMethodsComponent), rootNode);

      var mock = sinon.mock(console);
      mock.expects("log").exactly(2).withArgs("Updated!");

      component.setState({ name: "Victor" });
      component.forceUpdate();

      mock.verify();
    });
  });

  describe("Task #3 - emit a console log when the component unmounts", () => {
    it("should emit 'Goodbye, cruel world! :(' in developer's console", () => {
      var rootNode = document.body.appendChild(document.createElement('div'));
      var component = ReactDOM.render(React.createElement(LifecycleMethodsComponent), rootNode);

      var mock = sinon.mock(console);
      mock.expects("log").once().withArgs("Goodbye, cruel world! :(");
      ReactDOM.unmountComponentAtNode(rootNode);
      mock.verify();
    });
  });
});
