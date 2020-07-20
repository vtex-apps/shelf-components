📢 Use this project, [contribute](https://github.com/vtex-apps/shelf-components) to it or open issues to help evolve it. 

# Default Shelf

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

The `default-shelf` block allows users to display a list of products in your store.

## Configuration

1. Import the `vtex.shelf-components` app to your theme's dependencies in the `manifest.json`;

```diff
  "dependencies": {
+   "vtex.shelf-components": "0.x"
  }
```

2. Also add the `ProductSummary` and `Slider-Layout` apps to your theme's dependencies on the `manifest.json`:

```diff
  "dependencies": {
+   "vtex.product-summary": "2.x",
+   "vtex.slider-layout": "0.x"
  }
```

3. Add the `default-shelf` into your theme passing the `product-summary.shelf` and `slider-layout` as in the example below:

```json
  "store.home": {
    "blocks": [
      "flex-layout.row#default-shelf",
    ]
  },
  "flex-layout.row#default-shelf": {
    "children": ["default-shelf"]
  },
  "default-shelf": {
    "blocks": ["product-summary.shelf"],
    "children": ["slider-layout#demo-products"],
    "props": {
      "orderBy": "OrderByTopSaleDESC"
    }
  },
  "slider-layout#demo-products": {
    "props": {
      "itemsPerPage": {
        "desktop": 5,
        "tablet": 3,
        "phone": 1
      },
      "infinite": true,
      "fullWidth": false
    }
  },
```

| Prop name            | Type      | Description                                                                      | Default value      |
| -------------------- | --------- | -------------------------------------------------------------------------------- | ------------------ |
| `category`   | `String` | Category ID of the `Shelf` listed items. For sub-categories, use `/` before the ID to indicate which category it belongs to. For example: `"1/2"`, considering 2 as a sub-category ID)        |  `undefined`              |
| `specificationFilters`     | `Array`  | Specification Filters of the `Shelf` listed items.     | `undefined` |
| `collection` | `String` | Collection ID of the `Shelf` listed items                            | `undefined`              |
| `orderBy`    | `Enum` | Ordination criteria for the `Shelf` listed items. | `undefined`    |
| `hideUnavailableItems` | `boolean` | Whether unavailable items should be hidden (`true`) or not (`false`) | `false` |
| `maxItems`   | `number` | Maximum items fetched to be displayed on the `Shelf`.   | `10`                 |
| `skusFilter` | `Enum` | Whether the total price of items added to the cart should be displayed (`true`) or not (`false`).                 | `ALL_AVAILABLE`              |
| `installmentCriteria`  | `Enum` | Whether the Buy Button should add products to the minicart when clicked on (`true`) or not (`false`).         | `MAX_WITHOUT_INTEREST`          |

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
