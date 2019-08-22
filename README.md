# React Native Sample App
 This is a React Native Sample e-commerce app to buy and sell products.
<p align="center"><img src="https://www.netsetsoftware.com/images2/logonetset.png"></p>
## Checklist 

1. setup the react-native dev/debug env by reference [Dev Setup](#dev-setup)
2. check how we commit/push code by [Github flow](#github-flow)
3. check the code structure and components/tools we used [code docs](./doc.md)

## Dev Setup

### Setup Basic

setup andriod and ios dev env by referencing [React-native guide](https://facebook.github.io/react-native/docs/getting-started) on the `Building Projects with Native Code` tab



```sh
# install react-native cli for the first time
npm install -g react-native-cli

# install for the first time and you everytime you pull code contains new dependence.
npm install 

# test on andriod device/simulator.
react-native run-android

# test on ios device/simulator.
# ignore this if you are not using MacOS
cd ios; pod install; cd ..
react-native run-ios

```

### Hot reloading JS code

https://facebook.github.io/react-native/docs/debugging#automatic-reloading

- manually reload: `⌘R` in the iOS Simulator, or tap `R twice` on andriod
- hot reloading: Andriod `⌘M`, IOS `⌘D` to show the dev menus, then select `enable hot reloading`

### Debug

https://github.com/facebook/react-devtools/tree/master/packages/react-devtools

```
npm install -g react-devtools
react-devtools
```

### Console logs

https://facebook.github.io/react-native/docs/debugging#accessing-console-logs

```
react-native log-android
```

### Unit Test

using JEST for javascript/React level test

https://facebook.github.io/react-native/docs/testing#javascript
```
npm test
```

The tests live in the `__tests__` directories of the files they test


## Github flow
we follow a lightweight, branch-based github flow.

we are using `develop` branch (instead of `master`) as our main branch.
all the code merged/pushed to develop will trigger a new building in CI server.

please push code to the repo **daily** after finish your daily work.
- if you have finished several small user stories/tasks/features in one day, please don't push them together in one big PR.
  **separate** Pull Request for `every feature/user story/sub-task` is more welcome.
  (this way we can `review/revert code` more easily.)
- and if you are working on some `big user story`(eg: if a US involve several screen and modals), you may separate it into several sub-tasks, and then you could push some `runnable` commits to the git daily with sub task.

and we can do everyday building for the app after we all finish.

basically, when you ready to setup a new feature.

```sh
# 1. pull latest code and create new branch
git pull origin develop
git checkout -b feature/${your-name}/${your-feature-name}

# 2. add/modify code for a task/feature, test in local
git commit # ....

# 3. pull latest code, resolve the conflicts , push to server
git pull origin develop # and then edit the conflicts in your editor if exist
# then push your code to feature branch of server
git push origin feature/${your-name}/${your-feature-name}

# 4. finally create a new `Pull Request` again `Develop` branch, and choose reviewer
# `https://github.com/uncircled/toryod/compare/develop...feature/${your-name}/${your-feature-name}`

```



