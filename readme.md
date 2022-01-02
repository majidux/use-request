# useRequest

Simple custom hook for handling requests

###### With npm:

```javascript
npm install --save use-request-react-hook
```

###### With yarn:

```javascript
yarn add use-request-react-hook
```

This is how you are going to use it : =>

```javascript
import { useRequest } from 'use-request-react-hook';

const Example = () => {
  const { response, error, isLoading } = useRequest({ url: 'SomeEndpoint' });
  return <div>Example</div>;
};
```
