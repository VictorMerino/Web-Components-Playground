/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface MyComponent {
        /**
          * The first name
         */
        "first": string;
        /**
          * The last name
         */
        "last": string;
        /**
          * The middle name
         */
        "middle": string;
    }
    interface VicSideDrawer {
        "open": boolean;
        "sdTitle": string;
    }
}
declare global {
    interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {
    }
    var HTMLMyComponentElement: {
        prototype: HTMLMyComponentElement;
        new (): HTMLMyComponentElement;
    };
    interface HTMLVicSideDrawerElement extends Components.VicSideDrawer, HTMLStencilElement {
    }
    var HTMLVicSideDrawerElement: {
        prototype: HTMLVicSideDrawerElement;
        new (): HTMLVicSideDrawerElement;
    };
    interface HTMLElementTagNameMap {
        "my-component": HTMLMyComponentElement;
        "vic-side-drawer": HTMLVicSideDrawerElement;
    }
}
declare namespace LocalJSX {
    interface MyComponent {
        /**
          * The first name
         */
        "first"?: string;
        /**
          * The last name
         */
        "last"?: string;
        /**
          * The middle name
         */
        "middle"?: string;
    }
    interface VicSideDrawer {
        "open"?: boolean;
        "sdTitle"?: string;
    }
    interface IntrinsicElements {
        "my-component": MyComponent;
        "vic-side-drawer": VicSideDrawer;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "my-component": LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
            "vic-side-drawer": LocalJSX.VicSideDrawer & JSXBase.HTMLAttributes<HTMLVicSideDrawerElement>;
        }
    }
}
