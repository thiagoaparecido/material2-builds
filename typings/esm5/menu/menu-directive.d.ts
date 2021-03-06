/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { FocusOrigin } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';
import { AfterContentInit, ElementRef, EventEmitter, InjectionToken, NgZone, OnDestroy, OnInit, QueryList, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatMenuContent } from './menu-content';
import { MatMenuItem } from './menu-item';
import { MatMenuPanel } from './menu-panel';
import { MenuPositionX, MenuPositionY } from './menu-positions';
/** Default `mat-menu` options that can be overridden. */
export interface MatMenuDefaultOptions {
    /** The x-axis position of the menu. */
    xPosition: MenuPositionX;
    /** The y-axis position of the menu. */
    yPosition: MenuPositionY;
    /** Whether the menu should overlap the menu trigger. */
    overlapTrigger: boolean;
    /** Class to be applied to the menu's backdrop. */
    backdropClass: string;
    /** Whether the menu has a backdrop. */
    hasBackdrop?: boolean;
}
/** Injection token to be used to override the default options for `mat-menu`. */
export declare const MAT_MENU_DEFAULT_OPTIONS: InjectionToken<MatMenuDefaultOptions>;
export declare class MatMenu implements OnInit, AfterContentInit, MatMenuPanel, OnDestroy {
    private _elementRef;
    private _ngZone;
    private _defaultOptions;
    private _keyManager;
    private _xPosition;
    private _yPosition;
    private _previousElevation;
    /** Subscription to tab events on the menu panel */
    private _tabSubscription;
    /** Config object to be passed into the menu's ngClass */
    _classList: {
        [key: string]: boolean;
    };
    /** Current state of the panel animation. */
    _panelAnimationState: 'void' | 'enter';
    /** Emits whenever an animation on the menu completes. */
    _animationDone: Subject<void>;
    /** Parent menu of the current menu panel. */
    parentMenu: MatMenuPanel | undefined;
    /** Layout direction of the menu. */
    direction: Direction;
    /** Class to be added to the backdrop element. */
    backdropClass: string;
    /** Position of the menu in the X axis. */
    xPosition: MenuPositionX;
    /** Position of the menu in the Y axis. */
    yPosition: MenuPositionY;
    /** @docs-private */
    templateRef: TemplateRef<any>;
    /** List of the items inside of a menu. */
    items: QueryList<MatMenuItem>;
    /**
     * Menu content that will be rendered lazily.
     * @docs-private
     */
    lazyContent: MatMenuContent;
    /** Whether the menu should overlap its trigger. */
    overlapTrigger: boolean;
    private _overlapTrigger;
    /** Whether the menu has a backdrop. */
    hasBackdrop: boolean | undefined;
    private _hasBackdrop;
    /**
     * This method takes classes set on the host mat-menu element and applies them on the
     * menu template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing menu from outside the component.
     * @param classes list of class names
     */
    panelClass: string;
    /**
     * This method takes classes set on the host mat-menu element and applies them on the
     * menu template that displays in the overlay container.  Otherwise, it's difficult
     * to style the containing menu from outside the component.
     * @deprecated Use `panelClass` instead.
     * @deletion-target 7.0.0
     */
    classList: string;
    /** Event emitted when the menu is closed. */
    readonly closed: EventEmitter<void | 'click' | 'keydown' | 'tab'>;
    /**
     * Event emitted when the menu is closed.
     * @deprecated Switch to `closed` instead
     * @deletion-target 7.0.0
     */
    close: EventEmitter<void | "click" | "keydown" | "tab">;
    constructor(_elementRef: ElementRef, _ngZone: NgZone, _defaultOptions: MatMenuDefaultOptions);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnDestroy(): void;
    /** Stream that emits whenever the hovered menu item changes. */
    _hovered(): Observable<MatMenuItem>;
    /** Handle a keyboard event from the menu, delegating to the appropriate action. */
    _handleKeydown(event: KeyboardEvent): void;
    /**
     * Focus the first item in the menu.
     * @param origin Action from which the focus originated. Used to set the correct styling.
     */
    focusFirstItem(origin?: FocusOrigin): void;
    /**
     * Resets the active item in the menu. This is used when the menu is opened, allowing
     * the user to start from the first option when pressing the down arrow.
     */
    resetActiveItem(): void;
    /**
     * It's necessary to set position-based classes to ensure the menu panel animation
     * folds out from the correct direction.
     */
    setPositionClasses(posX?: MenuPositionX, posY?: MenuPositionY): void;
    /**
     * Sets the menu panel elevation.
     * @param depth Number of parent menus that come before the menu.
     */
    setElevation(depth: number): void;
    /** Starts the enter animation. */
    _startAnimation(): void;
    /** Resets the panel animation to its initial state. */
    _resetAnimation(): void;
    /** Callback that is invoked when the panel animation completes. */
    _onAnimationDone(): void;
}
