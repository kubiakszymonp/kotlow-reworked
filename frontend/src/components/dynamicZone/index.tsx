"use client";

import { componentMap } from "@/api/service/dynamicZone/componentTypes";
import { DynamicComponent } from "@/api/service/dynamicZone/componentTypeInterfaces";

interface DynamicZoneProps {
  components: DynamicComponent[];
}

export const DynamicZone = ({ components }: DynamicZoneProps) => {
  const renderComponent = (component: DynamicComponent, index: number) => {
    const componentName = component.__component;
    const ComponentToRender = componentMap[componentName];

    if (!ComponentToRender) {
      console.warn(`Component "${componentName}" not found in component map`);
      return (
        <div
          key={index}
          style={{
            padding: "1rem",
            background: "#f3f4f6",
            borderRadius: "8px",
            margin: "1rem",
          }}
        >
          <p>Component &quot;{componentName}&quot; not implemented</p>
          <pre style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
            {JSON.stringify(component, null, 2)}
          </pre>
        </div>
      );
    }

    // Transform component data based on type
    const getComponentProps = () => {
      switch (componentName) {
        case "atomic.header":
          return {
            title: component.title,
            subtitle: component.subtitle,
          };
        case "atomic.card":
          return {
            title: component.title,
            shortText: component.shortText,
            image: component.image
              ? {
                  url: component.image || "",
                }
              : undefined,
            linkText: component.linkText,
            linkUrl: component.linkUrl,
          };
        case "atomic.button":
          return {
            text: component.title,
            link: component.linkUrl,
          };
        case "atomic.html-content":
          return {
            content: component.content,
          };
        case "organisms.article-listing":
          return {
            articles: component.articles,
          };
        default:
          return component;
      }
    };

    return (
      <div key={component.id || index} className="dynamic-zone-component my-8">
        <ComponentToRender {...getComponentProps()} />
      </div>
    );
  };

  if (!components.length) {
    return <></>;
  }

  return (
    <div className="dynamic-zone py-8 px-4">
      {components.map((component: unknown, index: number) =>
        renderComponent(component as DynamicComponent, index)
      )}
    </div>
  );
};
