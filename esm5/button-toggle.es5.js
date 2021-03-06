/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { __extends } from 'tslib';
import { FocusMonitor } from '@angular/cdk/a11y';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, Optional, Output, ViewChild, ViewEncapsulation, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { mixinDisabled, mixinDisableRipple, MatCommonModule, MatRippleModule } from '@angular/material/core';
import { SelectionModel } from '@angular/cdk/collections';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * \@docs-private
 */
var  /**
 * \@docs-private
 */
MatButtonToggleGroupBase = /** @class */ (function () {
    function MatButtonToggleGroupBase() {
    }
    return MatButtonToggleGroupBase;
}());
var /** @type {?} */ _MatButtonToggleGroupMixinBase = mixinDisabled(MatButtonToggleGroupBase);
/**
 * Provider Expression that allows mat-button-toggle-group to register as a ControlValueAccessor.
 * This allows it to support [(ngModel)].
 * \@docs-private
 */
var /** @type {?} */ MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return MatButtonToggleGroup; }),
    multi: true
};
/**
 * @deprecated Use `MatButtonToggleGroup` instead.
 * \@deletion-target 7.0.0
 */
var  /**
 * @deprecated Use `MatButtonToggleGroup` instead.
 * \@deletion-target 7.0.0
 */
MatButtonToggleGroupMultiple = /** @class */ (function () {
    function MatButtonToggleGroupMultiple() {
    }
    return MatButtonToggleGroupMultiple;
}());
var /** @type {?} */ _uniqueIdCounter = 0;
/**
 * Change event object emitted by MatButtonToggle.
 */
var  /**
 * Change event object emitted by MatButtonToggle.
 */
MatButtonToggleChange = /** @class */ (function () {
    function MatButtonToggleChange(source, value) {
        this.source = source;
        this.value = value;
    }
    return MatButtonToggleChange;
}());
/**
 * Exclusive selection button toggle group that behaves like a radio-button group.
 */
var MatButtonToggleGroup = /** @class */ (function (_super) {
    __extends(MatButtonToggleGroup, _super);
    function MatButtonToggleGroup(_changeDetector) {
        var _this = _super.call(this) || this;
        _this._changeDetector = _changeDetector;
        _this._vertical = false;
        _this._multiple = false;
        /**
         * The method to be called in order to update ngModel.
         * Now `ngModel` binding is not supported in multiple selection mode.
         */
        _this._controlValueAccessorChangeFn = function () { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        _this._onTouched = function () { };
        _this._name = "mat-button-toggle-group-" + _uniqueIdCounter++;
        /**
         * Event that emits whenever the value of the group changes.
         * Used to facilitate two-way data binding.
         * \@docs-private
         */
        _this.valueChange = new EventEmitter();
        /**
         * Event emitted when the group's value changes.
         */
        _this.change = new EventEmitter();
        return _this;
    }
    Object.defineProperty(MatButtonToggleGroup.prototype, "name", {
        get: /**
         * `name` attribute for the underlying `input` element.
         * @return {?}
         */
        function () { return this._name; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._name = value;
            if (this._buttonToggles) {
                this._buttonToggles.forEach(function (toggle) { return toggle.name = _this._name; });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggleGroup.prototype, "vertical", {
        get: /**
         * Whether the toggle group is vertical.
         * @return {?}
         */
        function () { return this._vertical; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._vertical = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggleGroup.prototype, "value", {
        get: /**
         * Value of the toggle group.
         * @return {?}
         */
        function () {
            var /** @type {?} */ selected = this._selectionModel ? this._selectionModel.selected : [];
            if (this.multiple) {
                return selected.map(function (toggle) { return toggle.value; });
            }
            return selected[0] ? selected[0].value : undefined;
        },
        set: /**
         * @param {?} newValue
         * @return {?}
         */
        function (newValue) {
            this._setSelectionByValue(newValue);
            this.valueChange.emit(this.value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggleGroup.prototype, "selected", {
        /** Selected button toggles in the group. */
        get: /**
         * Selected button toggles in the group.
         * @return {?}
         */
        function () {
            var /** @type {?} */ selected = this._selectionModel.selected;
            return this.multiple ? selected : (selected[0] || null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggleGroup.prototype, "multiple", {
        get: /**
         * Whether multiple button toggles can be selected.
         * @return {?}
         */
        function () { return this._multiple; },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._multiple = coerceBooleanProperty(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatButtonToggleGroup.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._selectionModel = new SelectionModel(this.multiple, undefined, false);
    };
    /**
     * @return {?}
     */
    MatButtonToggleGroup.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        (_a = this._selectionModel).select.apply(_a, this._buttonToggles.filter(function (toggle) { return toggle.checked; }));
        var _a;
    };
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param value Value to be set to the model.
     */
    /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value Value to be set to the model.
     * @return {?}
     */
    MatButtonToggleGroup.prototype.writeValue = /**
     * Sets the model value. Implemented as part of ControlValueAccessor.
     * @param {?} value Value to be set to the model.
     * @return {?}
     */
    function (value) {
        this.value = value;
        this._changeDetector.markForCheck();
    };
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    MatButtonToggleGroup.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._controlValueAccessorChangeFn = fn;
    };
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} fn
     * @return {?}
     */
    MatButtonToggleGroup.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouched = fn;
    };
    // Implemented as part of ControlValueAccessor.
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    MatButtonToggleGroup.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
        if (this._buttonToggles) {
            this._buttonToggles.forEach(function (toggle) { return toggle._markForCheck(); });
        }
    };
    /** Dispatch change event with current selection and group value. */
    /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    MatButtonToggleGroup.prototype._emitChangeEvent = /**
     * Dispatch change event with current selection and group value.
     * @return {?}
     */
    function () {
        var /** @type {?} */ selected = this.selected;
        var /** @type {?} */ source = Array.isArray(selected) ? selected[selected.length - 1] : selected;
        var /** @type {?} */ event = new MatButtonToggleChange(/** @type {?} */ ((source)), this.value);
        this._controlValueAccessorChangeFn(event.value);
        this.change.emit(event);
    };
    /**
     * Syncs a button toggle's selected state with the model value.
     * @param toggle Toggle to be synced.
     * @param select Whether the toggle should be selected.
     * @param isUserInput Whether the change was a result of a user interaction.
     */
    /**
     * Syncs a button toggle's selected state with the model value.
     * @param {?} toggle Toggle to be synced.
     * @param {?} select Whether the toggle should be selected.
     * @param {?=} isUserInput Whether the change was a result of a user interaction.
     * @return {?}
     */
    MatButtonToggleGroup.prototype._syncButtonToggle = /**
     * Syncs a button toggle's selected state with the model value.
     * @param {?} toggle Toggle to be synced.
     * @param {?} select Whether the toggle should be selected.
     * @param {?=} isUserInput Whether the change was a result of a user interaction.
     * @return {?}
     */
    function (toggle, select, isUserInput) {
        if (isUserInput === void 0) { isUserInput = false; }
        // Deselect the currently-selected toggle, if we're in single-selection
        // mode and the button being toggled isn't selected at the moment.
        if (!this.multiple && this.selected && !toggle.checked) {
            (/** @type {?} */ (this.selected)).checked = false;
        }
        if (select) {
            this._selectionModel.select(toggle);
        }
        else {
            this._selectionModel.deselect(toggle);
        }
        // Only emit the change event for user input.
        if (isUserInput) {
            this._emitChangeEvent();
        }
        // Note: we emit this one no matter whether it was a user interaction, because
        // it is used by Angular to sync up the two-way data binding.
        this.valueChange.emit(this.value);
    };
    /** Checks whether a button toggle is selected. */
    /**
     * Checks whether a button toggle is selected.
     * @param {?} toggle
     * @return {?}
     */
    MatButtonToggleGroup.prototype._isSelected = /**
     * Checks whether a button toggle is selected.
     * @param {?} toggle
     * @return {?}
     */
    function (toggle) {
        return this._selectionModel.isSelected(toggle);
    };
    /** Determines whether a button toggle should be checked on init. */
    /**
     * Determines whether a button toggle should be checked on init.
     * @param {?} toggle
     * @return {?}
     */
    MatButtonToggleGroup.prototype._isPrechecked = /**
     * Determines whether a button toggle should be checked on init.
     * @param {?} toggle
     * @return {?}
     */
    function (toggle) {
        if (typeof this._rawValue === 'undefined') {
            return false;
        }
        if (this.multiple && Array.isArray(this._rawValue)) {
            return !!this._rawValue.find(function (value) { return toggle.value != null && value === toggle.value; });
        }
        return toggle.value === this._rawValue;
    };
    /**
     * Updates the selection state of the toggles in the group based on a value.
     * @param {?} value
     * @return {?}
     */
    MatButtonToggleGroup.prototype._setSelectionByValue = /**
     * Updates the selection state of the toggles in the group based on a value.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var _this = this;
        this._rawValue = value;
        if (!this._buttonToggles) {
            return;
        }
        if (this.multiple && value) {
            if (!Array.isArray(value)) {
                throw Error('Value must be an array in multiple-selection mode.');
            }
            this._clearSelection();
            value.forEach(function (currentValue) { return _this._selectValue(currentValue); });
        }
        else {
            this._clearSelection();
            this._selectValue(value);
        }
    };
    /**
     * Clears the selected toggles.
     * @return {?}
     */
    MatButtonToggleGroup.prototype._clearSelection = /**
     * Clears the selected toggles.
     * @return {?}
     */
    function () {
        this._selectionModel.clear();
        this._buttonToggles.forEach(function (toggle) { return toggle.checked = false; });
    };
    /**
     * Selects a value if there's a toggle that corresponds to it.
     * @param {?} value
     * @return {?}
     */
    MatButtonToggleGroup.prototype._selectValue = /**
     * Selects a value if there's a toggle that corresponds to it.
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ correspondingOption = this._buttonToggles.find(function (toggle) {
            return toggle.value != null && toggle.value === value;
        });
        if (correspondingOption) {
            correspondingOption.checked = true;
            this._selectionModel.select(correspondingOption);
        }
    };
    MatButtonToggleGroup.decorators = [
        { type: Directive, args: [{
                    selector: 'mat-button-toggle-group',
                    providers: [
                        MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR,
                        { provide: MatButtonToggleGroupMultiple, useExisting: MatButtonToggleGroup },
                    ],
                    inputs: ['disabled'],
                    host: {
                        '[attr.role]': 'multiple ? "group" : "radiogroup"',
                        'class': 'mat-button-toggle-group',
                        '[class.mat-button-toggle-vertical]': 'vertical'
                    },
                    exportAs: 'matButtonToggleGroup',
                },] },
    ];
    /** @nocollapse */
    MatButtonToggleGroup.ctorParameters = function () { return [
        { type: ChangeDetectorRef, },
    ]; };
    MatButtonToggleGroup.propDecorators = {
        "_buttonToggles": [{ type: ContentChildren, args: [forwardRef(function () { return MatButtonToggle; }),] },],
        "name": [{ type: Input },],
        "vertical": [{ type: Input },],
        "value": [{ type: Input },],
        "valueChange": [{ type: Output },],
        "multiple": [{ type: Input },],
        "change": [{ type: Output },],
    };
    return MatButtonToggleGroup;
}(_MatButtonToggleGroupMixinBase));
/**
 * \@docs-private
 */
var  /**
 * \@docs-private
 */
MatButtonToggleBase = /** @class */ (function () {
    function MatButtonToggleBase() {
    }
    return MatButtonToggleBase;
}());
var /** @type {?} */ _MatButtonToggleMixinBase = mixinDisableRipple(MatButtonToggleBase);
/**
 * Single button inside of a toggle group.
 */
var MatButtonToggle = /** @class */ (function (_super) {
    __extends(MatButtonToggle, _super);
    function MatButtonToggle(toggleGroup, _changeDetectorRef, _elementRef, _focusMonitor) {
        var _this = _super.call(this) || this;
        _this._changeDetectorRef = _changeDetectorRef;
        _this._elementRef = _elementRef;
        _this._focusMonitor = _focusMonitor;
        _this._isSingleSelector = false;
        _this._checked = false;
        /**
         * Users can specify the `aria-labelledby` attribute which will be forwarded to the input element
         */
        _this.ariaLabelledby = null;
        _this._disabled = false;
        /**
         * Event emitted when the group value changes.
         */
        _this.change = new EventEmitter();
        _this.buttonToggleGroup = toggleGroup;
        return _this;
    }
    Object.defineProperty(MatButtonToggle.prototype, "inputId", {
        /** Unique ID for the underlying `input` element. */
        get: /**
         * Unique ID for the underlying `input` element.
         * @return {?}
         */
        function () { return this.id + "-input"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggle.prototype, "checked", {
        get: /**
         * Whether the button is checked.
         * @return {?}
         */
        function () {
            return this.buttonToggleGroup ? this.buttonToggleGroup._isSelected(this) : this._checked;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var /** @type {?} */ newValue = coerceBooleanProperty(value);
            if (newValue !== this._checked) {
                this._checked = newValue;
                if (this.buttonToggleGroup) {
                    this.buttonToggleGroup._syncButtonToggle(this, this._checked);
                }
                this._changeDetectorRef.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(MatButtonToggle.prototype, "disabled", {
        get: /**
         * Whether the button is disabled.
         * @return {?}
         */
        function () {
            return this._disabled || (this.buttonToggleGroup && this.buttonToggleGroup.disabled);
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) { this._disabled = coerceBooleanProperty(value); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    MatButtonToggle.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._isSingleSelector = this.buttonToggleGroup && !this.buttonToggleGroup.multiple;
        this._type = this._isSingleSelector ? 'radio' : 'checkbox';
        this.id = this.id || "mat-button-toggle-" + _uniqueIdCounter++;
        if (this._isSingleSelector) {
            this.name = this.buttonToggleGroup.name;
        }
        if (this.buttonToggleGroup && this.buttonToggleGroup._isPrechecked(this)) {
            this.checked = true;
        }
        this._focusMonitor.monitor(this._elementRef.nativeElement, true);
    };
    /**
     * @return {?}
     */
    MatButtonToggle.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._focusMonitor.stopMonitoring(this._elementRef.nativeElement);
    };
    /** Focuses the button. */
    /**
     * Focuses the button.
     * @return {?}
     */
    MatButtonToggle.prototype.focus = /**
     * Focuses the button.
     * @return {?}
     */
    function () {
        this._inputElement.nativeElement.focus();
    };
    /** Checks the button toggle due to an interaction with the underlying native input. */
    /**
     * Checks the button toggle due to an interaction with the underlying native input.
     * @param {?} event
     * @return {?}
     */
    MatButtonToggle.prototype._onInputChange = /**
     * Checks the button toggle due to an interaction with the underlying native input.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.stopPropagation();
        this._checked = this._isSingleSelector ? true : !this._checked;
        if (this.buttonToggleGroup) {
            this.buttonToggleGroup._syncButtonToggle(this, this._checked, true);
            this.buttonToggleGroup._onTouched();
        }
        // Emit a change event when the native input does.
        this.change.emit(new MatButtonToggleChange(this, this.value));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    MatButtonToggle.prototype._onInputClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // We have to stop propagation for click events on the visual hidden input element.
        // By default, when a user clicks on a label element, a generated click event will be
        // dispatched on the associated input element. Since we are using a label element as our
        // root container, the click event on the `slide-toggle` will be executed twice.
        // The real click event will bubble up, and the generated click event also tries to bubble up.
        // This will lead to multiple click events.
        // Preventing bubbling for the second event will solve that issue.
        event.stopPropagation();
    };
    /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     */
    /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     * @return {?}
     */
    MatButtonToggle.prototype._markForCheck = /**
     * Marks the button toggle as needing checking for change detection.
     * This method is exposed because the parent button toggle group will directly
     * update bound properties of the radio button.
     * @return {?}
     */
    function () {
        // When the group value changes, the button will not be notified.
        // Use `markForCheck` to explicit update button toggle's status.
        this._changeDetectorRef.markForCheck();
    };
    MatButtonToggle.decorators = [
        { type: Component, args: [{selector: 'mat-button-toggle',
                    template: "<label [attr.for]=\"inputId\" class=\"mat-button-toggle-label\" #label><input #input class=\"mat-button-toggle-input cdk-visually-hidden\" [type]=\"_type\" [id]=\"inputId\" [checked]=\"checked\" [disabled]=\"disabled || null\" [attr.name]=\"name\" [attr.aria-label]=\"ariaLabel\" [attr.aria-labelledby]=\"ariaLabelledby\" (change)=\"_onInputChange($event)\" (click)=\"_onInputClick($event)\"><div class=\"mat-button-toggle-label-content\"><ng-content></ng-content></div></label><div class=\"mat-button-toggle-focus-overlay\"></div><div class=\"mat-button-toggle-ripple\" matRipple [matRippleTrigger]=\"label\" [matRippleDisabled]=\"this.disableRipple || this.disabled\"></div>",
                    styles: [".mat-button-toggle-group,.mat-button-toggle-standalone{box-shadow:0 3px 1px -2px rgba(0,0,0,.2),0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12);position:relative;display:inline-flex;flex-direction:row;border-radius:2px;cursor:pointer;white-space:nowrap;overflow:hidden}.mat-button-toggle-vertical{flex-direction:column}.mat-button-toggle-vertical .mat-button-toggle-label-content{display:block}.mat-button-toggle-disabled .mat-button-toggle-label-content{cursor:default}.mat-button-toggle{white-space:nowrap;position:relative}.mat-button-toggle.cdk-keyboard-focused .mat-button-toggle-focus-overlay{opacity:1}.mat-button-toggle-label-content{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;display:inline-block;line-height:36px;padding:0 16px;cursor:pointer}.mat-button-toggle-label-content>*{vertical-align:middle}.mat-button-toggle-focus-overlay{border-radius:inherit;pointer-events:none;opacity:0;top:0;left:0;right:0;bottom:0;position:absolute}.mat-button-toggle-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}"],
                    encapsulation: ViewEncapsulation.None,
                    exportAs: 'matButtonToggle',
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    inputs: ['disableRipple'],
                    host: {
                        '[class.mat-button-toggle-standalone]': '!buttonToggleGroup',
                        '[class.mat-button-toggle-checked]': 'checked',
                        '[class.mat-button-toggle-disabled]': 'disabled',
                        'class': 'mat-button-toggle',
                        '[attr.id]': 'id',
                    }
                },] },
    ];
    /** @nocollapse */
    MatButtonToggle.ctorParameters = function () { return [
        { type: MatButtonToggleGroup, decorators: [{ type: Optional },] },
        { type: ChangeDetectorRef, },
        { type: ElementRef, },
        { type: FocusMonitor, },
    ]; };
    MatButtonToggle.propDecorators = {
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
        "ariaLabelledby": [{ type: Input, args: ['aria-labelledby',] },],
        "_inputElement": [{ type: ViewChild, args: ['input',] },],
        "id": [{ type: Input },],
        "name": [{ type: Input },],
        "value": [{ type: Input },],
        "checked": [{ type: Input },],
        "disabled": [{ type: Input },],
        "change": [{ type: Output },],
    };
    return MatButtonToggle;
}(_MatButtonToggleMixinBase));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var MatButtonToggleModule = /** @class */ (function () {
    function MatButtonToggleModule() {
    }
    MatButtonToggleModule.decorators = [
        { type: NgModule, args: [{
                    imports: [MatCommonModule, MatRippleModule],
                    exports: [MatCommonModule, MatButtonToggleGroup, MatButtonToggle],
                    declarations: [MatButtonToggleGroup, MatButtonToggle],
                },] },
    ];
    return MatButtonToggleModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

export { MatButtonToggleGroupBase, _MatButtonToggleGroupMixinBase, MAT_BUTTON_TOGGLE_GROUP_VALUE_ACCESSOR, MatButtonToggleGroupMultiple, MatButtonToggleChange, MatButtonToggleGroup, MatButtonToggleBase, _MatButtonToggleMixinBase, MatButtonToggle, MatButtonToggleModule };
//# sourceMappingURL=button-toggle.es5.js.map
