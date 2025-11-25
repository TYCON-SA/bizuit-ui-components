import { ClassValue } from 'clsx';
import * as React from 'react';
import React__default, { ReactNode } from 'react';
import * as react_jsx_runtime from 'react/jsx-runtime';
import { ColumnDef, RowSelectionState } from '@tanstack/react-table';
import { IBizuitProcessParameter, ILoginResponse, BizuitAuthService } from '@tyconsa/bizuit-form-sdk';

/**
 * Utility functions for Bizuit UI Components
 */

/**
 * Merge Tailwind classes with proper precedence
 */
declare function cn(...inputs: ClassValue[]): string;
/**
 * Format date with locale support
 */
declare function formatDate(date: Date, locale?: string): string;
/**
 * Format number with locale support
 */
declare function formatNumber(value: number, locale?: string): string;
/**
 * Debounce function for search inputs
 */
declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
/**
 * Generate unique ID
 */
declare function generateId(prefix?: string): string;
/**
 * Check if device is mobile
 */
declare function isMobile(): boolean;
/**
 * Check if device has touch support
 */
declare function isTouchDevice(): boolean;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>;

interface DataGridProps<TData, TValue = any> {
    /** Column definitions */
    columns: ColumnDef<TData, TValue>[];
    /** Data array */
    data: TData[];
    /** Enable row selection */
    selectable?: 'none' | 'single' | 'multiple';
    /** Selected rows (controlled) */
    selectedRows?: RowSelectionState;
    /** On selection change */
    onSelectionChange?: (selection: RowSelectionState) => void;
    /** Enable sorting */
    sortable?: boolean;
    /** Enable filtering */
    filterable?: boolean;
    /** Enable pagination */
    paginated?: boolean;
    /** Page size */
    pageSize?: number;
    /** On row click */
    onRowClick?: (row: TData) => void;
    /** Custom className */
    className?: string;
    /** Empty state message */
    emptyMessage?: string;
    /** Loading state */
    loading?: boolean;
    /** Mobile responsive mode */
    mobileMode?: 'card' | 'scroll' | 'stack';
}
declare function BizuitDataGrid<TData, TValue = any>({ columns, data, selectable, selectedRows, onSelectionChange, sortable, filterable, paginated, pageSize, onRowClick, className, emptyMessage, loading, mobileMode, }: DataGridProps<TData, TValue>): react_jsx_runtime.JSX.Element;
declare function SortableHeader({ column, children }: any): react_jsx_runtime.JSX.Element;

interface ComboOption {
    label: string;
    value: string;
    disabled?: boolean;
    group?: string;
    [key: string]: any;
}
interface BizuitComboProps {
    /** Available options */
    options: ComboOption[];
    /** Selected value(s) */
    value?: string | string[];
    /** On change callback */
    onChange?: (value: string | string[]) => void;
    /** Enable multiselect */
    multiSelect?: boolean;
    /** Enable search */
    searchable?: boolean;
    /** Search placeholder */
    searchPlaceholder?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Empty state message */
    emptyMessage?: string;
    /** Async search function */
    onSearch?: (query: string) => Promise<ComboOption[]>;
    /** Loading state */
    loading?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Custom className */
    className?: string;
    /** Custom option render */
    renderOption?: (option: ComboOption) => React.ReactNode;
    /** Max selected items (multiselect only) */
    maxSelected?: number;
    /** Show selected count in trigger */
    showCount?: boolean;
    /** Clear button */
    clearable?: boolean;
    /** Virtual scrolling for large lists */
    virtualized?: boolean;
    /** Mobile mode - full screen on mobile */
    mobileFullScreen?: boolean;
}
declare function BizuitCombo({ options: initialOptions, value, onChange, multiSelect, searchable, searchPlaceholder, placeholder, emptyMessage, onSearch, loading, disabled, className, renderOption, maxSelected, showCount, clearable, virtualized, mobileFullScreen, }: BizuitComboProps): react_jsx_runtime.JSX.Element;

/**
 * BizuitDateTimePicker Component
 * Advanced date/time picker with locale support, ranges, and mobile optimization
 * Built on react-day-picker with custom time input
 */
interface BizuitDateTimePickerProps {
    /** Selected date */
    value?: Date;
    /** On change callback */
    onChange?: (date: Date | undefined) => void;
    /** Mode: date, time, or datetime */
    mode?: 'date' | 'time' | 'datetime';
    /** Date format string */
    format?: string;
    /** Min date */
    minDate?: Date;
    /** Max date */
    maxDate?: Date;
    /** Locale */
    locale?: 'es' | 'en';
    /** Disabled state */
    disabled?: boolean;
    /** Placeholder */
    placeholder?: string;
    /** Custom className */
    className?: string;
    /** Show clear button */
    clearable?: boolean;
    /** 24-hour format */
    use24Hour?: boolean;
}
declare function BizuitDateTimePicker({ value, onChange, mode, format: formatString, minDate, maxDate, locale, disabled, placeholder, className, clearable, use24Hour, }: BizuitDateTimePickerProps): react_jsx_runtime.JSX.Element;

/**
 * BizuitSlider Component
 * Customizable slider with single/range values, marks, and tooltips
 * Built on Radix UI Slider - fully responsive
 */
interface SliderMark {
    value: number;
    label?: string;
}
interface BizuitSliderProps {
    /** Current value(s) */
    value?: number | number[];
    /** On change callback */
    onChange?: (value: number | number[]) => void;
    /** Minimum value */
    min?: number;
    /** Maximum value */
    max?: number;
    /** Step increment */
    step?: number;
    /** Enable range (two handles) */
    range?: boolean;
    /** Disabled state */
    disabled?: boolean;
    /** Custom marks */
    marks?: SliderMark[];
    /** Show tooltip */
    showTooltip?: boolean;
    /** Orientation */
    orientation?: 'horizontal' | 'vertical';
    /** Custom className */
    className?: string;
    /** Format tooltip value */
    formatValue?: (value: number) => string;
}
declare function BizuitSlider({ value, onChange, min, max, step, range, disabled, marks, showTooltip, orientation, className, formatValue, }: BizuitSliderProps): react_jsx_runtime.JSX.Element;

/**
 * BizuitFileUpload Component
 * Advanced file upload with drag & drop, preview, and validation
 * Mobile-optimized with camera support
 */
interface BizuitFileUploadProps {
    /** Selected files */
    value?: File[];
    /** On change callback */
    onChange?: (files: File[]) => void;
    /** Accept file types */
    accept?: string;
    /** Multiple files */
    multiple?: boolean;
    /** Max file size in bytes */
    maxSize?: number;
    /** Max number of files */
    maxFiles?: number;
    /** Disabled state */
    disabled?: boolean;
    /** Show preview */
    showPreview?: boolean;
    /** Custom className */
    className?: string;
    /** Upload text */
    uploadText?: string;
    /** Drag text */
    dragText?: string;
    /** Validation error callback */
    onError?: (error: string) => void;
}
declare function BizuitFileUpload({ value, onChange, accept, multiple, maxSize, // 10MB default
maxFiles, disabled, showPreview, className, uploadText, dragText, onError, }: BizuitFileUploadProps): react_jsx_runtime.JSX.Element;

interface DynamicFormFieldProps {
    parameter: IBizuitProcessParameter;
    value: any;
    onChange: (value: any) => void;
    required?: boolean;
    className?: string;
    /** Show if this is a variable (for continue-process scenario) */
    showVariableLabel?: boolean;
}
/**
 * DynamicFormField - Renders a form field based on Bizuit process parameter metadata
 *
 * Automatically selects the appropriate input type based on the parameter's type:
 * - string/text -> text input
 * - int/integer/number/decimal/double -> number input
 * - bool/boolean -> checkbox
 * - date/datetime/timestamp -> DateTimePicker component
 * - Unknown types -> text input with type indicator
 *
 * @param parameter - The Bizuit process parameter metadata
 * @param value - Current value of the field
 * @param onChange - Callback when value changes
 * @param required - Override required status (defaults to parameter.parameterDirection === 1)
 * @param className - Additional CSS classes for the container div
 * @param showVariableLabel - If true, shows (variable) label for variables instead of (opcional)
 */
declare function DynamicFormField({ parameter, value, onChange, required, className, showVariableLabel, }: DynamicFormFieldProps): react_jsx_runtime.JSX.Element;

interface RadioOption {
    label: string;
    value: string;
    disabled?: boolean;
    description?: string;
}
interface BizuitRadioButtonProps {
    options: RadioOption[];
    value?: string;
    onChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    disabled?: boolean;
    className?: string;
    name?: string;
    required?: boolean;
    label?: string;
    error?: string;
}
declare const BizuitRadioButton: React.ForwardRefExoticComponent<BizuitRadioButtonProps & React.RefAttributes<HTMLDivElement>>;

interface BizuitSignatureProps {
    value?: string;
    onChange?: (dataURL: string) => void;
    width?: number;
    height?: number;
    penColor?: string;
    penWidth?: number;
    backgroundColor?: string;
    className?: string;
    label?: string;
    required?: boolean;
    error?: string;
    disabled?: boolean;
    showDownload?: boolean;
}
declare const BizuitSignature: React.ForwardRefExoticComponent<BizuitSignatureProps & React.RefAttributes<HTMLCanvasElement>>;

interface DocumentFile {
    file: File;
    preview?: string;
    id: string;
}
interface BizuitDocumentInputProps {
    value?: DocumentFile[];
    onChange?: (files: DocumentFile[]) => void;
    accept?: string;
    maxSize?: number;
    maxFiles?: number;
    label?: string;
    description?: string;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
}
declare const BizuitDocumentInput: React.ForwardRefExoticComponent<BizuitDocumentInputProps & React.RefAttributes<HTMLDivElement>>;

interface GeolocationData {
    latitude: number;
    longitude: number;
    accuracy?: number;
    timestamp: number;
}
interface BizuitGeolocationProps {
    value?: GeolocationData;
    onChange?: (location: GeolocationData) => void;
    label?: string;
    description?: string;
    showMap?: boolean;
    className?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
}
declare const BizuitGeolocation: React.ForwardRefExoticComponent<BizuitGeolocationProps & React.RefAttributes<HTMLDivElement>>;

interface SubFormRow {
    id: string;
    [key: string]: any;
}
interface SubFormField {
    name: string;
    label: string;
    type: 'text' | 'number' | 'date' | 'select';
    options?: {
        label: string;
        value: string;
    }[];
    required?: boolean;
}
interface BizuitSubFormProps {
    fields: SubFormField[];
    value?: SubFormRow[];
    onChange?: (rows: SubFormRow[]) => void;
    label?: string;
    description?: string;
    maxRows?: number;
    minRows?: number;
    className?: string;
    disabled?: boolean;
}
declare const BizuitSubForm: React.ForwardRefExoticComponent<BizuitSubFormProps & React.RefAttributes<HTMLDivElement>>;

interface TabItem {
    value: string;
    label: string;
    content: React.ReactNode;
    disabled?: boolean;
    icon?: React.ReactNode;
}
interface BizuitTabsProps {
    items: TabItem[];
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;
    orientation?: 'horizontal' | 'vertical';
    className?: string;
    variant?: 'default' | 'pills' | 'underline';
}
declare const BizuitTabs: React.ForwardRefExoticComponent<BizuitTabsProps & React.RefAttributes<HTMLDivElement>>;

interface BizuitCardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    variant?: 'default' | 'outline' | 'filled';
    hoverable?: boolean;
    clickable?: boolean;
}
declare const BizuitCard: React.ForwardRefExoticComponent<BizuitCardProps & React.RefAttributes<HTMLDivElement>>;

interface StepItem {
    label: string;
    description?: string;
    icon?: React.ReactNode;
}
interface BizuitStepperProps {
    steps: StepItem[];
    currentStep: number;
    onChange?: (step: number) => void;
    orientation?: 'horizontal' | 'vertical';
    clickable?: boolean;
    className?: string;
}
declare const BizuitStepper: React.ForwardRefExoticComponent<BizuitStepperProps & React.RefAttributes<HTMLDivElement>>;

interface BizuitMediaProps {
    src?: string;
    type: 'image' | 'video' | 'audio' | 'camera' | 'qr-scanner';
    alt?: string;
    width?: string | number;
    height?: string | number;
    controls?: boolean;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    className?: string;
    onLoad?: () => void;
    onError?: () => void;
    onCapture?: (dataUrl: string) => void;
    onQRCodeDetected?: (data: string) => void;
    facingMode?: 'user' | 'environment';
}
declare const BizuitMedia: React.ForwardRefExoticComponent<BizuitMediaProps & React.RefAttributes<HTMLDivElement>>;

interface BizuitIFrameProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    src: string;
    title: string;
    width?: string | number;
    height?: string | number;
    loading?: 'eager' | 'lazy';
    showLoader?: boolean;
    onLoad?: () => void;
    onError?: () => void;
}
declare const BizuitIFrame: React.ForwardRefExoticComponent<BizuitIFrameProps & React.RefAttributes<HTMLIFrameElement>>;

type Theme = 'dark' | 'light' | 'system';
type ColorTheme = 'blue' | 'green' | 'purple' | 'orange' | 'red' | 'slate';
type Language = 'en' | 'es';
type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    defaultColorTheme?: ColorTheme;
    defaultLanguage?: Language;
    storageKey?: string;
    colorStorageKey?: string;
    languageStorageKey?: string;
};
type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    colorTheme: ColorTheme;
    setColorTheme: (colorTheme: ColorTheme) => void;
    language: Language;
    setLanguage: (language: Language) => void;
};
declare function BizuitThemeProvider({ children, defaultTheme, defaultColorTheme, defaultLanguage, storageKey, colorStorageKey, languageStorageKey, ...props }: ThemeProviderProps): react_jsx_runtime.JSX.Element;
declare const useBizuitTheme: () => ThemeProviderState;

declare function ThemeToggle(): react_jsx_runtime.JSX.Element;

declare function ColorThemeSelector(): react_jsx_runtime.JSX.Element | null;

declare function LanguageSelector(): react_jsx_runtime.JSX.Element | null;

declare const translations: {
    en: {
        'nav.backToHome': string;
        'home.title': string;
        'home.startProcess': string;
        'home.startProcess.description': string;
        'home.continueProcess': string;
        'home.continueProcess.description': string;
        'home.components.title': string;
        'home.components.description': string;
        'home.components.demo': string;
        'home.packages.title': string;
        'home.examples.title': string;
        'home.examples.description': string;
        'home.example1.title': string;
        'home.example1.description': string;
        'home.example1.uses': string;
        'home.example2.title': string;
        'home.example2.description': string;
        'home.example2.uses': string;
        'home.example3.title': string;
        'home.example3.description': string;
        'home.example3.uses': string;
        'home.example3.badge': string;
        'demo.title': string;
        'demo.description': string;
        'demo.combo.title': string;
        'demo.combo.description': string;
        'demo.combo.placeholder': string;
        'demo.combo.selected': string;
        'demo.datePicker.title': string;
        'demo.datePicker.description': string;
        'demo.datePicker.selected': string;
        'demo.slider.title': string;
        'demo.slider.description': string;
        'demo.slider.current': string;
        'demo.fileUpload.title': string;
        'demo.fileUpload.description': string;
        'demo.fileUpload.selected': string;
        'demo.dataGrid.title': string;
        'demo.dataGrid.description': string;
        'demo.button.title': string;
        'demo.button.description': string;
        'demo.reset.title': string;
        'demo.reset.description': string;
        'demo.reset.button': string;
        'demo.tip.title': string;
        'demo.tip.description': string;
        'button.default': string;
        'button.secondary': string;
        'button.destructive': string;
        'button.outline': string;
        'button.ghost': string;
        'button.link': string;
        'button.small': string;
        'button.large': string;
        'button.disabled': string;
        'button.clickMe': string;
        'button.clicked': string;
        'startProcess.title': string;
        'startProcess.processId': string;
        'startProcess.processId.placeholder': string;
        'startProcess.token': string;
        'startProcess.token.placeholder': string;
        'startProcess.authenticate': string;
        'startProcess.authenticating': string;
        'startProcess.note': string;
        'startProcess.note.description': string;
        'startProcess.eventNameFromUrl': string;
        'continueProcess.title': string;
        'continueProcess.instanceId': string;
        'continueProcess.instanceId.placeholder': string;
        'continueProcess.authenticateAndLock': string;
        'continueProcess.authenticating': string;
        'continueProcess.pessimisticLocking': string;
        'continueProcess.pessimisticLocking.description': string;
        'continueProcess.pessimisticLocking.release': string;
        'login.title': string;
        'login.username': string;
        'login.username.placeholder': string;
        'login.password': string;
        'login.password.placeholder': string;
        'login.submit': string;
        'login.submitting': string;
        'login.error': string;
        'login.success': string;
        'login.redirecting': string;
        'ui.backToHome': string;
        'ui.user': string;
        'ui.eventName': string;
        'ui.eventNameDescription': string;
        'ui.exampleUrl': string;
        'ui.liveEditorTip': string;
        'ui.parameters': string;
        'ui.cancel': string;
        'ui.save': string;
        'ui.submit': string;
        'ui.send': string;
        'ui.load': string;
        'ui.search': string;
        'ui.add': string;
        'ui.delete': string;
        'ui.edit': string;
        'ui.settings': string;
        'ui.download': string;
        'ui.initiateProcess': string;
        'ui.initiatingProcess': string;
        'ui.processStarted': string;
        'ui.back': string;
        'ui.next': string;
        'ui.finish': string;
        'ui.close': string;
        'ui.configuration': string;
        'ui.parametersToSend': string;
        'ui.formParameters': string;
        'ui.hiddenParameters': string;
        'ui.returnParameters': string;
        'ui.processDataInitialized': string;
        'ui.processStartedSuccessfully': string;
        'ui.processCreatedSuccessfully': string;
        'ui.processInformation': string;
        'ui.startAnotherProcess': string;
        'ui.processForm': string;
        'ui.noInputParametersFound': string;
        'ui.eventNameFromUrl': string;
        'ui.retry': string;
        'ui.loadInstanceData': string;
        'ui.instanceData': string;
        'ui.savingChanges': string;
        'ui.saveAndContinue': string;
        'ui.visibleParameters': string;
        'ui.hiddenCalculatedParameters': string;
        'ui.totalParameters': string;
        'ui.sending': string;
        'ui.enter': string;
        'ui.example': string;
        'ui.optional': string;
        'ui.required': string;
        'ui.processName': string;
        'ui.loadProcessParameters': string;
        'ui.loadingParameters': string;
        'ui.description': string;
        'ui.useCases': string;
        'ui.installation': string;
        'ui.editCodeDescription': string;
        'ui.viewSourceCode': string;
        'ui.inYourProject': string;
        'ui.copy': string;
        'example1.title': string;
        'example1.description': string;
        'example1.liveCodeTitle': string;
        'example1.liveCodeDescription': string;
        'example1.howItWorks': string;
        'example1.step1': string;
        'example1.step2': string;
        'example1.step3': string;
        'example1.idealFor': string;
        'example1.idealForText': string;
        'example1.notIdealFor': string;
        'example1.notIdealForText': string;
        'example2.title': string;
        'example2.description': string;
        'example2.liveCodeTitle': string;
        'example2.liveCodeDescription': string;
        'example2.howItWorks': string;
        'example2.step1': string;
        'example2.step2': string;
        'example2.step3': string;
        'example2.step4': string;
        'example2.step5': string;
        'example2.idealFor': string;
        'example2.idealForText': string;
        'example2.limitation': string;
        'example2.limitationText': string;
        'example2.seeExample3': string;
        'example2.seeExample3Text': string;
        'example3.title': string;
        'example3.description': string;
        'example3.liveCodeTitle': string;
        'example3.liveCodeDescription': string;
        'example3.howItWorks': string;
        'example3.step1': string;
        'example3.step2': string;
        'example3.step3': string;
        'example3.step4': string;
        'example3.note': string;
        'example3.onlyGenerates': string;
        'example3.notInForm': string;
        'example3.combine': string;
        'example3.visibleHidden': string;
        'example3.advantages.title': string;
        'example3.advantages.1': string;
        'example3.advantages.2': string;
        'example3.advantages.3': string;
        'example3.advantages.4': string;
        'example3.advantages.5': string;
        'example3.advantages.6': string;
        'welcome.title': string;
        'welcome.subtitle': string;
        'welcome.version': string;
        'welcome.totalComponents': string;
        'welcome.totalComponentsDesc': string;
        'welcome.categories': string;
        'welcome.categoriesDesc': string;
        'welcome.typescript': string;
        'welcome.typescriptDesc': string;
        'welcome.startExploring': string;
        'welcome.selectComponent': string;
        'welcome.detailedDescription': string;
        'welcome.detailedDescriptionText': string;
        'welcome.completeProps': string;
        'welcome.completePropsText': string;
        'welcome.interactiveExamples': string;
        'welcome.interactiveExamplesText': string;
        'welcome.quickInstall': string;
        'welcome.thenImport': string;
        'sidebar.components': string;
        'sidebar.componentsAvailable': string;
        'sidebar.searchPlaceholder': string;
        'sidebar.noComponentsFound': string;
        'sidebar.tryDifferentTerm': string;
        'sidebar.component': string;
        'sidebar.components_plural': string;
        'category.ui': string;
        'category.ui.desc': string;
        'category.forms': string;
        'category.forms.desc': string;
        'category.layout': string;
        'category.layout.desc': string;
        'category.media': string;
        'category.media.desc': string;
        'category.data': string;
        'category.data.desc': string;
        'ui.overview': string;
        'ui.props': string;
        'ui.liveExample': string;
        'ui.sourceCode': string;
        'ui.noPropsDocumented': string;
        'ui.componentName': string;
        'ui.componentType': string;
        'ui.componentRequired': string;
        'ui.componentDefault': string;
        'ui.componentDescription': string;
        'ui.yes': string;
        'ui.no': string;
    };
    es: {
        'nav.backToHome': string;
        'home.title': string;
        'home.startProcess': string;
        'home.startProcess.description': string;
        'home.continueProcess': string;
        'home.continueProcess.description': string;
        'home.components.title': string;
        'home.components.description': string;
        'home.components.demo': string;
        'home.packages.title': string;
        'home.examples.title': string;
        'home.examples.description': string;
        'home.example1.title': string;
        'home.example1.description': string;
        'home.example1.uses': string;
        'home.example2.title': string;
        'home.example2.description': string;
        'home.example2.uses': string;
        'home.example3.title': string;
        'home.example3.description': string;
        'home.example3.uses': string;
        'home.example3.badge': string;
        'demo.title': string;
        'demo.description': string;
        'demo.combo.title': string;
        'demo.combo.description': string;
        'demo.combo.placeholder': string;
        'demo.combo.selected': string;
        'demo.datePicker.title': string;
        'demo.datePicker.description': string;
        'demo.datePicker.selected': string;
        'demo.slider.title': string;
        'demo.slider.description': string;
        'demo.slider.current': string;
        'demo.fileUpload.title': string;
        'demo.fileUpload.description': string;
        'demo.fileUpload.selected': string;
        'demo.dataGrid.title': string;
        'demo.dataGrid.description': string;
        'demo.button.title': string;
        'demo.button.description': string;
        'demo.reset.title': string;
        'demo.reset.description': string;
        'demo.reset.button': string;
        'demo.tip.title': string;
        'demo.tip.description': string;
        'button.default': string;
        'button.secondary': string;
        'button.destructive': string;
        'button.outline': string;
        'button.ghost': string;
        'button.link': string;
        'button.small': string;
        'button.large': string;
        'button.disabled': string;
        'button.clickMe': string;
        'button.clicked': string;
        'startProcess.title': string;
        'startProcess.processId': string;
        'startProcess.processId.placeholder': string;
        'startProcess.token': string;
        'startProcess.token.placeholder': string;
        'startProcess.authenticate': string;
        'startProcess.authenticating': string;
        'startProcess.note': string;
        'startProcess.note.description': string;
        'startProcess.eventNameFromUrl': string;
        'continueProcess.title': string;
        'continueProcess.instanceId': string;
        'continueProcess.instanceId.placeholder': string;
        'continueProcess.authenticateAndLock': string;
        'continueProcess.authenticating': string;
        'continueProcess.pessimisticLocking': string;
        'continueProcess.pessimisticLocking.description': string;
        'continueProcess.pessimisticLocking.release': string;
        'login.title': string;
        'login.username': string;
        'login.username.placeholder': string;
        'login.password': string;
        'login.password.placeholder': string;
        'login.submit': string;
        'login.submitting': string;
        'login.error': string;
        'login.success': string;
        'login.redirecting': string;
        'ui.backToHome': string;
        'ui.user': string;
        'ui.eventName': string;
        'ui.eventNameDescription': string;
        'ui.exampleUrl': string;
        'ui.liveEditorTip': string;
        'ui.parameters': string;
        'ui.cancel': string;
        'ui.save': string;
        'ui.submit': string;
        'ui.send': string;
        'ui.load': string;
        'ui.search': string;
        'ui.add': string;
        'ui.delete': string;
        'ui.edit': string;
        'ui.settings': string;
        'ui.download': string;
        'ui.initiateProcess': string;
        'ui.initiatingProcess': string;
        'ui.processStarted': string;
        'ui.back': string;
        'ui.next': string;
        'ui.finish': string;
        'ui.close': string;
        'ui.configuration': string;
        'ui.parametersToSend': string;
        'ui.formParameters': string;
        'ui.hiddenParameters': string;
        'ui.returnParameters': string;
        'ui.processDataInitialized': string;
        'ui.processStartedSuccessfully': string;
        'ui.processCreatedSuccessfully': string;
        'ui.processInformation': string;
        'ui.startAnotherProcess': string;
        'ui.processForm': string;
        'ui.noInputParametersFound': string;
        'ui.eventNameFromUrl': string;
        'ui.retry': string;
        'ui.loadInstanceData': string;
        'ui.instanceData': string;
        'ui.savingChanges': string;
        'ui.saveAndContinue': string;
        'ui.visibleParameters': string;
        'ui.hiddenCalculatedParameters': string;
        'ui.totalParameters': string;
        'ui.sending': string;
        'ui.enter': string;
        'ui.example': string;
        'ui.optional': string;
        'ui.required': string;
        'ui.processName': string;
        'ui.loadProcessParameters': string;
        'ui.loadingParameters': string;
        'ui.description': string;
        'ui.useCases': string;
        'ui.installation': string;
        'ui.editCodeDescription': string;
        'ui.viewSourceCode': string;
        'ui.inYourProject': string;
        'ui.copy': string;
        'example1.title': string;
        'example1.description': string;
        'example1.liveCodeTitle': string;
        'example1.liveCodeDescription': string;
        'example1.howItWorks': string;
        'example1.step1': string;
        'example1.step2': string;
        'example1.step3': string;
        'example1.idealFor': string;
        'example1.idealForText': string;
        'example1.notIdealFor': string;
        'example1.notIdealForText': string;
        'example2.title': string;
        'example2.description': string;
        'example2.liveCodeTitle': string;
        'example2.liveCodeDescription': string;
        'example2.howItWorks': string;
        'example2.step1': string;
        'example2.step2': string;
        'example2.step3': string;
        'example2.step4': string;
        'example2.step5': string;
        'example2.idealFor': string;
        'example2.idealForText': string;
        'example2.limitation': string;
        'example2.limitationText': string;
        'example2.seeExample3': string;
        'example2.seeExample3Text': string;
        'example3.title': string;
        'example3.description': string;
        'example3.liveCodeTitle': string;
        'example3.liveCodeDescription': string;
        'example3.howItWorks': string;
        'example3.step1': string;
        'example3.step2': string;
        'example3.step3': string;
        'example3.step4': string;
        'example3.note': string;
        'example3.onlyGenerates': string;
        'example3.notInForm': string;
        'example3.combine': string;
        'example3.visibleHidden': string;
        'example3.advantages.title': string;
        'example3.advantages.1': string;
        'example3.advantages.2': string;
        'example3.advantages.3': string;
        'example3.advantages.4': string;
        'example3.advantages.5': string;
        'example3.advantages.6': string;
        'welcome.title': string;
        'welcome.subtitle': string;
        'welcome.version': string;
        'welcome.totalComponents': string;
        'welcome.totalComponentsDesc': string;
        'welcome.categories': string;
        'welcome.categoriesDesc': string;
        'welcome.typescript': string;
        'welcome.typescriptDesc': string;
        'welcome.startExploring': string;
        'welcome.selectComponent': string;
        'welcome.detailedDescription': string;
        'welcome.detailedDescriptionText': string;
        'welcome.completeProps': string;
        'welcome.completePropsText': string;
        'welcome.interactiveExamples': string;
        'welcome.interactiveExamplesText': string;
        'welcome.quickInstall': string;
        'welcome.thenImport': string;
        'sidebar.components': string;
        'sidebar.componentsAvailable': string;
        'sidebar.searchPlaceholder': string;
        'sidebar.noComponentsFound': string;
        'sidebar.tryDifferentTerm': string;
        'sidebar.component': string;
        'sidebar.components_plural': string;
        'category.ui': string;
        'category.ui.desc': string;
        'category.forms': string;
        'category.forms.desc': string;
        'category.layout': string;
        'category.layout.desc': string;
        'category.media': string;
        'category.media.desc': string;
        'category.data': string;
        'category.data.desc': string;
        'ui.overview': string;
        'ui.props': string;
        'ui.liveExample': string;
        'ui.sourceCode': string;
        'ui.noPropsDocumented': string;
        'ui.componentName': string;
        'ui.componentType': string;
        'ui.componentRequired': string;
        'ui.componentDefault': string;
        'ui.componentDescription': string;
        'ui.yes': string;
        'ui.no': string;
    };
};
type TranslationKey = keyof typeof translations.en;

declare function useTranslation(): {
    t: (key: TranslationKey) => string;
    language: Language;
};

interface BizuitAuthContextType {
    token: string | null;
    user: ILoginResponse['User'] | null;
    expirationDate: string | null;
    isAuthenticated: boolean;
    login: (loginResponse: ILoginResponse) => void;
    logout: () => void;
    checkAuth: () => boolean;
}
interface BizuitAuthProviderProps {
    children: ReactNode;
    tokenStorageKey?: string;
    userStorageKey?: string;
    expirationStorageKey?: string;
}
/**
 * BizuitAuthProvider
 * Manages authentication state and localStorage persistence
 *
 * @example
 * ```tsx
 * import { BizuitAuthProvider, useBizuitAuth } from '@bizuit/ui-components'
 *
 * // In your root layout:
 * <BizuitAuthProvider>
 *   {children}
 * </BizuitAuthProvider>
 *
 * // In your components:
 * const { isAuthenticated, user, token, login, logout } = useBizuitAuth()
 * ```
 */
declare function BizuitAuthProvider({ children, tokenStorageKey, userStorageKey, expirationStorageKey, }: BizuitAuthProviderProps): react_jsx_runtime.JSX.Element | null;
/**
 * useBizuitAuth hook
 * Access authentication state and methods
 *
 * @throws Error if used outside BizuitAuthProvider
 */
declare function useBizuitAuth(): BizuitAuthContextType;

interface BizuitLoginProps {
    authService: BizuitAuthService;
    onLoginSuccess: (loginResponse: ILoginResponse) => void;
    onLoginError?: (error: Error) => void;
    className?: string;
}
/**
 * BizuitLogin Component
 * Reusable login form for Bizuit authentication
 *
 * @example
 * ```tsx
 * import { BizuitLogin } from '@bizuit/ui-components'
 * import { BizuitAuthService } from '@tyconsa/bizuit-form-sdk'
 *
 * const authService = new BizuitAuthService(bizuitConfig)
 *
 * <BizuitLogin
 *   authService={authService}
 *   onLoginSuccess={(response) => {
 *     console.log('Login successful:', response)
 *     // Store token and redirect
 *   }}
 *   onLoginError={(error) => {
 *     console.error('Login failed:', error)
 *   }}
 * />
 * ```
 */
declare function BizuitLogin({ authService, onLoginSuccess, onLoginError, className, }: BizuitLoginProps): react_jsx_runtime.JSX.Element;

interface ProcessSuccessScreenProps {
    /**
     * The process data returned from Bizuit API (raiseEvent or continueInstance response)
     */
    processData: {
        instanceId?: string;
        status?: string;
        tyconParameters?: any;
        [key: string]: any;
    };
    /**
     * Title to display (defaults to "Proceso Iniciado Exitosamente")
     */
    title?: string;
    /**
     * Subtitle/description (defaults to "El proceso ha sido creado correctamente en el BPMS Bizuit")
     */
    subtitle?: string;
    /**
     * Callback when user clicks "New Process" or similar action button
     */
    onNewProcess?: () => void;
    /**
     * Callback when user clicks "Back to Home" or similar navigation button
     */
    onBackToHome?: () => void;
    /**
     * Custom action buttons to show instead of default ones
     */
    customActions?: React__default.ReactNode;
    /**
     * Additional CSS classes for the container
     */
    className?: string;
}
/**
 * ProcessSuccessScreen - Displays a success message with process information
 *
 * Automatically shows:
 * - Success icon
 * - Instance ID
 * - Process status
 * - Return parameters (if any)
 * - Action buttons (customizable)
 *
 * Used after successfully starting or continuing a Bizuit process.
 *
 * @example
 * ```tsx
 * <ProcessSuccessScreen
 *   processData={result}
 *   onNewProcess={() => setStatus('idle')}
 *   onBackToHome={() => router.push('/')}
 * />
 * ```
 */
declare function ProcessSuccessScreen({ processData, title, subtitle, onNewProcess, onBackToHome, customActions, className, }: ProcessSuccessScreenProps): react_jsx_runtime.JSX.Element;

/**
 * @bizuit/ui-components
 * Production-ready, fully customizable UI components for Bizuit BPM forms
 */

declare const VERSION = "1.3.1";

export { type BizuitAuthContextType, BizuitAuthProvider, type BizuitAuthProviderProps, BizuitCard, type BizuitCardProps, BizuitCombo, type BizuitComboProps, BizuitDataGrid, BizuitDateTimePicker, type BizuitDateTimePickerProps, BizuitDocumentInput, type BizuitDocumentInputProps, BizuitFileUpload, type BizuitFileUploadProps, BizuitGeolocation, type BizuitGeolocationProps, BizuitIFrame, type BizuitIFrameProps, BizuitLogin, type BizuitLoginProps, BizuitMedia, type BizuitMediaProps, BizuitRadioButton, type BizuitRadioButtonProps, BizuitSignature, type BizuitSignatureProps, BizuitSlider, type BizuitSliderProps, BizuitStepper, type BizuitStepperProps, BizuitSubForm, type BizuitSubFormProps, BizuitTabs, type BizuitTabsProps, BizuitThemeProvider, Button, type ButtonProps, type ColorTheme, ColorThemeSelector, type ComboOption, type DataGridProps, type DocumentFile, DynamicFormField, type DynamicFormFieldProps, type GeolocationData, type Language, LanguageSelector, ProcessSuccessScreen, type ProcessSuccessScreenProps, type RadioOption, type SliderMark, SortableHeader, type StepItem, type SubFormField, type SubFormRow, type TabItem, type Theme, ThemeToggle, type TranslationKey, VERSION, cn, debounce, formatDate, formatNumber, generateId, isMobile, isTouchDevice, translations, useBizuitAuth, useBizuitTheme, useTranslation };
