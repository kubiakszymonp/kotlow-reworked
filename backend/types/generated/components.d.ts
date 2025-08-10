import type { Schema, Struct } from '@strapi/strapi';

export interface AtomicButton extends Struct.ComponentSchema {
  collectionName: 'components_atomic_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    link: Schema.Attribute.String;
    text: Schema.Attribute.String;
  };
}

export interface AtomicCard extends Struct.ComponentSchema {
  collectionName: 'components_atomic_cards';
  info: {
    displayName: 'card';
  };
  attributes: {
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    linkText: Schema.Attribute.String;
    linkUrl: Schema.Attribute.String;
    shortText: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface AtomicHeader extends Struct.ComponentSchema {
  collectionName: 'components_atomic_headers';
  info: {
    displayName: 'header';
  };
  attributes: {
    subtitle: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface AtomicHtmlContent extends Struct.ComponentSchema {
  collectionName: 'components_atomic_html_contents';
  info: {
    displayName: 'htmlContent';
  };
  attributes: {
    content: Schema.Attribute.RichText &
      Schema.Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'defaultHtml';
        }
      >;
  };
}

export interface NavigationItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_items';
  info: {
    displayName: 'item';
  };
  attributes: {
    link: Schema.Attribute.String;
    name: Schema.Attribute.String;
    subItems: Schema.Attribute.Component<'navigation.sub-item', true>;
  };
}

export interface NavigationSubItem extends Struct.ComponentSchema {
  collectionName: 'components_navigation_sub_items';
  info: {
    displayName: 'subItem';
  };
  attributes: {
    link: Schema.Attribute.String;
    name: Schema.Attribute.String;
  };
}

export interface OrganismsArticleListing extends Struct.ComponentSchema {
  collectionName: 'components_organisms_article_listings';
  info: {
    displayName: 'article listing';
  };
  attributes: {
    articles: Schema.Attribute.Relation<'oneToMany', 'api::article.article'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'atomic.button': AtomicButton;
      'atomic.card': AtomicCard;
      'atomic.header': AtomicHeader;
      'atomic.html-content': AtomicHtmlContent;
      'navigation.item': NavigationItem;
      'navigation.sub-item': NavigationSubItem;
      'organisms.article-listing': OrganismsArticleListing;
    }
  }
}
