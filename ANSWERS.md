- [x] Why would you use class component over function components (removing hooks from the question)?
      If hooks did not exist, I would use class component over function components as they hold state and are able to use lifecycle methods.
- [x] Name three lifecycle methods and their purposes.

  - ComponentDidMount:
    componentDidMount() is invoked immediately after a component is mounted (inserted into the tree). Initialization that requires DOM nodes should go here. If you need to load data from a remote endpoint, this is a good place to instantiate the network request.

  - ComponentDidUpdate
    componentDidUpdate() is invoked immediately after updating occurs. This method is not called for the initial render.

  - ComponentWillUnmount
    componentWillUnmount() is invoked immediately before a component is unmounted and destroyed. Perform any necessary cleanup in this method, such as invalidating timers, canceling network requests, or cleaning up any subscriptions that were created in componentDidMount().

  \*ALL ANSWERS DERIVED FROM REACTJS.ORG

- [x] What is the purpose of a custom hook?
      Custom Hooks are a mechanism to reuse stateful logic (such as setting up a subscription and remembering the current value), but every time you use a custom Hook, all state and effects inside of it are fully isolated. Meaning if 2 different components used the hook, they will each have different states. - reactjs.org

- [x] Why is it important to test our apps?
      Creates cleaner code, allows you to really think and plan your code out, future proofs your code by knowing how to target potential issues and pinpoints it via tests, and helps others on a team to understand what should and shouldnt happen in your code.
