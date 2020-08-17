# Refresh Shelf

The Refresh Shelf allows users to display a list of products in your store based on a specific product.

## Configuration

The Refresh Shelf block is configured using the [Product Summary List](https://vtex.io/docs/components/all/vtex.product-summary/) block.

1. Add the `ProductSummary` and `Shelf-Components` apps to your theme's dependencies on the `manifest.json`:

```diff
  "dependencies": {
+   "vtex.product-summary": "2.x",
+   "vtex.shelf-components": "0.x",
  }
```

2. Add the `refresh-shelf` into your theme passing the `product-summary.shelf` as in the example below:

```json
  "store.home": {
    "blocks": [
      "flex-layout.row#refresh-shelf",
    ]
  },
  "product-summary.shelf": {
    "children": [
      "stack-layout#prodsum",
      "product-summary-name",
      "product-rating-inline",
      "product-summary-space",
      "product-summary-price",
      "add-to-cart-button"
    ]
  },
  "flex-layout.row#refresh-shelf": {
    "children": ["refresh-shelf"]
  },
  "refresh-shelf": {
    "blocks": ["product-summary.shelf"],
  }
```

The `refresh-shelf` block props can be found below:

| Prop name                | Type      | Description                                                                      | Default value      |
| ------------------------ | --------- | -------------------------------------------------------------------------------- | ------------------ |
| `baseProductTitle`       | `String`  | Title that will be displayed above the base product        |  `You saw`              |
| `suggestedProductsTitle` | `String`  | Title that will be displayed above the suggested products list     | `Suggested for you` |
| `suggestedLists` | `Array<SuggestedProductsList>` | List that contains the base product and the suggested products ids or the necessary props to query the suggested products | -              |
| `sliderLayout`    | `SliderLayoutProps` | Props for the Slider Layout component | -    |

`SliderLayoutProps`:

| Prop name                | Type  | Description                                                                      | Default value |
| ------------------------ | ----- | -------------------------------------------------------------------------------- | ------ |
| `showNavigationArrows`   | `Enum` | Control when navigation arrows should be rendered. Possible values are: `mobileOnly`, `desktopOnly`, `always`, or `never`. | `always` |
| `showPaginationDots`     | `Enum` | When pagination dots should be rendered. Possible values are: `mobileOnly`, `desktopOnly`, `always`, or `never`. | `always` |

`SuggestedProductsList` props:

| Prop name            | Type      | Description                                                                      | Default value      |
| -------------------- | --------- | -------------------------------------------------------------------------------- | ------------------ |
| `baseProductId`   | `String` | ID of the base product to be displayed on the left side of the `Refresh Shelf` |  `undefined`              |
| `suggestedProductsIds`   | `String` | IDs of the suggested products to be displayed on the right side of the `Refresh Shelf`. The IDs must be separated by a comma (e.g: `1,2,3`) and if this prop is filled, all the other props for the query mentioned below will be ignored. |  `undefined`              |
| `category`   | `String` | Category ID of the `Refresh Shelf` suggested products. For sub-categories, use `/` before the ID to indicate which category it belongs to. For example: `"1/2"`, considering 2 as a sub-category ID)        |  `undefined`              |
| `specificationFilters`     | `Array`  | Specification Filters of the `Refresh Shelf` suggested products.     | `undefined` |
| `collection` | `String` | Collection ID of the `Refresh Shelf` suggested products                            | `undefined`              |
| `orderBy`    | `Enum` | Ordination criteria for the `Refresh Shelf` suggested products. | `undefined`    |
| `hideUnavailableItems` | `boolean` | Whether unavailable items should be hidden (`true`) or not (`false`) | `false` |
| `maxItems`   | `number` | Maximum items fetched to be displayed on the `Refresh Shelf`.   | `10`                 |
| `skusFilter` | `Enum` | Control SKUs returned for each product in the query. The less SKUs needed to be returned, the more performant your shelf query will be.       | `ALL_AVAILABLE`              |
| `installmentCriteria`  | `Enum` | Control what price to be shown when price has different installments options.         | `MAX_WITHOUT_INTEREST`          |

Possible values for `orderBy`:
`OrderByTopSaleDESC`, `OrderByPriceDESC`, `OrderByPriceASC`, `OrderByNameASC`, `OrderByNameDESC`, `OrderByReleaseDateDESC`, `OrderByBestDiscountDESC`.

Possible values for `skusFilter`:
`ALL_AVAILABLE`, `ALL`, `FIRST_AVAILABLE`.

Possible values for `installmentCriteria`:
`MAX_WITHOUT_INTEREST`, `MAX_WITH_INTEREST`.

`specificationFilters` array:

| Prop name   | Type      | Description                               | Default value      |
| ----------- | --------- | ----------------------------------------- | ------------------ |
| `Id`        | `String`  | Specification filters ID                  | `undefined`        |
| `value`     | `String`  | Specification filters values              | `undefined`        |


## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles                       |
| --------------------------------- |
| `refreshProductSummary`           |
| `refreshProductTitleContainer`    |
| `suggestedProductsTitleContainer` |

<!-- DOCS-IGNORE:start -->

## Contributors ✨

Thanks goes to these wonderful people:

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
