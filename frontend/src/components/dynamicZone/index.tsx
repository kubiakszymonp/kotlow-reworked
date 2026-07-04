import { componentMap } from "@/api/service/dynamicZone/componentTypes";
import { DynamicComponent } from "@/api/service/dynamicZone/componentTypeInterfaces";

interface StrapiMedia {
  url?: string;
  alternativeText?: string;
}

interface DynamicZoneProps {
  components?: DynamicComponent[];
  /**
   * Heading level for the FIRST atomic.header in the zone. Static pages use 1
   * (the CMS header is the page title); the homepage uses 2 (the hero owns h1).
   */
  firstHeadingLevel?: 1 | 2;
}

function resolveCardImage(
  image: unknown
): { url: string; alternativeText?: string } | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return { url: image };
  const media = image as StrapiMedia;
  return media.url
    ? { url: media.url, alternativeText: media.alternativeText }
    : undefined;
}

export const DynamicZone = ({
  components = [],
  firstHeadingLevel = 2,
}: DynamicZoneProps) => {
  if (!components.length) {
    return null;
  }

  const firstHeaderIndex = components.findIndex(
    (component) => component.__component === "atomic.header"
  );

  const renderComponent = (component: DynamicComponent, index: number) => {
    const componentName = component.__component;
    const ComponentToRender = componentMap[componentName];

    if (!ComponentToRender) {
      if (process.env.NODE_ENV === "development") {
        return (
          <div
            key={index}
            className="rounded-lg border border-dashed border-navy-300 bg-navy-50 p-4 text-sm"
          >
            <p>
              Komponent <code>{componentName}</code> nie jest zaimplementowany.
            </p>
            <pre className="mt-2 overflow-x-auto text-xs">
              {JSON.stringify(component, null, 2)}
            </pre>
          </div>
        );
      }
      return null;
    }

    const getComponentProps = () => {
      switch (componentName) {
        case "atomic.header":
          return {
            title: component.title,
            subtitle: component.subtitle,
            level:
              index === firstHeaderIndex ? firstHeadingLevel : (2 as const),
          };
        case "atomic.card":
          return {
            title: component.title,
            shortText: component.shortText,
            image: resolveCardImage(component.image),
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
            title: component.title,
            subtitle: component.subtitle,
            articles: component.articles,
          };
        default:
          return component;
      }
    };

    return (
      <section key={component.id ?? index}>
        <ComponentToRender {...getComponentProps()} />
      </section>
    );
  };

  return (
    <div className="space-y-14">
      {components.map((component, index) => renderComponent(component, index))}
    </div>
  );
};
