# Shelf

The Shelf allows users to display a list of products in your store.

## Configuration

The Shelf block is configured using the [Product Summary List](https://vtex.io/docs/components/all/vtex.product-summary/) and the [Slider Layout](https://vtex.io/docs/components/all/vtex.slider-layout/) blocks.

1. Add the `Shelf-components` app to your theme's dependencies on the `manifest.json`:

```diff
  "dependencies": {
+   "vtex.shelf-components": "0.x"
  }
```

2. Add the `default-shelf` into your theme. 

```json
  "store.home": {
    "blocks": [
      "flex-layout.row#shelf",
    ]
  },
  "flex-layout.row#shelf": {
    "children": ["default-shelf"]
  },
```

If you want to further customize your list, you can pass your own `list-context.product-list` as in the example below:

```json
  "store.home": {
    "blocks": [
      "flex-layout.row#shelf",
    ]
  },
  "product-summary.shelf#demo1": {
    "children": [
      "stack-layout#prodsum",
      "product-summary-name",
      "product-rating-inline",
      "product-summary-space",
      "product-summary-price",
      "product-summary-buy-button"
    ]
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
  "list-context.product-list": {
    "blocks": ["product-summary.shelf#demo1"],
    "children": ["slider-layout#demo-products"]
  },
  "flex-layout.row#shelf": {
    "children": ["default-shelf"]
  },
  "default-shelf": {
    "blocks": ["list-context.product-list"]
  }
```

The `list-context.product-list` is the block responsible for performing the GraphQL query that fetches the list of products and its props can be found below:

| Prop name            | Type      | Description                                                                      | Default value      |
| -------------------- | --------- | -------------------------------------------------------------------------------- | ------------------ |
| `category`   | `String` | Category ID of the `Shelf` listed items. For sub-categories, use `/` before the ID to indicate which category it belongs to. For example: `"1/2"`, considering 2 as a sub-category ID)        |  `undefined`              |
| `specificationFilters`     | `Array`  | Specification Filters of the `Shelf` listed items.     | `undefined` |
| `collection` | `String` | Collection ID of the `Shelf` listed items                            | `undefined`              |
| `orderBy`    | `Enum` | Ordination criteria for the `Shelf` listed items. | `undefined`    |
| `hideUnavailableItems` | `boolean` | Whether unavailable items should be hidden (`true`) or not (`false`) | `false` |
| `maxItems`   | `number` | Maximum items fetched to be displayed on the `Shelf`.   | `10`                 |
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

If you want to use the Shelf by sending products from another API, such as a recommendation API, you can simply use the `list-context.product-list-static` block instead of` list-context.product-list` , sending through the props only the array of products you want to display.

## Customization

In order to apply CSS customizations in this and other blocks, follow the instructions given in the recipe on [Using CSS Handles for store customization](https://vtex.io/docs/recipes/style/using-css-handles-for-store-customization).

| CSS Handles           |
| --------------------- |
| `shelfTitleContainer` |
| `shelfTitle`          |
