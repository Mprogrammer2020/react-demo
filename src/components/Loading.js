import React from "react";
import { View } from "react-native";
import hoistNonReactStatics from "hoist-non-react-statics";
import Spinner from "react-native-loading-spinner-overlay";

const getDisplayName = WrappedComponent =>
  WrappedComponent.displayName || WrappedComponent.name || "LoadingScreen";

/**
 * Loading hoc, wrap component with a loading overlay
 *
 * @param {*} WrappedComponent the component to wrap with loading overlay
 *
 * usage: export default ComponentA -> export default withLoading(ComponentA)
 *
 * in ComponentA, will be injected with two props: showLoading(), hideLoading()
 *
 * this.props.showLoading() when start fetch data; this.props.hideLoading() when get data/error.
 */
export const withLoading = WrappedComponent => {
  class LoadingScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isLoading: false
      };
      this.hideLoading = this.hideLoading.bind(this);
      this.showLoading = this.showLoading.bind(this);
    }

    clearLoadingTaskId = null;

    showLoading() {
      // only re-render when the screen is not in loading status
      if (!this.state.isLoading) {
        this.setState({
          isLoading: true
        });

        // avoid the non-stop spinner issue
        // if is loading after 12 seconds, then hide it.
        this.clearLoadingTaskId = setTimeout(() => {
          this.hideLoading();
        }, 12000);
      }
    }

    hideLoading() {
      // if it's been called from regular flow,
      // we first revoke the setTimeout clear task if exist
      if (this.clearLoadingTaskId) {
        clearTimeout(this.clearLoadingTaskId);
        this.clearLoadingTaskId = null;
      }

      // only re-render when the screen is in loading status
      if (this.state.isLoading) {
        this.setState({
          isLoading: false
        });
      }
    }

    componentWillUnmount() {
      this.hideLoading();
    }

    render() {
      return (
        <View>
          {this.state.isLoading && <Spinner visible={this.state.isLoading} />}
          <WrappedComponent
            showLoading={this.showLoading}
            hideLoading={this.hideLoading}
            {...this.props}
          />
        </View>
      );
    }
  }

  // bind the static method of wrapped component with the new component as well.
  hoistNonReactStatics(LoadingScreen, WrappedComponent);

  // name for new component
  LoadingScreen.displayName = `WithLoading(${getDisplayName(
    WrappedComponent
  )})`;

  return LoadingScreen;
};
