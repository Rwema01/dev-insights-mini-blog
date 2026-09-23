import { useEffect } from "react";
import type { ComponentType } from "react";

/**
 * Higher-Order Component that logs when the wrapped component
 * mounts and unmounts. Demonstrates the HOC pattern: a function
 * that takes a component and returns a new, enhanced component.
 *
 * Applied to App in main.tsx so the log fires once on initial page load.
 */
function withMountLog<P extends object>(
  WrappedComponent: ComponentType<P>
) {
  const displayName =
    WrappedComponent.displayName || WrappedComponent.name || "Component";

  function WithMountLog(props: P) {
    useEffect(() => {
      console.log(`[withMountLog] ${displayName} mounted`);

      return () => {
        console.log(`[withMountLog] ${displayName} unmounted`);
      };
    }, []);

    return <WrappedComponent {...props} />;
  }

  WithMountLog.displayName = `withMountLog(${displayName})`;

  return WithMountLog;
}

export default withMountLog;