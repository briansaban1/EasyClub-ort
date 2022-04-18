import * as React from 'react';

export const navigationRef= React.createRef();
/*
[
    'goBack',
    'navigate',
    'reset',
    'setParams',
    'addListener',
    'removeListener',
    'resetRoot',
    'dispatch',
    'canGoBack',
    'getRootState',
    'dangerouslyGetState',
    'dangerouslyGetParent',
    'getCurrentRoute',
    'getCurrentOptions'
]
*/

export function navigate(name, params = {}) {
  navigationRef.current?.navigate(name, params);
}

export function reset(name, params = {}) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name, params}],
  });
}

export function goBack() {
  if (navigationRef.current?.canGoBack()) {
    navigationRef.current?.goBack();
  }
}
