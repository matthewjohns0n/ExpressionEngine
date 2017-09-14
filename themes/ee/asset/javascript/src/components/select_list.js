'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * ExpressionEngine (https://expressionengine.com)
 *
 * @link      https://expressionengine.com/
 * @copyright Copyright (c) 2003-2017, EllisLab, Inc. (https://ellislab.com)
 * @license   https://expressionengine.com/license
 */

var SelectList = function (_React$Component) {
  _inherits(SelectList, _React$Component);

  function SelectList(props) {
    _classCallCheck(this, SelectList);

    // In the rare case we need to force a full-rerender of the component, we'll
    // increment this variable which is set as a key on the root element,
    // telling React to destroy it and start anew
    var _this = _possibleConstructorReturn(this, (SelectList.__proto__ || Object.getPrototypeOf(SelectList)).call(this, props));

    _this.handleSelect = function (event, item) {
      var selected = [],
          checked = event.target.checked;

      if (_this.props.multi) {
        if (checked) {
          selected = _this.props.selected.concat([item]);
          if (_this.props.autoSelectParents) {
            // Select all parents
            selected = selected.concat(_this.getRelativesForItemSelection(item, true));
          }
        } else {
          var values = [item.value];
          if (_this.props.autoSelectParents) {
            // De-select all children
            values = values.concat(_this.getRelativesForItemSelection(item, false));
          }
          selected = _this.props.selected.filter(function (thisItem) {
            // Would use .includes() here but we can't rely on types being
            // the same, so we need to do a manual loose type check
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = values[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                value = _step.value;

                if (value == thisItem.value) return false;
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }

            return true;
          });
        }
      } else {
        selected = [item];
      }

      _this.props.selectionChanged(selected);

      if (_this.props.groupToggle) EE.cp.form_group_toggle(event.target);
    };

    _this.clearSelection = function (event) {
      _this.props.selectionChanged([]);
      event.preventDefault();
    };

    _this.filterChange = function (name, value) {
      _this.props.filterChange(name, value);
    };

    _this.handleToggleAll = function (check) {
      // If checking, merge the newly-selected items on to the existing stack
      // in case the current view is limited by a filter
      if (check) {
        newly_selected = _this.props.items.filter(function (thisItem) {
          found = _this.props.selected.find(function (item) {
            return item.value == thisItem.value;
          });
          return !found;
        });
        _this.props.selectionChanged(_this.props.selected.concat(newly_selected));
      } else {
        _this.props.selectionChanged([]);
      }
    };

    _this.version = 0;
    return _this;
  }

  _createClass(SelectList, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.nestableReorder) {
        this.bindNestable();
      } else if (this.props.reorderable) {
        this.bindSortable();
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (this.props.multi && prevProps.selected.length != this.props.selected.length) {
        $(this.input).trigger('change');
      }

      if (this.props.nestableReorder) {
        this.bindNestable();
      }
    }
  }, {
    key: 'bindSortable',
    value: function bindSortable() {
      var _this2 = this;

      var selector = this.props.nested ? '.field-nested' : '.field-inputs';

      $(selector, this.container).sortable({
        axis: 'y',
        containment: 'parent',
        handle: '.icon-reorder',
        items: this.props.nested ? '> li' : 'label',
        placeholder: 'field-reorder-placeholder',
        sort: EE.sortable_sort_helper,
        start: function start(event, ui) {
          ui.helper.addClass('field-reorder-drag');
        },
        stop: function stop(event, ui) {
          var items = ui.item.closest('.field-inputs').find('label').toArray();

          ui.item.removeClass('field-reorder-drag').addClass('field-reorder-drop');

          setTimeout(function () {
            ui.item.removeClass('field-reorder-drop');
          }, 1000);

          _this2.props.itemsChanged(items.map(function (element) {
            return _this2.props.items[element.dataset.sortableIndex];
          }));
        }
      });
    }
  }, {
    key: 'bindNestable',
    value: function bindNestable() {
      var _this3 = this;

      $(this.container).nestable({
        listNodeName: 'ul',
        listClass: 'field-nested',
        itemClass: 'nestable-item',
        rootClass: 'field-select',
        dragClass: 'field-inputs.field-reorder-drag',
        handleClass: 'icon-reorder',
        placeElement: $('<li class="field-reorder-placeholder"></li>'),
        expandBtnHTML: '',
        collapseBtnHTML: '',
        maxDepth: 10,
        constrainToRoot: true
      }).on('change', function (event) {

        if (!$(event.target).data("nestable")) return;

        // React will not be able to handle Nestable changing a node's children,
        // so force a full re-render if it happens
        _this3.version++;

        var itemsHash = _this3.getItemsHash(_this3.props.items);
        var nestableData = $(event.target).nestable('serialize');

        if (_this3.props.reorderAjaxUrl) {
          $.ajax({
            url: _this3.props.reorderAjaxUrl,
            data: { 'order': nestableData },
            type: 'POST',
            dataType: 'json'
          });
        }
      });
    }
  }, {
    key: 'getItemsHash',
    value: function getItemsHash(items) {
      var _this4 = this;

      var itemsHash = {};
      items.forEach(function (item) {
        itemsHash[item.value] = item;
        if (item.children) itemsHash = Object.assign(itemsHash, _this4.getItemsHash(item.children));
      });
      return itemsHash;
    }
  }, {
    key: 'getItemsArrayForNestable',
    value: function getItemsArrayForNestable(itemsHash, nestable, parent) {
      var _this5 = this;

      var items = [];
      nestable.forEach(function (orderedItem) {
        var item = itemsHash[orderedItem.id];
        var newItem = Object.assign({}, item);
        newItem.parent = parent ? parent : null;
        newItem.children = orderedItem.children ? _this5.getItemsArrayForNestable(itemsHash, orderedItem.children, newItem) : null;
        items.push(newItem);
      });
      return items;
    }
  }, {
    key: 'getRelativesForItemSelection',
    value: function getRelativesForItemSelection(item, checked) {
      var _this6 = this;

      var items = [];
      // If checking, we need to find all unchecked parents
      if (checked && item.parent) {
        while (item.parent) {
          // Prevent duplicates
          // This works ok unless items are selected and then the hierarchy is
          // changed, selected item objects don't have their parents updated
          found = this.props.selected.find(function (thisItem) {
            return thisItem.value == item.parent.value;
          });
          if (found) break;

          items.push(item.parent);
          item = item.parent;
        }
        // If unchecking, we need to find values of all children as opposed to
        // objects because we filter the selection based on value to de-select
      } else if (!checked && item.children) {
        item.children.forEach(function (child) {
          items.push(child.value);
          if (child.children) {
            items = items.concat(_this6.getRelativesForItemSelection(child, checked));
          }
        });
      }
      return items;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this7 = this;

      var props = this.props;
      var tooMany = props.items.length > props.tooMany && !props.loading;
      var shouldShowToggleAll = (props.multi || !props.selectable) && props.toggleAll !== null;
      var shouldShowFieldTools = props.items.length > props.tooMany;

      return React.createElement(
        'div',
        { className: "fields-select" + (tooMany ? ' field-resizable' : ''),
          ref: function ref(container) {
            _this7.container = container;
          }, key: this.version },
        this.props.filterable && React.createElement(
          FieldTools,
          null,
          React.createElement(
            FilterBar,
            null,
            props.filters && props.filters.map(function (filter) {
              return React.createElement(FilterSelect, { key: filter.name,
                name: filter.name,
                title: filter.title,
                placeholder: filter.placeholder,
                items: filter.items,
                onSelect: function onSelect(value) {
                  return _this7.filterChange(filter.name, value);
                }
              });
            }),
            React.createElement(FilterSearch, { onSearch: function onSearch(e) {
                return _this7.filterChange('search', e.target.value);
              } })
          ),
          shouldShowToggleAll && React.createElement('hr', null),
          shouldShowToggleAll && React.createElement(FilterToggleAll, { checkAll: props.toggleAll, onToggleAll: function onToggleAll(check) {
              return _this7.handleToggleAll(check);
            } })
        ),
        React.createElement(
          FieldInputs,
          { nested: props.nested },
          !this.props.loading && props.items.length == 0 && React.createElement(NoResults, { text: props.noResults }),
          this.props.loading && React.createElement(Loading, { text: EE.lang.loading }),
          !this.props.loading && props.items.map(function (item, index) {
            return React.createElement(SelectItem, { key: item.value ? item.value : item.section,
              sortableIndex: index,
              item: item,
              name: props.name,
              selected: props.selected,
              multi: props.multi,
              nested: props.nested,
              selectable: _this7.props.selectable,
              reorderable: _this7.props.reorderable,
              removable: _this7.props.removable,
              editable: _this7.props.editable,
              handleSelect: _this7.handleSelect,
              handleRemove: function handleRemove(e, item) {
                return _this7.props.handleRemove(e, item);
              },
              groupToggle: _this7.props.groupToggle
            });
          })
        ),
        !props.multi && props.selected[0] && React.createElement(SelectedItem, { name: props.name,
          item: props.selected[0],
          clearSelection: this.clearSelection
        }),
        props.multi && this.props.selectable && props.selected.length == 0 && React.createElement('input', { type: 'hidden', name: props.name + '[]', value: '',
          ref: function ref(input) {
            _this7.input = input;
          } }),
        props.multi && this.props.selectable && props.selected.map(function (item) {
          return React.createElement('input', { type: 'hidden', key: item.value, name: props.name + '[]', value: item.value,
            ref: function ref(input) {
              _this7.input = input;
            } });
        })
      );
    }
  }], [{
    key: 'formatItems',
    value: function formatItems(items, parent, multi) {
      if (!items) return [];

      var itemsArray = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = Object.keys(items)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          key = _step2.value;

          if (items[key].section) {
            itemsArray.push({
              section: items[key].section,
              label: ''
            });
          } else {
            // When formatting selected items lists, selections will likely be a flat
            // array of values for multi-select
            var value = multi ? items[key] : key;
            var newItem = {
              value: items[key].value ? items[key].value : value,
              label: items[key].label !== undefined ? items[key].label : items[key],
              instructions: items[key].instructions ? items[key].instructions : '',
              children: null,
              parent: parent ? parent : null
            };

            if (items[key].children) {
              newItem.children = SelectList.formatItems(items[key].children, newItem);
            }

            itemsArray.push(newItem);
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return itemsArray;
    }
  }]);

  return SelectList;
}(React.Component);

SelectList.defaultProps = {
  filterable: false,
  reorderable: false,
  nestableReorder: false,
  removable: false,
  selectable: true,
  tooMany: 8
};


function FieldInputs(props) {
  if (props.nested) {
    return React.createElement(
      'ul',
      { className: 'field-inputs field-nested' },
      props.children
    );
  }

  return React.createElement(
    'div',
    { className: 'field-inputs' },
    props.children
  );
}

var SelectItem = function (_React$Component2) {
  _inherits(SelectItem, _React$Component2);

  function SelectItem() {
    _classCallCheck(this, SelectItem);

    return _possibleConstructorReturn(this, (SelectItem.__proto__ || Object.getPrototypeOf(SelectItem)).apply(this, arguments));
  }

  _createClass(SelectItem, [{
    key: 'checked',
    value: function checked(value) {
      return this.props.selected.find(function (item) {
        return item.value == value;
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      if (this.props.reorderable) this.node.dataset.sortableIndex = this.props.sortableIndex;
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.componentDidMount();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this9 = this;

      var props = this.props;
      var checked = this.checked(props.item.value);

      if (props.item.section) {
        return React.createElement(
          'div',
          { className: 'field-group-head', key: props.item.section },
          props.item.section
        );
      }

      var listItem = React.createElement(
        'label',
        { className: checked ? 'act' : '', ref: function ref(label) {
            _this9.node = label;
          } },
        props.reorderable && React.createElement(
          'span',
          { className: 'icon-reorder' },
          ' '
        ),
        props.selectable && React.createElement('input', { type: props.multi ? "checkbox" : "radio",
          value: props.item.value,
          onChange: function onChange(e) {
            return props.handleSelect(e, props.item);
          },
          checked: checked ? 'checked' : '',
          'data-group-toggle': props.groupToggle ? JSON.stringify(props.groupToggle) : '[]',
          disabled: props.disabled || props.reorderable ? 'disabled' : ''
        }),
        props.editable && React.createElement(
          'a',
          { href: '#' },
          props.item.label
        ),
        !props.editable && props.item.label,
        " ",
        props.item.instructions && React.createElement(
          'i',
          null,
          props.item.instructions
        ),
        props.removable && React.createElement(
          'ul',
          { className: 'toolbar' },
          React.createElement(
            'li',
            { className: 'remove' },
            React.createElement('a', { href: '', onClick: function onClick(e) {
                return props.handleRemove(e, props.item);
              } })
          )
        )
      );

      if (props.nested) {
        return React.createElement(
          'li',
          { className: 'nestable-item', 'data-id': props.item.value },
          listItem,
          props.item.children && React.createElement(
            'ul',
            { className: 'field-nested' },
            props.item.children.map(function (item, index) {
              return React.createElement(SelectItem, _extends({}, props, {
                key: item.value,
                item: item,
                handleRemove: function handleRemove(e, item) {
                  return props.handleRemove(e, item);
                }
              }));
            })
          )
        );
      }

      return listItem;
    }
  }]);

  return SelectItem;
}(React.Component);

var SelectedItem = function (_React$Component3) {
  _inherits(SelectedItem, _React$Component3);

  function SelectedItem() {
    _classCallCheck(this, SelectedItem);

    return _possibleConstructorReturn(this, (SelectedItem.__proto__ || Object.getPrototypeOf(SelectedItem)).apply(this, arguments));
  }

  _createClass(SelectedItem, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevProps.item.value != this.props.item.value) {
        $(this.input).trigger('change');
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this11 = this;

      var props = this.props;
      return React.createElement(
        'div',
        { className: 'field-input-selected' },
        React.createElement(
          'label',
          null,
          React.createElement('span', { className: 'icon--success' }),
          ' ',
          props.item.label,
          React.createElement('input', { type: 'hidden', name: props.name, value: props.item.value,
            ref: function ref(input) {
              _this11.input = input;
            } }),
          React.createElement(
            'ul',
            { className: 'toolbar' },
            React.createElement(
              'li',
              { className: 'remove' },
              React.createElement('a', { href: '', onClick: props.clearSelection })
            )
          )
        )
      );
    }
  }]);

  return SelectedItem;
}(React.Component);